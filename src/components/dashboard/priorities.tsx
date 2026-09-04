import { Focus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOps } from "@/lib/store";
import type { Task, TaskBucket } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useOpsUi } from "./ops-context";
import { Panel } from "./panel";

function pLabel(p: number) {
  return `P${6 - p}`;
}

export function PrioritiesPanel({ className }: { className?: string }) {
  const tasks = useOps((s) => s.tasks);
  const toggle = useOps((s) => s.toggleTask);
  const remove = useOps((s) => s.removeTask);
  const ui = useOpsUi();

  const today = tasks
    .filter((t) => t.bucket === "today")
    .sort(sortTasks)
    .slice(0, 5);
  const later = tasks.filter((t) => t.bucket === "later").sort(sortTasks);
  const week = tasks.filter((t) => t.bucket === "week").sort(sortTasks);

  return (
    <Panel
      className={className}
      title="Heute · Top Prioritäten"
      action={
        <Button variant="ghost" size="icon-sm" onClick={() => ui.openTask("today")}>
          <Plus className="size-4" />
          <span className="sr-only">Task hinzufügen</span>
        </Button>
      }
    >
      <ul className="flex flex-col gap-1.5">
        {today.length === 0 ? (
          <Empty text="Keine Prioritäten für heute." />
        ) : (
          today.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              prominent
              onToggle={() => toggle(task.id)}
              onFocus={() => ui.startQuickFocus(task.minutes || 25, task.id)}
              onRemove={() => remove(task.id)}
            />
          ))
        )}
      </ul>

      <Bucket
        title="Später heute"
        items={later}
        onAdd={() => ui.openTask("later")}
        onToggle={toggle}
        onFocus={(t) => ui.startQuickFocus(t.minutes || 25, t.id)}
        onRemove={remove}
      />
      <Bucket
        title="Diese Woche"
        items={week}
        onAdd={() => ui.openTask("week")}
        onToggle={toggle}
        onFocus={(t) => ui.startQuickFocus(t.minutes || 25, t.id)}
        onRemove={remove}
      />
    </Panel>
  );
}

function sortTasks(a: Task, b: Task) {
  if (a.done !== b.done) return a.done ? 1 : -1;
  return b.priority - a.priority;
}

function Bucket({
  title,
  items,
  onAdd,
  onToggle,
  onFocus,
  onRemove,
}: {
  title: string;
  items: Task[];
  onAdd: () => void;
  onToggle: (id: string) => void;
  onFocus: (t: Task) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[11px] tracking-wide text-subtle uppercase">{title}</p>
        <button
          type="button"
          onClick={onAdd}
          className="text-[11px] text-muted hover:text-fg"
        >
          Hinzufügen
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-xs text-subtle">Nichts geplant.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {items.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={() => onToggle(task.id)}
              onFocus={() => onFocus(task)}
              onRemove={() => onRemove(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function TaskRow({
  task,
  prominent,
  onToggle,
  onFocus,
  onRemove,
}: {
  task: Task;
  prominent?: boolean;
  onToggle: () => void;
  onFocus: () => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={cn(
        "group flex min-h-11 items-center gap-2 rounded-lg bg-surface-2 px-2 py-1.5",
        prominent && "py-2",
        task.done && "opacity-50",
      )}
    >
      <Checkbox checked={task.done} onCheckedChange={onToggle} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "truncate text-sm",
            prominent && "font-medium",
            task.done && "line-through",
          )}
        >
          {task.title}
        </p>
        <p className="font-mono text-[10px] text-subtle tabular">
          {pLabel(task.priority)} · {task.minutes} min
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        className="opacity-70 group-hover:opacity-100"
        onClick={onFocus}
        title="Fokus auf diese Aufgabe starten"
      >
        <Focus className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="opacity-0 group-hover:opacity-100"
        onClick={onRemove}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </li>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-sm text-muted">{text}</p>;
}
