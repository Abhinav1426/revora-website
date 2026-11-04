import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { GoldDot } from "@/components/brand/GoldDot";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

const { thankYou } = getPage("shared");

export const metadata = buildMetadata({
  title: thankYou.title,
  description: thankYou.messages.general,
  path: "/thank-you",
  noindex: true,
});

/** Phase 2: the general message. Phase 5 picks the message from the submitted form type. */
export default function ThankYouPage() {
  return (
    <Container className="py-24 md:py-32">
      <h1 className="text-display-l">
        <Text>{thankYou.title}</Text>
        <GoldDot className="ml-1" size="0.18em" />
      </h1>
      <p className="mt-6 text-body-l text-fg-muted">
        <Text>{thankYou.messages.general}</Text>
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8">
        <Button asChild variant="link-arrow">
          <Link href="/services">
            Services
            <ButtonArrow />
          </Link>
        </Button>
        <Button asChild variant="link-arrow">
          <Link href="/insights">
            Insights
            <ButtonArrow />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
