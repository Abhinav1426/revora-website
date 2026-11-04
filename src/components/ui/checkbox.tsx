"use client"

import * as React from "react"
import { cn } from "cn"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm border-[1.5px] border-slate bg-white text-white transition-colors duration-150 after:absolute after:-inset-3 hover:border-navy disabled:cursor-not-allowed disabled:border-line disabled:bg-paper aria-invalid:border-2 aria-invalid:border-gold-ink data-[state=checked]:border-navy data-[state=checked]:bg-navy",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon className="size-3.5" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
