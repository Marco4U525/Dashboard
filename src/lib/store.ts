import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  CaptureItem,
  Goal,
  Habit,
  Holding,
  Priority,
  StockAnalysis,
  Task,
  TaskBucket,
} from "./types";
import { daysAgoISO, localISO, uid } from "./utils";

type FocusSnapshot = {
  running: boolean;
  durationSec: number;
  startedAt: number | null;
  taskId: string | null;
  todaySec: number;
  todayDate: string;
  sessionsToday: number;
};

type OpsState = {
  hydrated: boolean;
  tasks: Task[];
  habits: Habit[];
  goals: Goal[];
  captures: CaptureItem[];
  holdings: Holding[];
  analyses: Record<string, StockAnalysis>;
  focus: FocusSnapshot;
  markHydrated: () => void;
  addTask: (input: {
    title: string;
    bucket: TaskBucket;
    priority: Priority;
    minutes: number;
  }) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addHabit: (name: string, priority: Priority) => void;
  toggleHabit: (id: string, day?: string) => void;
  removeHabit: (id: string) => void;
  addGoal: (input: {
    title: string;
    priority: Priority;
    progress: number;
    milestone: string;
    note: string;
  }) => void;
  updateGoal: (id: string, patch: Partial<Omit<Goal, "id">>) => void;
  removeGoal: (id: string) => void;
  addCapture: (text: string) => void;
  promoteCapture: (id: string, title: string) => void;
  removeCapture: (id: string) => void;
  upsertHolding: (input: {
    id?: string;
    ticker: string;
    name: string;
    shares: number;
    avgCost: number;
  }) => void;
  removeHolding: (id: string) => void;
  setAnalysis: (analysis: StockAnalysis) => void;
  startFocus: (durationSec: number, taskId?: string | null) => void;
  stopFocus: (complete?: boolean) => void;
  tickFocusDay: () => void;
  setFocusTask: (taskId: string | null) => void;
};

function seedChecks(pattern: boolean[]) {
  return pattern
    .map((on, i) => (on ? daysAgoISO(pattern.length - 1 - i) : null))
    .filter((x): x is string => Boolean(x));
}

const seedTasks: Task[] = [
  {
    id: "t1",
    title: "Quartalsreview vorbereiten",
    bucket: "today",
    priority: 5,
    minutes: 90,
    done: false,
    createdAt: Date.now() - 86400000,
  },
  {
    id: "t2",
    title: "Portfolio-Rebalancing prüfen",
    bucket: "today",
    priority: 4,
    minutes: 40,
    done: false,
    createdAt: Date.now() - 72000000,
  },
  {
    id: "t3",
    title: "Deep-Work: Strategiepapier",
    bucket: "today",
    priority: 5,
    minutes: 50,
    done: false,
    createdAt: Date.now() - 36000000,
  },
  {
    id: "t4",
    title: "Team-Sync vorbereiten",
    bucket: "later",
    priority: 3,
    minutes: 25,
    done: false,
    createdAt: Date.now() - 18000000,
  },
  {
    id: "t5",
    title: "Steuerunterlagen sichten",
    bucket: "week",
    priority: 3,
    minutes: 60,
    done: false,
    createdAt: Date.now() - 9000000,
  },
  {
    id: "t6",
    title: "Investor-Update skizzieren",
    bucket: "week",
    priority: 2,
    minutes: 45,
    done: false,
    createdAt: Date.now() - 8000000,
  },
];

const seedHabits: Habit[] = [
  {
    id: "h1",
    name: "Training",
    priority: 5,
    checks: seedChecks([1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1].map(Boolean)),
  },
  {
    id: "h2",
    name: "Deep Work",
    priority: 5,
    checks: seedChecks([1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0].map(Boolean)),
  },
  {
    id: "h3",
    name: "Lesen",
    priority: 4,
    checks: seedChecks([1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1].map(Boolean)),
  },
  {
    id: "h4",
    name: "Meditation",
    priority: 3,
    checks: seedChecks([1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0].map(Boolean)),
  },
  {
    id: "h5",
    name: "Journaling",
    priority: 3,
    checks: seedChecks([0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0].map(Boolean)),
  },
  {
    id: "h6",
    name: "Schlafen vor 23:00",
    priority: 4,
    checks: seedChecks([1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1].map(Boolean)),
  },
  {
    id: "h7",
    name: "Kein Zucker",
    priority: 2,
    checks: seedChecks([1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0].map(Boolean)),
  },
  {
    id: "h8",
    name: "Wasser 3L",
    priority: 2,
    checks: seedChecks([1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1].map(Boolean)),
  },
];

