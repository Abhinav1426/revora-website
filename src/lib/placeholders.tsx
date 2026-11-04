import { Children, Fragment, isValidElement, type ReactNode } from "react";

/**
 * [[Placeholder]] handling. Content and site.ts mark anything the client must confirm
 * with double square brackets.
 *  - Development: wrapped in <mark data-placeholder> (dashed gold outline, brackets kept).
 *  - Production: brackets removed, inner text rendered plain.
 * Pure module (no server-only imports) so it works in Server and Client Components.
 */

const PLACEHOLDER = /\[\[(.+?)\]\]/g;
const isDev = process.env.NODE_ENV !== "production";

/** Plain string with brackets removed. Use for attributes, metadata, hrefs and JSON-LD. */
export function stripPlaceholders(value: string): string {
  return value.replace(PLACEHOLDER, "$1");
}

export function hasPlaceholder(value: string): boolean {
  return value.includes("[[");
}

/** Convert a string into nodes, wrapping placeholders in development. */
export function renderPlaceholders(value: ReactNode): ReactNode {
  if (typeof value !== "string") {
    if (Array.isArray(value)) {
      return Children.map(value, (child) => renderPlaceholders(child));
    }
    if (isValidElement(value)) return value;
    return value;
  }
  if (!value.includes("[[")) return value;
  if (!isDev) return stripPlaceholders(value);

  const out: ReactNode[] = [];
  let last = 0;
  for (const match of value.matchAll(PLACEHOLDER)) {
    const start = match.index ?? 0;
    if (start > last) out.push(value.slice(last, start));
    out.push(
      <mark key={start} data-placeholder>
        {match[0]}
      </mark>,
    );
    last = start + match[0].length;
  }
  if (last < value.length) out.push(value.slice(last));
  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}
