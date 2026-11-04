"use client";

import type { SVGProps } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

type DrawPathProps = Omit<SVGProps<SVGSVGElement>, "d" | "children"> & {
  d: string;
  /** Seconds. Spec: 900ms. */
  duration?: number;
  delay?: number;
  strokeWidth?: number;
};

/**
 * An SVG stroke that draws itself (pathLength 0 to 1) once when it enters view.
 * Used by Swoosh and timeline lines. Stroke colour is currentColor.
 */
export function DrawPath({
  d,
  duration = 0.9,
  delay = 0,
  strokeWidth = 3,
  ...svgProps
}: DrawPathProps) {
  const reduce = useReducedMotion();

  return (
    <svg aria-hidden="true" focusable="false" fill="none" {...svgProps}>
      <LazyMotion features={domAnimation} strict>
        <m.path
          data-draw
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            pathLength: { duration, delay, ease: [0.65, 0, 0.35, 1] },
            opacity: { duration: 0.05, delay },
          }}
        />
      </LazyMotion>
    </svg>
  );
}
