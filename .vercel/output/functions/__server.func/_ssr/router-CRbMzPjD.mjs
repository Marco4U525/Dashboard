import { i as __toESM } from "../_runtime.mjs";
import { h as require_react, m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CRbMzPjD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-danger",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-medium",
				children: "Etwas ist schiefgelaufen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "Unerwarteter Fehler. Seite neu laden."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function pad(n) {
	return n.toString().padStart(2, "0");
}
function localISO(date = /* @__PURE__ */ new Date()) {
	return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
function daysAgoISO(n) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - n);
	return localISO(d);
}
function formatClock(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("de-DE", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).format(date);
}
function formatDateLong(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("de-DE", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(date);
}
function formatTimeShort(date) {
	return new Intl.DateTimeFormat("de-DE", {
		hour: "2-digit",
		minute: "2-digit"
	}).format(date);
}
function formatMoney(value, currency = "USD") {
	try {
		return new Intl.NumberFormat("de-DE", {
			style: "currency",
			currency,
			maximumFractionDigits: value >= 1e3 ? 0 : 2
		}).format(value);
	} catch {
		return `${value.toFixed(2)} ${currency}`;
	}
}
function formatPct(value, digits = 2) {
	return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}
function formatDuration(totalSec) {
	const s = Math.max(0, Math.floor(totalSec));
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const sec = s % 60;
	if (h > 0) return `${h}:${pad(m)}:${pad(sec)}`;
	return `${pad(m)}:${pad(sec)}`;
}
function streakFrom(checks, today = localISO()) {
	const set = new Set(checks);
	let cursor = today;
	if (!set.has(cursor)) {
		const y = /* @__PURE__ */ new Date(`${today}T12:00:00`);
		y.setDate(y.getDate() - 1);
		cursor = localISO(y);
		if (!set.has(cursor)) return 0;
	}
	let n = 0;
	while (set.has(cursor)) {
		n += 1;
		const d = /* @__PURE__ */ new Date(`${cursor}T12:00:00`);
		d.setDate(d.getDate() - 1);
		cursor = localISO(d);
	}
	return n;
}
function lastNDays(n, today = localISO()) {
	const out = [];
	const d = /* @__PURE__ */ new Date(`${today}T12:00:00`);
	for (let i = n - 1; i >= 0; i--) {
		const x = new Date(d);
		x.setDate(d.getDate() - i);
		out.push(localISO(x));
	}
	return out;
}
function TooltipProvider({ delayDuration = 200, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function seedChecks(pattern) {
	return pattern.map((on, i) => on ? daysAgoISO(pattern.length - 1 - i) : null).filter((x) => Boolean(x));
}
var seedTasks = [
	{
		id: "t1",
		title: "Quartalsreview vorbereiten",
		bucket: "today",
		priority: 5,
		minutes: 90,
		done: false,
		createdAt: Date.now() - 864e5
	},
	{
		id: "t2",
		title: "Portfolio-Rebalancing prüfen",
		bucket: "today",
		priority: 4,
		minutes: 40,
		done: false,
		createdAt: Date.now() - 72e6
	},
	{
		id: "t3",
		title: "Deep-Work: Strategiepapier",
		bucket: "today",
		priority: 5,
		minutes: 50,
		done: false,
		createdAt: Date.now() - 36e6
	},
	{
		id: "t4",
		title: "Team-Sync vorbereiten",
		bucket: "later",
		priority: 3,
		minutes: 25,
		done: false,
		createdAt: Date.now() - 18e6
	},
	{
		id: "t5",
		title: "Steuerunterlagen sichten",
		bucket: "week",
		priority: 3,
		minutes: 60,
		done: false,
		createdAt: Date.now() - 9e6
	},
	{
		id: "t6",
		title: "Investor-Update skizzieren",
		bucket: "week",
		priority: 2,
		minutes: 45,
		done: false,
		createdAt: Date.now() - 8e6
	}
];
var seedHabits = [
	{
		id: "h1",
		name: "Training",
		priority: 5,
		checks: seedChecks([
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			1
		].map(Boolean))
	},
	{
		id: "h2",
		name: "Deep Work",
		priority: 5,
		checks: seedChecks([
			1,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			1,
			1,
			0,
			1,
			1,
			0
		].map(Boolean))
	},
	{
		id: "h3",
		name: "Lesen",
		priority: 4,
		checks: seedChecks([
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1
		].map(Boolean))
	},
	{
		id: "h4",
		name: "Meditation",
		priority: 3,
		checks: seedChecks([
			1,
			1,
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			1,
			0
		].map(Boolean))
	},
	{
		id: "h5",
		name: "Journaling",
		priority: 3,
		checks: seedChecks([
			0,
			1,
			1,
			0,
			1,
			0,
			1,
			1,
			0,
			1,
			0,
			1,
			1,
			0
		].map(Boolean))
	},
	{
		id: "h6",
		name: "Schlafen vor 23:00",
		priority: 4,
		checks: seedChecks([
			1,
			0,
			1,
			1,
			1,
			0,
			0,
			1,
			1,
			1,
			0,
			1,
			0,
			1
		].map(Boolean))
	},
	{
		id: "h7",
		name: "Kein Zucker",
		priority: 2,
		checks: seedChecks([
			1,
			1,
			0,
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			0
		].map(Boolean))
	},
	{
		id: "h8",
		name: "Wasser 3L",
		priority: 2,
		checks: seedChecks([
			1,
			1,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			1
		].map(Boolean))
	}
];
var seedGoals = [
	{
		id: "g1",
		title: "Notgroschen: 6 Monate Fixkosten",
		priority: 5,
		progress: 68,
		milestone: "Nächste Tranche 2.500 € bis Monatsende",
		note: "Liquidität vor neuen Positionen."
	},
	{
		id: "g2",
		title: "5k unter 22:00",
		priority: 4,
		progress: 54,
		milestone: "Intervall-Einheit Donnerstag",
		note: "Aktuell 22:48 auf der Rundstrecke."
	},
	{
		id: "g3",
		title: "Side-Project MVP",
		priority: 4,
		progress: 41,
		milestone: "Onboarding-Flow fertigstellen",
		note: "Zwei offene Tickets in der Capture-Inbox."
	},
	{
		id: "g4",
		title: "Quartalsziel Pipeline",
		priority: 3,
		progress: 73,
		milestone: "Drei Discovery-Calls diese Woche",
		note: "Fokus auf bestehende Accounts."
	}
];
var seedHoldings = [
	{
		id: "p1",
		ticker: "NVDA",
		name: "NVIDIA",
		shares: 18,
		avgCost: 142.5
	},
	{
		id: "p2",
		ticker: "AAPL",
		name: "Apple",
		shares: 25,
		avgCost: 189
	},
	{
		id: "p3",
		ticker: "MSFT",
		name: "Microsoft",
		shares: 12,
		avgCost: 378
	},
	{
		id: "p4",
		ticker: "TSLA",
		name: "Tesla",
		shares: 20,
		avgCost: 248
	},
	{
		id: "p5",
		ticker: "SAP.DE",
		name: "SAP",
		shares: 15,
		avgCost: 210
	},
	{
		id: "p6",
		ticker: "RHM.DE",
		name: "Rheinmetall",
		shares: 4,
		avgCost: 1280
	},
	{
		id: "p7",
		ticker: "GOOGL",
		name: "Alphabet",
		shares: 0,
		avgCost: 0
	},
	{
		id: "p8",
		ticker: "ASML",
		name: "ASML",
		shares: 0,
		avgCost: 0
	}
];
var emptyFocus = () => ({
	running: false,
	durationSec: 1500,
	startedAt: null,
	taskId: null,
	todaySec: 0,
	todayDate: localISO(),
	sessionsToday: 0
});
var useOps = create()(persist((set, get) => ({
	hydrated: false,
	tasks: seedTasks,
	habits: seedHabits,
	goals: seedGoals,
	captures: [{
		id: "c1",
		text: "Idee: wöchentliches Risk-Review für das Portfolio, 20 Minuten, montags.",
		createdAt: Date.now() - 42e5
	}],
	holdings: seedHoldings,
	analyses: {},
	focus: emptyFocus(),
	markHydrated: () => set({ hydrated: true }),
	addTask: (input) => set((s) => ({ tasks: [{
		id: uid(),
		title: input.title.trim(),
		bucket: input.bucket,
		priority: input.priority,
		minutes: input.minutes,
		done: false,
		createdAt: Date.now()
	}, ...s.tasks] })),
	toggleTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? {
		...t,
		done: !t.done
	} : t) })),
	removeTask: (id) => set((s) => ({
		tasks: s.tasks.filter((t) => t.id !== id),
		focus: s.focus.taskId === id ? {
			...s.focus,
			taskId: null
		} : s.focus
	})),
	addHabit: (name, priority) => set((s) => {
		if (s.habits.length >= 10) return s;
		return { habits: [...s.habits, {
			id: uid(),
			name: name.trim(),
			priority,
			checks: []
		}] };
	}),
	toggleHabit: (id, day = localISO()) => set((s) => ({ habits: s.habits.map((h) => {
		if (h.id !== id) return h;
		const has = h.checks.includes(day);
		return {
			...h,
			checks: has ? h.checks.filter((d) => d !== day) : [...h.checks, day]
		};
	}) })),
	removeHabit: (id) => set((s) => ({ habits: s.habits.filter((h) => h.id !== id) })),
	addGoal: (input) => set((s) => {
		if (s.goals.length >= 10) return s;
		return { goals: [...s.goals, {
			id: uid(),
			title: input.title.trim(),
			priority: input.priority,
			progress: Math.min(100, Math.max(0, input.progress)),
			milestone: input.milestone.trim(),
			note: input.note.trim()
		}] };
	}),
	updateGoal: (id, patch) => set((s) => ({ goals: s.goals.map((g) => g.id === id ? {
		...g,
		...patch
	} : g) })),
	removeGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
	addCapture: (text) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		set((s) => ({ captures: [{
			id: uid(),
			text: trimmed,
			createdAt: Date.now()
		}, ...s.captures].slice(0, 40) }));
	},
	promoteCapture: (id, title) => {
		const item = get().captures.find((c) => c.id === id);
		if (!item) return;
		get().addTask({
			title: title.trim() || item.text.slice(0, 80),
			bucket: "today",
			priority: 3,
			minutes: 25
		});
		get().removeCapture(id);
	},
	removeCapture: (id) => set((s) => ({ captures: s.captures.filter((c) => c.id !== id) })),
	upsertHolding: (input) => set((s) => {
		const ticker = input.ticker.trim().toUpperCase();
		const name = input.name.trim() || ticker;
		if (input.id) return { holdings: s.holdings.map((h) => h.id === input.id ? {
			...h,
			ticker,
			name,
			shares: Math.max(0, input.shares),
			avgCost: Math.max(0, input.avgCost)
		} : h) };
		if (s.holdings.find((h) => h.ticker === ticker)) return { holdings: s.holdings.map((h) => h.ticker === ticker ? {
			...h,
			name,
			shares: Math.max(0, input.shares),
			avgCost: Math.max(0, input.avgCost)
		} : h) };
		return { holdings: [...s.holdings, {
			id: uid(),
			ticker,
			name,
			shares: Math.max(0, input.shares),
			avgCost: Math.max(0, input.avgCost)
		}] };
	}),
	removeHolding: (id) => set((s) => ({ holdings: s.holdings.filter((h) => h.id !== id) })),
	setAnalysis: (analysis) => set((s) => ({ analyses: {
		...s.analyses,
		[analysis.ticker]: analysis
	} })),
	startFocus: (durationSec, taskId = null) => set((s) => {
		const today = localISO();
		const rolled = s.focus.todayDate === today ? s.focus : {
			...s.focus,
			todayDate: today,
			todaySec: 0,
			sessionsToday: 0
		};
		return { focus: {
			...rolled,
			running: true,
			durationSec,
			startedAt: Date.now(),
			taskId: taskId ?? rolled.taskId
		} };
	}),
	stopFocus: (complete = false) => set((s) => {
		const today = localISO();
		let add = 0;
		if (s.focus.startedAt) add = Math.min(s.focus.durationSec, Math.floor((Date.now() - s.focus.startedAt) / 1e3));
		const base = s.focus.todayDate === today ? s.focus.todaySec : 0;
		return { focus: {
			running: false,
			durationSec: s.focus.durationSec,
			startedAt: null,
			taskId: s.focus.taskId,
			todaySec: base + add,
			todayDate: today,
			sessionsToday: (s.focus.todayDate === today ? s.focus.sessionsToday : 0) + (complete ? 1 : 0)
		} };
	}),
	tickFocusDay: () => set((s) => {
		const today = localISO();
		if (s.focus.todayDate === today) return s;
		return { focus: {
			...s.focus,
			todayDate: today,
			todaySec: 0,
			sessionsToday: 0
		} };
	}),
	setFocusTask: (taskId) => set((s) => ({ focus: {
		...s.focus,
		taskId
	} }))
}), {
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
			startedAt: null
		}
	})
}));
var queryClient = new QueryClient({ defaultOptions: { queries: {
	refetchOnWindowFocus: true,
	retry: 1,
	staleTime: 3e4
} } });
function AppProviders({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		Promise.resolve(useOps.persist.rehydrate()).then(() => {
			useOps.getState().markHydrated();
			useOps.getState().tickFocusDay();
			setReady(true);
		});
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-dvh bg-bg text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] tracking-[0.28em] text-steel uppercase",
					children: "Nexus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Command Center lädt …"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-right",
			toastOptions: { classNames: {
				toast: "bg-surface text-fg shadow-card border-0",
				title: "text-fg",
				description: "text-muted"
			} }
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			theme: "dark",
			position: "bottom-right",
			toastOptions: { classNames: {
				toast: "bg-surface text-fg shadow-card border-0",
				title: "text-fg",
				description: "text-muted"
			} }
		})] })
	});
}
var styles_default = "/assets/styles-CwteRGPg.css";
var APP_NAME = "NEXUS";
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Persönliches Ops-Command-Center: Prioritäten, Fokus, Inbox, Portfolio."
			},
			{
				name: "theme-color",
				content: "#08090b"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "de",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppProviders, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter = () => import("./routes-BakHCVX0.mjs");
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { formatDateLong as a, formatPct as c, localISO as d, streakFrom as f, formatClock as i, formatTimeShort as l, useOps as n, formatDuration as o, cn as r, formatMoney as s, router_exports as t, lastNDays as u };
