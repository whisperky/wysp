# Clone `reel/` → `<id>/` — the file-by-file substitution map

**Always clone the LIVE `src/products/reel/`** (it's the simplest complete
microsite and is kept current in this repo). Copy the folder to
`src/products/<id>/`, then apply the substitutions below. Do **not** copy a
snapshot from anywhere else — read the live tree.

## Substitution tokens

| In `reel/` | Replace with | Example (`my-tool` / `MyTool`) |
|---|---|---|
| `reel` (slug) | `<id>` (kebab) | `my-tool` |
| `Reel` (Pascal) | `<Name>` (PascalCase) | `MyTool` |
| `REEL_ROUTES` | `<UPPER>_ROUTES` | `MY_TOOL_ROUTES` |
| `.reel-site` (CSS root) | `.<id>-site` | `.my-tool-site` |
| `reel-page-` (page-type class) | `<id>-page-` | `my-tool-page-` |
| `reel-json-ld` (schema id) | `<id>-json-ld` | `my-tool-json-ld` |
| `/assets/reel` (ASSET_ROOT) | `/assets/<id>` | `/assets/my-tool` |
| `/reel/` (PRODUCT_ROOT) | `/<id>/` | `/my-tool/` |
| `reelAbsoluteUrl` | `<id>AbsoluteUrl` (camel) | `myToolAbsoluteUrl` |
| `reelMetadataConfig` | `<id>MetadataConfig` (camel) | `myToolMetadataConfig` |

> `<id>` is kebab-case everywhere a path/class/file appears; the camelCase helper
> names (`reelAbsoluteUrl`, `reelMetadataConfig`) become the camelCase of the slug.

## Exported symbols to rename (the contract other files import)

| File | reel export | → rename to |
|---|---|---|
| `index.ts` | `ReelProductSite`, `getReelMetadataForPath` | `<Name>ProductSite`, `get<Name>MetadataForPath` |
| `<Name>Product.tsx` | `ReelProductSite` (fn), `getReelMetadataForPath` (re-export) | `<Name>ProductSite`, `get<Name>MetadataForPath` |
| `routing.ts` | `ReelResolvedPage`, `normalizeReelPath`, `resolveReelPage`, `metadataForReelPage`, `getReelMetadataForPath` | swap `Reel`→`<Name>` in each |
| `schema.ts` | `softwareApplicationSchema`, `buildFaqSchema` | keep `buildFaqSchema`; rename/replace the product schema fn to match the type (see below) |
| `components/<Name>Layout.tsx` | `ReelNav`, `ReelNotFound`, `ReelFooter` | `<Name>Nav`, `<Name>NotFound`, `<Name>Footer` |
| `components/<Name>LandingPage.tsx` | `LandingPage` ⚠️ **not** prefixed | **stays `LandingPage`** |
| `components/<Name>Glyphs.tsx` (optional) | `ReelGlyphs` etc. | `<Name>Glyphs` |

## Files to rename when cloning

```
reel/index.ts                         → <id>/index.ts
reel/config.ts                        → <id>/config.ts
reel/routing.ts                       → <id>/routing.ts
reel/content.tsx                      → <id>/content.tsx
reel/schema.ts                        → <id>/schema.ts
reel/types.ts                         → <id>/types.ts
reel/ReelProduct.tsx                  → <id>/<Name>Product.tsx
reel/reel.css                         → <id>/<id>.css
reel/components/ReelLandingPage.tsx   → <id>/components/<Name>LandingPage.tsx
reel/components/ReelLayout.tsx        → <id>/components/<Name>Layout.tsx
reel/components/ReelGlyphs.tsx        → <id>/components/<Name>Glyphs.tsx   (optional)
```

## Per-file notes (what each is + what to set)

**`index.ts`** — one line, the public barrel:
```ts
export { <Name>ProductSite, get<Name>MetadataForPath } from './<Name>Product';
```

