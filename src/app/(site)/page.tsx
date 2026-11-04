import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { site } from "@/config/site";
import { getPage } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";
import { stripPlaceholders } from "@/lib/placeholders";

const home = getPage("home");

export const metadata = buildMetadata({
  title: home.seo.title,
  description: home.seo.description,
  path: "/",
  absoluteTitle: true,
});

/** Remove the {swoosh}...{/swoosh} emphasis markers. The designed hero (Phase 3) renders them as a Swoosh. */
const plainHeadline = (s: string) => s.replace(/\{\/?swoosh\}/g, "");

export default function HomePage() {
  const { hero } = home;
  const sameAs = Object.values(site.socials).filter(Boolean).map(stripPlaceholders);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/brand/revora-mark.png"),
      slogan: site.tagline,
      ...(sameAs.length ? { sameAs } : {}),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: stripPlaceholders(site.phone.tel),
        email: stripPlaceholders(site.email.general),
        areaServed: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: absoluteUrl("/"),
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={plainHeadline(hero.headline)}
        intro={hero.intro}
        actions={
          <>
            <Button asChild size="lg">
              <Link href={hero.primaryCta.href}>
                <Text>{hero.primaryCta.label}</Text>
                <ButtonArrow />
              </Link>
            </Button>
            <Button asChild variant="link-arrow">
              <Link href={hero.secondaryCta.href}>
                <Text>{hero.secondaryCta.label}</Text>
                <ButtonArrow />
              </Link>
            </Button>
          </>
        }
      />
      <CtaBand enquiry="hire" />
      <JsonLd data={jsonLd} />
    </>
  );
}
