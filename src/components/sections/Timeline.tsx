import { Fragment } from "react";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Section } from "@/components/layout/Section";
import { DrawPath } from "@/components/motion/DrawPath";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { getPage } from "@/lib/content";

/** "How a hire works": text-only header (L5/R7), then a five-step timeline. Horizontal on lg, vertical below. */
export function Timeline() {
  const { howAHireWorks: h } = getPage("home");
  return (
    <Section bg="paper" spacing="md" aria-labelledby="how-a-hire-works-title">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow dot className="mb-5">
              <Text>{h.eyebrow}</Text>
            </Eyebrow>
            <h2 id="how-a-hire-works-title" className="text-h2">
              <Text>{h.title}</Text>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pt-10">
          <Reveal delay={0.08}>
            <p className="text-body-l text-fg-muted">
              <Text>{h.intro}</Text>
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 md:mt-20">
        {/* Desktop line: drawn left to right, from the first node to the last. */}
        <DrawPath
          d="M1 1 H99"
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          strokeWidth={2}
          duration={1.2}
          className="pointer-events-none absolute top-[5px] left-0 hidden h-[2px] w-[80%] overflow-visible text-navy lg:block"
        />
        {/* Mobile line: static vertical hairline. */}
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-[2px] bg-navy lg:hidden" />
        <Stagger
          as="ol"
          className="grid gap-10 lg:grid-cols-5 lg:gap-0"
          itemClassName="relative pl-9 lg:pt-10 lg:pr-8 lg:pl-0"
        >
          {h.steps.map((s) => (
            <Fragment key={s.marker}>
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 size-3 rounded-full bg-gold ring-4 ring-paper lg:top-0 lg:ring-0"
              />
              <p className="text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
                <Text>{s.marker}</Text>
              </p>
              <h3 className="mt-2 text-h3">
                <Text>{s.title}</Text>
              </h3>
              <p className="mt-3 text-small text-fg-muted">
                <Text>{s.text}</Text>
              </p>
            </Fragment>
          ))}
        </Stagger>
      </div>

      <p className="mt-14 max-w-[68ch] text-small text-fg-muted">
        <Text>{h.footnote}</Text>
      </p>
    </Section>
  );
}
