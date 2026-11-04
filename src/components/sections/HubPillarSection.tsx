import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import type { PillarData, Service } from "@/lib/schemas";

type Props = {
  pillar: PillarData;
  services: Service[];
  index: number;
  bg: "white" | "paper";
};

/** One pillar on the services hub: L4 sticky intro, R8 hairline rows, each row a whole link. */
export function HubPillarSection({ pillar, services, index, bg }: Props) {
  return (
    <Section id={pillar.slug} bg={bg} spacing="md" aria-labelledby={`${pillar.slug}-title`}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <span aria-hidden="true" className="font-display text-5xl leading-none text-accent-text tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 id={`${pillar.slug}-title`} className="mt-5 text-h2">
              <Text>{pillar.title}</Text>
            </h2>
            <p className="mt-5 text-fg-muted">
              <Text>{pillar.hero.intro}</Text>
            </p>
            <Button asChild variant="link-arrow" className="mt-4">
              <Link href={`/services/${pillar.slug}`}>
                Explore <Text>{pillar.title}</Text>
                <ButtonArrow />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Stagger as="ul" className="border-b border-line lg:col-span-8" itemClassName="border-t border-line">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${pillar.slug}/${s.slug}`}
              className="group flex items-center gap-6 py-7 transition-colors md:py-8"
            >
              <div className="min-w-0 flex-1">
                <h3 className="text-h3 transition-colors group-hover:text-accent-text">
                  <Text>{s.title}</Text>
                </h3>
                <span className="mt-2 block max-w-[52ch] text-fg-muted">
                  <Text>{s.summary}</Text>
                </span>
              </div>
              <ButtonArrow className="size-5 shrink-0 text-accent-text transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
