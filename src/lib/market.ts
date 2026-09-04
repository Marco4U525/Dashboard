import { createServerFn } from "@tanstack/react-start";
import type { Quote } from "./types";

type ChartResult = {
  meta?: {
    currency?: string;
    symbol?: string;
    shortName?: string;
    longName?: string;
    regularMarketPrice?: number;
    regularMarketChangePercent?: number;
    fiftyTwoWeekHigh?: number;
    fiftyTwoWeekLow?: number;
    chartPreviousClose?: number;
  };
  timestamp?: number[];
  indicators?: { quote?: Array<{ close?: Array<number | null> }> };
};

async function fetchChart(ticker: string): Promise<Quote | null> {
  const hosts = [
    "query2.finance.yahoo.com",
    "query1.finance.yahoo.com",
  ];
  for (const host of hosts) {
    try {
      const url = `https://${host}/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=3mo`;
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const json = (await res.json()) as {
        chart?: { result?: ChartResult[]; error?: unknown };
      };
      const result = json.chart?.result?.[0];
      if (!result?.meta?.regularMarketPrice) continue;
      const closes = (result.indicators?.quote?.[0]?.close ?? []).filter(
        (n): n is number => typeof n === "number" && Number.isFinite(n),
      );
      const price = result.meta.regularMarketPrice;
      const dayPct = result.meta.regularMarketChangePercent ?? 0;
      const weekAgo = closes.length >= 6 ? closes[closes.length - 6] : closes[0];
      const weekPct =
        weekAgo && weekAgo > 0 ? ((price - weekAgo) / weekAgo) * 100 : 0;
      const spark = closes.slice(-28);
      return {
        ticker,
        name: result.meta.shortName || result.meta.longName || ticker,
        currency: result.meta.currency || "USD",
        price,
        dayPct,
        weekPct,
        high52: result.meta.fiftyTwoWeekHigh ?? null,
        low52: result.meta.fiftyTwoWeekLow ?? null,
        closes: spark,
      };
    } catch {
      continue;
    }
  }
  return null;
}

export const fetchQuotes = createServerFn({ method: "POST" })
  .validator((input: { tickers: string[] }) => input)
  .handler(async ({ data }): Promise<Quote[]> => {
    const tickers = [
      ...new Set(
        data.tickers
          .map((t) => t.trim().toUpperCase())
          .filter(Boolean)
          .slice(0, 16),
      ),
    ];
    const results = await Promise.allSettled(tickers.map(fetchChart));
    const quotes: Quote[] = [];
    for (const r of results) {
      if (r.status === "fulfilled" && r.value) quotes.push(r.value);
    }
    return quotes;
  });
