import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage, getServices } from "@/lib/content";

/** Map a sub-service label from home.md to its real URL ("Sourcing & Screening" matches "Candidate Sourcing & Screening"). */
function serviceHref(label: string) {
  const s = getServices().find((x) => x.title === label || x.title.endsWith(label));
  if (!s) throw new Error(`PillarRows: no service matches "${label}"`);
  return `/services/${s.pillar}/${s.slug}`;
}

/** "What we do": sticky intro on the left, three large numbered hairline rows on the right. */
export function PillarRows() {
  const { whatWeDo } = getPage("home");
  return (
    <Section bg="white" spacing="lg" aria-labelledby="what-we-do-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow dot className="mb-5">
                <Text>{whatWeDo.eyebrow}</Text>
              </Eyebrow>
              <h2 id="what-we-do-title" className="text-h2">
                <Text>{whatWeDo.title}</Text>
              </h2>
              <p className="mt-6 text-body-l text-fg-muted">
                <Text>{whatWeDo.intro}</Text>
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="border-b border-line lg:col-span-8">
          {whatWeDo.pillars.map((p, i) => {
            const lead = i === 0;
            return (
              <Reveal as="li" key={p.number} className="group relative border-t border-line">
                <div
                  className={cn(
                    "grid gap-x-8 gap-y-4 lg:grid-cols-[4.5rem_minmax(0,1fr)_10rem]",
                    lead ? "py-14 md:py-20" : "py-10 md:py-12",
                  )}
                >
                  <span
                    className={cn(
                      "font-display leading-none text-accent-text tabular-nums",
                      lead ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl",
                    )}
                  >
                    {p.number}
                  </span>
                  <div>
                    <h3
                      className={cn(
                        "font-display",
                        lead ? "text-display-l" : "text-h2",
                      )}
                    >
                      <Text>{p.title}</Text>
                    </h3>
                    <p className={cn("mt-4 max-w-[52ch] text-fg-muted", lead ? "text-body-l" : "text-body")}>
                      <Text>{p.summary}</Text>
                    </p>
                    <ul className="mt-5 flex flex-wrap items-center gap-x-6">
                      {p.links.map((label) => (
                        <li key={label} className="flex items-center">
                          <Link
                            href={serviceHref(label)}
                            className="inline-flex min-h-11 items-center text-small font-medium text-navy underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-gold hover:decoration-2"
                          >
                            <Text>{label}</Text>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="link-arrow" className="mt-2">
                      <Link href={p.href}>
                        Explore <Text>{p.title}</Text>
                        <ButtonArrow />
                      </Link>
                    </Button>
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none relative hidden self-center opacity-0 transition-opacity duration-300 ease-out group-focus-within:opacity-100 group-hover:opacity-100 lg:block"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-paper">
                      <Image src={p.image.src} alt="" fill sizes="160px" loading="lazy" className="object-cover" />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
