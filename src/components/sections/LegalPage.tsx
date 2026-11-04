import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { Markdown } from "@/components/mdx/Markdown";
import { PageHero } from "@/components/sections/PageHero";
import { getLegal } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { LegalName } from "@/lib/schemas";

/** Shared layout for /privacy and /terms: title, last-updated date, markdown body at 68ch. */
export function LegalPage({ name }: { name: LegalName }) {
  const doc = getLegal(name);
  return (
    <>
      <Breadcrumbs items={[{ label: doc.title }]} />
      <PageHero title={doc.title}>
        <p className="mt-6 text-small text-ink-muted">
          Last updated <time dateTime={doc.updated.toISOString()}>{formatDate(doc.updated)}</time>
        </p>
      </PageHero>
      <Container className="pb-20">
        <Markdown source={doc.body} className="border-t border-line pt-10" />
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
