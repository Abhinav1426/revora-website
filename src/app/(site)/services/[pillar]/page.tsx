import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { getPillar, getPillars, getServicesByPillar } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPillars().map((p) => ({ pillar: p.slug }));
}

type Props = { params: Promise<{ pillar: string }> };

export async function generateMetadata({ params }: Props) {
  const pillar = getPillar((await params).pillar);
  if (!pillar) return {};
  return buildMetadata({ ...pillar.seo, path: "/services/" + pillar.slug });
}

export default async function PillarPage({ params }: Props) {
  const pillar = getPillar((await params).pillar);
  if (!pillar) notFound();
  const services = getServicesByPillar(pillar.slug);
  return (
    <>
      <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: pillar.title }]} />
      <PageHero eyebrow={pillar.hero.eyebrow} title={pillar.hero.headline} intro={pillar.hero.intro} />
      <Container className="pb-20">
        <ul className="grid gap-x-10 gap-y-2 border-t border-line pt-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={"/services/" + pillar.slug + "/" + s.slug}
                className="block rounded-sm py-4 hover:bg-paper md:px-3"
              >
                <span className="font-display text-xl text-fg">{s.title}</span>
                <span className="mt-1 block text-fg-muted">
                  <Text>{s.summary}</Text>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand enquiry={pillar.enquiry} />
    </>
  );
}
