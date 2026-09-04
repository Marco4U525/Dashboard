import { createServerFn } from "@tanstack/react-start";
import {
  classifyCallToolError,
  ConnectorType,
  isLoginRequired,
} from "@/lib/app-data";
import type { MailErrorKind, MailMessage } from "./types";

type InboxResult =
  | { ok: true; messages: MailMessage[] }
  | {
      ok: false;
      kind: MailErrorKind;
      message: string;
      loginUrl?: string;
    };

type MessageResult =
  | { ok: true; body: string; headers: Record<string, string> }
  | { ok: false; kind: MailErrorKind; message: string; loginUrl?: string };

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function unwrapPayload(data: unknown): unknown {
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  const rec = asRecord(data);
  if (!rec) return data;
  if ("data" in rec && rec.data !== undefined) return rec.data;
  if ("result" in rec && rec.result !== undefined) return rec.result;
  return rec;
}

function pickString(rec: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const v = rec[key];
    if (typeof v === "string" && v.trim()) return v;
  }
  return "";
}

function extractFrom(from: string) {
  const match = from.match(/^(.*)<([^>]+)>$/);
  if (match) {
    return {
      from: (match[1] || match[2]).replace(/"/g, "").trim() || match[2].trim(),
      fromEmail: match[2].trim(),
    };
  }
  return { from: from || "Unbekannt", fromEmail: from };
}

function labelsOf(rec: Record<string, unknown>): string[] {
  const raw = rec.labelIds ?? rec.label_ids ?? rec.labels ?? [];
  if (!Array.isArray(raw)) return [];
  return raw.map((x) => String(x).toUpperCase());
}

function parseMessage(item: unknown): MailMessage | null {
  const rec = asRecord(item);
  if (!rec) return null;
  const nested = asRecord(rec.message) ?? rec;
  const id = pickString(nested, ["id", "message_id", "messageId"]);
  if (!id) return null;
  const fromRaw = pickString(nested, ["from", "sender", "from_email", "fromEmail"]);
  const { from, fromEmail } = extractFrom(fromRaw);
  const labels = labelsOf(nested);
  const unreadFlag = nested.unread ?? nested.is_unread ?? nested.isUnread;
  const starredFlag = nested.starred ?? nested.is_starred ?? nested.isStarred;
  const importantFlag = nested.important ?? nested.is_important;
  return {
    id,
    threadId: pickString(nested, ["threadId", "thread_id", "thread"]) || id,
    from,
    fromEmail,
    subject: pickString(nested, ["subject", "title"]) || "(kein Betreff)",
    snippet: pickString(nested, [
      "snippet",
      "preview",
      "snippet_text",
      "body_preview",
      "text",
    ]),
    date: pickString(nested, ["date", "internalDate", "timestamp", "received"]),
    unread:
      typeof unreadFlag === "boolean"
        ? unreadFlag
        : labels.includes("UNREAD"),
    starred:
      typeof starredFlag === "boolean"
        ? starredFlag
        : labels.includes("STARRED"),
    important:
      typeof importantFlag === "boolean"
        ? importantFlag
        : labels.includes("IMPORTANT"),
    rfcMessageId: pickString(nested, ["rfc_message_id", "rfcMessageId"]) || undefined,
  };
}

function collectMessages(payload: unknown): MailMessage[] {
  const data = unwrapPayload(payload);
  const rec = asRecord(data);
  const candidates = [
    data,
    rec?.messages,
    rec?.emails,
    rec?.threads,
    rec?.results,
    rec?.items,
  ];
  const list: unknown[] = [];
  for (const c of candidates) {
    if (Array.isArray(c)) {
      list.push(...c);
      break;
    }
  }
  if (list.length === 0 && rec) {
    const maybe = parseMessage(rec);
    return maybe ? [maybe] : [];
  }
  return list
    .map(parseMessage)
    .filter((m): m is MailMessage => Boolean(m));
}

async function tool(name: string, args: Record<string, unknown>) {
  const { callTool } = await import("@/lib/app-data/client.server");
  return callTool(name, args, { connectorType: ConnectorType.Gmail });
}

function failFrom(result: {
  ok: boolean;
  errorMessage?: string;
  loginUrl?: string;
  loginRequired?: boolean;
}): Extract<InboxResult, { ok: false }> {
  const classified = classifyCallToolError({
    ok: false,
    data: null,
    errorMessage: result.errorMessage,
    loginRequired: result.loginRequired ?? isLoginRequired({
      ok: false,
      data: null,
      loginRequired: result.loginRequired,
      errorMessage: result.errorMessage,
      loginUrl: result.loginUrl,
    }),
    loginUrl: result.loginUrl,
  });
  return {
    ok: false,
    kind: classified?.kind ?? "error",
    message: classified?.message ?? "Gmail ist gerade nicht erreichbar.",
    loginUrl: result.loginUrl,
  };
}

export const loadInbox = createServerFn({ method: "POST" }).handler(
  async (): Promise<InboxResult> => {
    const result = await tool("gmail_search", {
      query: "(is:unread OR is:important) in:inbox",
      max_results: 18,
    });
    if (!result.ok) return failFrom(result);
    const messages = collectMessages(result.data).filter(
      (m) => m.unread || m.important,
    );
    return { ok: true, messages };
  },
);

export const loadMailBody = createServerFn({ method: "POST" })
  .validator((input: { messageId: string }) => input)
  .handler(async ({ data }): Promise<MessageResult> => {
    const result = await tool("gmail_get_message", { message_id: data.messageId });
    if (!result.ok) return failFrom(result);
    const payload = unwrapPayload(result.data);
    const rec = asRecord(payload) ?? {};
    const body =
      pickString(rec, ["body", "text", "plain", "content", "snippet"]) ||
      JSON.stringify(payload, null, 2);
    const headers = asRecord(rec.headers) ?? {};
    const headerMap: Record<string, string> = {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") headerMap[k] = v;
    }
    return { ok: true, body, headers: headerMap };
  });

export const modifyMail = createServerFn({ method: "POST" })
  .validator(
    (input: {
      messageId: string;
      add?: string[];
      remove?: string[];
    }) => input,
  )
  .handler(async ({ data }) => {
    const result = await tool("gmail_modify_labels", {
      message_id: data.messageId,
      add_label_ids: data.add ?? [],
      remove_label_ids: data.remove ?? [],
    });
    if (!result.ok) return failFrom(result);
    return { ok: true as const };
  });

export const createMailDraft = createServerFn({ method: "POST" })
  .validator(
    (input: {
      to: string;
      subject: string;
      body: string;
      messageId?: string;
      threadId?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const result = await tool("gmail_create_draft", {
      to: [data.to],
      subject: data.subject,
      body: data.body,
      ...(data.messageId ? { reply_to_message_id: data.messageId } : {}),
      ...(data.threadId ? { thread_id: data.threadId } : {}),
    });
    if (!result.ok) return failFrom(result);
    return { ok: true as const };
  });
