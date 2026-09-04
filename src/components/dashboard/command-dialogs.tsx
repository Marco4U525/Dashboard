import { useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useOps } from "@/lib/store";
import type { Holding, Priority, TaskBucket } from "@/lib/types";
import { cn, localISO } from "@/lib/utils";

export type DialogState =
  | { type: "none" }
  | { type: "task"; bucket: TaskBucket }
  | { type: "habit" }
  | { type: "habit-check" }
  | { type: "goal" }
  | { type: "holding"; id?: string };

export function CommandDialogs({
  state,
  onClose,
}: {
  state: DialogState;
  onClose: () => void;
}) {
  return (
    <>
      <TaskDialog
        open={state.type === "task"}
        bucket={state.type === "task" ? state.bucket : "today"}
        onClose={onClose}
      />
      <HabitDialog open={state.type === "habit"} onClose={onClose} />
      <GoalDialog open={state.type === "goal"} onClose={onClose} />
      <HoldingDialog
        open={state.type === "holding"}
        id={state.type === "holding" ? state.id : undefined}
        onClose={onClose}
      />
      <HabitCheckSheet open={state.type === "habit-check"} onClose={onClose} />
    </>
  );
}

function FieldSelect({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-10 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-card outline-none focus-visible:ring-2 focus-visible:ring-steel/40"
    >
      {children}
    </select>
  );
}

