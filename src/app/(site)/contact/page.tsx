import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { site } from "@/config/site";
import { getPage } from "@/lib/content";
import { stripPlaceholders } from "@/lib/placeholders";
import { buildMetadata } from "@/lib/seo";

const contact = getPage("contact");

export const metadata = buildMetadata({ ...contact.seo, path: "/contact" });

const linkClass = "inline-flex min-h-11 items-center";

/** Phase 2: hero and office details. The tabbed EnquiryForm (pre-selected from ?enquiry=) arrives in Phase 5. */
export default function ContactPage() {
  const { hero } = contact;
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <PageHero eyebrow={hero.eyebrow} title={hero.headline} intro={hero.intro}>
        <p className="mt-6 font-display text-xl">
          <Text>{hero.promise}</Text>
        </p>
      </PageHero>
      <Container className="pb-20">
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          <address className="not-italic">
            <p>
              <Text>{site.address.line1}</Text>
              <br />
              <Text>{site.address.line2}</Text>
              <br />
              <Text>{site.address.city}</Text>, <Text>{site.address.state}</Text> <Text>{site.address.pin}</Text>
            </p>
            <ul className="mt-4">
              <li>
                <a href={"tel:" + stripPlaceholders(site.phone.tel)} className={linkClass}>
                  <Text>{site.phone.display}</Text>
                </a>
              </li>
              <li>
                <a href={"mailto:" + stripPlaceholders(site.email.general)} className={linkClass}>
                  <Text>{site.email.general}</Text>
                </a>
              </li>
            </ul>
            <p className="mt-4 text-fg-muted">{site.hours}</p>
          </address>
          <p>
            <Text>{hero.candidateNote.text}</Text>{" "}
            <Link href={hero.candidateNote.link.href}>
              <Text>{hero.candidateNote.link.label}</Text>
            </Link>
          </p>
        </div>
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
