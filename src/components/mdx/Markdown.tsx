import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "cn";
import { mdxComponents } from "@/components/mdx/mdx-components";

/** Renders a Markdown/MDX body (legal pages, job descriptions, insight posts) with prose styles. */
export function Markdown({ source, className }: { source: string; className?: string }) {
  return (
    <div className={cn("prose prose-lg", className)}>
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
