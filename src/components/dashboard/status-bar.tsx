import { useEffect, useState } from "react";
import {
  Focus,
  ListPlus,
  NotebookPen,
  RefreshCw,
  SquareCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOps } from "@/lib/store";
import { formatClock, formatDateLong, localISO } from "@/lib/utils";
import { useOpsUi } from "./ops-context";

export function StatusBar({
  unreadCount,
  refreshing,
}: {
  unreadCount: number | null;
  refreshing: boolean;
}) {
  const [now, setNow] = useState(() => new Date());
  const tasks = useOps((s) => s.tasks);
  const habits = useOps((s) => s.habits);
  const focus = useOps((s) => s.focus);
  const ui = useOpsUi();
  const today = localISO(now);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const openPri = tasks.filter((t) => t.bucket === "today" && !t.done).length;
  const openHabits = habits.filter((h) => !h.checks.includes(today)).length;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-end gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-steel uppercase">
              Nexus
            </p>
            <p className="font-mono text-2xl leading-none font-medium tabular tracking-tight sm:text-3xl">
              {formatClock(now)}
            </p>
          </div>
          <p className="pb-0.5 text-sm text-muted capitalize">
            {formatDateLong(now)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <StatusChip
            label={`${openPri} Prioritäten offen`}
            tone={openPri === 0 ? "ok" : "warn"}
          />
          <StatusChip
            label={`${openHabits} Habits offen`}
            tone={openHabits === 0 ? "ok" : "default"}
          />
          <StatusChip
            label={
              unreadCount == null
                ? "Mails …"
                : `${unreadCount} wichtige ungelesen`
            }
            tone={unreadCount && unreadCount > 0 ? "info" : "default"}
          />
          <StatusChip
            label={focus.running ? "Fokus aktiv" : "Fokus idle"}
            tone={focus.running ? "ok" : "default"}
          />
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => ui.openTask()}>
            <ListPlus className="size-4" />
            <span className="hidden sm:inline">Neuer Task</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={ui.openHabitCheck}>
            <SquareCheck className="size-4" />
            <span className="hidden sm:inline">Habit abhaken</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => ui.startQuickFocus(25)}
          >
            <Focus className="size-4" />
            <span className="hidden sm:inline">Fokus starten</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={ui.focusCapture}>
            <NotebookPen className="size-4" />
            <span className="hidden sm:inline">Notiz</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={ui.refreshAll}
            disabled={refreshing}
          >
            <RefreshCw className={`size-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Aktualisieren</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

function StatusChip({
  label,
  tone,
}: {
  label: string;
  tone: "ok" | "warn" | "info" | "default";
}) {
  const toneClass =
    tone === "ok"
      ? "text-ok"
      : tone === "warn"
        ? "text-warn"
        : tone === "info"
          ? "text-info"
          : "text-muted";
  const dot =
    tone === "ok"
      ? "bg-ok"
      : tone === "warn"
        ? "bg-warn"
        : tone === "info"
          ? "bg-info"
          : "bg-subtle";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11px] shadow-card ${toneClass}`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
