import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";

/** Full-width split. Padding on the outer edges lines the copy up with the 1280px container. */
export function TwoDoors() {
  const { hiring, seeking } = getPage("home").twoDoors;
  return (
    <section aria-label="Get started" className="grid md:grid-cols-2">
      <div
        data-tone="dark"
        className="bg-linear-to-b from-navy to-blue px-5 py-20 text-white md:py-28 md:pr-12 md:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
      >
        <Reveal>
          <h2 className="text-display-l">
            <Text>{hiring.title}</Text>
          </h2>
          <p className="mt-5 max-w-[34ch] text-body-l text-fg-muted">
            <Text>{hiring.text}</Text>
          </p>
          <Button asChild variant="primary-on-dark" size="lg" className="mt-9">
            <Link href={hiring.cta.href}>
              <Text>{hiring.cta.label}</Text>
              <ButtonArrow />
            </Link>
          </Button>
        </Reveal>
      </div>
      <div className="border-t border-line bg-paper px-5 py-20 text-navy md:border-t-0 md:py-28 md:pr-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] md:pl-12">
        <Reveal delay={0.08}>
          <h2 className="text-display-l">
            <Text>{seeking.title}</Text>
          </h2>
          <p className="mt-5 max-w-[34ch] text-body-l text-fg-muted">
            <Text>{seeking.text}</Text>
          </p>
          <Button asChild size="lg" className="mt-9">
            <Link href={seeking.cta.href}>
              <Text>{seeking.cta.label}</Text>
              <ButtonArrow />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
