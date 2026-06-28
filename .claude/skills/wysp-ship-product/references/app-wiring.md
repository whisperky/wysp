# Central wiring — `App.tsx` (3 edits) + the registry card

After cloning the `src/products/<id>/` folder, the product is invisible until you
register its route and its homepage card. Both edits below are deterministic.

## A. `src/app/App.tsx` — three edits

The live file mounts each microsite at `/<name>/*` **above** the `WyspLayout`
group, imports each product's CSS as a side effect, and gives each a tiny
`useLocation()` wrapper. Match that exactly.

**Edit 1 — named import** (with the other product imports):
```ts
import { <Name>ProductSite } from '../products/<id>';
```

**Edit 2 — CSS side-effect import** (with the other `*.css` imports). **Without
this line the microsite renders unstyled.**
```ts
import '../products/<id>/<id>.css';
```

**Edit 3 — the Route + wrapper.** Add the `<Route>` **ABOVE** the `WyspLayout`
group (route order is load-bearing — the generic `:productId` / `*` catch-all
inside `WyspLayout` would otherwise swallow `/<id>/*`):
```tsx
<Routes>
  <Route path="/lanes/*" element={<LanesRoute />} />
  <Route path="/reel/*" element={<ReelRoute />} />
  <Route path="/trust-contract/*" element={<TrustContractRoute />} />
  <Route path="/<id>/*" element={<<Name>Route />} />          {/* ← ADD HERE, before WyspLayout */}
  <Route element={<WyspLayout />}>
    <Route index element={<HomePage />} />
    <Route path=":productId" element={<ProductDetailRoute />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>
</Routes>
```
And define the wrapper next to the other `*Route` functions:
```tsx
function <Name>Route() {
  const { hash, key, pathname } = useLocation();
  return <<Name>ProductSite routePath={pathname} scrollKey={`<id>:${key}:${pathname}:${hash}`} />;
}
```
> The `scrollKey` prefix is the slug (`<id>:…`), matching how reel/lanes build it.

## B. `src/data/siteData.ts` — append one `Product` card

The `Product` type requires **every** field (TS will fail the build otherwise).
Add a `lucide-react` icon import at the top of the file, then append one object to
the `products[]` array. Use a **microsite** entry (reel/trust-contract) as the
shape — `href: '/<id>/'`, and `detail.intro` uses the compact "has its own product
microsite" convention so the homepage row stays short:

```ts
// top of file — add the icon to the existing lucide-react import block:
import { /* …existing… */, <YourIcon> } from 'lucide-react';

// append to products[]:
{
  id: '<id>',
  name: '<Name>',
  shortName: '<Name>',                       // 1–2 words for compact nav
  status: 'Building',                         // 'Live shell' | 'Building' | 'Idea queue'
  eyebrow: '<the product lane, 1–3 words>',
  description: '<one homepage sentence, ≤~130 chars>',
  outcome: 'Open the <Name> microsite for <what they’ll see>.',
  href: '/<id>/',                            // → the microsite route
  accent: 'cyan',                            // 'cyan' | 'gold' | 'sage' (keep rows alternating)
  icon: <YourIcon>,                          // a lucide-react LucideIcon
  image: {
    src: '/assets/<id>/<id>-product.svg',    // bespoke card SVG, or '/assets/product-template.svg' as placeholder
    alt: '<specific alt describing the preview>',
  },
  points: ['<bullet 1>', '<bullet 2>', '<bullet 3>'],   // 2–3 words each
  detail: {
    intro:
      '<Name> has its own product microsite at /<id>/. Wysp keeps this catalog entry compact while the independent <Name> page carries the hero, <…>, and pricing in its own design language.',
    sections: [
      { title: 'Independent product home', text: 'The homepage card sends visitors into the <Name> microsite instead of rendering a generic Wysp detail layout — the same approach as Reel and Lanes.' },
      { title: '<concrete section title>',  text: '<useful copy from the source project’s features>' },
      { title: '<concrete section title>',  text: '<useful copy>' },
    ],
    milestones: [
      '<honest next step / launch note>',
      '<honest next step>',
      'Add wysp.pro/<id> to the sitemap after deployment',
    ],
    primaryAction: { label: 'Open <Name>', href: '/<id>/' },
  },
},
```

Notes:
- **`accent`** colors only the homepage card (`ProductRow` adds `accent-<value>`);
  the microsite's own look comes from its scoped CSS tokens, **not** `accent`.
- **`detail.*`** is consumed only by the generic `ProductDetailPage` (which a
  microsite bypasses) but is still **mandatory** by the type — fill it; it doubles
  as fallback/SEO copy.
- Do **not** edit `HomePage`/`ProductRow`/`ProductDetailRoute` — they're
  data-driven off `siteData`.

## C. Don't forget

The route + card are not enough for production parity — you still need the
prerender script + sitemap entry. See [build-and-seo.md](build-and-seo.md).
