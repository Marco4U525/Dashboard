import { createServerFn } from "@tanstack/react-start";
import type { Recommendation, StockAnalysis } from "./types";

type AnalyzeInput = {
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
};

function asRec(value: unknown): Recommendation {
  const s = String(value ?? "").toLowerCase();
  if (s.includes("kauf") || s.includes("buy")) return "Kaufen";
  if (s.includes("verk") || s.includes("sell")) return "Verkaufen";
  return "Halten";
}

function parseJson(text: string): Record<string, unknown> | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced?.[1] ?? text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export const analyzeTicker = createServerFn({ method: "POST" })
  .validator((input: AnalyzeInput) => input)
  .handler(async ({ data }): Promise<
    | { ok: true; analysis: StockAnalysis }
    | { ok: false; error: string }
  > => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "Analyse ist in dieser Umgebung nicht verfügbar." };
    }
    const position =
      data.shares > 0
        ? `Eigene Position: ${data.shares} Stück, Einstieg ${data.avgCost} ${data.currency}.`
        : "Keine eigene Position, nur Watchlist.";
    const prompt = `Du bist ein knapper Marktanalyst. Antworte ausschließlich auf Deutsch und nur als JSON, kein Markdown.
Analysiere ${data.ticker} (${data.name}) zum Kurs ${data.price} ${data.currency}.
Tagesveränderung ${data.dayPct.toFixed(2)}%, Woche ${data.weekPct.toFixed(2)}%.
52-Wochen: ${data.low52 ?? "n/a"}–${data.high52 ?? "n/a"}.
${position}

JSON-Schema:
{
  "strengths": ["...", "..."],
  "risks": ["...", "..."],
  "view": "2-3 Sätze aktuelle Einschätzung",
  "rec": "Kaufen" | "Halten" | "Verkaufen",
  "quarter": { "period": "Qx JJJJ", "revenue": "kurz", "profit": "kurz", "eps": "kurz" }
}

Regeln: Maximal 3 Stärken, 3 Risiken. Keine Anlageberatung, klar als Analyse. Nutze die letzten bekannten Quartalszahlen.`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 700,
        temperature: 0.3,
      }),
    });
    if (!res.ok) {
      return { ok: false, error: `Analyse fehlgeschlagen (${res.status}).` };
    }
    const body = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const json = parseJson(text);
    if (!json) return { ok: false, error: "Analyse konnte nicht gelesen werden." };
    const strengths = Array.isArray(json.strengths)
      ? json.strengths.map(String).slice(0, 3)
      : [];
    const risks = Array.isArray(json.risks)
      ? json.risks.map(String).slice(0, 3)
      : [];
    const quarterRaw = json.quarter as Record<string, unknown> | undefined;
    const analysis: StockAnalysis = {
      ticker: data.ticker,
      strengths,
      risks,
      view: String(json.view ?? "").trim(),
      rec: asRec(json.rec),
      quarter: quarterRaw
        ? {
            period: String(quarterRaw.period ?? ""),
            revenue: String(quarterRaw.revenue ?? ""),
            profit: String(quarterRaw.profit ?? ""),
            eps: String(quarterRaw.eps ?? ""),
          }
        : null,
      at: Date.now(),
    };
    return { ok: true, analysis };
  });
