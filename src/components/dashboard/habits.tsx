import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOps } from "@/lib/store";
import type { Habit } from "@/lib/types";
import { cn, lastNDays, localISO, streakFrom } from "@/lib/utils";
import { useOpsUi } from "./ops-context";
import { Panel } from "./panel";

export function HabitsPanel({ className }: { className?: string }) {
  const habits = useOps((s) => s.habits);
  const toggle = useOps((s) => s.toggleHabit);
  const remove = useOps((s) => s.removeHabit);
  const ui = useOpsUi();
  const today = localISO();
  const ranked = [...habits].sort((a, b) => b.priority - a.priority).slice(0, 10);

  return (
    <Panel
      className={className}
      title="Habits"
      action={
        <Button variant="ghost" size="icon-sm" onClick={ui.openHabit}>
          <Plus className="size-4" />
          <span className="sr-only">Habit hinzufügen</span>
        </Button>
      }
    >
      <div className="flex flex-col gap-1.5">
        {ranked.length === 0 ? (
          <p className="text-sm text-muted">Noch keine Habits.</p>
        ) : (
          ranked.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              today={today}
              onToggle={() => toggle(habit.id, today)}
              onRemove={() => remove(habit.id)}
            />
          ))
        )}
      </div>
    </Panel>
  );
}

function HabitRow({
  habit,
  today,
  onToggle,
  onRemove,
}: {
  habit: Habit;
  today: string;
  onToggle: () => void;
  onRemove: () => void;
}) {
  const done = habit.checks.includes(today);
  const streak = streakFrom(habit.checks, today);
  const scale =
    habit.priority >= 5
      ? "min-h-12 py-2.5 text-sm font-medium"
      : habit.priority >= 4
        ? "min-h-11 py-2 text-sm"
        : habit.priority >= 3
          ? "min-h-11 py-1.5 text-sm"
          : "min-h-10 py-1 text-xs text-muted";

  return (
    <div
      className={cn(
        "group flex w-full items-center gap-2 rounded-md pr-1 transition-colors duration-150",
        done ? "bg-ok/10" : "bg-surface-2 hover:bg-surface-3",
        scale,
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex min-w-0 flex-1 items-center gap-3 px-2 text-left"
      >
        <span
          className={cn(
            "grid size-4 shrink-0 place-items-center rounded-full shadow-card",
            done ? "bg-ok" : "bg-surface-3",
          )}
        />
        <span className="min-w-0 flex-1 truncate">{habit.name}</span>
        <span className="font-mono text-[10px] text-subtle tabular">
          {streak}d
        </span>
        <DayStrip checks={habit.checks} />
      </button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="opacity-0 group-hover:opacity-100"
        onClick={onRemove}
      >
        <Trash2 className="size-3.5" />
        <span className="sr-only">Habit löschen</span>
      </Button>
    </div>
  );
}

function DayStrip({ checks }: { checks: string[] }) {
  const days = lastNDays(14);
  const set = new Set(checks);
  return (
    <span className="hidden items-center gap-px sm:flex" aria-hidden>
      {days.map((d, i) => (
        <span
          key={d}
          className={cn(
            "h-2 w-1 rounded-full",
            set.has(d) ? "bg-ok" : "bg-surface-3",
            i < 7 && "opacity-60",
          )}
        />
      ))}
    </span>
  );
}
