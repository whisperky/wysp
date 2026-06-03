# Wysp

Wysp is a personal productivity product hub for apps, tools, experiments, and lightweight automation ideas by Whisper. It gives the business a public home where visitors can browse current products, follow what is being built, and send suggestions for useful tools.

The main hub is a Vite + React + TypeScript frontend with React Router. Compact product listings live in `src/data/siteData.ts`; richer product experiences can live as dedicated React modules under `src/products/{product-id}`.

## Features

- Responsive Wysp homepage with product catalog, follow links, and suggestion CTA
- Route-driven app shell using `react-router-dom`
- Data-driven product rows and generated detail pages for normal products
- Dedicated React product microsites, starting with `/lanes/`
- Lanes SEO/AEO guide routes:
  - `/lanes/guides/name-macos-spaces/`
  - `/lanes/guides/mission-control-labels/`
  - `/lanes/guides/switch-desktops-fast/`
  - `/lanes/guides/auto-rearrange-spaces/`
  - `/lanes/press/`
- Scoped Lanes product CSS so the product site can keep its own design language
- Rebased Lanes metadata, canonical URLs, Open Graph tags, and JSON-LD for `wysp.pro/lanes`
- Build-time prerendered route `index.html` files generated from the React source for SEO, AEO, and social previews
- Static hosting fallbacks through `_redirects` and `vercel.json`

## Current Products

- **Lanes**: a native macOS menu bar app for naming Spaces, switching work contexts, and running per-Lane automations
- **Wysp Hub**: the public front door for products, notes, experiments, and future launch pages
- **Tiny Tools**: small single-purpose utilities for practical productivity tasks
- **Whisper Automations**: future lightweight workflows, templates, and AI-assisted systems

## Tech Stack

- React 19
- TypeScript
- Vite
- Lucide React icons
- Font Awesome icons
- Global CSS in `src/styles.css`
- Product-specific CSS in `src/products/*`

## Project Structure

```text
.
|-- public/
|   |-- assets/
|   |   |-- lanes/              # Lanes icon and favicon assets from the Lanes repo
|   |   |-- lanes-product.svg   # Wysp catalog card artwork for Lanes
|   |   `-- ...                 # Wysp brand and product visuals
|   |-- _redirects              # Static host fallback to the Vite app
|   |-- robots.txt
|   `-- sitemap.xml
|-- src/
|   |-- app/
|   |   `-- App.tsx            # Route composition and product route dispatch
|   |-- components/
|   |   |-- brand/             # Shared Wysp brand mark
|   |   |-- feedback/          # Shared empty/error states
|   |   |-- layout/            # Header, footer, and app shell
|   |   `-- products/          # Reusable product catalog UI
|   |-- data/
|   |   `-- siteData.ts        # Product, contact, channel, and stats data
|   |-- hooks/
|   |   `-- useHashScroll.ts   # Shared hash-anchor behavior
|   |-- pages/
|   |   |-- HomePage.tsx
|   |   |-- ProductDetailRoute.tsx
|   |   |-- ProductDetailPage.tsx
|   |   `-- NotFoundPage.tsx
|   |-- products/
|   |   `-- lanes/
|   |       |-- components/     # Lanes landing, article, layout, and visual components
|   |       |-- LanesProduct.tsx # Thin product route coordinator
|   |       |-- config.ts       # Product routes, contact, assets, and constants
|   |       |-- content.tsx     # Lanes copy, guide content, FAQ, and metadata records
|   |       |-- index.ts        # Product module public export
|   |       |-- routing.ts      # Lanes route resolution and metadata lookup
|   |       |-- schema.ts       # Lanes JSON-LD builders
|   |       |-- types.ts        # Lanes product types
|   |       `-- lanes.css       # Scoped Lanes product site styles
|   |-- lib/
|   |   `-- pageMetadata.ts    # Shared document metadata/JSON-LD hook
|   |-- main.tsx                # React entry point
|   `-- styles.css              # Wysp global responsive styles and animations
|-- index.html
|-- package.json
|-- scripts/
|   `-- prerender-lanes.mjs     # Generates SEO-ready Lanes route files after Vite build
|-- tsconfig.json
|-- vercel.json
`-- vite.config.ts
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

The dev script binds to `127.0.0.1`. If `http://localhost:5173/` does not respond in your browser, open:

```text
http://127.0.0.1:5173/
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Product Architecture

Normal products use the shared Wysp detail layout. Add or update those in `src/data/siteData.ts`; the `id` becomes the product route, such as `/tiny-tools/`.

Products that need their own launch pages should use a dedicated module under `src/products/{product-id}` and get an explicit route in `src/app/App.tsx` before the generic `/:productId` route.

Lanes follows this model:

- `src/data/siteData.ts` keeps the compact homepage listing and Products dropdown item.
- `src/products/lanes/LanesProduct.tsx` is a thin route coordinator; Lanes layout, landing, article pages, and visual components live in `src/products/lanes/components`.
- `src/products/lanes/content.tsx`, `routing.ts`, and `schema.ts` keep copy, route resolution, and SEO/AEO schema separate from rendering.
- `src/products/lanes/lanes.css` keeps Lanes styling scoped under `.lanes-site`.
- `src/lib/pageMetadata.ts` owns shared document metadata updates, so product modules do not duplicate head-management code.
- `scripts/prerender-lanes.mjs` renders Lanes routes into nested `dist/lanes/**/index.html` files after `vite build`, so crawlers get route-specific titles, descriptions, canonicals, Open Graph tags, JSON-LD, and readable page content without exposing `.html` product URLs.
- `public/assets/lanes` stores the real Lanes icon/favicon assets copied from `D:\work\Lanes\web\assets`.
- `/lanes/*` routes are handled by React/Vite, not by static HTML in `public/lanes`.

## Notes

- `src/app/App.tsx` uses `react-router-dom`; `/lanes/*` is dispatched before the generic `/:productId` product route.
- Lanes deep links are prerendered during production builds; remaining app routes fall back to `index.html` through `_redirects` and `vercel.json`.
- Lanes currently uses existing icon assets and CSS-rendered app UI visuals. Replace those with real product screenshots and a demo GIF when the signed macOS build is ready.
- Sitemap entries already include the Lanes guide URLs under `https://wysp.pro/lanes/`.
