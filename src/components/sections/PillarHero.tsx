import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import type { PillarData } from "@/lib/schemas";

type Props = {
  pillar: PillarData;
  crumbs: Crumb[];
  ctaLabel: string;
  ctaHref: string;
};

/** Pillar hero: navy, L7 text, R5 duotone photograph (navy-tinted monochrome). Renders immediately. */
export function PillarHero({ pillar, crumbs, ctaLabel, ctaHref }: Props) {
  const { hero } = pillar;
  return (
    <Section bg="navy" aria-labelledby="pillar-hero-title" className="pt-2 pb-16 md:pt-0 md:pb-20 lg:pb-24">
      <Breadcrumbs items={crumbs} bare />
      <div className="grid items-center gap-10 pt-4 md:pt-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Eyebrow dot className="mb-5">
            <Text>{hero.eyebrow}</Text>
          </Eyebrow>
          <h1 id="pillar-hero-title" className="max-w-[16ch] text-display-l">
            <Text>{hero.headline}</Text>
          </h1>
          <p className="mt-6 max-w-[52ch] text-body-l text-fg-muted">
            <Text>{hero.intro}</Text>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Button asChild variant="primary-on-dark" size="lg">
              <Link href={ctaHref}>
                <Text>{ctaLabel}</Text>
                <ButtonArrow />
              </Link>
            </Button>
            <Button asChild variant="link-arrow">
              <Link href="#services">
                See the services
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-navy lg:aspect-[4/5]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
              className="object-cover opacity-90 mix-blend-luminosity"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-navy/50 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  );
}
