# Multi-page products — the lanes-style sub-route pattern

Most products are single-page (`home` + `not-found`) — clone `reel/`. Reach for
this **only** when the product needs sub-routes like `/guides/*` or `/press`
(SEO/AEO content pages). Clone `src/products/lanes/` instead of `reel/`.

## What lanes adds over reel

- **`config.ts`** — `LANES_ROUTES` includes a guide root + per-guide paths
  (derived from `LANES_GUIDE_ROOT`), plus `guideNavLinks`.
- **`content.tsx`** — a data-driven `guidePages: GuidePageContent[]` array (slug,
  crumb, h1, readTime, answer, `metadata` with `articleSchema` + `faqSchema`,
  `related[]`, body JSX) + `pressMetadata`.
- **`routing.ts`** — a **4-way** resolver. It builds a lookup map
  `new Map(guidePages.map(p => [p.metadata.path, p]))` and returns a discriminated
  union `{ home | guide | press | not-found }`; `metadataForLanesPage` maps each to
  its `PageMetadata`. (reel's is the 2-case `home | not-found` version of this.)
- **`schema.ts`** — adds `articleSchema()` (`Article`/`TechArticle` JSON-LD) for
  the guide pages.
- **`components/`** — adds `LanesArticlePages.tsx` (`GuidePage` + `PressPage`
  renderers) and visual blocks (`LanesBlocks.tsx`, `LanesVisuals.tsx`).

## The THREE sources of truth you must keep in sync by hand

A sub-route is real only if it appears in **all three** — nothing auto-derives the
latter two from `guidePages`:

1. **`content.tsx` `guidePages` + the `routing.ts` resolver** — makes the route
   render in the SPA.
2. **`scripts/prerender-<id>.mjs` `routePaths[]`** — add every sub-route path
   (`'/<id>/guides/<slug>/'`, `'/<id>/press/'`, …) so each gets a prerendered
   `dist/.../index.html`. Single-page products list only `['/<id>/']`.
3. **`public/sitemap.xml`** — add a `<url>` for each sub-route (lanes uses
   `priority 0.8` for guides, `0.5` for press).

The `siteData` milestones literally remind: "Add wysp.pro/<x> to the sitemap after
deployment." Forgetting #2 or #3 is a silent SEO miss.

## Decision

If the user only needs a marketing landing page → **clone reel**, single
`routePaths: ['/<id>/']`, one sitemap entry. Choose lanes-style **only** for a
product that genuinely ships content/guide pages; the extra resolver + per-page
prerender/sitemap maintenance isn't worth it otherwise.
