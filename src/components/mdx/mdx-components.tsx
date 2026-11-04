import type { ComponentProps, ElementType } from "react";
import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { renderPlaceholders } from "@/lib/placeholders";

/** Basic MDX element map: keeps tags semantic and passes text through the placeholder renderer. */
function withPlaceholders<T extends ElementType>(Tag: T) {
  function Wrapped({ children, ...props }: ComponentProps<T>) {
    const El = Tag as ElementType;
    return <El {...props}>{renderPlaceholders(children)}</El>;
  }
  return Wrapped;
}

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const content = renderPlaceholders(children);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" {...props}>
      {content}
    </a>
  );
}

export const mdxComponents: NonNullable<MDXRemoteProps["components"]> = {
  h2: withPlaceholders("h2"),
  h3: withPlaceholders("h3"),
  p: withPlaceholders("p"),
  li: withPlaceholders("li"),
  strong: withPlaceholders("strong"),
  em: withPlaceholders("em"),
  blockquote: withPlaceholders("blockquote"),
  a: MdxLink,
};
