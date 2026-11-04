import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"
import { ArrowRightIcon } from "lucide-react"

/**
 * Variants (spec/02): primary (navy fill), primary-on-dark (gold fill, for navy
 * and blue sections), outline, link-arrow (text link with underline and arrow).
 * Focus ring comes from the global :focus-visible rule (2px gold, 2px offset).
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border border-transparent text-[0.9375rem] leading-tight font-semibold whitespace-nowrap transition-colors duration-150 ease-out select-none disabled:pointer-events-none disabled:border-line disabled:bg-paper disabled:text-ink-muted/70 disabled:opacity-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg[data-arrow]]:transition-transform [&_svg[data-arrow]]:duration-150 [&_svg[data-arrow]]:ease-out hover:[&_svg[data-arrow]]:translate-x-[3px]",
  {
    variants: {
      variant: {
        primary:
          "rounded-pill bg-navy text-white hover:bg-blue",
        "primary-on-dark":
          "rounded-pill bg-gold text-navy hover:bg-white",
        outline:
          "rounded-pill border-fg bg-transparent text-fg hover:bg-fg hover:text-inverse",
        "link-arrow":
          "rounded-sm px-0 text-fg underline decoration-1 underline-offset-[6px] hover:decoration-2 [&_svg]:text-accent-text",
        ghost:
          "rounded-pill text-fg hover:bg-paper",
      },
      size: {
        default: "min-h-11 px-6 py-2.5",
        lg: "min-h-12 px-8 py-3 text-base",
        icon: "size-11 rounded-pill p-0",
      },
    },
    compoundVariants: [
      { variant: "link-arrow", size: ["default", "lg"], className: "px-0 py-2" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

/** The trailing arrow. Nudges 3px right when the parent Button is hovered. */
function ButtonArrow({ className }: { className?: string }) {
  return <ArrowRightIcon data-arrow aria-hidden="true" className={className} />
}

export { Button, ButtonArrow, buttonVariants }
