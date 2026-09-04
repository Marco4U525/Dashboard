import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-24 w-full rounded-md bg-surface-2 px-3 py-2 text-sm text-fg shadow-card outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-card-hover focus-visible:ring-2 focus-visible:ring-steel/40 disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