**`config.ts`** — BOILERPLATE constants. Set: `SITE_ORIGIN = 'https://wysp.pro'`
(unchanged), `PRODUCT_ROOT = '/<id>/'`, `<UPPER>_ROUTES` (the `home` + hash
anchors your landing uses — edit to match the design's sections),
`ASSET_ROOT = '/assets/<id>'`, `CONTACT_EMAIL = contact.email` (import from
`'../../data/siteData'`), `FEEDBACK_HREF`, a CTA/store placeholder const (reel has
`CHROME_STORE_HREF` — name it for your launch surface and comment "swap at
launch"), `LAST_UPDATED`, and `<id>AbsoluteUrl(path)`.

**`routing.ts`** — BOILERPLATE resolver. Keep the `home | not-found` union
(`<Name>ResolvedPage`), `normalize<Name>Path` (strips `?#`, maps `/<id>` →
`/<id>/`, enforces trailing slash — note the `'/reel'` special-case becomes
`'/<id>'`), `resolve<Name>Page`, `metadataFor<Name>Page`, `get<Name>MetadataForPath`.
Add page variants **only** for sub-routes (see
[sub-routes-lanes.md](sub-routes-lanes.md)).

**`content.tsx`** — FREE-FORM. `landingFaqs: FaqItem[]`, `landingMetadata`
(`PageMetadata`: `title` like `"<Name> — <tagline> · Wysp"`, `description`,
`path: PRODUCT_ROOT`, `ogType: 'website'`, `schema: [productSchema(),
buildFaqSchema(landingFaqs)]`), `notFoundMetadata`.

**`schema.ts`** — FREE-FORM JSON-LD. Keep `buildFaqSchema(faqs)`. Replace
`softwareApplicationSchema()` with the type that fits: `SoftwareApplication`
(app — `applicationCategory`, `operatingSystem`, `featureList`, `offers[]` with
prices) / `Service` (marketplace) / `Article` (content). Prices live here as
plain strings (reel: `'14.99'`, `'149.00'`) — this is the no-code reprice point.

**`types.ts`** — MINIMAL. reel is just `export type FaqItem = { question: string;
answer: string }`. Add product-specific types here if the landing needs them.

**`<Name>Product.tsx`** — BOILERPLATE shape, free-form config values. Set
`<id>MetadataConfig` (`siteOrigin: SITE_ORIGIN`, `imagePath: ASSET_ROOT +
'/<id>-icon-128.png'`, `schemaId: '<id>-json-ld'`, `themeColor: '#…'` to match the
design, `icons: { favicon128, appleTouchIcon }`). Keep `currentPath()`. The
exported `<Name>ProductSite({ routePath, scrollKey })` calls `resolve<Name>Page` →
`metadataFor<Name>Page` → `usePageMetadata(metadata, <id>MetadataConfig)` →
`useHashScroll(scrollKey ?? page.key)` and renders:
```tsx
<div className={'<id>-site <id>-page-' + page.type}>   {/* drop reel's data-hero="lens" or set your own */}
  <<Name>Nav />
  {page.type === 'not-found' ? <<Name>NotFound /> : <LandingPage />}
  <<Name>Footer />
</div>
```
Ends with `export { get<Name>MetadataForPath } from './routing';`.

**`components/<Name>LandingPage.tsx`** — FREE-FORM (the design lands here). Exports
`LandingPage`. Uses the shared `AppLink` (`'../../../components/navigation/AppLink'`)
for internal links; every className prefixed `<id>-`.

**`components/<Name>Layout.tsx`** — BOILERPLATE shape, content varies. Exports
`<Name>Nav`, `<Name>NotFound` (wraps the shared `NotFoundPanel` from
`'../../../components/feedback/NotFoundPanel'` with product classNames),
`<Name>Footer`.

**`components/<Name>Glyphs.tsx`** — OPTIONAL inline SVG glyphs.

**`<id>.css`** — FREE-FORM design, BOILERPLATE scoping rule. **Every** selector
and **every** token under `.<id>-site`:
```css
.<id>-site {
  --bg: …; --brand: …; /* all tokens here, NOT on :root */
}
.<id>-site .hero { … }   /* every rule prefixed */
```
This convention IS the isolation. A token on `:root` or one unprefixed selector
collides with the hub and sibling products.

## After cloning — the central edits

The folder alone does nothing until it's wired. Do the registry append + the three
`App.tsx` edits + the prerender/sitemap — see
[app-wiring.md](app-wiring.md) and [build-and-seo.md](build-and-seo.md).