const seedGoals: Goal[] = [
  {
    id: "g1",
    title: "Notgroschen: 6 Monate Fixkosten",
    priority: 5,
    progress: 68,
    milestone: "Nächste Tranche 2.500 € bis Monatsende",
    note: "Liquidität vor neuen Positionen.",
  },
  {
    id: "g2",
    title: "5k unter 22:00",
    priority: 4,
    progress: 54,
    milestone: "Intervall-Einheit Donnerstag",
    note: "Aktuell 22:48 auf der Rundstrecke.",
  },
  {
    id: "g3",
    title: "Side-Project MVP",
    priority: 4,
    progress: 41,
    milestone: "Onboarding-Flow fertigstellen",
    note: "Zwei offene Tickets in der Capture-Inbox.",
  },
  {
    id: "g4",
    title: "Quartalsziel Pipeline",
    priority: 3,
    progress: 73,
    milestone: "Drei Discovery-Calls diese Woche",
    note: "Fokus auf bestehende Accounts.",
  },
];

const seedHoldings: Holding[] = [
  { id: "p1", ticker: "NVDA", name: "NVIDIA", shares: 18, avgCost: 142.5 },
  { id: "p2", ticker: "AAPL", name: "Apple", shares: 25, avgCost: 189 },
  { id: "p3", ticker: "MSFT", name: "Microsoft", shares: 12, avgCost: 378 },
  { id: "p4", ticker: "TSLA", name: "Tesla", shares: 20, avgCost: 248 },
  { id: "p5", ticker: "SAP.DE", name: "SAP", shares: 15, avgCost: 210 },
  { id: "p6", ticker: "RHM.DE", name: "Rheinmetall", shares: 4, avgCost: 1280 },
  { id: "p7", ticker: "GOOGL", name: "Alphabet", shares: 0, avgCost: 0 },
  { id: "p8", ticker: "ASML", name: "ASML", shares: 0, avgCost: 0 },
];

const emptyFocus = (): FocusSnapshot => ({
  running: false,
  durationSec: 25 * 60,
  startedAt: null,
  taskId: null,
  todaySec: 0,
  todayDate: localISO(),
  sessionsToday: 0,
});

