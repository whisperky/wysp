# Ingesting a "Claude design" into the free-form zone

The user's flow: *use the skill → it analyzes the source project → I upload a
Claude design → the skill implements the product into Wysp.* This is the port step.

## What a "Claude design" arrives as

A design produced via claude.ai/design or `show_widget` is **mockup HTML/SVG +
a tokens block + named assets** — **NOT importable React**. It typically carries:
- **DESIGN TOKENS** — palette / type / space / radius / elevation as a single
  source-of-truth set (CSS custom properties or a tokens object);
- **PER-SECTION / SCREEN SPECS** — hero, feature blocks, pricing, footer, nav,
  with states, sizes, copy, layout;
- **NAMED ASSETS** — icon / card / illustration files with intended paths.

Treat the upload as a **spec to reproduce 1:1**, then critique. (This mirrors the
user's own design-handoff convention — see SusChef's `DESIGNING_WITH_CLAUDE.md` /
`CLAUDE_DESIGN_BRIEF.md` for the canonical format; cite it as the convention, do
not copy SusChef content.)

## The port (where each part lands)

1. **Tokens → the scoped CSS block.** Put every token on `.<id>-site`, mirroring
   `reel.css`'s structure (surfaces, ink ramp, brand, etc.). **Never `:root`.**
   ```css
   .<id>-site {
     --bg: …; --bg-card: …;
     --ink-12: …; --ink-8: …;
     --brand: …; --brand-hi: …;
     /* …the design's full token set… */
   }
   ```
2. **Sections → components.** Translate the mockup's markup into
   `components/<Name>LandingPage.tsx` (the body — `export function LandingPage()`)
   and `<Name>Layout.tsx` (`<Name>Nav`, `<Name>Footer`, and `<Name>NotFound`
   wrapping the shared `NotFoundPanel`). Every className prefixed `<id>-`. Use the
   shared `AppLink` for internal links (so in-app nav stays client-side).
3. **Assets → `public/assets/<id>/`.** Save icon/card/illustration files there;
   point the registry `image.src` at `/assets/<id>/<id>-product.svg` and the
   `<id>MetadataConfig` `imagePath`/`icons` (and the prerender `assetRoot` +
   og:image filename) at the icon(s).
4. **Hash anchors → `<UPPER>_ROUTES`.** If the landing has in-page sections the
   nav scrolls to, list them in `config.ts`'s routes map as `PRODUCT_ROOT +
   '#anchor'` (reel does `#analyze`, `#pricing`, `#faq`, …); `useHashScroll`
   handles the scroll.
5. **Set the theme color + favicon** in `<id>MetadataConfig.themeColor` and
   `icons` to match the design.

## The critique pass (run it before declaring done)

- **Every color/space/font traces to a scoped token** — no raw hex/px sprinkled in
  components that should be a `--var`.
- **Nothing leaks outside `.<id>-site`** — grep the `<id>.css` for any selector
  not nested under `.<id>-site`, and any token on `:root`. Zero allowed.
- **Shared primitives reused** — `NotFoundPanel`, `AppLink` (don't reimplement).
- **Copy is honest** — calm, direct, no fake metrics/enterprise language (see
  [copy-rules.md](copy-rules.md)).
- **Responsive + the not-found page** both render (the design usually only covers
  the landing — make the `<Name>NotFound` match the look).

## If no design is uploaded yet

Scaffold the free-form files as **clearly-marked stubs** scoped under `.<id>-site`
(a minimal hero + sections placeholder, tokens block with sensible defaults), wire
everything else (the mechanical contract is independent of the design), build to
prove it renders, and tell the user to upload the design so you can port it into
the stubs. The product is shippable as a "Building" shell meanwhile.
