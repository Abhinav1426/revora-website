import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container } from "@/components/layout/Container";
import { Markdown } from "@/components/mdx/Markdown";
import { PageHero } from "@/components/sections/PageHero";
import { Text } from "@/components/Text";
import { getPost, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.excerpt, path: "/insights/" + post.slug });
}

/** Phase 2: plain MDX body. The full post design (cover, TOC, related posts, Article JSON-LD) is Phase 5. */
export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Insights", href: "/insights" }, { label: post.title }]} />
      <PageHero eyebrow={post.category} title={post.title} intro={post.excerpt}>
        <p className="mt-6 text-small text-ink-muted">
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time> · <Text>{post.author}</Text>
        </p>
      </PageHero>
      <Container className="pb-20">
        <Markdown source={post.body} className="border-t border-line pt-10" />
      </Container>
      <CtaBand enquiry="general" />
    </>
  );
}
