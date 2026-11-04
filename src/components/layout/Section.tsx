import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";
import { Container } from "@/components/layout/Container";

const BG = {
  white: "bg-white text-navy",
  paper: "bg-paper text-navy",
  navy: "bg-linear-to-b from-navy to-blue text-white",
  blue: "bg-blue text-white",
} as const;

/** 64-96px mobile, 96-160px desktop at the top of the scale. */
const SPACING = {
  sm: "py-16 md:py-24",
  md: "py-20 md:py-32",
  lg: "py-24 md:py-40",
} as const;

type SectionProps = Omit<ComponentProps<"section">, "children"> & {
  bg?: keyof typeof BG;
  spacing?: keyof typeof SPACING;
  /** Margin note such as "01". Shown with `label` as a numbered margin label. */
  number?: string;
  label?: string;
  children: ReactNode;
};

/**
 * Page section wrapper. Navy and blue sections set data-tone="dark", which flips
 * text, eyebrow, link, border and card colours for everything inside via CSS variables.
 */
export function Section({
  bg = "white",
  spacing = "md",
  number,
  label,
  className,
  children,
  ...props
}: SectionProps) {
  const dark = bg === "navy" || bg === "blue";
  const hasMargin = Boolean(number || label);
  return (
    <section
      data-tone={dark ? "dark" : undefined}
      className={cn(BG[bg], SPACING[spacing], className)}
      {...props}
    >
      <Container className={hasMargin ? "lg:grid lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-x-8" : undefined}>
        {hasMargin ? (
          <p className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase lg:mb-0 lg:flex-col lg:items-start lg:gap-3 lg:pt-3">
            {number ? (
              <span className="font-display text-base font-normal tracking-normal text-accent-text tabular-nums normal-case">
                {number}
              </span>
            ) : null}
            <span aria-hidden="true" className="h-px w-8 bg-gold lg:w-10" />
            {label ? <span>{label}</span> : null}
          </p>
        ) : null}
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}
