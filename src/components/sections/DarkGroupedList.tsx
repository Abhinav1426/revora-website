import { cn } from "cn";
import { GoldDot } from "@/components/brand/GoldDot";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";

type Props = {
  title: string;
  groups: { name: string; items: string[] }[];
};

/** "Roles we hire" / "Capabilities": navy section, columns of gold-dot lists. Handles 3 to 5 groups. */
export function DarkGroupedList({ title, groups }: Props) {
  return (
    <Section bg="navy" spacing="md" aria-labelledby="list-title">
      <Reveal>
        <h2 id="list-title" className="max-w-[18ch] text-h2">
          <Text>{title}</Text>
        </h2>
      </Reveal>
      <div
        className={cn(
          "mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 md:mt-16",
          groups.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        )}
      >
        {groups.map((g, i) => (
          <Reveal key={g.name} delay={Math.min(i, 3) * 0.06}>
            <h3 className="border-t border-gold pt-4 font-sans text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
              <Text>{g.name}</Text>
            </h3>
            <ul className="mt-4">
              {g.items.map((item) => (
                <li key={item} className="flex items-baseline gap-3 border-b border-rule py-3 text-body">
                  <GoldDot size="6px" className="-translate-y-px" />
                  <span className="min-w-0">
                    <Text>{item}</Text>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
