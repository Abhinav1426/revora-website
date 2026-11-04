import { Eyebrow } from "@/components/brand/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { getPage } from "@/lib/content";

/** Industries as large pill chips. No icons. */
export function IndustryChips() {
  const { industries } = getPage("home");
  return (
    <Section bg="paper" spacing="sm" aria-labelledby="industries-title">
      <Reveal className="flex flex-col gap-x-8 gap-y-3 md:flex-row md:items-baseline">
        <Eyebrow dot>
          <Text>{industries.eyebrow}</Text>
        </Eyebrow>
        <h2 id="industries-title" className="text-h2">
          <Text>{industries.title}</Text>
        </h2>
      </Reveal>
      <Stagger as="ul" gap={0.04} className="mt-10 flex flex-wrap gap-3" itemClassName="list-none">
        {industries.items.map((item) => (
          <span
            key={item}
            className="inline-flex min-h-12 items-center rounded-pill border border-line bg-white px-6 text-lg font-medium text-navy"
          >
            <Text>{item}</Text>
          </span>
        ))}
      </Stagger>
    </Section>
  );
}
