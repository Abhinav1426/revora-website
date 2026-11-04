import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ButtonArrow } from "@/components/ui/button";
import { stripPlaceholders } from "@/lib/placeholders";

type Props = {
  faqs: { q: string; a: string }[];
  bg?: "white" | "paper";
};

/** FAQ: L5 heading, R7 accordion (shadcn). Emits FAQPage JSON-LD with placeholders stripped. */
export function FaqSection({ faqs, bg = "white" }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: stripPlaceholders(f.q),
      acceptedAnswer: { "@type": "Answer", text: stripPlaceholders(f.a) },
    })),
  };
  return (
    <Section id="faq" bg={bg} spacing="md" aria-labelledby="faq-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-5">
          <h2 id="faq-title" className="text-h2">
            Questions we hear often
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-small font-semibold text-fg underline decoration-1 underline-offset-[6px] hover:decoration-2"
          >
            Ask us something else
            <ButtonArrow className="size-4 text-accent-text" />
          </Link>
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.08}>
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger>
                  <Text>{f.q}</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    <Text>{f.a}</Text>
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
      <JsonLd data={jsonLd} />
    </Section>
  );
}
