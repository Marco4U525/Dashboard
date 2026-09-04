import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useOps } from "@/lib/store";
import type { Goal } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useOpsUi } from "./ops-context";
import { Panel } from "./panel";

export function GoalsPanel({ className }: { className?: string }) {
  const goals = useOps((s) => s.goals);
  const remove = useOps((s) => s.removeGoal);
  const ui = useOpsUi();
  const ranked = [...goals].sort((a, b) => b.priority - a.priority).slice(0, 10);

  return (
    <Panel
      className={className}
      title="Ziele"
      action={
        <Button variant="ghost" size="icon-sm" onClick={ui.openGoal}>
          <Plus className="size-4" />
          <span className="sr-only">Ziel hinzufügen</span>
        </Button>
      }
    >
      {ranked.length === 0 ? (
        <p className="text-sm text-muted">Noch keine Ziele definiert.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ranked.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onRemove={() => remove(goal.id)} />
          ))}
        </div>
      )}
    </Panel>
  );
}

function GoalCard({ goal, onRemove }: { goal: Goal; onRemove: () => void }) {
  const prominent = goal.priority >= 4;
  return (
    <article
      className={cn(
        "group relative rounded-lg bg-surface-2 p-3",
        prominent && "sm:col-span-2",
      )}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm",
              prominent ? "font-medium" : "text-fg",
            )}
          >
            {goal.title}
          </p>
          {goal.milestone ? (
            <p className="mt-0.5 truncate text-xs text-muted">{goal.milestone}</p>
          ) : null}
        </div>
        <span className="font-mono text-sm tabular text-steel">
          {Math.round(goal.progress)}%
        </span>
      </div>
      <Progress value={goal.progress} />
      {goal.note ? (
        <p className={cn("mt-2 text-muted", prominent ? "text-sm" : "text-xs")}>
          {goal.note}
        </p>
      ) : null}
      <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100"
        onClick={onRemove}
      >
        <Trash2 className="size-3.5" />
        <span className="sr-only">Ziel löschen</span>
      </Button>
    </article>
  );
}
