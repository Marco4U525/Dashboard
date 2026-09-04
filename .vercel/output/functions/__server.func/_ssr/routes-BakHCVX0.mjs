import { i as __toESM } from "../_runtime.mjs";
import { c as Slot, h as require_react, m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as redirectToLoginIfRequired } from "./login-C214iVwo.mjs";
import { _ as Check, a as Square, c as Reply, d as Play, f as NotebookPen, g as Focus, h as ListPlus, i as Star, l as RefreshCw, m as MailOpen, o as SquareCheck, p as Mail, r as Trash2, s as ScanSearch, t as X, u as Plus, v as ArrowUpRight, y as Archive } from "../_libs/lucide-react.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatDateLong, c as formatPct, d as localISO, f as streakFrom, i as formatClock, l as formatTimeShort, n as useOps, o as formatDuration, r as cn, s as formatMoney, u as lastNDays } from "./router-CRbMzPjD.mjs";
import { n as formatDistanceToNow, t as de } from "../_libs/date-fns.mjs";
import { t as Label } from "../_libs/radix-ui__react-label.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BakHCVX0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadInbox = createServerFn({ method: "POST" }).handler(createSsrRpc("889fc8aa564a03c35d876120737c23155761b0eb249dfe15ff69ac4f37920b04"));
var loadMailBody = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3eb257bd56dae56a0ed2512107d1a4455cb44b2d056170c539f7ba786750735b"));
var modifyMail = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("202c4c58366aa87a4a97ba717d9da279e4f0bcf57796e5ad232cbcd8e2618cd0"));
var createMailDraft = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("d3f278e06aa3050652eeafb59075878059fd2c3f9ed23b802f5c0cfd73cd9157"));
var fetchQuotes = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("32ea09f2c4f8f9ea7db6070b7871f50a7dd7a2e41a61f9a9a164782bd92f9514"));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-[color,background-color,opacity,transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel/50 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg hover:bg-surface-3",
			ghost: "text-muted hover:text-fg hover:bg-surface-2",
			outline: "shadow-card text-fg hover:bg-surface-2 hover:shadow-card-hover",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			default: "h-10 px-3.5 text-sm",
			sm: "h-9 px-2.5 text-xs",
			lg: "h-11 px-4 text-sm",
			icon: "size-10",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		"data-slot": "textarea",
		className: cn("flex min-h-24 w-full rounded-md bg-surface-2 px-3 py-2 text-sm text-fg shadow-card outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-card-hover focus-visible:ring-2 focus-visible:ring-steel/40 disabled:opacity-40", className),
		...props
	});
}
function Panel({ title, action, children, className, bodyClassName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex min-h-0 flex-col rounded-2xl bg-surface p-3 shadow-card", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-3 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[11px] font-medium tracking-[0.18em] text-muted uppercase",
				children: title
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex min-h-0 flex-1 flex-col", bodyClassName),
			children
		})]
	});
}
function CapturePanel({ className }) {
	const captures = useOps((s) => s.captures);
	const add = useOps((s) => s.addCapture);
	const promote = useOps((s) => s.promoteCapture);
	const remove = useOps((s) => s.removeCapture);
	const [text, setText] = (0, import_react.useState)("");
	function save() {
		const trimmed = text.trim();
		if (!trimmed) return;
		add(trimmed);
		setText("");
		toast.success("In der Inbox abgelegt");
	}
	function onKey(e) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			save();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		title: "Quick Capture",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "quick-capture",
				value: text,
				onChange: (e) => setText(e.target.value),
				onKeyDown: onKey,
				placeholder: "Idee, Task, Gedanke … Enter speichert",
				rows: 3
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: save,
					disabled: !text.trim(),
					children: "Ablegen"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex max-h-64 flex-col gap-1.5 overflow-auto",
				children: captures.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "Inbox leer. Alles sortiert."
				}) : captures.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "group flex items-start gap-2 rounded-md bg-surface-2 px-2 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm break-words",
								children: item.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 font-mono text-[10px] text-subtle",
								children: formatDistanceToNow(item.createdAt, {
									addSuffix: true,
									locale: de
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							title: "Als Task für heute",
							onClick: () => promote(item.id, item.text.slice(0, 80)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							className: "opacity-70 group-hover:opacity-100",
							onClick: () => remove(item.id),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
						})
					]
				}, item.id))
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-surface p-5 shadow-card outline-none", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-md p-2 text-muted transition-colors hover:bg-surface-2 hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Schließen"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		"data-slot": "input",
		className: cn("flex h-10 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-card outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-card-hover focus-visible:ring-2 focus-visible:ring-steel/40 disabled:opacity-40", className),
		...props
	});
}
function Label$1({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-slot": "label",
		className: cn("text-xs font-medium tracking-wide text-muted", className),
		...props
	});
}
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/70", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed z-50 flex flex-col bg-surface shadow-card outline-none", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md border-l border-border", side === "bottom" && "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t border-border", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-md p-2 text-muted hover:bg-surface-2 hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Schließen"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-5 pt-5 pb-3", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-medium tracking-tight pr-8", className),
		...props
	});
}
function CommandDialogs({ state, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskDialog, {
			open: state.type === "task",
			bucket: state.type === "task" ? state.bucket : "today",
			onClose
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitDialog, {
			open: state.type === "habit",
			onClose
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalDialog, {
			open: state.type === "goal",
			onClose
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldingDialog, {
			open: state.type === "holding",
			id: state.type === "holding" ? state.id : void 0,
			onClose
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitCheckSheet, {
			open: state.type === "habit-check",
			onClose
		})
	] });
}
function FieldSelect({ id, value, onChange, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		id,
		value,
		onChange: (e) => onChange(e.target.value),
		className: "flex h-10 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-card outline-none focus-visible:ring-2 focus-visible:ring-steel/40",
		children
	});
}
function TaskDialog({ open, bucket, onClose }) {
	const add = useOps((s) => s.addTask);
	const [title, setTitle] = (0, import_react.useState)("");
	const [where, setWhere] = (0, import_react.useState)(bucket);
	const [priority, setPriority] = (0, import_react.useState)(5);
	const [minutes, setMinutes] = (0, import_react.useState)(25);
	(0, import_react.useEffect)(() => {
		if (open) {
			setTitle("");
			setWhere(bucket);
			setPriority(5);
			setMinutes(25);
		}
	}, [open, bucket]);
	function submit() {
		if (!title.trim()) return;
		add({
			title,
			bucket: where,
			priority,
			minutes: Math.max(5, minutes)
		});
		toast.success("Task angelegt");
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Neuer Task" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Landet in der Prioritätenliste." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "task-title",
						children: "Titel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "task-title",
						autoFocus: true,
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Was ist wichtig?"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
								htmlFor: "task-bucket",
								children: "Wann"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldSelect, {
								id: "task-bucket",
								value: where,
								onChange: (v) => setWhere(v),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "today",
										children: "Heute"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "later",
										children: "Später"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "week",
										children: "Diese Woche"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
								htmlFor: "task-pri",
								children: "Priorität"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
								id: "task-pri",
								value: String(priority),
								onChange: (v) => setPriority(Number(v)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityOptions, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
								htmlFor: "task-min",
								children: "Minuten"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "task-min",
								type: "number",
								min: 5,
								step: 5,
								value: minutes,
								onChange: (e) => setMinutes(Number(e.target.value) || 25)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !title.trim(),
					children: "Anlegen"
				})
			]
		})] })
	});
}
function HabitDialog({ open, onClose }) {
	const add = useOps((s) => s.addHabit);
	const count = useOps((s) => s.habits.length);
	const [name, setName] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)(4);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Neues Habit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Höhere Priorität erscheint größer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "habit-name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "habit-name",
						autoFocus: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "z. B. Training"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "habit-pri",
						children: "Priorität"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
						id: "habit-pri",
						value: String(priority),
						onChange: (v) => setPriority(Number(v)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityOptions, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !name.trim(),
					children: "Anlegen"
				})
			]
		})] })
	});
}
function GoalDialog({ open, onClose }) {
	const add = useOps((s) => s.addGoal);
	const count = useOps((s) => s.goals.length);
	const [title, setTitle] = (0, import_react.useState)("");
	const [priority, setPriority] = (0, import_react.useState)(4);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [milestone, setMilestone] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
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
		add({
			title,
			priority,
			progress,
			milestone,
			note
		});
		toast.success("Ziel angelegt");
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Neues Ziel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Fortschritt und nächster Meilenstein." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "goal-title",
						children: "Titel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "goal-title",
						autoFocus: true,
						value: title,
						onChange: (e) => setTitle(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "goal-pri",
							children: "Priorität"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
							id: "goal-pri",
							value: String(priority),
							onChange: (v) => setPriority(Number(v)),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityOptions, {})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label$1, {
							htmlFor: "goal-prog",
							children: [
								"Fortschritt ",
								progress,
								"%"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							id: "goal-prog",
							type: "range",
							min: 0,
							max: 100,
							value: progress,
							onChange: (e) => setProgress(Number(e.target.value)),
							className: "h-10 w-full accent-accent"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "goal-ms",
						children: "Nächster Meilenstein"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "goal-ms",
						value: milestone,
						onChange: (e) => setMilestone(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
						htmlFor: "goal-note",
						children: "Notiz"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "goal-note",
						rows: 3,
						value: note,
						onChange: (e) => setNote(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !title.trim(),
					children: "Anlegen"
				})
			]
		})] })
	});
}
function HoldingDialog({ open, id, onClose }) {
	const holdings = useOps((s) => s.holdings);
	const upsert = useOps((s) => s.upsertHolding);
	const remove = useOps((s) => s.removeHolding);
	const existing = (0, import_react.useMemo)(() => holdings.find((h) => h.id === id) ?? null, [holdings, id]);
	const [ticker, setTicker] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [shares, setShares] = (0, import_react.useState)("0");
	const [avgCost, setAvgCost] = (0, import_react.useState)("0");
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const h = existing;
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
			avgCost: Number(avgCost.replace(",", ".")) || 0
		});
		toast.success(existing ? "Position aktualisiert" : "Position gespeichert");
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: existing ? "Position bearbeiten" : "Position / Ticker" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Stückzahl 0 legt nur eine Watchlist-Position an." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-3",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "h-ticker",
							children: "Ticker"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "h-ticker",
							autoFocus: true,
							value: ticker,
							onChange: (e) => setTicker(e.target.value.toUpperCase()),
							placeholder: "NVDA",
							className: "font-mono uppercase"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "h-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "h-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "optional"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "h-shares",
							children: "Stück"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "h-shares",
							type: "number",
							min: 0,
							step: "any",
							value: shares,
							onChange: (e) => setShares(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label$1, {
							htmlFor: "h-cost",
							children: "Einstieg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "h-cost",
							type: "number",
							min: 0,
							step: "any",
							value: avgCost,
							onChange: (e) => setAvgCost(e.target.value)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "flex-1",
						disabled: !ticker.trim(),
						children: "Speichern"
					}), existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "danger",
						onClick: () => {
							remove(existing.id);
							toast.message("Position entfernt");
							onClose();
						},
						children: "Löschen"
					}) : null]
				})
			]
		})] })
	});
}
function HabitCheckSheet({ open, onClose }) {
	const habits = useOps((s) => s.habits);
	const toggle = useOps((s) => s.toggleHabit);
	const today = localISO();
	const openHabits = [...habits].sort((a, b) => b.priority - a.priority).filter((h) => !h.checks.includes(today));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "bottom",
			className: "max-h-[80vh]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Habits abhaken" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2 overflow-auto px-5 pb-6",
				children: openHabits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Alles erledigt für heute."
				}) : openHabits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => toggle(h.id, today),
					className: cn("min-h-11 rounded-lg bg-surface-2 px-3 py-3 text-left text-sm hover:bg-surface-3", h.priority >= 4 && "font-medium"),
					children: h.name
				}, h.id))
			})]
		})
	});
}
function PriorityOptions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "5",
			children: "Kritisch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "4",
			children: "Hoch"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "3",
			children: "Mittel"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "2",
			children: "Niedrig"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "1",
			children: "Neben"
		})
	] });
}
var badgeVariants = cva("inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "bg-surface-3 text-muted",
		ok: "bg-ok/15 text-ok",
		warn: "bg-warn/15 text-warn",
		danger: "bg-danger/15 text-danger",
		info: "bg-info/15 text-info",
		accent: "bg-accent/15 text-accent"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var analyzeTicker = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("3194eb63d1c191ac3b3aed0ebdeb0964fc3442e69d3cc672cc2d4825c9c9478f"));
