export type Priority = 1 | 2 | 3 | 4 | 5;
export type TaskBucket = "today" | "later" | "week";

export type Task = {
  id: string;
  title: string;
  bucket: TaskBucket;
  priority: Priority;
  minutes: number;
  done: boolean;
  createdAt: number;
};

export type Habit = {
  id: string;
  name: string;
  priority: Priority;
  checks: string[];
};

export type Goal = {
  id: string;
  title: string;
  priority: Priority;
  progress: number;
  milestone: string;
  note: string;
};

export type CaptureItem = {
  id: string;
  text: string;
  createdAt: number;
};

export type Holding = {
  id: string;
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
};

export type Recommendation = "Kaufen" | "Halten" | "Verkaufen";

export type StockAnalysis = {
  ticker: string;
  strengths: string[];
  risks: string[];
  view: string;
  rec: Recommendation;
  quarter: {
    period: string;
    revenue: string;
    profit: string;
    eps: string;
  } | null;
  at: number;
};

export type Quote = {
  ticker: string;
  name: string;
  currency: string;
  price: number;
  dayPct: number;
  weekPct: number;
  high52: number | null;
  low52: number | null;
  closes: number[];
};

export type MailMessage = {
  id: string;
  threadId: string;
  from: string;
  fromEmail: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  starred: boolean;
  important: boolean;
  rfcMessageId?: string;
};

export type MailErrorKind =
  | "login"
  | "not_connected"
  | "scope_denied"
  | "access_denied"
  | "error";
