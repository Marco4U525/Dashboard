import { useEffect, useMemo, useState } from "react";
import { Play, Square } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useOps } from "@/lib/store";
import { cn, formatDuration } from "@/lib/utils";
import { Panel } from "./panel";

const PRESETS = [25, 50, 90];

export function FocusPanel({ className }: { className?: string }) {
  const focus = useOps((s) => s.focus);
  const tasks = useOps((s) => s.tasks);
  const startFocus = useOps((s) => s.startFocus);
  const stopFocus = useOps((s) => s.stopFocus);
  const setFocusTask = useOps((s) => s.setFocusTask);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!focus.running) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [focus.running]);

  const remaining = useMemo(() => {
    if (!focus.running || !focus.startedAt) return focus.durationSec;
    const elapsed = Math.floor((now - focus.startedAt) / 1000);
    return Math.max(0, focus.durationSec - elapsed);
  }, [focus, now]);

  useEffect(() => {
    if (!focus.running || remaining > 0) return;
    stopFocus(true);
    const task = tasks.find((t) => t.id === focus.taskId);
    toast.success("Fokus-Session beendet", {
      description: task ? task.title : "Zeit ist um.",
    });
  }, [remaining, focus.running, focus.taskId, stopFocus, tasks]);

  const openTasks = tasks
    .filter((t) => !t.done || t.id === focus.taskId)
    .sort((a, b) => Number(a.bucket !== "today") - Number(b.bucket !== "today"));
  const progress =
    focus.durationSec > 0 ? 1 - remaining / focus.durationSec : 0;

  return (
    <Panel className={className} title="Fokus & Zeit">
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-2">
        <TimerRing progress={focus.running ? progress : 0} remaining={remaining} />
        <select
          aria-label="Verknüpfter Task"
          value={focus.taskId ?? ""}
          onChange={(e) => setFocusTask(e.target.value || null)}
          className="max-w-full rounded-md bg-surface-2 px-2 py-1.5 text-center text-sm text-fg shadow-card outline-none focus-visible:ring-2 focus-visible:ring-steel/40"
        >
          <option value="">Kein Task verknüpft</option>
          {openTasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap justify-center gap-1.5">
          {PRESETS.map((m) => (
            <Button
              key={m}
              variant={
                !focus.running && focus.durationSec === m * 60
                  ? "secondary"
                  : "ghost"
              }
              size="sm"
              onClick={() => startFocus(m * 60, focus.taskId)}
            >
              {m} min
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {focus.running ? (
            <Button variant="outline" onClick={() => stopFocus(false)}>
              <Square className="size-3.5" />
              Stoppen
            </Button>
          ) : (
            <Button onClick={() => startFocus(focus.durationSec || 25 * 60, focus.taskId)}>
              <Play className="size-4" />
              Start
            </Button>
          )}
        </div>
        <div className="grid w-full grid-cols-2 gap-2 pt-1">
          <Stat label="Heute" value={formatDuration(focus.todaySec + (focus.running ? focus.durationSec - remaining : 0))} />
          <Stat label="Sessions" value={String(focus.sessionsToday)} />
        </div>
      </div>
    </Panel>
  );
}

function TimerRing({
  progress,
  remaining,
}: {
  progress: number;
  remaining: number;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const dash = c * Math.min(1, Math.max(0, progress));
  return (
    <div className="relative size-44">
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          className="stroke-surface-3"
          strokeWidth="6"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          className="stroke-accent"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <p className="font-mono text-4xl font-medium tracking-tight tabular">
          {formatDuration(remaining)}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={cn("rounded-md bg-surface-2 px-3 py-2")}>
      <p className="text-[10px] tracking-wide text-subtle uppercase">{label}</p>
      <p className="font-mono text-sm tabular">{value}</p>
    </div>
  );
}
