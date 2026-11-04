# Brand assets

Prepared from the client's logo PNG and brand sheet. Colours are snapped to the official palette (navy `#041838`, gold `#D7A449`).

| File | Use |
|---|---|
| `revora-mark.svg` | The R mark, vector (traced). Header on mobile, footer, 404, anywhere small. Navy + gold, transparent. |
| `revora-mark-reversed.svg` | Same, white + gold, for navy backgrounds. |
| `revora-mark.png` / `revora-mark-reversed.png` | 1024 px raster fallbacks, transparent. Use in JSON-LD `logo`. |
| `revora-lockup-horizontal.png` | Mark + REVORA SOLUTIONS wordmark side by side. Desktop header. Render at 36 px tall (source is 300 px, so it's crisp at 2x+). |
| `revora-lockup-horizontal-reversed.png` | White version for the footer and navy hero. |
| `revora-wordmark.png` / `-reversed.png` | Wordmark alone, in case a layout needs it. |
| `revora-lockup-full.png` | Stacked logo with tagline (from the brand sheet), transparent. About page or OG use only. |
| `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-icon.png` | App icons. Copy per spec/05. |
| `og-default.png` | Fallback 1200×630 share image (navy + reversed lockup). Replace with the `next/og` generated one in Phase 2. |
| `brand-sheet-original.jpg`, `brand-palette.jpg` | Client originals, reference only. Don't ship. |

Rules: never recolour, rotate, stretch, add effects to, or animate the logo. Minimum clear space around the mark = the diameter of the gold dot. Minimum size: mark 24 px, horizontal lockup 28 px tall.

The SVG mark was traced automatically from a raster. It's clean at UI sizes; if the client has the original vector logo (AI/EPS/SVG), swap it in.

# Photo shot list (development stock, replace with real photos later)

Source from Unsplash or Pexels (free licence). Indian workplaces and people, natural light, slightly warm. Save as JPG ≥ 2000 px wide into `public/images/`, log every source URL in `public/images/CREDITS.md`.

| File | Subject |
|---|---|
| `home-hero.jpg` | Portrait 4:5. A recruiter on a phone call taking notes, or a relaxed interview across a table |
| `pillar-staffing.jpg` | Interview in progress, two people, candid |
| `pillar-technology.jpg` | Two developers looking at one screen, or a whiteboard planning session |
| `pillar-payroll.jpg` | Finance/HR person reviewing documents or a laptop with figures (screen content unreadable) |
| `about-team.jpg`, `about-interview.jpg` | Small team around a table; a candidate smiling in an interview |
| `careers-hero.jpg`, `life-1..3.jpg` | Team lunch, collaborating at a desk, an office celebration |
| `founder.jpg`, `team-1..4.jpg` | Placeholders only. Use neutral silhouettes until the client sends real headshots; never stock faces presented as team members |
| `insights/*.jpg` | One per post, matching its `cover` path |
| service heroes (`service-<slug>.jpg`) | One per photo-hero service; context-appropriate (site engineer for non-IT, handshake-free) |

Avoid: handshakes, chess pieces, light bulbs, globes, people pointing at holograms, AI-generated faces.
