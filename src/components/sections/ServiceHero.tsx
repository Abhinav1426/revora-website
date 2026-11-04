import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import type { Service } from "@/lib/schemas";

type Props = {
  service: Service;
  crumbs: Crumb[];
  /** Pillar photo used when heroVisual is "photo" (there are no per-service photos). */
  photo: { src: string; alt: string };
};

/** Navy typographic card listing tools and platforms, set in a monospaced stack. */
function ToolsPanel({ items }: { items: string[] }) {
  return (
    <div data-tone="dark" className="rounded-lg bg-linear-to-b from-navy to-blue p-6 text-white md:p-8">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        Tools and platforms
      </p>
      <ul className="mt-5 grid gap-x-6 font-mono text-[0.9375rem] sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5 border-b border-rule py-2.5">
            <span aria-hidden="true" className="text-accent-text">
              /
            </span>
            <span className="min-w-0 break-words">
              <Text>{item}</Text>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Service hero: L7 text, R5 either a pillar photograph or the navy tools panel. Renders immediately (above the fold). */
export function ServiceHero({ service, crumbs, photo }: Props) {
  const usePanel = service.heroVisual === "panel" && (service.panelItems?.length ?? 0) > 0;
  return (
    <section aria-labelledby="service-hero-title" className="bg-white pb-16 md:pb-20 lg:pb-24">
      <Breadcrumbs items={crumbs} />
      <Container className="grid items-center gap-10 pt-4 md:pt-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <Eyebrow dot className="mb-5">
            <Text>{service.hero.eyebrow}</Text>
          </Eyebrow>
          <h1 id="service-hero-title" className="max-w-[18ch] text-display-l">
            <Text>{service.hero.headline}</Text>
          </h1>
          <p className="mt-6 max-w-[56ch] text-body-l text-fg-muted">
            <Text>{service.hero.intro}</Text>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <Button asChild size="lg">
              <Link href={`/contact?enquiry=${service.enquiry}`}>
                <Text>{service.hero.cta}</Text>
                <ButtonArrow />
              </Link>
            </Button>
            <Button asChild variant="link-arrow">
              <Link href="#faq">
                Read the FAQs
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          {usePanel ? (
            <ToolsPanel items={service.panelItems ?? []} />
          ) : (
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-paper lg:aspect-[4/5]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
