# Decisions

## Phase 0

- Phase 0: scaffolded with create-next-app into _tmp and moved up because the folder was not empty.
- Phase 0: disabled `cacheComponents`/`partialPrefetching` from the scaffold. The site is fully static SSG; Cache Components adds friction (Suspense for searchParams, dynamic dates) with no benefit here.
- Phase 0: allowed sharp build so `next/image` optimisation works for `next start` and Lighthouse runs.
- Phase 0: shadcn `radix-vega` preset uses the `cn` package (published by shadcn) in place of clsx + tailwind-merge.

## Phase 1

- Phase 1: tokens use `@theme static` (not plain `@theme`) so every brand variable is always emitted for `var()` use in SVG and inline styles; values are exactly spec/02.
- Phase 1: spec radii (4/8/14/pill) override shadcn's calc radii; `--radius-xl` 20px added for large containers.
- Phase 1: role aliases `--fg`, `--fg-muted`, `--accent-text`, `--inverse`, `--rule`, `--surface` flip under `[data-tone="dark"]`, so components use `text-fg`, `text-accent-text`, `border-rule` and need no `dark:` classes. No page-level dark mode.
- Phase 1: no red in the brand palette, so `--destructive` is gold-ink; error states use a 2px gold-ink border, an alert icon and message text (never colour alone). Add a red error token only if the client approves a new hue.
- Phase 1: field borders use `--line` per spec (about 1.3:1 on white, below WCAG 1.4.11's 3:1 for control boundaries). Hover goes slate, focus goes navy plus the gold ring. Revisit if the client wants strict non-text contrast.
- Phase 1: Button gains `ButtonArrow` (child with `data-arrow`) rather than an `arrow` boolean prop, so it works with `asChild`.
- Phase 1: Marquee and Swoosh are server components (CSS-only animation; Swoosh renders the client `DrawPath`), which keeps client JS smaller than making them client components.
- Phase 1: Reveal/Stagger/DrawPath start hidden in SSR HTML, so CSS (reduced motion) and a `<noscript>` style force them visible; hidden content never depends on JS being present.
- Phase 1: `themeColor` in `layout.tsx` is the one hex literal outside globals.css (Next metadata cannot read CSS variables).
- Phase 1: Marquee satisfies the spec (pause on hover/focus, static under reduced motion) but has no explicit pause button; add one in Phase 3 if a WCAG 2.2.2 control is wanted.

## Phase 2

- Phase 2: zod schemas are strict (unknown frontmatter keys fail the build) and loaders also check slug equals file name and that every `related` slug exists; `validateAllContent()` runs in the root layout so any bad file breaks every build path.
- Phase 2: loaders are plain sync functions over `fs`, wrapped in React `cache` for the file reads; `server-only` is installed so client components cannot import `content.ts` or `nav.ts`.
- Phase 2: `site.url` contains a placeholder, so `seo.ts` strips `[[ ]]` before building `metadataBase`, canonical and sitemap URLs; this keeps the build valid until the real domain is set.
- Phase 2: `[[placeholders]]` render in `<mark data-placeholder>` only when `NODE_ENV !== "production"`; production HTML shows the inner text plain. Attributes, metadata and JSON-LD always use `stripPlaceholders()`.
- Phase 2: MDX bodies (legal, jobs, posts) go through `next-mdx-remote/rsc` with element overrides that pass text through the placeholder renderer.
- Phase 2: `buildMetadata` always sets an explicit OG/Twitter image (`/opengraph-image`) because a page-level `openGraph` object does not inherit the file-based image; the home page uses `absoluteTitle` so the root title template is not appended to its already-complete title.
- Phase 2: Header is transparent-until-scrolled only on `/` (route list in Header.tsx, or the `transparent` prop). It stays in flow (sticky), so the Phase 3 hero must pull itself under it with a negative top margin if it wants to sit behind the bar.
- Phase 2: mega menu uses `viewport={false}` and a `fixed` panel at `top-[72px]` because Radix wraps the list in a positioned div; overrides repeat shadcn's `group-data-[viewport=false]` prefixes so they win. ArrowDown opens nothing while closed (Radix only uses it inside an open panel); Enter, Space, click and hover open it.
- Phase 2: mobile sheet is a full-width navy sheet below `sm` and max-w-md above; links close it through `SheetClose` and a pathname check; Menu and Close buttons carry visible text, not icons alone.
- Phase 2: every page ships its own enquiry `CtaBand`, so the layout renders the Footer with `withCta={false}` to avoid two stacked blue bands; the footer's own CTA band (copy from shared.md `footer.ctaBand`) is built and used on the 404 page via `SiteShell footerCta`.
- Phase 2: footer social icons are inline SVG paths (lucide v1 has no brand icons) and render only for non-empty `site.socials` entries.
- Phase 2: the 404 renders inside `SiteShell` (header and footer) so the mark and nav stay visible; copy is `shared.md` notFound plus a full stop in the h1, links Home, Services, Careers.
- Phase 2: `/insights` has no page file in content/pages, so its h1 is "Insights", its intro reuses `home.md` insightsTeaser.title and its meta description is one interim sentence; replace if the client supplies copy. Privacy and Terms meta descriptions are also one-line interim sentences.
- Phase 2: `opengraph-image.tsx` fetches Fraunces (400, only the tagline glyphs) from Google Fonts at build and falls back to the default serif if offline; its navy and gold hex values are literals because next/og cannot read CSS variables.
- Phase 2: `html { scroll-padding-top: 5rem }` so the sticky header never hides focused or anchored content; `<main id="main" tabIndex={-1}>` so the skip link moves focus reliably.
- Phase 2: PageHero is a minimal inner-page hero (eyebrow, h1, intro, actions) used by every sparse page; Phases 3 to 5 replace it per page.
