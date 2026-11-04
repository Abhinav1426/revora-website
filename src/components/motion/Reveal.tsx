"use client";

import type { ReactNode } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const; // --ease-out-soft

type RevealProps = {
  children: ReactNode;
  /** Seconds. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  as?: "div" | "section" | "article" | "li" | "p" | "span";
  className?: string;
};

/** Fade and rise on first view, 500ms, once. Renders plain markup under reduced motion. */
export function Reveal({ children, delay = 0, y = 12, as = "div", className }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  return (
    <LazyMotion features={domAnimation} strict>
      <Tag
        data-reveal
        className={className}
        initial={reduce ? false : { opacity: 0, y }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: EASE, delay }}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
}
