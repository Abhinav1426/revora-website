import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { ButtonArrow } from "@/components/ui/button";
import type { Service } from "@/lib/schemas";

/** 2 to 3 small link cards. L3 label, R9 cards. */
export function RelatedServices({ services, bg = "paper" }: { services: Service[]; bg?: "white" | "paper" }) {
  if (services.length === 0) return null;
  return (
    <Section bg={bg} spacing="sm" aria-labelledby="related-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
        <Reveal className="lg:col-span-3">
          <h2 id="related-title" className="text-h3">
            Related services
          </h2>
        </Reveal>
        <Stagger as="ul" className="grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3" itemClassName="flex">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.pillar}/${s.slug}`}
              className="group flex w-full flex-col rounded-lg border border-line bg-white p-6 transition-shadow duration-200 hover:shadow-card-hover"
            >
              <span className="font-display text-xl leading-snug">
                <Text>{s.title}</Text>
              </span>
              <span className="mt-2 flex-1 text-small text-fg-muted">
                <Text>{s.summary}</Text>
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-small font-semibold">
                <span className="underline decoration-1 underline-offset-[6px] group-hover:decoration-2">
                  View service
                </span>
                <ButtonArrow className="size-4 text-accent-text transition-transform duration-150 group-hover:translate-x-[3px]" />
              </span>
            </Link>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
