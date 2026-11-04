import * as React from "react"
import { cn } from "cn"
import { fieldBase } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldBase, "flex field-sizing-content min-h-32 py-3 leading-relaxed", className)}
      {...props}
    />
  )
}

export { Textarea }
