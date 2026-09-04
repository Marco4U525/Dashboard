import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Archive,
  Mail,
  MailOpen,
  Star,
  Reply,
} from "lucide-react";
import { toast } from "sonner";
import { redirectToLoginIfRequired } from "@/lib/app-data";
import { createMailDraft, loadMailBody, modifyMail } from "@/lib/gmail";
import type { MailErrorKind, MailMessage } from "@/lib/types";
import { cn, formatTimeShort, localISO } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Panel } from "./panel";

export function InboxPanel({
  className,
  messages,
  error,
  loginUrl,
  loading,
  onChanged,
}: {
  className?: string;
  messages: MailMessage[];
  error: { kind: MailErrorKind; message: string } | null;
  loginUrl?: string;
  loading: boolean;
  onChanged: () => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<MailMessage | null>(null);
  const [draft, setDraft] = useState("");
  const [body, setBody] = useState<string | null>(null);

  const modify = useMutation({
    mutationFn: (input: {
      data: { messageId: string; add?: string[]; remove?: string[] };
    }) => modifyMail(input),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(res.message);
        if (res.loginUrl) {
          redirectToLoginIfRequired({
            ok: false,
            data: null,
            loginRequired: res.kind === "login",
            loginUrl: res.loginUrl,
            errorMessage: res.message,
          });
        }
        return;
      }
      onChanged();
    },
  });

  const loadBody = useMutation({
    mutationFn: (id: string) => loadMailBody({ data: { messageId: id } }),
    onSuccess: (res) => {
      if (!res.ok) {
        setBody(res.message);
        return;
      }
      setBody(res.body);
    },
  });

  const saveDraft = useMutation({
    mutationFn: (input: {
      data: {
        to: string;
        subject: string;
        body: string;
        messageId?: string;
        threadId?: string;
      };
    }) => createMailDraft(input),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(res.message);
        return;
      }
      toast.success("Antwort als Entwurf gespeichert");
      setReplyTo(null);
      setDraft("");
    },
  });

  function openMail(m: MailMessage) {
    setOpenId(m.id);
    setBody(null);
    loadBody.mutate(m.id);
  }

  return (
    <Panel
      className={className}
      title="Gmail · Ungelesen & Wichtig"
      action={
        <span className="font-mono text-[11px] text-subtle tabular">
          {messages.length}
        </span>
      }
    >
      {error ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-3 py-6">
          <Mail className="size-5 text-muted" />
          <p className="text-sm text-muted">{error.message}</p>
          {loginUrl && error.kind === "login" ? (
            <Button
              size="sm"
              onClick={() =>
                redirectToLoginIfRequired({
                  ok: false,
                  data: null,
                  loginRequired: true,
                  loginUrl,
                  errorMessage: error.message,
                })
              }
            >
              Mit Grok fortfahren
            </Button>
          ) : null}
        </div>
      ) : loading && messages.length === 0 ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-md bg-surface-2" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <p className="py-8 text-sm text-muted">Inbox ruhig. Nichts Wichtiges offen.</p>
      ) : (
        <ul className="flex flex-col gap-1 overflow-auto">
          {messages.map((m) => (
            <li key={m.id} className="group rounded-md hover:bg-surface-2">
              <div className="flex items-start gap-1">
                <button
                  type="button"
                  onClick={() => openMail(m)}
                  className="flex min-w-0 flex-1 gap-3 px-2 py-2 text-left"
                >
                  <span
                    className={cn(
                      "mt-1 size-1.5 shrink-0 rounded-full",
                      m.unread ? "bg-info" : "bg-subtle",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium">{m.from}</span>
                      <span className="font-mono text-[10px] text-subtle tabular">
                        {formatMailDate(m.date)}
                      </span>
                    </span>
                    <span className="block truncate text-sm text-fg/90">{m.subject}</span>
                    <span className="block truncate text-xs text-muted">{m.snippet}</span>
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-0.5 py-1 pr-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title={m.unread ? "Gelesen" : "Ungelesen"}
                    onClick={() =>
                      modify.mutate({
                        data: {
                          messageId: m.id,
                          remove: m.unread ? ["UNREAD"] : undefined,
                          add: m.unread ? undefined : ["UNREAD"],
                        },
                      })
                    }
                  >
                    {m.unread ? (
                      <MailOpen className="size-3.5" />
                    ) : (
                      <Mail className="size-3.5" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Archiv"
                    onClick={() =>
                      modify.mutate({
                        data: { messageId: m.id, remove: ["INBOX"] },
                      })
                    }
                  >
                    <Archive className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Stern"
                    onClick={() =>
                      modify.mutate({
                        data: {
                          messageId: m.id,
                          add: m.starred ? undefined : ["STARRED"],
                          remove: m.starred ? ["STARRED"] : undefined,
                        },
                      })
                    }
                  >
                    <Star className={cn("size-3.5", m.starred && "fill-warn text-warn")} />
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Sheet open={Boolean(openId)} onOpenChange={(o: boolean) => !o && setOpenId(null)}>
        <SheetContent className="p-0">
          {(() => {
            const mail = messages.find((x) => x.id === openId);
            if (!mail) return null;
            return (
              <>
                <SheetHeader>
                  <SheetTitle>{mail.subject}</SheetTitle>
                  <p className="text-sm text-muted">
                    {mail.from}
                    {mail.fromEmail ? ` · ${mail.fromEmail}` : ""}
                  </p>
                </SheetHeader>
                <div className="flex gap-1 px-5">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      modify.mutate({
                        data: {
                          messageId: mail.id,
                          remove: mail.unread ? ["UNREAD"] : undefined,
                          add: mail.unread ? undefined : ["UNREAD"],
                        },
                      })
                    }
                  >
                    {mail.unread ? (
                      <MailOpen className="size-4" />
                    ) : (
                      <Mail className="size-4" />
                    )}
                    {mail.unread ? "Gelesen" : "Ungelesen"}
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      modify.mutate({
                        data: { messageId: mail.id, remove: ["INBOX"] },
                      })
                    }
                  >
                    <Archive className="size-4" />
                    Archiv
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      modify.mutate({
                        data: {
                          messageId: mail.id,
                          add: mail.starred ? undefined : ["STARRED"],
                          remove: mail.starred ? ["STARRED"] : undefined,
                        },
                      })
                    }
                  >
                    <Star className={cn("size-4", mail.starred && "fill-warn text-warn")} />
                    Stern
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setReplyTo(mail);
                      setDraft("");
                    }}
                  >
                    <Reply className="size-4" />
                    Entwurf
                  </Button>
                </div>
                <div className="flex-1 overflow-auto px-5 py-4 text-sm whitespace-pre-wrap text-muted">
                  {body ?? mail.snippet}
                </div>
              </>
            );
          })()}
        </SheetContent>
      </Sheet>

      <Dialog open={Boolean(replyTo)} onOpenChange={(o: boolean) => !o && setReplyTo(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schnellantwort</DialogTitle>
            <DialogDescription>
              Wird als Gmail-Entwurf gespeichert, nicht gesendet.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted">An {replyTo?.from}</p>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Antwort …"
            rows={6}
          />
          <Button
            disabled={!draft.trim() || saveDraft.isPending}
            onClick={() => {
              if (!replyTo) return;
              saveDraft.mutate({
                data: {
                  to: replyTo.fromEmail || replyTo.from,
                  subject: replyTo.subject.startsWith("Re:")
                    ? replyTo.subject
                    : `Re: ${replyTo.subject}`,
                  body: draft,
                  messageId: replyTo.id,
                  threadId: replyTo.threadId,
                },
              });
            }}
          >
            Entwurf speichern
          </Button>
        </DialogContent>
      </Dialog>
    </Panel>
  );
}

function formatMailDate(raw: string) {
  if (!raw) return "";
  const n = Number(raw);
  const d =
    Number.isFinite(n) && n > 1e12
      ? new Date(n)
      : Number.isFinite(n) && n > 1e9
        ? new Date(n * 1000)
        : new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  if (localISO(d) === localISO()) return formatTimeShort(d);
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "short",
  }).format(d);
}
