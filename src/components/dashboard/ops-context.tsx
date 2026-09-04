import { createContext, useContext } from "react";

export type OpsUi = {
  openTask: (bucket?: "today" | "later" | "week") => void;
  openHabit: () => void;
  openHabitCheck: () => void;
  openGoal: () => void;
  openHolding: (id?: string) => void;
  startQuickFocus: (minutes?: number, taskId?: string) => void;
  focusCapture: () => void;
  refreshAll: () => void;
};

export const OpsUiContext = createContext<OpsUi | null>(null);

export function useOpsUi() {
  const ctx = useContext(OpsUiContext);
  if (!ctx) throw new Error("useOpsUi must be used within dashboard");
  return ctx;
}
