import Link from "next/link";
import { GoldDot } from "@/components/brand/GoldDot";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { ButtonArrow } from "@/components/ui/button";
import type { PillarData, Service } from "@/lib/schemas";

/** Services in a pillar: two-column grid of link cards. Highlights are the first three "included" titles. */
export function PillarServiceCards({ pillar, services }: { pillar: PillarData; services: Service[] }) {
  return (
    <Section id="services" bg="white" spacing="md" aria-labelledby="pillar-services-title">
      <Reveal>
        <h2 id="pillar-services-title" className="max-w-[18ch] text-h2">
          Services in {pillar.title}
        </h2>
      </Reveal>
      <Stagger
        as="ul"
        className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 md:gap-8"
        itemClassName="flex md:[&:nth-child(even)]:mt-10"
      >
        {services.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${pillar.slug}/${s.slug}`}
            className="group flex w-full flex-col rounded-lg border border-line bg-white p-7 transition-shadow duration-200 hover:shadow-card-hover md:p-8"
          >
            <span aria-hidden="true" className="font-display text-3xl leading-none text-accent-text tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-h3">
              <Text>{s.title}</Text>
            </h3>
            <p className="mt-3 text-fg-muted">
              <Text>{s.summary}</Text>
            </p>
            <ul className="mt-6 flex-1 border-t border-line pt-3">
              {s.includes.items.slice(0, 3).map((item) => (
                <li key={item.title} className="flex items-baseline gap-3 py-1.5 text-small">
                  <GoldDot size="6px" className="-translate-y-px" />
                  <span className="min-w-0">
                    <Text>{item.title}</Text>
                  </span>
                </li>
              ))}
            </ul>
            <span className="mt-6 inline-flex items-center gap-2 text-small font-semibold">
              <span className="underline decoration-1 underline-offset-[6px] group-hover:decoration-2">
                Explore <Text>{s.title}</Text>
              </span>
              <ButtonArrow className="size-4 text-accent-text transition-transform duration-150 group-hover:translate-x-[3px]" />
            </span>
          </Link>
        ))}
      </Stagger>
    </Section>
  );
}
