import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Plus, ScanSearch } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { analyzeTicker } from "@/lib/analyze";
import { useOps } from "@/lib/store";
import type { Holding, Quote, Recommendation, StockAnalysis } from "@/lib/types";
import { cn, formatMoney, formatPct } from "@/lib/utils";
import { useOpsUi } from "./ops-context";
import { Panel } from "./panel";
import { Sparkline } from "./sparkline";

export function FinancePanel({
  className,
  quotes,
  loading,
}: {
  className?: string;
  quotes: Quote[];
  loading: boolean;
}) {
  const holdings = useOps((s) => s.holdings);
  const analyses = useOps((s) => s.analyses);
  const setAnalysis = useOps((s) => s.setAnalysis);
  const ui = useOpsUi();
  const [openId, setOpenId] = useState<string | null>(null);

  const quoteMap = useMemo(() => {
    const map = new Map<string, Quote>();
    for (const q of quotes) {
      map.set(q.ticker.toUpperCase(), q);
    }
    return map;
  }, [quotes]);

  const rows = useMemo(() => {
    return [...holdings]
      .map((h) => {
        const q = quoteMap.get(h.ticker.toUpperCase()) ?? null;
        const value = q && h.shares > 0 ? q.price * h.shares : 0;
        const cost = h.shares > 0 ? h.avgCost * h.shares : 0;
        const pnl = value - cost;
        const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
        return { holding: h, quote: q, value, cost, pnl, pnlPct };
      })
      .sort((a, b) => b.value - a.value || a.holding.ticker.localeCompare(b.holding.ticker));
  }, [holdings, quoteMap]);

  const totals = useMemo(() => {
    const by: Record<string, { value: number; cost: number; pnl: number }> = {};
    for (const row of rows) {
      if (!row.quote || row.holding.shares <= 0) continue;
      const cur = row.quote.currency;
      const t = by[cur] ?? { value: 0, cost: 0, pnl: 0 };
      t.value += row.value;
      t.cost += row.cost;
      t.pnl += row.pnl;
      by[cur] = t;
    }
    return Object.entries(by);
  }, [rows]);

  const analyze = useMutation({
    mutationFn: (input: {
      ticker: string;
      name: string;
      currency: string;
      price: number;
      dayPct: number;
      weekPct: number;
      high52: number | null;
      low52: number | null;
      shares: number;
      avgCost: number;
    }) => analyzeTicker({ data: input }),
    onSuccess: (res) => {
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      setAnalysis(res.analysis);
    },
  });

  return (
    <Panel
      className={className}
      title="Finanzen & Aktien"
      action={
        <Button variant="ghost" size="icon-sm" onClick={() => ui.openHolding()}>
          <Plus className="size-4" />
          <span className="sr-only">Position hinzufügen</span>
        </Button>
      }
    >
      {totals.length > 0 ? (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {totals.map(([cur, t]) => (
            <div key={cur} className="rounded-lg bg-surface-2 px-3 py-2">
              <p className="text-[10px] tracking-wide text-subtle uppercase">
                Portfolio {cur}
              </p>
              <p className="font-mono text-lg leading-tight font-medium tracking-tight tabular">
                {formatMoney(t.value, cur)}
              </p>
              <p
                className={cn(
                  "font-mono text-xs tabular",
                  t.pnl >= 0 ? "text-ok" : "text-danger",
                )}
              >
                {formatMoney(t.pnl, cur)} · {formatPct(t.cost > 0 ? (t.pnl / t.cost) * 100 : 0)}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {loading && quotes.length === 0 ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-14 animate-pulse rounded-md bg-surface-2" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted">Noch keine Ticker. Position anlegen.</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {rows.map((row) => (
            <HoldingRow
              key={row.holding.id}
              row={row}
              analysis={analyses[row.holding.ticker]}
              open={openId === row.holding.id}
              analyzing={
                analyze.isPending &&
                analyze.variables?.ticker === row.holding.ticker
              }
              onToggle={() =>
                setOpenId((id) => (id === row.holding.id ? null : row.holding.id))
              }
              onEdit={() => ui.openHolding(row.holding.id)}
              onAnalyze={() => {
                if (!row.quote) {
                  toast.error("Kein Kurs für die Analyse.");
                  return;
                }
                analyze.mutate({
                  ticker: row.holding.ticker,
                  name: row.quote.name || row.holding.name,
                  currency: row.quote.currency,
                  price: row.quote.price,
                  dayPct: row.quote.dayPct,
                  weekPct: row.quote.weekPct,
                  high52: row.quote.high52,
                  low52: row.quote.low52,
                  shares: row.holding.shares,
                  avgCost: row.holding.avgCost,
                });
              }}
            />
          ))}
        </ul>
      )}
      <p className="mt-3 text-[10px] tracking-wide text-subtle uppercase">
        Grok-Einschätzung ist Analyse, keine Anlageberatung
      </p>
    </Panel>
  );
}

type Row = {
  holding: Holding;
  quote: Quote | null;
  value: number;
  cost: number;
  pnl: number;
  pnlPct: number;
};

function HoldingRow({
  row,
  analysis,
  open,
  analyzing,
  onToggle,
  onEdit,
  onAnalyze,
}: {
  row: Row;
  analysis?: StockAnalysis;
  open: boolean;
  analyzing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onAnalyze: () => void;
}) {
  const { holding, quote, value, pnl, pnlPct } = row;
  const day = quote?.dayPct ?? 0;
  const owned = holding.shares > 0;
  return (
    <li className="rounded-lg bg-surface-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-11 items-center gap-2 px-2.5 py-2 text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-medium tracking-wide">
              {holding.ticker}
            </span>
            <span className="truncate text-xs text-muted">
              {quote?.name || holding.name}
            </span>
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10px] tabular text-subtle">
            {quote ? (
              <>
                <span>{formatMoney(quote.price, quote.currency)}</span>
                <span className={day >= 0 ? "text-ok" : "text-danger"}>
                  {formatPct(day)} Tag
                </span>
                <span className={quote.weekPct >= 0 ? "text-ok" : "text-danger"}>
                  {formatPct(quote.weekPct)} Wo
                </span>
              </>
            ) : (
              <span>Kurs n/a</span>
            )}
            {owned ? (
              <span>
                {holding.shares} × {formatMoney(holding.avgCost, quote?.currency ?? "USD")}
              </span>
            ) : (
              <span>Watchlist</span>
            )}
          </div>
        </div>
        <div className="hidden w-20 shrink-0 sm:block">
          {quote ? (
            <Sparkline
              values={quote.closes}
              tone={quote.weekPct >= 0 ? "up" : "down"}
            />
          ) : null}
        </div>
        <div className="w-[5.5rem] shrink-0 text-right">
          {owned && quote ? (
            <>
              <p className="font-mono text-sm tabular">
                {formatMoney(value, quote.currency)}
              </p>
              <p
                className={cn(
                  "font-mono text-[10px] tabular",
                  pnl >= 0 ? "text-ok" : "text-danger",
                )}
              >
                {formatPct(pnlPct)}
              </p>
            </>
          ) : (
            <p className="font-mono text-xs text-subtle">—</p>
          )}
        </div>
      </button>
      {open ? (
        <div className="border-t border-border px-2.5 py-3">
          <div className="mb-3 flex flex-wrap gap-1.5">
            <Button size="sm" variant="secondary" onClick={onEdit}>
              Position
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={onAnalyze}
              disabled={analyzing || !quote}
            >
              <ScanSearch className="size-3.5" />
              {analyzing ? "Analysiert …" : "Grok-Analyse"}
            </Button>
          </div>
          {quote && (quote.low52 || quote.high52) ? (
            <RangeBar
              low={quote.low52}
              high={quote.high52}
              price={quote.price}
              currency={quote.currency}
            />
          ) : null}
          {analysis ? (
            <AnalysisBlock analysis={analysis} />
          ) : (
            <p className="text-xs text-muted">
              Analyse auf Knopfdruck. Ergebnis wird lokal gespeichert.
            </p>
          )}
        </div>
      ) : null}
    </li>
  );
}

function RangeBar({
  low,
  high,
  price,
  currency,
}: {
  low: number | null;
  high: number | null;
  price: number;
  currency: string;
}) {
  if (low == null || high == null || high <= low) return null;
  const pct = Math.min(100, Math.max(0, ((price - low) / (high - low)) * 100));
  return (
    <div className="mb-3">
      <div className="mb-1 flex justify-between font-mono text-[10px] text-subtle tabular">
        <span>{formatMoney(low, currency)}</span>
        <span>52 Wochen</span>
        <span>{formatMoney(high, currency)}</span>
      </div>
      <div className="relative h-1 rounded-full bg-surface-3">
        <span
          className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function recVariant(rec: Recommendation) {
  if (rec === "Kaufen") return "ok" as const;
  if (rec === "Verkaufen") return "danger" as const;
  return "warn" as const;
}

function AnalysisBlock({ analysis }: { analysis: StockAnalysis }) {
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={recVariant(analysis.rec)}>{analysis.rec}</Badge>
        <span className="text-[10px] text-subtle">Analyse, keine Beratung</span>
      </div>
      {analysis.view ? <p className="text-sm text-fg/90">{analysis.view}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <ul className="grid gap-1">
          <li className="text-[10px] tracking-wide text-subtle uppercase">Stärken</li>
          {analysis.strengths.map((s) => (
            <li key={s} className="text-xs text-ok/90">
              {s}
            </li>
          ))}
        </ul>
        <ul className="grid gap-1">
          <li className="text-[10px] tracking-wide text-subtle uppercase">Risiken</li>
          {analysis.risks.map((s) => (
            <li key={s} className="text-xs text-danger/90">
              {s}
            </li>
          ))}
        </ul>
      </div>
      {analysis.quarter ? (
        <div className="grid grid-cols-2 gap-2 rounded-md bg-surface-3/60 p-2 sm:grid-cols-4">
          <MiniStat label="Quartal" value={analysis.quarter.period} />
          <MiniStat label="Umsatz" value={analysis.quarter.revenue} />
          <MiniStat label="Gewinn" value={analysis.quarter.profit} />
          <MiniStat label="EPS" value={analysis.quarter.eps} />
        </div>
      ) : null}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] tracking-wide text-subtle uppercase">{label}</p>
      <p className="text-xs">{value || "—"}</p>
    </div>
  );
}
