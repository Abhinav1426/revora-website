# 10 · QA and launch checklist

## Visual and brand
- [ ] Only brand + derived colours used (grep for hex codes outside `globals.css`: none)
- [ ] Gold never used as text on white/paper; slate never used as text on white/paper
- [ ] Fraunces + Hanken Grotesk only; no fallback fonts visible in screenshots
- [ ] Logo: correct variant on every background, never stretched, crisp at 2x
- [ ] Anti-template checklist (spec/02) passes on every main page
- [ ] Screenshots reviewed at 320, 375, 768, 1280, 1536 for every page template

## Content
- [ ] Every page's copy matches `content/` (no lorem ipsum, no invented stats, no competitor text)
- [ ] `PLACEHOLDERS.md` lists every remaining `[[...]]` and is handed to the client
- [ ] No client logos, testimonials or certifications that the client hasn't supplied
- [ ] Spellings are Indian/British English; phone numbers in +91 format
- [ ] Photo credits recorded in `public/images/CREDITS.md`

## Functionality
- [ ] All routes in spec/03 return 200; unknown slugs return the custom 404
- [ ] Mega menu: hover, click, keyboard, Escape; mobile sheet: open, accordion, close on navigate
- [ ] Contact tabs pre-select from `?enquiry=`
- [ ] All three forms: validation, honeypot, success redirect, failure message, email received
- [ ] Job filters work; inactive jobs are hidden and excluded from sitemap and JSON-LD
- [ ] Blog: drafts hidden in production; TOC links scroll; OG image renders

## SEO
- [ ] Unique title + description on every page, canonical URLs correct
- [ ] `sitemap.xml` and `robots.txt` correct; `/thank-you` and `/styleguide` noindex
- [ ] JSON-LD validates (Organization, Service, FAQPage, JobPosting, Article, BreadcrumbList)
- [ ] OG images render for home, a service, a post

## Performance and accessibility
- [ ] Lighthouse mobile ≥ 95 / 100 / 100 / 100 on 5 key pages
- [ ] axe: zero serious or critical violations on every route
- [ ] Keyboard-only walkthrough of home → service → contact form submit
- [ ] Reduced motion respected everywhere
- [ ] No console errors or hydration warnings

## Launch
- [ ] Env vars set in Vercel (Production + Preview)
- [ ] Custom domain + SSL, `www` → apex redirect (or the reverse), consistently
- [ ] Web3Forms key tied to the client's inbox, test submission received
- [ ] Vercel Analytics on
- [ ] Client README delivered
