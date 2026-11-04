import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/brand/Eyebrow";
import { Text } from "@/components/Text";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  /** Buttons or links under the intro. */
  actions?: ReactNode;
  children?: ReactNode;
};

/** Generic inner-page hero: eyebrow, the page's single h1, intro. Sparse in Phase 2; designed per page later. */
export function PageHero({ eyebrow, title, intro, actions, children }: PageHeroProps) {
  return (
    <Section bg="white" spacing="sm" className="pt-8 md:pt-12">
      {eyebrow ? (
        <Eyebrow dot className="mb-5">
          <Text>{eyebrow}</Text>
        </Eyebrow>
      ) : null}
      <h1 className="max-w-[22ch] text-display-l">
        <Text>{title}</Text>
      </h1>
      {intro ? (
        <p className="mt-6 max-w-[62ch] text-body-l text-fg-muted">
          <Text>{intro}</Text>
        </p>
      ) : null}
      {actions ? <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div> : null}
      {children}
    </Section>
  );
}
