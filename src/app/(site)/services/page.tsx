import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPillars, getServicesHub } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const hub = getServicesHub();

export const metadata = buildMetadata({ ...hub.seo, path: "/services" });

export default function ServicesPage() {
  const { hero } = hub;
  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} intro={hero.intro} />
      <Container className="pb-20">
        <ul className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
          {getPillars().map((pillar) => (
            <li key={pillar.slug}>
              <h2 className="text-h3">
                <Text>{pillar.title}</Text>
              </h2>
              <p className="mt-3 text-fg-muted">
                <Text>{pillar.hero.intro}</Text>
              </p>
              <Button asChild variant="link-arrow" className="mt-3">
                <Link href={`/services/${pillar.slug}`}>
                  Explore {pillar.title}
                  <ButtonArrow />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
