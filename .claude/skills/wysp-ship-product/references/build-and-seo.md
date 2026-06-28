# Build + SEO wiring (prerender script · package.json · sitemap)

Each microsite has its own `scripts/prerender-<id>.mjs` that SSRs the route into
`dist/<id>/index.html` with injected meta/OG/JSON-LD, chained from the
`package.json` build. **Skipping this is a silent SEO failure** — the build exits
0 and the SPA route works in-browser, but crawlers/social get the generic
`index.html` with no per-route title/OG/JSON-LD.

## A. Copy `scripts/prerender-reel.mjs` → `scripts/prerender-<id>.mjs`

It's a ~90-line script; swap exactly these points (everything else is identical):

```js
// 1) the route(s) to prerender:
const routePaths = ['/<id>/'];                 // reel: ['/reel/']

// 2) the asset root + og:image:
const assetRoot = '/assets/<id>';              // reel: '/assets/reel'
//    in injectRouteHtml(): the og:image + icon links use `${assetRoot}/<id>-icon-128.png`
//    — rename to your actual icon filename under public/assets/<id>/.

// 3) the JSON-LD <script id>  — MUST equal <id>MetadataConfig.schemaId:
`<script id="<id>-json-ld" type="application/ld+json">…`   // reel: "reel-json-ld"

// 4) the SSR module load + destructured exports:
const { <Name>ProductSite, get<Name>MetadataForPath } = await vite.ssrLoadModule(
  '/src/products/<id>/index.ts',               // reel: '/src/products/reel/index.ts'
);
//    and in the loop: get<Name>MetadataForPath(routePath) + React.createElement(<Name>ProductSite, { routePath })
```

`outputPathForRoute('/<id>/')` already maps a trailing-slash route to
`dist/<id>/index.html` — no change. The script reads the already-built
`dist/index.html`, regex-replaces its `<title>` and `<meta name="description">`,
injects the head tags before `</head>`, and the rendered app into
`<div id="root">`. (It relies on those exact tags existing in `index.html`.)

## B. Append to the `package.json` build chain

```jsonc
// scripts.build is a sequential chain — append your script at the end:
"build": "tsc && vite build && node scripts/prerender-lanes.mjs && node scripts/prerender-reel.mjs && node scripts/prerender-trust-contract.mjs && node scripts/prerender-<id>.mjs"
```
Order: `tsc` → `vite build` (produces `dist/index.html`) → each prerender
sequentially. A new product's prerender **must** be appended or its
`dist/<id>/index.html` is never generated.

## C. Add a `public/sitemap.xml` entry (hand-maintained)

`sitemap.xml` and `robots.txt` are **hand-maintained static files** in `public/`,
not generated. Add one `<url>` (match the existing format/priority — product roots
use `priority 0.9`):
```xml
<url>
  <loc>https://wysp.pro/<id>/</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```
(For a multi-page lanes-style product, add each sub-route too — see
[sub-routes-lanes.md](sub-routes-lanes.md).)

## D. SPA fallback — already global, do nothing

`public/_redirects` (`/* /index.html 200`) and `vercel.json` already route every
unknown path to the SPA, so a new client route works at runtime with no edit. The
prerendered `dist/<id>/index.html` takes precedence on the host for crawlers.

## Keep the two SEO paths in sync

The **runtime** path (`usePageMetadata` reads `<id>MetadataConfig`: `schemaId`,
`icons`, `themeColor`, and `metadata.schema`) and the **build-time** path
(`prerender-<id>.mjs` hard-codes `assetRoot`, the og:image filename, and the
JSON-LD `<script id>`) must agree. If `schemaId` or asset names diverge, the
crawler HTML and the hydrated SPA disagree. The single rule: the prerender
`<script id>` === `<id>MetadataConfig.schemaId` === `<id>-json-ld`, and the
prerender `assetRoot`/icon names === the config's `imagePath`/`icons`.
