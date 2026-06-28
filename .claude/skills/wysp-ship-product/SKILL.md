---
name: wysp-ship-product
description: >-
  Ship a finished side-project into the Wysp product hub (this repo) as its own
  self-contained, free-form microsite under src/products/<id>/ — derive the
  marketing copy from the source project's core features and benefits, ingest an
  uploaded "Claude design" (tokens + sections + assets) into the product's
  Landing/Layout/scoped CSS, and auto-satisfy the registry + routing + prerender
  + SEO contract so the homepage row, the /<id>/ route, the sitemap, and a
  prerendered SEO page all light up. Use when the user wants to "add a Wysp
  product", "ship X into Wysp", "make a Wysp microsite", uploads a design to turn
  into a Wysp page, or points the skill at one of their projects to productize
  it. Each product is its own mini-site (like reel / lanes / trust-contract) and
  intentionally does NOT match the Wysp homepage look. Do NOT use this for
  editing the shared Wysp homepage/shell itself; or for wiring AI/payments into
  the source project (those are the wire-ai and add-payments skills). This skill
  is project-scoped to the Wysp repo — run it inside it. Replaces the stale
  .codex/skills/wysp-add-product skill (which targets a flat src/siteData.ts +
  one generic detail page that no longer exist).
---

# Wysp Ship Product — productize a project as a Wysp microsite

## Mental model (read first)

Wysp is a Vite/React/react-router SPA **product hub**. Each product is a
**self-contained microsite** mounted at a top-level wildcard route `/<id>/*` — it
is *not* a page that matches the homepage. A product has two halves:

- **REQUIRED CONTRACT** — mechanical, near-identical across every product. A
  registry card in `src/data/siteData.ts`; the module files
  `src/products/<id>/{config,routing,content,schema,types,index}.ts` +
  `<Name>Product.tsx`; a **3-edit wiring** into `src/app/App.tsx`; a
  `scripts/prerender-<id>.mjs` appended to the `package.json` build chain; assets
  under `public/assets/<id>/`; a `public/sitemap.xml` entry. **Clone this from the
  live `src/products/reel/`** (the simplest complete microsite) and
  string-substitute — never hand-improvise it.
- **FREE-FORM ZONE** — exactly `components/<Name>LandingPage.tsx` +
  `<Name>Layout.tsx` + `<id>.css` (+ optional `<Name>Glyphs.tsx`). The product
  owns its entire look here, and this is where an uploaded **Claude design**
  lands.

**The load-bearing invariant:** every CSS selector **and** every design token
(`--var`) lives under `.<id>-site`, **never** `:root`. CSS isolation is
convention-only (no CSS Modules, no Shadow DOM), so all products' CSS can be
imported globally without colliding. One unscoped rule breaks the hub and every
sibling product.

**Clone the live `reel/`, don't carry a copy.** The canonical template is
`src/products/reel/` *in this repo* — always current. (The old skill went stale by
describing a snapshot; this one reads the live tree.) `reel/` is the single-page
clone source (`home` + `not-found`); `lanes/` is the richer source only when the
product needs sub-routes (`/guides/*`, `/press`) — see
[references/sub-routes-lanes.md](references/sub-routes-lanes.md).

The "manual update" surface is no-code-touch: launch URLs, prices, and copy are
plain constants in `config.ts` / `content.tsx` / `schema.ts`, edited then rebuilt.

## Step 1 — Inspect both repos (no edits yet)

- Confirm you're in the Wysp repo. Read [src/data/siteData.ts](../../../src/data/siteData.ts)
  to learn the live `Product` type, the `ProductStatus` enum (`'Live shell' |
  'Building' | 'Idea queue'`), the accent set (`'cyan' | 'gold' | 'sage'`), and
  the exported `contact` object (**use it — never invent `hello@wysp.dev`**).
  Note which slugs already exist.
- Skim `src/products/reel/` (the canonical clone source) and
  [src/app/App.tsx](../../../src/app/App.tsx) for the current route order.
