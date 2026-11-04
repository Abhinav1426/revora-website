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
