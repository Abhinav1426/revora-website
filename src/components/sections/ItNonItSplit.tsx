import Link from "next/link";
import { GoldDot } from "@/components/brand/GoldDot";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";
import type { HomePage } from "@/lib/schemas";

type Side = HomePage["itNonIt"]["left"];

function Column({ side, className }: { side: Side; className?: string }) {
  return (
    <Reveal className={className}>
      <h2 className="text-h2">
        <Text>{side.title}</Text>
      </h2>
      <p className="mt-5 max-w-[46ch] text-body text-fg-muted">
        <Text>{side.text}</Text>
      </p>
      <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
        {side.groups.map((g) => (
          <li key={g} className="flex items-baseline gap-3 border-t border-line py-3.5 text-body">
            <GoldDot size="7px" className="-translate-y-px" />
            <span>
              <Text>{g}</Text>
            </span>
          </li>
        ))}
      </ul>
      <Button asChild variant="link-arrow" className="mt-6">
        <Link href={side.link.href}>
          <Text>{side.link.label}</Text>
          <ButtonArrow />
        </Link>
      </Button>
    </Reveal>
  );
}

/** The one symmetric split on the page, because it is a comparison. Vertical hairline between. */
export function ItNonItSplit() {
  const { itNonIt } = getPage("home");
  return (
    <Section bg="white" spacing="md" aria-label="Technology and business roles">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-0">
        <Column side={itNonIt.left} className="lg:pr-16" />
        <Column side={itNonIt.right} className="lg:border-l lg:border-line lg:pl-16" />
      </div>
    </Section>
  );
}
