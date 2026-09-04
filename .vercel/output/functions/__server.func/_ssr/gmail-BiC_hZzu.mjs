import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as isLoginRequired } from "./login-C214iVwo.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gmail-BiC_hZzu.js
var ConnectorType = {
	GoogleDrive: "GoogleDrive",
	Gmail: "Gmail",
	GoogleCalendar: "GoogleCalendar",
	Outlook: "Outlook",
	OutlookCalendar: "OutlookCalendar",
	MicrosoftTeams: "MicrosoftTeams",
	Mcp: "Mcp"
};
function classifyCallToolError(result) {
	if (result.ok) return null;
	const detail = result.errorMessage || void 0;
	const raw = (result.errorMessage ?? "").toLowerCase();
	if (isLoginRequired(result)) return {
		kind: "login",
		message: "Continue with Grok to load your data.",
		detail
	};
	if (raw.includes("not_connected") || raw.includes("failed_precondition")) return {
		kind: "not_connected",
		message: "Connect this connector in Grok to load your data.",
		detail
	};
	if (raw.includes("scope_denied")) return {
		kind: "scope_denied",
		message: "This view isn't available — the app requested a tool outside its grant.",
		detail
	};
	if (raw.includes("access_denied")) return {
		kind: "access_denied",
		message: "You don't have access to this data.",
		detail
	};
	return {
		kind: "error",
		message: detail ?? "Something went wrong. Try again.",
		detail
	};
}
var gmail_exports = /* @__PURE__ */ __exportAll({
	createMailDraft_createServerFn_handler: () => createMailDraft_createServerFn_handler,
	loadInbox_createServerFn_handler: () => loadInbox_createServerFn_handler,
	loadMailBody_createServerFn_handler: () => loadMailBody_createServerFn_handler,
	modifyMail_createServerFn_handler: () => modifyMail_createServerFn_handler
});
function asRecord(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function unwrapPayload(data) {
	if (typeof data === "string") try {
		return JSON.parse(data);
	} catch {
		return data;
	}
	const rec = asRecord(data);
	if (!rec) return data;
	if ("data" in rec && rec.data !== void 0) return rec.data;
	if ("result" in rec && rec.result !== void 0) return rec.result;
	return rec;
}
function pickString(rec, keys) {
	for (const key of keys) {
		const v = rec[key];
		if (typeof v === "string" && v.trim()) return v;
	}
	return "";
}
function extractFrom(from) {
	const match = from.match(/^(.*)<([^>]+)>$/);
	if (match) return {
		from: (match[1] || match[2]).replace(/"/g, "").trim() || match[2].trim(),
		fromEmail: match[2].trim()
	};
	return {
		from: from || "Unbekannt",
		fromEmail: from
	};
}
function labelsOf(rec) {
	const raw = rec.labelIds ?? rec.label_ids ?? rec.labels ?? [];
	if (!Array.isArray(raw)) return [];
	return raw.map((x) => String(x).toUpperCase());
}
function parseMessage(item) {
	const rec = asRecord(item);
	if (!rec) return null;
	const nested = asRecord(rec.message) ?? rec;
	const id = pickString(nested, [
		"id",
		"message_id",
		"messageId"
	]);
	if (!id) return null;
	const { from, fromEmail } = extractFrom(pickString(nested, [
		"from",
		"sender",
		"from_email",
		"fromEmail"
	]));
	const labels = labelsOf(nested);
	const unreadFlag = nested.unread ?? nested.is_unread ?? nested.isUnread;
	const starredFlag = nested.starred ?? nested.is_starred ?? nested.isStarred;
	const importantFlag = nested.important ?? nested.is_important;
	return {
		id,
		threadId: pickString(nested, [
			"threadId",
			"thread_id",
			"thread"
		]) || id,
		from,
		fromEmail,
		subject: pickString(nested, ["subject", "title"]) || "(kein Betreff)",
		snippet: pickString(nested, [
			"snippet",
			"preview",
			"snippet_text",
			"body_preview",
			"text"
		]),
		date: pickString(nested, [
			"date",
			"internalDate",
			"timestamp",
			"received"
		]),
		unread: typeof unreadFlag === "boolean" ? unreadFlag : labels.includes("UNREAD"),
		starred: typeof starredFlag === "boolean" ? starredFlag : labels.includes("STARRED"),
		important: typeof importantFlag === "boolean" ? importantFlag : labels.includes("IMPORTANT"),
		rfcMessageId: pickString(nested, ["rfc_message_id", "rfcMessageId"]) || void 0
	};
}
function collectMessages(payload) {
	const data = unwrapPayload(payload);
	const rec = asRecord(data);
	const candidates = [
		data,
		rec?.messages,
		rec?.emails,
		rec?.threads,
		rec?.results,
		rec?.items
	];
	const list = [];
	for (const c of candidates) if (Array.isArray(c)) {
		list.push(...c);
		break;
	}
	if (list.length === 0 && rec) {
		const maybe = parseMessage(rec);
		return maybe ? [maybe] : [];
	}
	return list.map(parseMessage).filter((m) => Boolean(m));
}
async function tool(name, args) {
	const { callTool } = await import("./client.server-QR8sg1f8.mjs");
	return callTool(name, args, { connectorType: ConnectorType.Gmail });
}
function failFrom(result) {
	const classified = classifyCallToolError({
		ok: false,
		data: null,
		errorMessage: result.errorMessage,
		loginRequired: result.loginRequired ?? isLoginRequired({
			ok: false,
			data: null,
			loginRequired: result.loginRequired,
			errorMessage: result.errorMessage,
			loginUrl: result.loginUrl
		}),
		loginUrl: result.loginUrl
	});
	return {
		ok: false,
		kind: classified?.kind ?? "error",
		message: classified?.message ?? "Gmail ist gerade nicht erreichbar.",
		loginUrl: result.loginUrl
	};
}
var loadInbox_createServerFn_handler = createServerRpc({
	id: "889fc8aa564a03c35d876120737c23155761b0eb249dfe15ff69ac4f37920b04",
	name: "loadInbox",
	filename: "src/lib/gmail.ts"
}, (opts) => loadInbox.__executeServer(opts));
var loadInbox = createServerFn({ method: "POST" }).handler(loadInbox_createServerFn_handler, async () => {
	const result = await tool("gmail_search", {
		query: "(is:unread OR is:important) in:inbox",
		max_results: 18
	});
	if (!result.ok) return failFrom(result);
	return {
		ok: true,
		messages: collectMessages(result.data).filter((m) => m.unread || m.important)
	};
});
var loadMailBody_createServerFn_handler = createServerRpc({
	id: "3eb257bd56dae56a0ed2512107d1a4455cb44b2d056170c539f7ba786750735b",
	name: "loadMailBody",
	filename: "src/lib/gmail.ts"
}, (opts) => loadMailBody.__executeServer(opts));
var loadMailBody = createServerFn({ method: "POST" }).validator((input) => input).handler(loadMailBody_createServerFn_handler, async ({ data }) => {
	const result = await tool("gmail_get_message", { message_id: data.messageId });
	if (!result.ok) return failFrom(result);
	const payload = unwrapPayload(result.data);
	const rec = asRecord(payload) ?? {};
	const body = pickString(rec, [
		"body",
		"text",
		"plain",
		"content",
		"snippet"
	]) || JSON.stringify(payload, null, 2);
	const headers = asRecord(rec.headers) ?? {};
	const headerMap = {};
	for (const [k, v] of Object.entries(headers)) if (typeof v === "string") headerMap[k] = v;
	return {
		ok: true,
		body,
		headers: headerMap
	};
});
var modifyMail_createServerFn_handler = createServerRpc({
	id: "202c4c58366aa87a4a97ba717d9da279e4f0bcf57796e5ad232cbcd8e2618cd0",
	name: "modifyMail",
	filename: "src/lib/gmail.ts"
}, (opts) => modifyMail.__executeServer(opts));
var modifyMail = createServerFn({ method: "POST" }).validator((input) => input).handler(modifyMail_createServerFn_handler, async ({ data }) => {
	const result = await tool("gmail_modify_labels", {
		message_id: data.messageId,
		add_label_ids: data.add ?? [],
		remove_label_ids: data.remove ?? []
	});
	if (!result.ok) return failFrom(result);
	return { ok: true };
});
var createMailDraft_createServerFn_handler = createServerRpc({
	id: "d3f278e06aa3050652eeafb59075878059fd2c3f9ed23b802f5c0cfd73cd9157",
	name: "createMailDraft",
	filename: "src/lib/gmail.ts"
}, (opts) => createMailDraft.__executeServer(opts));
var createMailDraft = createServerFn({ method: "POST" }).validator((input) => input).handler(createMailDraft_createServerFn_handler, async ({ data }) => {
	const result = await tool("gmail_create_draft", {
		to: [data.to],
		subject: data.subject,
		body: data.body,
		...data.messageId ? { reply_to_message_id: data.messageId } : {},
		...data.threadId ? { thread_id: data.threadId } : {}
	});
	if (!result.ok) return failFrom(result);
	return { ok: true };
});
//#endregion
export { ConnectorType as r, gmail_exports as t };
