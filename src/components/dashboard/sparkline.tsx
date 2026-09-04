import { cn } from "@/lib/utils";

export function Sparkline({
  values,
  className,
  tone = "neutral",
}: {
  values: number[];
  className?: string;
  tone?: "up" | "down" | "neutral";
}) {
  if (values.length < 2) {
    return <span className={cn("block h-6", className)} />;
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 100;
  const h = 24;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = 2 + (1 - (v - min) / span) * (h - 4);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const color =
    tone === "up" ? "var(--color-ok)" : tone === "down" ? "var(--color-danger)" : "var(--color-steel)";
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-6 w-full", className)}
      preserveAspectRatio="none"
      aria-hidden
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts.join(" ")}
      />
    </svg>
  );
}
