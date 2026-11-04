"use client";

import { Children, type ReactNode } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type StaggerProps = {
  children: ReactNode;
  /** Seconds between children. Spec: 60ms. */
  gap?: number;
  y?: number;
  /** Element for the container. Use "ul" or "ol" for lists; children become li. */
  as?: "div" | "ul" | "ol";
  className?: string;
  itemClassName?: string;
};

/** Wraps each direct child and reveals them in sequence (fade + 12px rise, 500ms), once. */
export function Stagger({
  children,
  gap = 0.06,
  y = 12,
  as = "div",
  className,
  itemClassName,
}: StaggerProps) {
  const reduce = useReducedMotion();
  const Container = m[as];
  const Item = as === "div" ? m.div : m.li;

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: gap } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <Container
        className={className}
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {Children.toArray(children).map((child, i) => (
          <Item key={i} data-reveal className={itemClassName} variants={item}>
            {child}
          </Item>
        ))}
      </Container>
    </LazyMotion>
  );
}
