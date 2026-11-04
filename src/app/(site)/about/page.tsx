import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const about = getPage("about");

export const metadata = buildMetadata({ ...about.seo, path: "/about" });

export default function AboutPage() {
  const { hero } = about;
  return (
    <>
      <Breadcrumbs items={[{ label: "About" }]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} intro={hero.intro} />
      <CtaBand enquiry="general" />
    </>
  );
}
