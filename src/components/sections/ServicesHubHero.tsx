import Link from "next/link";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { ButtonArrow } from "@/components/ui/button";
import { Text } from "@/components/Text";
import type { PillarData, ServicesHub } from "@/lib/schemas";

/** Services hub hero: L8 h1 and intro, R4 "jump to" list of the three pillars. Renders immediately. */
export function ServicesHubHero({ hero, pillars }: { hero: ServicesHub["hero"]; pillars: PillarData[] }) {
  return (
    <section aria-labelledby="services-hero-title" className="bg-white pb-12 md:pb-14">
      <Breadcrumbs items={[{ label: "Services" }]} />
      <Container className="grid gap-12 pt-4 md:pt-8 lg:grid-cols-12 lg:items-end lg:gap-x-12">
        <div className="lg:col-span-8">
          <Eyebrow dot className="mb-5">
            <Text>{hero.eyebrow}</Text>
          </Eyebrow>
          <h1 id="services-hero-title" className="max-w-[16ch] text-display-l">
            <Text>{hero.headline}</Text>
          </h1>
          <p className="mt-6 max-w-[56ch] text-body-l text-fg-muted">
            <Text>{hero.intro}</Text>
          </p>
        </div>
        <nav aria-label="Jump to a service area" className="lg:col-span-4">
          <ol className="border-b border-line">
            {pillars.map((p, i) => (
              <li key={p.slug} className="border-t border-line">
                <Link
                  href={`#${p.slug}`}
                  className="group flex min-h-14 items-baseline gap-4 py-4 transition-colors hover:text-accent-text"
                >
                  <span className="font-display text-base text-accent-text tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-xl">
                    <Text>{p.title}</Text>
                  </span>
                  <ButtonArrow className="size-4 rotate-90 self-center text-accent-text transition-transform duration-150 group-hover:translate-y-[3px]" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
