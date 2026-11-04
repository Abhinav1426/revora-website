import type { ElementType, ReactNode } from "react";
import { cn } from "cn";
import { GoldDot } from "@/components/brand/GoldDot";

type EyebrowProps = {
  children: ReactNode;
  /** Optional leading gold dot. */
  dot?: boolean;
  as?: ElementType;
  className?: string;
};

/** Uppercase tracked label. Gold-ink on light, gold on dark (via data-tone context). */
export function Eyebrow({ children, dot = false, as: Tag = "p", className }: EyebrowProps) {
  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-2.5 font-sans text-xs font-semibold tracking-[0.14em] text-accent-text uppercase sm:text-[0.8125rem]",
        className
      )}
    >
      {dot ? <GoldDot size="0.6em" /> : null}
      {children}
    </Tag>
  );
}
