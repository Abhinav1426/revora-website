import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";

type Props = {
  title: string;
  intro: string;
  items: { title: string; text: string }[];
};

/** "What's included": L4 sticky heading and intro, R8 two-column hairline list. */
export function IncludesList({ title, intro, items }: Props) {
  return (
    <Section bg="white" spacing="md" aria-labelledby="includes-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <h2 id="includes-title" className="text-h2">
              <Text>{title}</Text>
            </h2>
            <p className="mt-6 text-body-l text-fg-muted">
              <Text>{intro}</Text>
            </p>
          </Reveal>
        </div>
        <Stagger as="ul" className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8" itemClassName="border-t border-line py-7">
          {items.map((item) => (
            <div key={item.title}>
              <h3 className="text-h3">
                <Text>{item.title}</Text>
              </h3>
              <p className="mt-3 text-fg-muted">
                <Text>{item.text}</Text>
              </p>
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
