import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage, getPillar, getService, getServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ pillar: s.pillar, service: s.slug }));
}

type Props = { params: Promise<{ pillar: string; service: string }> };

export async function generateMetadata({ params }: Props) {
  const { pillar, service: slug } = await params;
  const service = getService(pillar, slug);
  if (!service) return {};
  return buildMetadata({ ...service.seo, path: "/services/" + pillar + "/" + slug });
}

export default async function ServicePage({ params }: Props) {
  const { pillar: pillarSlug, service: slug } = await params;
  const service = getService(pillarSlug, slug);
  const pillar = getPillar(pillarSlug);
  if (!service || !pillar) notFound();

  const all = getServices();
  const related = service.related.flatMap((r) => all.filter((s) => s.slug === r));
  const candidateNote = getPage("shared").candidateNote;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Services", href: "/services" },
          { label: pillar.title, href: "/services/" + pillar.slug },
          { label: service.title },
        ]}
      />
      <PageHero
        eyebrow={service.hero.eyebrow}
        title={service.hero.headline}
        intro={service.hero.intro}
        actions={
          <Button asChild size="lg">
            <Link href={"/contact?enquiry=" + service.enquiry}>
              <Text>{service.hero.cta}</Text>
              <ButtonArrow />
            </Link>
          </Button>
        }
      />
      <Container className="pb-20">
        <section aria-labelledby="includes" className="border-t border-line pt-10">
          <h2 id="includes" className="text-h2">
            <Text>{service.includes.title}</Text>
          </h2>
          <p className="mt-4 text-fg-muted">
            <Text>{service.includes.intro}</Text>
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {service.includes.items.map((item) => (
              <li key={item.title}>
                <h3 className="text-h3">
                  <Text>{item.title}</Text>
                </h3>
                <p className="mt-2 text-fg-muted">
                  <Text>{item.text}</Text>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {related.length > 0 ? (
          <section aria-labelledby="related" className="mt-16 border-t border-line pt-10">
            <h2 id="related" className="text-h3">
              Related services
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-8">
              {related.map((s) => (
                <li key={s.slug}>
                  <Button asChild variant="link-arrow">
                    <Link href={"/services/" + s.pillar + "/" + s.slug}>
                      <Text>{s.title}</Text>
                      <ButtonArrow />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {pillar.slug === "staffing" ? (
          <p className="mt-10 text-fg-muted">
            <Text>{candidateNote.text}</Text>{" "}
            <Link href={candidateNote.link.href}>
              <Text>{candidateNote.link.label}</Text>
            </Link>
          </p>
        ) : null}
      </Container>
      <CtaBand enquiry={service.enquiry} />
    </>
  );
}
