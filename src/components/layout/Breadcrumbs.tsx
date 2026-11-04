import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/Text";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo";
import { stripPlaceholders } from "@/lib/placeholders";

function Wrapper({ bare, children }: { bare: boolean; children: ReactNode }) {
  return bare ? <div>{children}</div> : <Container className="pt-6">{children}</Container>;
}

export type Crumb = { label: string; href?: string };

/**
 * Home / Services / Talent & Staffing / IT Recruitment. "Home" is added automatically; the
 * last item is the current page (no href). Emits BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({ items, bare = false }: { items: Crumb[]; bare?: boolean }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stripPlaceholders(c.label),
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  };
  return (
    <Wrapper bare={bare}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-0 text-small text-fg-muted">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                {c.href && !last ? (
                  <Link href={c.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-fg hover:underline">
                    <Text>{c.label}</Text>
                  </Link>
                ) : (
                  <span aria-current="page" className="inline-flex min-h-11 items-center text-fg">
                    <Text>{c.label}</Text>
                  </span>
                )}
                {last ? null : <ChevronRightIcon aria-hidden="true" className="size-3.5" />}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={jsonLd} />
    </Wrapper>
  );
}