var OpsUiContext = (0, import_react.createContext)(null);
function useOpsUi() {
	const ctx = (0, import_react.useContext)(OpsUiContext);
	if (!ctx) throw new Error("useOpsUi must be used within dashboard");
	return ctx;
}
function Sparkline({ values, className, tone = "neutral" }) {
	if (values.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-6", className) });
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const w = 100;
	const h = 24;
	const pts = values.map((v, i) => {
		const x = i / (values.length - 1) * w;
		const y = 2 + (1 - (v - min) / span) * 20;
		return `${x.toFixed(2)},${y.toFixed(2)}`;
	});
	const color = tone === "up" ? "var(--color-ok)" : tone === "down" ? "var(--color-danger)" : "var(--color-steel)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-6 w-full", className),
		preserveAspectRatio: "none",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: color,
			strokeWidth: "1.4",
			strokeLinejoin: "round",
			strokeLinecap: "round",
			points: pts.join(" ")
		})
	});
}
function FinancePanel({ className, quotes, loading }) {
	const holdings = useOps((s) => s.holdings);
	const analyses = useOps((s) => s.analyses);
	const setAnalysis = useOps((s) => s.setAnalysis);
	const ui = useOpsUi();
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const quoteMap = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const q of quotes) map.set(q.ticker.toUpperCase(), q);
		return map;
	}, [quotes]);
	const rows = (0, import_react.useMemo)(() => {
		return [...holdings].map((h) => {
			const q = quoteMap.get(h.ticker.toUpperCase()) ?? null;
			const value = q && h.shares > 0 ? q.price * h.shares : 0;
			const cost = h.shares > 0 ? h.avgCost * h.shares : 0;
			const pnl = value - cost;
			return {
				holding: h,
				quote: q,
				value,
				cost,
				pnl,
				pnlPct: cost > 0 ? pnl / cost * 100 : 0
			};
		}).sort((a, b) => b.value - a.value || a.holding.ticker.localeCompare(b.holding.ticker));
	}, [holdings, quoteMap]);
	const totals = (0, import_react.useMemo)(() => {
		const by = {};
		for (const row of rows) {
			if (!row.quote || row.holding.shares <= 0) continue;
			const cur = row.quote.currency;
			const t = by[cur] ?? {
				value: 0,
				cost: 0,
				pnl: 0
			};
			t.value += row.value;
			t.cost += row.cost;
			t.pnl += row.pnl;
			by[cur] = t;
		}
		return Object.entries(by);
	}, [rows]);
	const analyze = useMutation({
		mutationFn: (input) => analyzeTicker({ data: input }),
		onSuccess: (res) => {
			if (!res.ok) {
				toast.error(res.error);
				return;
			}
			setAnalysis(res.analysis);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		title: "Finanzen & Aktien",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			onClick: () => ui.openHolding(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Position hinzufügen"
			})]
		}),
		children: [
			totals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: totals.map(([cur, t]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-surface-2 px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] tracking-wide text-subtle uppercase",
							children: ["Portfolio ", cur]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-lg leading-tight font-medium tracking-tight tabular",
							children: formatMoney(t.value, cur)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("font-mono text-xs tabular", t.pnl >= 0 ? "text-ok" : "text-danger"),
							children: [
								formatMoney(t.pnl, cur),
								" · ",
								formatPct(t.cost > 0 ? t.pnl / t.cost * 100 : 0)
							]
						})
					]
				}, cur))
			}) : null,
			loading && quotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-md bg-surface-2" }, i))
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Noch keine Ticker. Position anlegen."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldingRow, {
					row,
					analysis: analyses[row.holding.ticker],
					open: openId === row.holding.id,
					analyzing: analyze.isPending && analyze.variables?.ticker === row.holding.ticker,
					onToggle: () => setOpenId((id) => id === row.holding.id ? null : row.holding.id),
					onEdit: () => ui.openHolding(row.holding.id),
					onAnalyze: () => {
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
							avgCost: row.holding.avgCost
						});
					}
				}, row.holding.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[10px] tracking-wide text-subtle uppercase",
				children: "Grok-Einschätzung ist Analyse, keine Anlageberatung"
			})
		]
	});
}
function HoldingRow({ row, analysis, open, analyzing, onToggle, onEdit, onAnalyze }) {
	const { holding, quote, value, pnl, pnlPct } = row;
	const day = quote?.dayPct ?? 0;
	const owned = holding.shares > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg bg-surface-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex w-full min-h-11 items-center gap-2 px-2.5 py-2 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm font-medium tracking-wide",
							children: holding.ticker
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-xs text-muted",
							children: quote?.name || holding.name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[10px] tabular text-subtle",
						children: [quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatMoney(quote.price, quote.currency) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: day >= 0 ? "text-ok" : "text-danger",
								children: [formatPct(day), " Tag"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: quote.weekPct >= 0 ? "text-ok" : "text-danger",
								children: [formatPct(quote.weekPct), " Wo"]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kurs n/a" }), owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							holding.shares,
							" × ",
							formatMoney(holding.avgCost, quote?.currency ?? "USD")
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Watchlist" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden w-20 shrink-0 sm:block",
					children: quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
						values: quote.closes,
						tone: quote.weekPct >= 0 ? "up" : "down"
					}) : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[5.5rem] shrink-0 text-right",
					children: owned && quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm tabular",
						children: formatMoney(value, quote.currency)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-mono text-[10px] tabular", pnl >= 0 ? "text-ok" : "text-danger"),
						children: formatPct(pnlPct)
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-subtle",
						children: "—"
					})
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-border px-2.5 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onEdit,
						children: "Position"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onAnalyze,
						disabled: analyzing || !quote,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, { className: "size-3.5" }), analyzing ? "Analysiert …" : "Grok-Analyse"]
					})]
				}),
				quote && (quote.low52 || quote.high52) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeBar, {
					low: quote.low52,
					high: quote.high52,
					price: quote.price,
					currency: quote.currency
				}) : null,
				analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisBlock, { analysis }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Analyse auf Knopfdruck. Ergebnis wird lokal gespeichert."
				})
			]
		}) : null]
	});
}
function RangeBar({ low, high, price, currency }) {
	if (low == null || high == null || high <= low) return null;
	const pct = Math.min(100, Math.max(0, (price - low) / (high - low) * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex justify-between font-mono text-[10px] text-subtle tabular",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatMoney(low, currency) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "52 Wochen" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatMoney(high, currency) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-1 rounded-full bg-surface-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent",
				style: { left: `${pct}%` }
			})
		})]
	});
}
function recVariant(rec) {
	if (rec === "Kaufen") return "ok";
	if (rec === "Verkaufen") return "danger";
	return "warn";
}
function AnalysisBlock({ analysis }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: recVariant(analysis.rec),
					children: analysis.rec
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-subtle",
					children: "Analyse, keine Beratung"
				})]
			}),
			analysis.view ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg/90",
				children: analysis.view
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-[10px] tracking-wide text-subtle uppercase",
						children: "Stärken"
					}), analysis.strengths.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-ok/90",
						children: s
					}, s))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-[10px] tracking-wide text-subtle uppercase",
						children: "Risiken"
					}), analysis.risks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-danger/90",
						children: s
					}, s))]
				})]
			}),
			analysis.quarter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2 rounded-md bg-surface-3/60 p-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Quartal",
						value: analysis.quarter.period
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Umsatz",
						value: analysis.quarter.revenue
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Gewinn",
						value: analysis.quarter.profit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "EPS",
						value: analysis.quarter.eps
					})
				]
			}) : null
		]
	});
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs",
		children: value || "—"
	})] });
}
var PRESETS = [
	25,
	50,
	90
];
function FocusPanel({ className }) {
	const focus = useOps((s) => s.focus);
	const tasks = useOps((s) => s.tasks);
	const startFocus = useOps((s) => s.startFocus);
	const stopFocus = useOps((s) => s.stopFocus);
	const setFocusTask = useOps((s) => s.setFocusTask);
	const [now, setNow] = (0, import_react.useState)(Date.now());
	(0, import_react.useEffect)(() => {
		if (!focus.running) return;
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, [focus.running]);
	const remaining = (0, import_react.useMemo)(() => {
		if (!focus.running || !focus.startedAt) return focus.durationSec;
		const elapsed = Math.floor((now - focus.startedAt) / 1e3);
		return Math.max(0, focus.durationSec - elapsed);
	}, [focus, now]);
	(0, import_react.useEffect)(() => {
		if (!focus.running || remaining > 0) return;
		stopFocus(true);
		const task = tasks.find((t) => t.id === focus.taskId);
		toast.success("Fokus-Session beendet", { description: task ? task.title : "Zeit ist um." });
	}, [
		remaining,
		focus.running,
		focus.taskId,
		stopFocus,
		tasks
	]);
	const openTasks = tasks.filter((t) => !t.done || t.id === focus.taskId).sort((a, b) => Number(a.bucket !== "today") - Number(b.bucket !== "today"));
	const progress = focus.durationSec > 0 ? 1 - remaining / focus.durationSec : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className,
		title: "Fokus & Zeit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col items-center justify-center gap-4 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerRing, {
					progress: focus.running ? progress : 0,
					remaining
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					"aria-label": "Verknüpfter Task",
					value: focus.taskId ?? "",
					onChange: (e) => setFocusTask(e.target.value || null),
					className: "max-w-full rounded-md bg-surface-2 px-2 py-1.5 text-center text-sm text-fg shadow-card outline-none focus-visible:ring-2 focus-visible:ring-steel/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Kein Task verknüpft"
					}), openTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t.id,
						children: t.title
					}, t.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-center gap-1.5",
					children: PRESETS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: !focus.running && focus.durationSec === m * 60 ? "secondary" : "ghost",
						size: "sm",
						onClick: () => startFocus(m * 60, focus.taskId),
						children: [m, " min"]
					}, m))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: focus.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => stopFocus(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), "Stoppen"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => startFocus(focus.durationSec || 1500, focus.taskId),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "Start"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid w-full grid-cols-2 gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Heute",
						value: formatDuration(focus.todaySec + (focus.running ? focus.durationSec - remaining : 0))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Sessions",
						value: String(focus.sessionsToday)
					})]
				})
			]
		})
	});
}
function TimerRing({ progress, remaining }) {
	const r = 54;
	const c = 2 * Math.PI * r;
	const dash = c * Math.min(1, Math.max(0, progress));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-44",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 128 128",
			className: "size-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "64",
				cy: "64",
				r,
				fill: "none",
				className: "stroke-surface-3",
				strokeWidth: "6"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "64",
				cy: "64",
				r,
				fill: "none",
				className: "stroke-accent",
				strokeWidth: "6",
				strokeLinecap: "round",
				strokeDasharray: `${dash} ${c}`
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-4xl font-medium tracking-tight tabular",
				children: formatDuration(remaining)
			})
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md bg-surface-2 px-3 py-2"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] tracking-wide text-subtle uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-sm tabular",
			children: value
		})]
	});
}
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		value,
		className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-surface-3", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
			className: "h-full bg-accent transition-[width] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { width: `${value ?? 0}%` }
		})
	});
}
function GoalsPanel({ className }) {
	const goals = useOps((s) => s.goals);
	const remove = useOps((s) => s.removeGoal);
	const ui = useOpsUi();
	const ranked = [...goals].sort((a, b) => b.priority - a.priority).slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className,
		title: "Ziele",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			onClick: ui.openGoal,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Ziel hinzufügen"
			})]
		}),
		children: ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Noch keine Ziele definiert."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
			children: ranked.map((goal) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalCard, {
				goal,
				onRemove: () => remove(goal.id)
			}, goal.id))
		})
	});
}
function GoalCard({ goal, onRemove }) {
	const prominent = goal.priority >= 4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("group relative rounded-lg bg-surface-2 p-3", prominent && "sm:col-span-2"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("truncate text-sm", prominent ? "font-medium" : "text-fg"),
						children: goal.title
					}), goal.milestone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs text-muted",
						children: goal.milestone
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-sm tabular text-steel",
					children: [Math.round(goal.progress), "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: goal.progress }),
			goal.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-muted", prominent ? "text-sm" : "text-xs"),
				children: goal.note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100",
				onClick: onRemove,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Ziel löschen"
				})]
			})
		]
	});
}
function HabitsPanel({ className }) {
	const habits = useOps((s) => s.habits);
	const toggle = useOps((s) => s.toggleHabit);
	const remove = useOps((s) => s.removeHabit);
	const ui = useOpsUi();
	const today = localISO();
	const ranked = [...habits].sort((a, b) => b.priority - a.priority).slice(0, 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className,
		title: "Habits",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			onClick: ui.openHabit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Habit hinzufügen"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1.5",
			children: ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Noch keine Habits."
			}) : ranked.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitRow, {
				habit,
				today,
				onToggle: () => toggle(habit.id, today),
				onRemove: () => remove(habit.id)
			}, habit.id))
		})
	});
}
function HabitRow({ habit, today, onToggle, onRemove }) {
	const done = habit.checks.includes(today);
	const streak = streakFrom(habit.checks, today);
	const scale = habit.priority >= 5 ? "min-h-12 py-2.5 text-sm font-medium" : habit.priority >= 4 ? "min-h-11 py-2 text-sm" : habit.priority >= 3 ? "min-h-11 py-1.5 text-sm" : "min-h-10 py-1 text-xs text-muted";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group flex w-full items-center gap-2 rounded-md pr-1 transition-colors duration-150", done ? "bg-ok/10" : "bg-surface-2 hover:bg-surface-3", scale),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex min-w-0 flex-1 items-center gap-3 px-2 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("grid size-4 shrink-0 place-items-center rounded-full shadow-card", done ? "bg-ok" : "bg-surface-3") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: habit.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[10px] text-subtle tabular",
					children: [streak, "d"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayStrip, { checks: habit.checks })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			className: "opacity-0 group-hover:opacity-100",
			onClick: onRemove,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Habit löschen"
			})]
		})]
	});
}
function DayStrip({ checks }) {
	const days = lastNDays(14);
	const set = new Set(checks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "hidden items-center gap-px sm:flex",
		"aria-hidden": true,
		children: days.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-1 rounded-full", set.has(d) ? "bg-ok" : "bg-surface-3", i < 7 && "opacity-60") }, d))
	});
}
function InboxPanel({ className, messages, error, loginUrl, loading, onChanged }) {
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [replyTo, setReplyTo] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [body, setBody] = (0, import_react.useState)(null);
	const modify = useMutation({
		mutationFn: (input) => modifyMail(input),
		onSuccess: (res) => {
			if (!res.ok) {
				toast.error(res.message);
				if (res.loginUrl) redirectToLoginIfRequired({
					ok: false,
					data: null,
					loginRequired: res.kind === "login",
					loginUrl: res.loginUrl,
					errorMessage: res.message
				});
				return;
			}
			onChanged();
		}
	});
	const loadBody = useMutation({
		mutationFn: (id) => loadMailBody({ data: { messageId: id } }),
		onSuccess: (res) => {
			if (!res.ok) {
				setBody(res.message);
				return;
			}
			setBody(res.body);
		}
	});
	const saveDraft = useMutation({
		mutationFn: (input) => createMailDraft(input),
		onSuccess: (res) => {
			if (!res.ok) {
				toast.error(res.message);
				return;
			}
			toast.success("Antwort als Entwurf gespeichert");
			setReplyTo(null);
			setDraft("");
		}
	});
	function openMail(m) {
		setOpenId(m.id);
		setBody(null);
		loadBody.mutate(m.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		title: "Gmail · Ungelesen & Wichtig",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[11px] text-subtle tabular",
			children: messages.length
		}),
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-start justify-center gap-3 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-5 text-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: error.message
					}),
					loginUrl && error.kind === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => redirectToLoginIfRequired({
							ok: false,
							data: null,
							loginRequired: true,
							loginUrl,
							errorMessage: error.message
						}),
						children: "Mit Grok fortfahren"
					}) : null
				]
			}) : loading && messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-md bg-surface-2" }, i))
			}) : messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-8 text-sm text-muted",
				children: "Inbox ruhig. Nichts Wichtiges offen."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1 overflow-auto",
				children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "group rounded-md hover:bg-surface-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openMail(m),
							className: "flex min-w-0 flex-1 gap-3 px-2 py-2 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1 size-1.5 shrink-0 rounded-full", m.unread ? "bg-info" : "bg-subtle") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-sm font-medium",
											children: m.from
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px] text-subtle tabular",
											children: formatMailDate(m.date)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm text-fg/90",
										children: m.subject
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-xs text-muted",
										children: m.snippet
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-0.5 py-1 pr-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									title: m.unread ? "Gelesen" : "Ungelesen",
									onClick: () => modify.mutate({ data: {
										messageId: m.id,
										remove: m.unread ? ["UNREAD"] : void 0,
										add: m.unread ? void 0 : ["UNREAD"]
									} }),
									children: m.unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									title: "Archiv",
									onClick: () => modify.mutate({ data: {
										messageId: m.id,
										remove: ["INBOX"]
									} }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-3.5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									title: "Stern",
									onClick: () => modify.mutate({ data: {
										messageId: m.id,
										add: m.starred ? void 0 : ["STARRED"],
										remove: m.starred ? ["STARRED"] : void 0
									} }),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-3.5", m.starred && "fill-warn text-warn") })
								})
							]
						})]
					})
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: Boolean(openId),
				onOpenChange: (o) => !o && setOpenId(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					className: "p-0",
					children: (() => {
						const mail = messages.find((x) => x.id === openId);
						if (!mail) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: mail.subject }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [mail.from, mail.fromEmail ? ` · ${mail.fromEmail}` : ""]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-1 px-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => modify.mutate({ data: {
											messageId: mail.id,
											remove: mail.unread ? ["UNREAD"] : void 0,
											add: mail.unread ? void 0 : ["UNREAD"]
										} }),
										children: [mail.unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }), mail.unread ? "Gelesen" : "Ungelesen"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => modify.mutate({ data: {
											messageId: mail.id,
											remove: ["INBOX"]
										} }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-4" }), "Archiv"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => modify.mutate({ data: {
											messageId: mail.id,
											add: mail.starred ? void 0 : ["STARRED"],
											remove: mail.starred ? ["STARRED"] : void 0
										} }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", mail.starred && "fill-warn text-warn") }), "Stern"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "secondary",
										onClick: () => {
											setReplyTo(mail);
											setDraft("");
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reply, { className: "size-4" }), "Entwurf"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-auto px-5 py-4 text-sm whitespace-pre-wrap text-muted",
								children: body ?? mail.snippet
							})
						] });
					})()
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: Boolean(replyTo),
				onOpenChange: (o) => !o && setReplyTo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Schnellantwort" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Wird als Gmail-Entwurf gespeichert, nicht gesendet." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["An ", replyTo?.from]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "Antwort …",
						rows: 6
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !draft.trim() || saveDraft.isPending,
						onClick: () => {
							if (!replyTo) return;
							saveDraft.mutate({ data: {
								to: replyTo.fromEmail || replyTo.from,
								subject: replyTo.subject.startsWith("Re:") ? replyTo.subject : `Re: ${replyTo.subject}`,
								body: draft,
								messageId: replyTo.id,
								threadId: replyTo.threadId
							} });
						},
						children: "Entwurf speichern"
					})
				] })
			})
		]
	});
}
function formatMailDate(raw) {
	if (!raw) return "";
	const n = Number(raw);
	const d = Number.isFinite(n) && n > 0xe8d4a51000 ? new Date(n) : Number.isFinite(n) && n > 1e9 ? /* @__PURE__ */ new Date(n * 1e3) : new Date(raw);
	if (Number.isNaN(d.getTime())) return raw;
	if (localISO(d) === localISO()) return formatTimeShort(d);
	return new Intl.DateTimeFormat("de-DE", {
		day: "numeric",
		month: "short"
	}).format(d);
}
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer relative size-5 shrink-0 rounded-sm shadow-card data-[state=checked]:bg-accent data-[state=checked]:text-accent-fg focus-visible:ring-2 focus-visible:ring-steel/40 outline-none after:absolute after:top-1/2 after:left-1/2 after:size-10 after:-translate-x-1/2 after:-translate-y-1/2", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3.5",
				strokeWidth: 3
			})
		})
	});
}
function pLabel(p) {
	return `P${6 - p}`;
}
function PrioritiesPanel({ className }) {
	const tasks = useOps((s) => s.tasks);
	const toggle = useOps((s) => s.toggleTask);
	const remove = useOps((s) => s.removeTask);
	const ui = useOpsUi();
	const today = tasks.filter((t) => t.bucket === "today").sort(sortTasks).slice(0, 5);
	const later = tasks.filter((t) => t.bucket === "later").sort(sortTasks);
	const week = tasks.filter((t) => t.bucket === "week").sort(sortTasks);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		className,
		title: "Heute · Top Prioritäten",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "icon-sm",
			onClick: () => ui.openTask("today"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Task hinzufügen"
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-1.5",
				children: today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { text: "Keine Prioritäten für heute." }) : today.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRow, {
					task,
					prominent: true,
					onToggle: () => toggle(task.id),
					onFocus: () => ui.startQuickFocus(task.minutes || 25, task.id),
					onRemove: () => remove(task.id)
				}, task.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bucket, {
				title: "Später heute",
				items: later,
				onAdd: () => ui.openTask("later"),
				onToggle: toggle,
				onFocus: (t) => ui.startQuickFocus(t.minutes || 25, t.id),
				onRemove: remove
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bucket, {
				title: "Diese Woche",
				items: week,
				onAdd: () => ui.openTask("week"),
				onToggle: toggle,
				onFocus: (t) => ui.startQuickFocus(t.minutes || 25, t.id),
				onRemove: remove
			})
		]
	});
}
function sortTasks(a, b) {
	if (a.done !== b.done) return a.done ? 1 : -1;
	return b.priority - a.priority;
}
function Bucket({ title, items, onAdd, onToggle, onFocus, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-wide text-subtle uppercase",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onAdd,
				className: "text-[11px] text-muted hover:text-fg",
				children: "Hinzufügen"
			})]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: "Nichts geplant."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-1",
			children: items.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskRow, {
				task,
				onToggle: () => onToggle(task.id),
				onFocus: () => onFocus(task),
				onRemove: () => onRemove(task.id)
			}, task.id))
		})]
	});
}
function TaskRow({ task, prominent, onToggle, onFocus, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("group flex min-h-11 items-center gap-2 rounded-lg bg-surface-2 px-2 py-1.5", prominent && "py-2", task.done && "opacity-50"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked: task.done,
				onCheckedChange: onToggle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("truncate text-sm", prominent && "font-medium", task.done && "line-through"),
					children: task.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-[10px] text-subtle tabular",
					children: [
						pLabel(task.priority),
						" · ",
						task.minutes,
						" min"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "opacity-70 group-hover:opacity-100",
				onClick: onFocus,
				title: "Fokus auf diese Aufgabe starten",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon-sm",
				className: "opacity-0 group-hover:opacity-100",
				onClick: onRemove,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
			})
		]
	});
}
function Empty({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: text
	});
}
function StatusBar({ unreadCount, refreshing }) {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const tasks = useOps((s) => s.tasks);
	const habits = useOps((s) => s.habits);
	const focus = useOps((s) => s.focus);
	const ui = useOpsUi();
	const today = localISO(now);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const openPri = tasks.filter((t) => t.bucket === "today" && !t.done).length;
	const openHabits = habits.filter((h) => !h.checks.includes(today)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/92 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] tracking-[0.28em] text-steel uppercase",
						children: "Nexus"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-2xl leading-none font-medium tabular tracking-tight sm:text-3xl",
						children: formatClock(now)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pb-0.5 text-sm text-muted capitalize",
						children: formatDateLong(now)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							label: `${openPri} Prioritäten offen`,
							tone: openPri === 0 ? "ok" : "warn"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							label: `${openHabits} Habits offen`,
							tone: openHabits === 0 ? "ok" : "default"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							label: unreadCount == null ? "Mails …" : `${unreadCount} wichtige ungelesen`,
							tone: unreadCount && unreadCount > 0 ? "info" : "default"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, {
							label: focus.running ? "Fokus aktiv" : "Fokus idle",
							tone: focus.running ? "ok" : "default"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => ui.openTask(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListPlus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Neuer Task"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: ui.openHabitCheck,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Habit abhaken"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => ui.startQuickFocus(25),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Focus, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Fokus starten"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: ui.focusCapture,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookPen, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Notiz"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: ui.refreshAll,
							disabled: refreshing,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-4 ${refreshing ? "animate-spin" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden md:inline",
								children: "Aktualisieren"
							})]
						})
					]
				})
			]
		})
	});
}
function StatusChip({ label, tone }) {
	const toneClass = tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : tone === "info" ? "text-info" : "text-muted";
	const dot = tone === "ok" ? "bg-ok" : tone === "warn" ? "bg-warn" : tone === "info" ? "bg-info" : "bg-subtle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 rounded-md bg-surface px-2 py-1 text-[11px] shadow-card ${toneClass}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${dot}` }), label]
	});
}
function Dashboard() {
	const hydrated = useOps((s) => s.hydrated);
	const holdings = useOps((s) => s.holdings);
	const startFocus = useOps((s) => s.startFocus);
	const tickFocusDay = useOps((s) => s.tickFocusDay);
	const [dialog, setDialog] = (0, import_react.useState)({ type: "none" });
	const tickers = (0, import_react.useMemo)(() => holdings.map((h) => h.ticker).filter(Boolean), [holdings]);
	const inboxQuery = useQuery({
		queryKey: ["inbox"],
		queryFn: () => loadInbox(),
		refetchInterval: (q) => q.state.data && q.state.data.ok === false ? false : 9e4
	});
	const quotesQuery = useQuery({
		queryKey: ["quotes", tickers],
		queryFn: () => fetchQuotes({ data: { tickers } }),
		enabled: tickers.length > 0,
		refetchInterval: 6e4
	});
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => tickFocusDay(), 6e4);
		return () => window.clearInterval(id);
	}, [tickFocusDay]);
	const ui = (0, import_react.useMemo)(() => ({
		openTask: (bucket = "today") => setDialog({
			type: "task",
			bucket
		}),
		openHabit: () => setDialog({ type: "habit" }),
		openHabitCheck: () => setDialog({ type: "habit-check" }),
		openGoal: () => setDialog({ type: "goal" }),
		openHolding: (id) => setDialog({
			type: "holding",
			id
		}),
		startQuickFocus: (minutes = 25, taskId) => {
			startFocus(minutes * 60, taskId);
		},
		focusCapture: () => {
			const el = document.getElementById("quick-capture");
			el?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			if (el instanceof HTMLTextAreaElement) el.focus();
		},
		refreshAll: () => {
			inboxQuery.refetch();
			quotesQuery.refetch();
		}
	}), [
		inboxQuery,
		quotesQuery,
		startFocus
	]);
	const messages = inboxQuery.data && inboxQuery.data.ok ? inboxQuery.data.messages : [];
	const mailError = inboxQuery.data && !inboxQuery.data.ok ? {
		kind: inboxQuery.data.kind,
		message: germanMailError(inboxQuery.data.kind, inboxQuery.data.message)
	} : inboxQuery.isError ? {
		kind: "error",
		message: "Gmail ist gerade nicht erreichbar."
	} : null;
	const loginUrl = inboxQuery.data && !inboxQuery.data.ok ? inboxQuery.data.loginUrl : void 0;
	const unreadCount = inboxQuery.data && inboxQuery.data.ok ? messages.filter((m) => m.unread).length : null;
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg",
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
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OpsUiContext.Provider, {
		value: ui,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-dvh flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBar, {
				unreadCount,
				refreshing: inboxQuery.isFetching || quotesQuery.isFetching
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-[1600px] flex-1 px-4 py-3 pb-8 sm:px-6 lg:py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 lg:grid-cols-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrioritiesPanel, { className: "lg:col-span-4 lg:row-span-2 min-h-80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusPanel, { className: "lg:col-span-4 min-h-80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitsPanel, { className: "lg:col-span-4 min-h-80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InboxPanel, {
							className: "lg:col-span-5 min-h-96",
							messages,
							error: mailError,
							loginUrl,
							loading: inboxQuery.isPending,
							onChanged: () => void inboxQuery.refetch()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancePanel, {
							className: "lg:col-span-7 min-h-96",
							quotes: quotesQuery.data ?? [],
							loading: quotesQuery.isPending
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalsPanel, { className: "lg:col-span-8" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CapturePanel, { className: "lg:col-span-4" })
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandDialogs, {
			state: dialog,
			onClose: () => setDialog({ type: "none" })
		})]
	});
}
function germanMailError(kind, fallback) {
	switch (kind) {
		case "login": return "Mit Grok fortfahren, um Gmail zu laden.";
		case "not_connected": return "Gmail in Grok verbinden, dann aktualisieren.";
		case "scope_denied": return "Gmail-Berechtigung fehlt für diese Ansicht.";
		case "access_denied": return "Kein Zugriff auf die Inbox.";
		default: return fallback || "Gmail ist gerade nicht erreichbar.";
	}
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
//#endregion
export { Home as component };
