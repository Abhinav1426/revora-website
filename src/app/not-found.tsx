import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SiteShell } from "@/components/layout/SiteShell";
import { Mark } from "@/components/brand/Mark";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";

const { notFound } = getPage("shared");

/** 404 (spec/04): Fraunces h1, one line, three links, mark visible. Renders inside the site shell. */
export default function NotFound() {
  return (
    <SiteShell>
      <Container className="py-24 md:py-32">
        <Mark size={48} />
        <h1 className="mt-8 text-display-l">
          <Text>{notFound.title}</Text>.
        </h1>
        <p className="mt-6 text-body-l text-fg-muted">
          <Text>{notFound.text}</Text>
        </p>
        <ul className="mt-8 flex flex-wrap gap-x-8">
          {[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: "Careers", href: "/careers" },
          ].map((l) => (
            <li key={l.href}>
              <Button asChild variant="link-arrow">
                <Link href={l.href}>
                  {l.label}
                  <ButtonArrow />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </SiteShell>
  );
}
