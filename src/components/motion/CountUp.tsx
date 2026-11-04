"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Seconds. Spec: 1.2s. */
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts up once when in view. The server (and no-JS, and reduced motion) render the final value.
 * Only ever pass confirmed figures: never invent statistics.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const final = `${prefix}${format(to, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${format(v, decimals)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = final;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, decimals, prefix, suffix, final]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {final}
    </span>
  );
}
