import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import type { ServicesHub } from "@/lib/schemas";

/** "Ways to work with us": navy, four models in a row on desktop, hairline-separated columns. */
export function EngagementModels({ data }: { data: ServicesHub["engagementModels"] }) {
  return (
    <Section bg="navy" spacing="md" aria-labelledby="engagement-title">
      <Reveal>
        <h2 id="engagement-title" className="max-w-[16ch] text-h2">
          <Text>{data.title}</Text>
        </h2>
      </Reveal>
      <Stagger
        as="ol"
        className="mt-12 grid gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4"
        itemClassName="border-t border-rule pt-6 sm:pr-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pr-6 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
      >
        {data.items.map((m, i) => (
          <div key={m.title}>
            <span aria-hidden="true" className="font-display text-xl text-accent-text tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-h3">
              <Text>{m.title}</Text>
            </h3>
            <p className="mt-3 text-body text-fg">
              <Text>{m.who}</Text>
            </p>
            <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-fg-muted uppercase">Billing</p>
            <p className="mt-1.5 text-small text-fg-muted">
              <Text>{m.billing}</Text>
            </p>
          </div>
        ))}
      </Stagger>
    </Section>
  );
}
