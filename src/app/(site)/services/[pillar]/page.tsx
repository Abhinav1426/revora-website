import { notFound } from "next/navigation";
import { CtaBand } from "@/components/layout/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { PillarHero } from "@/components/sections/PillarHero";
import { PillarServiceCards } from "@/components/sections/PillarServiceCards";
import { StepsRow } from "@/components/sections/StepsRow";
import { WhyList } from "@/components/sections/WhyList";
import { getPage, getPillar, getPillars, getServicesByPillar } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPillars().map((p) => ({ pillar: p.slug }));
}

type Props = { params: Promise<{ pillar: string }> };

export async function generateMetadata({ params }: Props) {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
  return buildMetadata({
    ...pillar.seo,
    path: "/services/" + pillar.slug,
  });
}

export default async function PillarPage({ params }: Props) {
  const pillar = getPillar((await params).pillar);
  if (!pillar) notFound();
  const services = getServicesByPillar(pillar.slug);
  const cta = getPage("shared").ctaBands[pillar.enquiry].cta;
  return (
    <>
      <PillarHero
        pillar={pillar}
        crumbs={[{ label: "Services", href: "/services" }, { label: pillar.title }]}
        ctaLabel={cta.label}
        ctaHref={cta.href}
      />
      <PillarServiceCards pillar={pillar} services={services} />
      <StepsRow title="How we work" eyebrow={pillar.title} steps={pillar.process} bg="paper" />
      <WhyList title={pillar.why.title} reasons={pillar.why.reasons} bg="white" />
      <FaqSection faqs={pillar.faqs} bg="paper" />
      <CtaBand enquiry={pillar.enquiry} />
    </>
  );
}
