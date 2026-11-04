import { Eyebrow } from "@/components/brand/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";

type Props = {
  title: string;
  eyebrow?: string;
  steps: { title: string; text: string }[];
  bg?: "white" | "paper";
};

/** Horizontal numbered steps, four columns on desktop. A navy rule above each step, gold number. */
export function StepsRow({ title, eyebrow, steps, bg = "paper" }: Props) {
  return (
    <Section bg={bg} spacing="md" aria-labelledby="steps-row-title">
      <Reveal>
        {eyebrow ? (
          <Eyebrow dot className="mb-5">
            <Text>{eyebrow}</Text>
          </Eyebrow>
        ) : null}
        <h2 id="steps-row-title" className="text-h2">
          <Text>{title}</Text>
        </h2>
      </Reveal>
      <Stagger
        as="ol"
        className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
        itemClassName="border-t-2 border-navy pt-5"
      >
        {steps.map((s, i) => (
          <div key={s.title}>
            <span aria-hidden="true" className="font-display text-4xl leading-none text-accent-text tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-h3">
              <span className="sr-only">Step {i + 1}: </span>
              <Text>{s.title}</Text>
            </h3>
            <p className="mt-3 text-small text-fg-muted">
              <Text>{s.text}</Text>
            </p>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
