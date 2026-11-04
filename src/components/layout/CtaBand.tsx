import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";
import type { EnquiryType } from "@/lib/schemas";

/** Blue enquiry band shown before the footer on every page. Copy per type from content/pages/shared.md. */
export function CtaBand({ enquiry = "general" }: { enquiry?: EnquiryType }) {
  const copy = getPage("shared").ctaBands[enquiry];
  return (
    <Section bg="blue" spacing="sm" aria-labelledby={`cta-${enquiry}`}>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id={`cta-${enquiry}`} className="text-h2">
            <Text>{copy.title}</Text>
          </h2>
          <p className="mt-4 text-body-l text-fg-muted">
            <Text>{copy.text}</Text>
          </p>
        </div>
        <Button asChild variant="primary-on-dark" size="lg" className="shrink-0 self-start md:self-auto">
          <Link href={copy.cta.href}>
            <Text>{copy.cta.label}</Text>
            <ButtonArrow />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