export const useOps = create<OpsState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      tasks: seedTasks,
      habits: seedHabits,
      goals: seedGoals,
      captures: [
        {
          id: "c1",
          text: "Idee: wöchentliches Risk-Review für das Portfolio, 20 Minuten, montags.",
          createdAt: Date.now() - 4200000,
        },
      ],
      holdings: seedHoldings,
      analyses: {},
      focus: emptyFocus(),
      markHydrated: () => set({ hydrated: true }),
      addTask: (input) =>
        set((s) => ({
          tasks: [
            {
              id: uid(),
              title: input.title.trim(),
              bucket: input.bucket,
              priority: input.priority,
              minutes: input.minutes,
              done: false,
              createdAt: Date.now(),
            },
            ...s.tasks,
          ],
        })),
      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t,
          ),
        })),
      removeTask: (id) =>
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== id),
          focus:
            s.focus.taskId === id ? { ...s.focus, taskId: null } : s.focus,
        })),
      addHabit: (name, priority) =>
        set((s) => {
          if (s.habits.length >= 10) return s;
          return {
            habits: [
              ...s.habits,
              { id: uid(), name: name.trim(), priority, checks: [] },
            ],
          };
        }),
      toggleHabit: (id, day = localISO()) =>
        set((s) => ({
          habits: s.habits.map((h) => {
            if (h.id !== id) return h;
            const has = h.checks.includes(day);
            return {
              ...h,
              checks: has
                ? h.checks.filter((d) => d !== day)
                : [...h.checks, day],
            };
          }),
        })),
      removeHabit: (id) =>
        set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
      addGoal: (input) =>
        set((s) => {
          if (s.goals.length >= 10) return s;
          return {
            goals: [
              ...s.goals,
              {
                id: uid(),
                title: input.title.trim(),
                priority: input.priority,
                progress: Math.min(100, Math.max(0, input.progress)),
                milestone: input.milestone.trim(),
                note: input.note.trim(),
              },
            ],
          };
        }),
      updateGoal: (id, patch) =>
        set((s) => ({
          goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        })),
      removeGoal: (id) =>
        set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      addCapture: (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        set((s) => ({
          captures: [
            { id: uid(), text: trimmed, createdAt: Date.now() },
            ...s.captures,
          ].slice(0, 40),
        }));
      },
      promoteCapture: (id, title) => {
        const item = get().captures.find((c) => c.id === id);
        if (!item) return;
        get().addTask({
          title: title.trim() || item.text.slice(0, 80),
          bucket: "today",
          priority: 3,
          minutes: 25,
        });
        get().removeCapture(id);
      },
      removeCapture: (id) =>
        set((s) => ({ captures: s.captures.filter((c) => c.id !== id) })),
      upsertHolding: (input) =>
        set((s) => {
          const ticker = input.ticker.trim().toUpperCase();
          const name = input.name.trim() || ticker;
          if (input.id) {
            return {
              holdings: s.holdings.map((h) =>
                h.id === input.id
                  ? {
                      ...h,
                      ticker,
                      name,
                      shares: Math.max(0, input.shares),
                      avgCost: Math.max(0, input.avgCost),
                    }
                  : h,
              ),
            };
          }
          const existing = s.holdings.find((h) => h.ticker === ticker);
          if (existing) {
            return {
              holdings: s.holdings.map((h) =>
                h.ticker === ticker
                  ? {
                      ...h,
                      name,
                      shares: Math.max(0, input.shares),
                      avgCost: Math.max(0, input.avgCost),
                    }
                  : h,
              ),
            };
          }
          return {
            holdings: [
              ...s.holdings,
              {
                id: uid(),
                ticker,
                name,
                shares: Math.max(0, input.shares),
                avgCost: Math.max(0, input.avgCost),
              },
            ],
          };
        }),
      removeHolding: (id) =>
        set((s) => ({ holdings: s.holdings.filter((h) => h.id !== id) })),
      setAnalysis: (analysis) =>
        set((s) => ({
          analyses: { ...s.analyses, [analysis.ticker]: analysis },
        })),
      startFocus: (durationSec, taskId = null) =>
        set((s) => {
          const today = localISO();
          const rolled =
            s.focus.todayDate === today
              ? s.focus
              : { ...s.focus, todayDate: today, todaySec: 0, sessionsToday: 0 };
          return {
            focus: {
              ...rolled,
              running: true,
              durationSec,
              startedAt: Date.now(),
              taskId: taskId ?? rolled.taskId,
            },
          };
        }),
      stopFocus: (complete = false) =>
        set((s) => {
          const today = localISO();
          let add = 0;
          if (s.focus.startedAt) {
            add = Math.min(
              s.focus.durationSec,
              Math.floor((Date.now() - s.focus.startedAt) / 1000),
            );
          }
          const base =
            s.focus.todayDate === today
              ? s.focus.todaySec
              : 0;
          return {
            focus: {
              running: false,
              durationSec: s.focus.durationSec,
              startedAt: null,
              taskId: s.focus.taskId,
              todaySec: base + add,
              todayDate: today,
              sessionsToday:
                (s.focus.todayDate === today ? s.focus.sessionsToday : 0) +
                (complete ? 1 : 0),
            },
          };
        }),
      tickFocusDay: () =>
        set((s) => {
          const today = localISO();
          if (s.focus.todayDate === today) return s;
          return {
            focus: {
              ...s.focus,
              todayDate: today,
              todaySec: 0,
              sessionsToday: 0,
            },
          };
        }),
      setFocusTask: (taskId) =>
        set((s) => ({ focus: { ...s.focus, taskId } })),
    }),
    {
      name: "nexus-ops-v1",
      skipHydration: true,
      partialize: (s) => ({
        tasks: s.tasks,
        habits: s.habits,
        goals: s.goals,
        captures: s.captures,
        holdings: s.holdings,
        analyses: s.analyses,
        focus: {
          ...s.focus,
          running: false,
          startedAt: null,
        },
      }),
    },
  ),
);
