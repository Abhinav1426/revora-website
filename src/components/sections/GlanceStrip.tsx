import { cn } from "cn";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/Text";

type Fact = { label: string; value: string };

const COLS: Record<number, string> = { 1: "", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };

/** "At a glance": a compact paper strip of three or four facts, hairline-divided. */
export function GlanceStrip({ items }: { items: Fact[] }) {
  if (items.length === 0) return null;
  return (
    <Section bg="paper" aria-label="At a glance" className="py-10 md:py-12">
      <dl className={cn("grid gap-x-0 gap-y-6 sm:grid-cols-2", COLS[Math.min(items.length, 4)])}>
        {items.map((f) => (
          <div
            key={f.label}
            className="border-t border-line pt-4 sm:pr-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pr-6 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">
              <Text>{f.label}</Text>
            </dt>
            <dd className="mt-2 font-display text-h3">
              <Text>{f.value}</Text>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
