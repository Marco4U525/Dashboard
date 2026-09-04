import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-V9v0ALEw.js
async function fetchChart(ticker) {
	for (const host of ["query2.finance.yahoo.com", "query1.finance.yahoo.com"]) try {
		const url = `https://${host}/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=3mo`;
		const res = await fetch(url, {
			headers: {
				"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
				Accept: "application/json"
			},
			cache: "no-store",
			signal: AbortSignal.timeout(8e3)
		});
		if (!res.ok) continue;
		const result = (await res.json()).chart?.result?.[0];
		if (!result?.meta?.regularMarketPrice) continue;
		const closes = (result.indicators?.quote?.[0]?.close ?? []).filter((n) => typeof n === "number" && Number.isFinite(n));
		const price = result.meta.regularMarketPrice;
		const dayPct = result.meta.regularMarketChangePercent ?? 0;
		const weekAgo = closes.length >= 6 ? closes[closes.length - 6] : closes[0];
		const weekPct = weekAgo && weekAgo > 0 ? (price - weekAgo) / weekAgo * 100 : 0;
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
			closes: spark
		};
	} catch {
		continue;
	}
	return null;
}
var fetchQuotes_createServerFn_handler = createServerRpc({
	id: "32ea09f2c4f8f9ea7db6070b7871f50a7dd7a2e41a61f9a9a164782bd92f9514",
	name: "fetchQuotes",
	filename: "src/lib/market.ts"
}, (opts) => fetchQuotes.__executeServer(opts));
var fetchQuotes = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchQuotes_createServerFn_handler, async ({ data }) => {
	const tickers = [...new Set(data.tickers.map((t) => t.trim().toUpperCase()).filter(Boolean).slice(0, 16))];
	const results = await Promise.allSettled(tickers.map(fetchChart));
	const quotes = [];
	for (const r of results) if (r.status === "fulfilled" && r.value) quotes.push(r.value);
	return quotes;
});
//#endregion
export { fetchQuotes_createServerFn_handler };
