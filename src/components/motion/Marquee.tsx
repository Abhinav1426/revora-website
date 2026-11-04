import type { CSSProperties, ReactNode } from "react";
import { cn } from "cn";

const SPEED = { slow: 70, normal: 45, fast: 28 } as const; // seconds per loop

type MarqueeProps = {
  /** List items (li). Provide enough to fill one screen width. */
  children: ReactNode;
  speed?: keyof typeof SPEED;
  /** Accessible name for the list, e.g. "We recruit for". */
  label?: string;
  className?: string;
};

/**
 * CSS-transform marquee. The second copy is aria-hidden and inert. Pauses on hover and
 * focus-within. Under prefers-reduced-motion (see globals.css) it becomes a static wrapped list.
 * Needs no JavaScript, so it stays a server component.
 */
export function Marquee({ children, speed = "normal", label, className }: MarqueeProps) {
  return (
    <div
      className={cn("marquee overflow-hidden", className)}
      style={{ "--marquee-duration": `${SPEED[speed]}s` } as CSSProperties}
    >
      <div className="marquee-track">
        <ul className="marquee-list" aria-label={label}>
          {children}
        </ul>
        <ul className="marquee-list marquee-copy" aria-hidden="true" inert>
          {children}
        </ul>
      </div>
    </div>
  );
}
