import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-C3FQ3CcT.js
function asRec(value) {
	const s = String(value ?? "").toLowerCase();
	if (s.includes("kauf") || s.includes("buy")) return "Kaufen";
	if (s.includes("verk") || s.includes("sell")) return "Verkaufen";
	return "Halten";
}
function parseJson(text) {
	const raw = text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text;
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		return JSON.parse(raw.slice(start, end + 1));
	} catch {
		return null;
	}
}
var analyzeTicker_createServerFn_handler = createServerRpc({
	id: "3194eb63d1c191ac3b3aed0ebdeb0964fc3442e69d3cc672cc2d4825c9c9478f",
	name: "analyzeTicker",
	filename: "src/lib/analyze.ts"
}, (opts) => analyzeTicker.__executeServer(opts));
var analyzeTicker = createServerFn({ method: "POST" }).validator((input) => input).handler(analyzeTicker_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Analyse ist in dieser Umgebung nicht verfügbar."
	};
	const position = data.shares > 0 ? `Eigene Position: ${data.shares} Stück, Einstieg ${data.avgCost} ${data.currency}.` : "Keine eigene Position, nur Watchlist.";
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
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages: [{
				role: "user",
				content: prompt
			}],
			max_tokens: 700,
			temperature: .3
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Analyse fehlgeschlagen (${res.status}).`
	};
	const json = parseJson((await res.json()).choices?.[0]?.message?.content ?? "");
	if (!json) return {
		ok: false,
		error: "Analyse konnte nicht gelesen werden."
	};
	const strengths = Array.isArray(json.strengths) ? json.strengths.map(String).slice(0, 3) : [];
	const risks = Array.isArray(json.risks) ? json.risks.map(String).slice(0, 3) : [];
	const quarterRaw = json.quarter;
	return {
		ok: true,
		analysis: {
			ticker: data.ticker,
			strengths,
			risks,
			view: String(json.view ?? "").trim(),
			rec: asRec(json.rec),
			quarter: quarterRaw ? {
				period: String(quarterRaw.period ?? ""),
				revenue: String(quarterRaw.revenue ?? ""),
				profit: String(quarterRaw.profit ?? ""),
				eps: String(quarterRaw.eps ?? "")
			} : null,
			at: Date.now()
		}
	};
});
//#endregion
export { analyzeTicker_createServerFn_handler };