- Point at the **source project** the user is shipping (a sibling repo) and read
  its README/docs/VISION to extract the **core feature + user-facing benefits** —
  the raw material for product copy. (If the user will just paste the
  features/benefits, use that instead of assuming filesystem access.)

## Step 2 — Ask the product-specific decisions (AskUserQuestion)

Ask ONLY what the framework can't derive:
- **Product name** + confirm/derive the kebab **id** (auto if absent).
- **Launch status** — `Live shell` | `Building` | `Idea queue`.
- **Accent** — `cyan` | `gold` | `sage` (default keeps homepage rows alternating).
- **Design** — is a Claude design being uploaded **now**, coming **later**, or is
  this a **catalog-only** entry? (Default: full microsite when a design exists.)
- **Shape** — single-page (reel-style) vs needs **sub-routes** like guides/press
  (lanes-style).
- **Primary CTA** label + href (or a placeholder constant to swap at launch).

Do **not** ask about file layout, route wiring, prerender, or CSS scoping — those
are fixed by the contract.

## Step 3 — Derive product copy from the source project

From the source project's features/benefits, write honest copy (calm, direct, **no
fake metrics** — see [references/copy-rules.md](references/copy-rules.md)) for the
registry card: `eyebrow` (the lane, 1–3 words), `description` (one homepage
sentence, ≤~130 chars), `outcome` (a next step, ≤~95 chars), `points[]` (three
scan-friendly bullets), `shortName`, and the `detail.{intro,sections,milestones,
primaryAction}` block (**required by the `Product` type even for microsites** —
set `detail.intro` to the compact "X has its own product microsite at /<id>/…"
convention so the homepage stays compact). Choose the JSON-LD type to match the
product shape in `schema.ts` (`SoftwareApplication` for an app, `Service` for a
marketplace, `Article` for content). Flag any copy you had to guess.

## Step 4 — Ingest the Claude design into the free-form zone

A Claude design arrives as **tokens** (palette/type/space) + **per-section
mockups** + **named assets** — *not* importable React. Port it (full checklist in
[references/design-ingestion.md](references/design-ingestion.md)):
1. extract tokens into the **scoped** CSS block `.<id>-site { --bg, --brand, … }`
   (mirror `reel.css`'s structure);
2. translate the mockup sections (hero, feature blocks, footer, nav) into
   `components/<Name>LandingPage.tsx` (exports `LandingPage`) and
   `<Name>Layout.tsx` (exports `<Name>Nav` / `<Name>Footer` / `<Name>NotFound`);
3. save image/icon assets to `public/assets/<id>/` and point the registry
   `image.src` + the `<id>MetadataConfig` icons at them;
4. use the shared `AppLink` for internal nav; prefix every className with `<id>-`.

Then run the **critique pass**: every color traces to a scoped token, nothing
leaks outside `.<id>-site`, shared primitives (`NotFoundPanel`) are reused. If no
design is uploaded yet, scaffold the free-form files as clearly-marked stubs
scoped under `.<id>-site` and tell the user to upload.

## Step 5 — Auto-satisfy the mechanical contract (clone reel, rename)

Clone `src/products/reel/` → `src/products/<id>/` and string-substitute every
token (the exact file-by-file map is in
[references/clone-and-substitute.md](references/clone-and-substitute.md)):
`reel`→`<id>`, `Reel`→`<Name>`, `.reel-site`→`.<id>-site`, `reel-json-ld`→
`<id>-json-ld`, `/assets/reel`→`/assets/<id>`, `/reel/`→`/<id>/`, `REEL_ROUTES`→
`<UPPER>_ROUTES`, and the exported symbol names. Keep `routing.ts` as the
`home|not-found` resolver (add page variants only for sub-routes). Then make the
**three `App.tsx` edits** and append the **registry card** (exact diffs in
[references/app-wiring.md](references/app-wiring.md)):
1. `import { <Name>ProductSite } from '../products/<id>';`
2. `import '../products/<id>/<id>.css';` (the **side-effect** import — without it
   the microsite renders unstyled);
3. a `<Route path="/<id>/*" element={<<Name>Route />} />` placed **ABOVE** the
   `WyspLayout` group (route order is load-bearing) + the small `<Name>Route`
   wrapper that reads `useLocation()` and passes `routePath` + `scrollKey`;
4. append the typed `Product` card to `products[]` in `src/data/siteData.ts` (and
   a `lucide-react` icon import at the top of that file).

## Step 6 — Wire SEO/prerender + assets

Copy `scripts/prerender-reel.mjs` → `scripts/prerender-<id>.mjs` and swap the
swap-points (`routePaths`, `assetRoot`, the og:image filename, the SSR import
`/src/products/<id>/index.ts`, the destructured `<Name>ProductSite` /
`get<Name>MetadataForPath`, and the `<script id="<id>-json-ld">` id so it equals
`<id>MetadataConfig.schemaId`). Append `&& node scripts/prerender-<id>.mjs` to the
build chain in `package.json` (**forgetting this is a silent SEO failure** — the
SPA route still works but crawlers get the generic `index.html`). Add a
`<url><loc>https://wysp.pro/<id>/</loc>…</url>` entry to `public/sitemap.xml`. The
SPA fallback (`public/_redirects` + `vercel.json`) is already global — do nothing
there. Full detail: [references/build-and-seo.md](references/build-and-seo.md).

## Step 7 — Verify

- `npm run build` exits clean (tsc + vite build + the **full chained prerender,
  including the new script**).
- `dist/<id>/index.html` exists and contains the injected per-route `<title>`,
  `<link rel=canonical>`, `og:*`, and `<script id="<id>-json-ld">` JSON-LD.
- On the dev server (`npm run dev`), `http://127.0.0.1:5173/<id>/` renders the
  microsite **styled** (proves the CSS side-effect import + `.<id>-site` scoping),
  and a bogus path like `/<id>/nope/` hits the product's own **NotFound** (proves
  the wildcard route + resolver).
