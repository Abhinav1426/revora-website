import Link from "next/link";
import readingTime from "reading-time";
import { cn } from "cn";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Text } from "@/components/Text";
import { Button, ButtonArrow } from "@/components/ui/button";
import { getPage, getPosts, type PostWithBody } from "@/lib/content";
import { formatDate } from "@/lib/format";

function PostItem({ post, large }: { post: PostWithBody; large?: boolean }) {
  const minutes = Math.max(1, Math.ceil(readingTime(post.body).minutes));
  return (
    <article className="group relative flex h-full flex-col border-t-2 border-navy pt-6">
      <p className="text-xs font-semibold tracking-[0.14em] text-accent-text uppercase">
        <Text>{post.category}</Text>
      </p>
      <h3 className={cn("mt-4 font-display", large ? "text-display-l leading-[1.08]" : "text-h2")}>
        <Link
          href={`/insights/${post.slug}`}
          className="underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-gold after:absolute after:inset-0"
        >
          <Text>{post.title}</Text>
        </Link>
      </h3>
      <p className={cn("mt-4 max-w-[52ch] text-fg-muted", large ? "text-body-l" : "text-body")}>
        <Text>{post.excerpt}</Text>
      </p>
      <p className="mt-auto pt-6 text-small text-ink-muted">
        <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, </span>
        {minutes} min read
      </p>
    </article>
  );
}

/** Latest posts: one large (L6) plus the rest stacked (R6). Two posts sit 7/5 side by side. Needs no cover images. */
export function InsightsTeaser() {
  const { insightsTeaser } = getPage("home");
  const posts = getPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const [first, ...rest] = posts;
  const pair = rest.length === 1;

  return (
    <Section bg="white" spacing="md" aria-labelledby="insights-title">
      <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="insights-title" className="max-w-[20ch] text-h2">
          <Text>{insightsTeaser.title}</Text>
        </h2>
        <Button asChild variant="link-arrow">
          <Link href="/insights">
            <Text>{insightsTeaser.linkLabel}</Text>
            <ButtonArrow />
          </Link>
        </Button>
      </Reveal>

      <Stagger
        className={cn(
          "mt-12 grid gap-x-12 gap-y-12 md:mt-16 lg:grid-cols-12",
        )}
        itemClassName={cn("min-h-0", pair ? "lg:col-span-7 lg:[&:nth-child(2)]:col-span-5" : "lg:col-span-6")}
      >
        <PostItem post={first} large />
        {pair ? (
          <PostItem post={rest[0]} />
        ) : (
          <div className="grid gap-12">
            {rest.map((p) => (
              <PostItem key={p.slug} post={p} />
            ))}
          </div>
        )}
      </Stagger>
    </Section>
  );
}
