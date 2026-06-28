---
name: wysp-add-product
description: Add a product to the Wysp frontend — either a lightweight catalog-only entry, or (default for a real product) a self-contained microsite under src/products/<id>/ like reel/lanes/trust-contract. Use when the user asks to add/ship a Wysp product, provides a product name/id/context, or uploads a design to turn into a Wysp product page.
---

# Wysp Add Product

Run inside the Wysp frontend repo. The homepage catalog is driven by
`src/data/siteData.ts`. A product is one of two shapes:

- **Catalog-only** (placeholders like wysp-hub/tiny-tools): a registry card whose
  `/<id>/` route falls through to the generic `ProductDetailRoute` →
  `ProductDetailPage`, rendered from `detail.*`.
- **Microsite** (default for a real product — reel/lanes/trust-contract): a
  self-contained mini-site under `src/products/<id>/` mounted at `/<id>/*`, with
  its own scoped CSS, routing, SEO, and prerender. **Use this when shipping an
  actual product or a design.**

> The richer Claude-native version of this skill (with full clone templates and a
> design-ingestion checklist) lives at `.claude/skills/wysp-ship-product/`. Keep
> the two in sync if you edit one.

## Catalog-only entry

1. Read `src/data/siteData.ts`; follow the `Product` type exactly. `ProductStatus`
   = `'Live shell' | 'Building' | 'Idea queue'`; `accent` = `'cyan' | 'gold' |
   'sage'`.
2. Use the exported `contact` object — never invent `hello@wysp.dev`.
3. Append one `Product` object to `products[]`. `href: '/<id>/'`,
   `image.src: '/assets/product-template.svg'` unless a real asset is given (keep
   alt text specific). Cycle accent to keep rows alternating; import a fitting
   `lucide-react` icon at the top of the file.
4. Generate copy from context: `shortName`, `eyebrow` (1–3 words), `description`
   (≤~130 chars), `outcome` (≤~95 chars), `points` (3 bullets), and the
   **required** `detail.{intro,sections,milestones,primaryAction}` block.
5. `npm run build`, then verify `/<id>/`.

## Microsite (the real-product / design path)

The mechanical contract is near-identical across products — **clone the live
`src/products/reel/`** (the simplest one) and string-substitute; never improvise.

1. **Registry card** — append a `Product` to `products[]` in
   `src/data/siteData.ts` (microsite shape: `href: '/<id>/'`, `detail.intro` =
   "<Name> has its own product microsite at /<id>/…" so the homepage row stays
   compact). Add the lucide icon import.
2. **Clone the folder** `src/products/reel/` → `src/products/<id>/`, substituting
   `reel`→`<id>`, `Reel`→`<Name>`, `.reel-site`→`.<id>-site`, `reel-json-ld`→
   `<id>-json-ld`, `/assets/reel`→`/assets/<id>`, `/reel/`→`/<id>/`,
   `REEL_ROUTES`→`<UPPER>_ROUTES`, and the exported symbol names
   (`ReelProductSite`→`<Name>ProductSite`, `getReelMetadataForPath`→
   `get<Name>MetadataForPath`, the `routing.ts` fns, the `<Name>Nav/Footer/NotFound`
   in `<Name>Layout.tsx`; the landing export stays `LandingPage`). Rename files:
   `ReelProduct.tsx`→`<Name>Product.tsx`, `reel.css`→`<id>.css`, and the
   `components/Reel*` files.
3. **Edit `src/app/App.tsx`** (the old "don't edit App.tsx" rule is REVERSED):
   add `import { <Name>ProductSite } from '../products/<id>';`, a side-effect
   `import '../products/<id>/<id>.css';`, a `<Route path="/<id>/*"
   element={<<Name>Route />} />` placed **ABOVE** the `WyspLayout` group (route
   order is load-bearing), and a `<Name>Route` wrapper that reads `useLocation()`
   and passes `routePath` + `scrollKey={\`<id>:...\`}`.
4. **Prerender + sitemap** — copy `scripts/prerender-reel.mjs` →
   `scripts/prerender-<id>.mjs` (swap `routePaths=['/<id>/']`, `assetRoot`, the
   og:image filename, the SSR import `/src/products/<id>/index.ts`, the
   destructured exports, and the `<script id="<id>-json-ld">`), then append
   `&& node scripts/prerender-<id>.mjs` to the `build` script in `package.json`
   (**forgetting this silently ships the product un-SEO'd**). Add a `<url>` for
   `https://wysp.pro/<id>/` to `public/sitemap.xml`.
5. **CSS scoping invariant** — every selector AND every token in `<id>.css` lives
   under `.<id>-site`, never `:root`, or it leaks into the hub and siblings.
6. **Design ingestion** — a "Claude design" arrives as tokens + section mockups +
   named assets (not React). Port: tokens → the scoped `.<id>-site { --… }` block;
   sections → `<Name>LandingPage.tsx` + `<Name>Layout.tsx`; assets →
   `public/assets/<id>/`. Reuse shared `AppLink`/`NotFoundPanel`; prefix every
   className `<id>-`.
7. **Verify** — `npm run build` clean; `dist/<id>/index.html` has the injected
   title/canonical/OG/JSON-LD; `/<id>/` renders styled and `/<id>/nope/` hits the
   product's own NotFound.

## Copy Rules

Personal, calm, direct. No fake metrics, enterprise language, or launch promises
not in context. Unlaunched → `Building`/`Idea queue` with honest next-step
`milestones`. Keep homepage fields tight (the row stays compact); put depth in the
microsite landing page, not the row.

## Output

Report the product id, mode (catalog-only vs microsite), homepage placement,
`/<id>/` route, scoped-CSS file, prerender script + build-chain edit, asset paths,
build result, and any assumptions.
