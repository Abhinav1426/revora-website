import type { ReactNode } from "react";
import { cn } from "cn";
import { DrawPath } from "@/components/motion/DrawPath";

/** Three slightly different hand-drawn curves (viewBox 0 0 200 20) so underlines do not look stamped. */
const PATHS = {
  a: "M2 14 C 40 6, 90 4, 130 8 S 185 16, 198 9",
  b: "M3 10 C 32 15, 72 17, 112 12 S 170 4, 197 9",
  c: "M2 9 C 28 4, 62 6, 98 11 C 132 16, 170 14, 198 6",
} as const;

export type SwooshVariant = keyof typeof PATHS;

type SwooshProps = {
  children: ReactNode;
  variant?: SwooshVariant;
  className?: string;
};

/**
 * Wraps one word with a drawn gold underline. Draws once in view,
 * static under prefers-reduced-motion. The animated leaf (DrawPath) is the client part.
 */
export function Swoosh({ children, variant = "a", className }: SwooshProps) {
  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {children}
      <DrawPath
        d={PATHS[variant]}
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        strokeWidth={3}
        className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.3em] w-full overflow-visible text-gold"
      />
    </span>
  );
}
