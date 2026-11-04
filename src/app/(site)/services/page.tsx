import { CtaBand } from "@/components/layout/CtaBand";
import { EngagementModels } from "@/components/sections/EngagementModels";
import { FaqSection } from "@/components/sections/FaqSection";
import { HubPillarSection } from "@/components/sections/HubPillarSection";
import { ServicesHubHero } from "@/components/sections/ServicesHubHero";
import { getPillars, getServicesByPillar, getServicesHub } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const hub = getServicesHub();

export const metadata = buildMetadata({ ...hub.seo, path: "/services" });

export default function ServicesPage() {
  const pillars = getPillars();
  return (
    <>
      <ServicesHubHero hero={hub.hero} pillars={pillars} />
      {pillars.map((pillar, i) => (
        <HubPillarSection
          key={pillar.slug}
          pillar={pillar}
          services={getServicesByPillar(pillar.slug)}
          index={i}
          bg={i % 2 === 0 ? "white" : "paper"}
        />
      ))}
      <EngagementModels data={hub.engagementModels} />
      <FaqSection faqs={hub.faqs} bg="white" />
      <CtaBand enquiry="general" />
    </>
  );
}
