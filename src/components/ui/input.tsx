import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-md bg-surface-2 px-3 text-sm text-fg shadow-card outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-card-hover focus-visible:ring-2 focus-visible:ring-steel/40 disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
