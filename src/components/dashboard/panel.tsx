import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-col rounded-2xl bg-surface p-3 shadow-card",
        className,
      )}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-[11px] font-medium tracking-[0.18em] text-muted uppercase">
          {title}
        </h2>
        {action}
      </header>
      <div className={cn("flex min-h-0 flex-1 flex-col", bodyClassName)}>
        {children}
      </div>
    </section>
  );
}
