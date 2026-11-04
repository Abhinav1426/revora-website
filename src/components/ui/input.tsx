import * as React from "react"
import { cn } from "cn"

export const fieldBase =
  "w-full min-w-0 rounded-md border border-input bg-white px-4 text-base text-navy transition-colors duration-150 placeholder:text-ink-muted/70 hover:border-slate focus-visible:border-navy disabled:cursor-not-allowed disabled:bg-paper disabled:text-ink-muted/70 disabled:hover:border-input aria-invalid:border-2 aria-invalid:border-gold-ink"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        fieldBase,
        "h-12 file:mr-3 file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-navy",
        className
      )}
      {...props}
    />
  )
}

export { Input }
