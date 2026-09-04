import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadInbox } from "@/lib/gmail";
import { fetchQuotes } from "@/lib/market";
import { useOps } from "@/lib/store";
import type { MailErrorKind, MailMessage, TaskBucket } from "@/lib/types";
import { CapturePanel } from "./capture";
import { CommandDialogs, type DialogState } from "./command-dialogs";
import { FinancePanel } from "./finance";
import { FocusPanel } from "./focus-timer";
import { GoalsPanel } from "./goals";
import { HabitsPanel } from "./habits";
import { InboxPanel } from "./inbox";
import { OpsUiContext, type OpsUi } from "./ops-context";
import { PrioritiesPanel } from "./priorities";
import { StatusBar } from "./status-bar";

export function Dashboard() {
  const holdings = useOps((s) => s.holdings);
  const startFocus = useOps((s) => s.startFocus);
  const tickFocusDay = useOps((s) => s.tickFocusDay);
  const [dialog, setDialog] = useState<DialogState>({ type: "none" });

  const tickers = useMemo(
    () => holdings.map((h) => h.ticker).filter(Boolean),
    [holdings],
  );

  const inboxQuery = useQuery({
    queryKey: ["inbox"],
    queryFn: () => loadInbox(),
    refetchInterval: (q) =>
      q.state.data && q.state.data.ok === false ? false : 90_000,
  });

  const quotesQuery = useQuery({
    queryKey: ["quotes", tickers],
    queryFn: () => fetchQuotes({ data: { tickers } }),
    enabled: tickers.length > 0,
    refetchInterval: 60_000,
  });

  useEffect(() => {
    const id = window.setInterval(() => tickFocusDay(), 60_000);
    return () => window.clearInterval(id);
  }, [tickFocusDay]);

  const ui = useMemo<OpsUi>(
    () => ({
      openTask: (bucket: TaskBucket = "today") =>
        setDialog({ type: "task", bucket }),
      openHabit: () => setDialog({ type: "habit" }),
      openHabitCheck: () => setDialog({ type: "habit-check" }),
      openGoal: () => setDialog({ type: "goal" }),
      openHolding: (id) => setDialog({ type: "holding", id }),
      startQuickFocus: (minutes = 25, taskId) => {
        startFocus(minutes * 60, taskId);
      },
      focusCapture: () => {
        const el = document.getElementById("quick-capture");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (el instanceof HTMLTextAreaElement) el.focus();
      },
      refreshAll: () => {
        void inboxQuery.refetch();
        void quotesQuery.refetch();
      },
    }),
    [inboxQuery, quotesQuery, startFocus],
  );

  const messages: MailMessage[] =
    inboxQuery.data && inboxQuery.data.ok ? inboxQuery.data.messages : [];
  const mailError =
    inboxQuery.data && !inboxQuery.data.ok
      ? {
          kind: inboxQuery.data.kind as MailErrorKind,
          message: germanMailError(
            inboxQuery.data.kind,
            inboxQuery.data.message,
          ),
        }
      : inboxQuery.isError
        ? { kind: "error" as const, message: "Gmail ist gerade nicht erreichbar." }
        : null;
  const loginUrl =
    inboxQuery.data && !inboxQuery.data.ok ? inboxQuery.data.loginUrl : undefined;
  const unreadCount =
    inboxQuery.data && inboxQuery.data.ok
      ? messages.filter((m) => m.unread).length
      : null;

  return (
    <OpsUiContext.Provider value={ui}>
      <div className="flex min-h-dvh flex-col">
        <StatusBar
          unreadCount={unreadCount}
          refreshing={inboxQuery.isFetching || quotesQuery.isFetching}
        />
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-3 pb-8 sm:px-6 lg:py-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
            <PrioritiesPanel className="lg:col-span-4 lg:row-span-2 min-h-80" />
            <FocusPanel className="lg:col-span-4 min-h-80" />
            <HabitsPanel className="lg:col-span-4 min-h-80" />
            <InboxPanel
              className="lg:col-span-5 min-h-96"
              messages={messages}
              error={mailError}
              loginUrl={loginUrl}
              loading={inboxQuery.isPending}
              onChanged={() => void inboxQuery.refetch()}
            />
            <FinancePanel
              className="lg:col-span-7 min-h-96"
              quotes={quotesQuery.data ?? []}
              loading={quotesQuery.isPending}
            />
            <GoalsPanel className="lg:col-span-8" />
            <CapturePanel className="lg:col-span-4" />
          </div>
        </main>
      </div>
      <CommandDialogs
        state={dialog}
        onClose={() => setDialog({ type: "none" })}
      />
    </OpsUiContext.Provider>
  );
}

function germanMailError(kind: MailErrorKind, fallback: string) {
  switch (kind) {
    case "login":
      return "Mit Grok fortfahren, um Gmail zu laden.";
    case "not_connected":
      return "Gmail in Grok verbinden, dann aktualisieren.";
    case "scope_denied":
      return "Gmail-Berechtigung fehlt für diese Ansicht.";
    case "access_denied":
      return "Kein Zugriff auf die Inbox.";
    default:
      return fallback || "Gmail ist gerade nicht erreichbar.";
  }
}
