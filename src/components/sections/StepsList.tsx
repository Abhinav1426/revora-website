import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";

type Props = {
  title: string;
  steps: { title: string; text: string }[];
  bg?: "white" | "paper";
};

/** "How it works": vertical steps. Each row is L3 big serif number, R9 title and description. */
export function StepsList({ title, steps, bg = "white" }: Props) {
  return (
    <Section bg={bg} spacing="md" aria-labelledby="steps-title">
      <Reveal>
        <h2 id="steps-title" className="text-h2">
          <Text>{title}</Text>
        </h2>
      </Reveal>
      <ol className="mt-12 border-b border-line md:mt-16">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} className="border-t border-line">
            <div className="grid gap-x-12 gap-y-3 py-8 md:py-10 lg:grid-cols-12">
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-accent-text tabular-nums md:text-6xl lg:col-span-3"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="lg:col-span-9">
                <h3 className="text-h3">
                  <span className="sr-only">Step {i + 1}: </span>
                  <Text>{s.title}</Text>
                </h3>
                <p className="mt-3 max-w-[60ch] text-body-l text-fg-muted">
                  <Text>{s.text}</Text>
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