function TaskDialog({
  open,
  bucket,
  onClose,
}: {
  open: boolean;
  bucket: TaskBucket;
  onClose: () => void;
}) {
  const add = useOps((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [where, setWhere] = useState<TaskBucket>(bucket);
  const [priority, setPriority] = useState<Priority>(5);
  const [minutes, setMinutes] = useState(25);

  useEffect(() => {
    if (open) {
      setTitle("");
      setWhere(bucket);
      setPriority(5);
      setMinutes(25);
    }
  }, [open, bucket]);

  function submit() {
    if (!title.trim()) return;
    add({ title, bucket: where, priority, minutes: Math.max(5, minutes) });
    toast.success("Task angelegt");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuer Task</DialogTitle>
          <DialogDescription>Landet in der Prioritätenliste.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="task-title">Titel</Label>
            <Input
              id="task-title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Was ist wichtig?"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="task-bucket">Wann</Label>
              <FieldSelect
                id="task-bucket"
                value={where}
                onChange={(v) => setWhere(v as TaskBucket)}
              >
                <option value="today">Heute</option>
                <option value="later">Später</option>
                <option value="week">Diese Woche</option>
              </FieldSelect>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="task-pri">Priorität</Label>
              <FieldSelect
                id="task-pri"
                value={String(priority)}
                onChange={(v) => setPriority(Number(v) as Priority)}
              >
                <PriorityOptions />
              </FieldSelect>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="task-min">Minuten</Label>
              <Input
                id="task-min"
                type="number"
                min={5}
                step={5}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value) || 25)}
              />
            </div>
          </div>
          <Button type="submit" disabled={!title.trim()}>
            Anlegen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HabitDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const add = useOps((s) => s.addHabit);
  const count = useOps((s) => s.habits.length);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<Priority>(4);

  useEffect(() => {
    if (open) {
      setName("");
      setPriority(4);
    }
  }, [open]);

  function submit() {
    if (!name.trim()) return;
    if (count >= 10) {
      toast.error("Maximal 10 Habits.");
      return;
    }
    add(name, priority);
    toast.success("Habit angelegt");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Habit</DialogTitle>
          <DialogDescription>Höhere Priorität erscheint größer.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="habit-name">Name</Label>
            <Input
              id="habit-name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z. B. Training"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="habit-pri">Priorität</Label>
            <FieldSelect
              id="habit-pri"
              value={String(priority)}
              onChange={(v) => setPriority(Number(v) as Priority)}
            >
              <PriorityOptions />
            </FieldSelect>
          </div>
          <Button type="submit" disabled={!name.trim()}>
            Anlegen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function GoalDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const add = useOps((s) => s.addGoal);
  const count = useOps((s) => s.goals.length);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>(4);
  const [progress, setProgress] = useState(0);
  const [milestone, setMilestone] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setTitle("");
      setPriority(4);
      setProgress(0);
      setMilestone("");
      setNote("");
    }
  }, [open]);

  function submit() {
    if (!title.trim()) return;
    if (count >= 10) {
      toast.error("Maximal 10 Ziele.");
      return;
    }
    add({ title, priority, progress, milestone, note });
    toast.success("Ziel angelegt");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neues Ziel</DialogTitle>
          <DialogDescription>Fortschritt und nächster Meilenstein.</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid gap-1.5">
            <Label htmlFor="goal-title">Titel</Label>
            <Input
              id="goal-title"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="goal-pri">Priorität</Label>
              <FieldSelect
                id="goal-pri"
                value={String(priority)}
                onChange={(v) => setPriority(Number(v) as Priority)}
              >
                <PriorityOptions />
              </FieldSelect>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="goal-prog">Fortschritt {progress}%</Label>
              <input
                id="goal-prog"
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="h-10 w-full accent-accent"
              />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="goal-ms">Nächster Meilenstein</Label>
            <Input
              id="goal-ms"
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="goal-note">Notiz</Label>
            <Textarea
              id="goal-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!title.trim()}>
            Anlegen
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HoldingDialog({
  open,
  id,
  onClose,
}: {
  open: boolean;
  id?: string;
  onClose: () => void;
}) {
  const holdings = useOps((s) => s.holdings);
  const upsert = useOps((s) => s.upsertHolding);
  const remove = useOps((s) => s.removeHolding);
  const existing = useMemo(
    () => holdings.find((h) => h.id === id) ?? null,
    [holdings, id],
  );
  const [ticker, setTicker] = useState("");
  const [name, setName] = useState("");
  const [shares, setShares] = useState("0");
  const [avgCost, setAvgCost] = useState("0");

  useEffect(() => {
    if (!open) return;
    const h: Holding | null = existing;
    setTicker(h?.ticker ?? "");
    setName(h?.name ?? "");
    setShares(h ? String(h.shares) : "0");
    setAvgCost(h ? String(h.avgCost) : "0");
  }, [open, existing]);

  function submit() {
    if (!ticker.trim()) return;
    upsert({
      id: existing?.id,
      ticker,
      name,
      shares: Number(shares) || 0,
      avgCost: Number(avgCost.replace(",", ".")) || 0,
    });
    toast.success(existing ? "Position aktualisiert" : "Position gespeichert");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{existing ? "Position bearbeiten" : "Position / Ticker"}</DialogTitle>
          <DialogDescription>
            Stückzahl 0 legt nur eine Watchlist-Position an.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="h-ticker">Ticker</Label>
              <Input
                id="h-ticker"
                autoFocus
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="NVDA"
                className="font-mono uppercase"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="h-name">Name</Label>
              <Input
                id="h-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="optional"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="h-shares">Stück</Label>
              <Input
                id="h-shares"
                type="number"
                min={0}
                step="any"
                value={shares}
                onChange={(e) => setShares(e.target.value)}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="h-cost">Einstieg</Label>
              <Input
                id="h-cost"
                type="number"
                min={0}
                step="any"
                value={avgCost}
                onChange={(e) => setAvgCost(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={!ticker.trim()}>
              Speichern
            </Button>
            {existing ? (
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  remove(existing.id);
                  toast.message("Position entfernt");
                  onClose();
                }}
              >
                Löschen
              </Button>
            ) : null}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HabitCheckSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const habits = useOps((s) => s.habits);
  const toggle = useOps((s) => s.toggleHabit);
  const today = localISO();
  const openHabits = [...habits]
    .sort((a, b) => b.priority - a.priority)
    .filter((h) => !h.checks.includes(today));

  return (
    <Sheet open={open} onOpenChange={(o: boolean) => !o && onClose()}>
      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>Habits abhaken</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 overflow-auto px-5 pb-6">
          {openHabits.length === 0 ? (
            <p className="text-sm text-muted">Alles erledigt für heute.</p>
          ) : (
            openHabits.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => toggle(h.id, today)}
                className={cn(
                  "min-h-11 rounded-lg bg-surface-2 px-3 py-3 text-left text-sm hover:bg-surface-3",
                  h.priority >= 4 && "font-medium",
                )}
              >
                {h.name}
              </button>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function PriorityOptions() {
  return (
    <>
      <option value="5">Kritisch</option>
      <option value="4">Hoch</option>
      <option value="3">Mittel</option>
      <option value="2">Niedrig</option>
      <option value="1">Neben</option>
    </>
  );
}