- The homepage shows a new `ProductRow` linking to `/<id>/`, and
  `public/sitemap.xml` includes `<loc>https://wysp.pro/<id>/</loc>`.

## Gotchas — each is a real correctness trap

1. **Route ORDER is load-bearing** — the `/<id>/*` Route must sit **above** the
   `WyspLayout` group, or the generic `:productId` / `*` catch-all swallows it.
2. **CSS isolation is convention-only** — a single unprefixed selector or a token
   on `:root` instead of `.<id>-site` leaks globally and breaks the hub + sibling
   microsites. Top correctness rule.
3. **The product CSS is a side-effect import in `App.tsx`**, not inside the
   component — forget that line and the microsite mounts unstyled.
4. **Forgetting `&& node scripts/prerender-<id>.mjs`** in `package.json` build is
   a **silent SEO failure**: build exits 0, the SPA route works, but crawlers/
   social get the generic `index.html` with no per-route title/OG/JSON-LD.
5. **`detail.*` is mandatory** by the `Product` type even though a microsite
   bypasses `ProductDetailPage`; omitting it fails `tsc`.
6. **Two SEO paths must stay in sync** — runtime `usePageMetadata` (schemaId/
   icons/theme) and the build-time `prerender-<id>.mjs` (hard-coded assetRoot,
   og:image filename, JSON-LD script id). Diverge → crawler HTML ≠ hydrated SPA.
7. **Clone `reel/`, not `lanes/`**, for a simple product — lanes carries guides +
   press + extra routing complexity that's wrong for a single-landing product.
8. **A Claude design is mockup HTML/SVG + a tokens block, NOT importable React** —
   treat it as a spec to reproduce 1:1, then run the scoped-token critique.
9. **The stale skill lives in `.codex/skills/wysp-add-product/`** (repo root, and a
   byte-identical worktree mirror). It's actively wrong (flat `src/siteData.ts`,
   "don't edit App.tsx"). When this skill supersedes it, retire/redirect the
   `.codex` copy so Codex isn't misled.

## When done

Report: the product **id**, the homepage card placement + accent + status, the
microsite **route** `/<id>/`, the scoped-CSS file, the prerender script added +
build-chain updated, the asset paths, whether a design was ingested or stubbed,
the build result, and any copy you had to assume.
