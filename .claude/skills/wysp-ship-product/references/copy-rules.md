# Copy rules + contact facts

These survive from the old skill — they're the one part that was always right.

## Voice

Keep Wysp **personal, calm, and direct**. Avoid:
- fake metrics ("10,000 users", "99.9% faster") — nothing not in the source
  project's real state;
- enterprise language and inflated claims;
- launch promises not backed by the provided context.

If a product isn't launched, use status `Building` or `Idea queue` and write
honest next-step language in `detail.milestones` (e.g. "Wire the real download
URL", "Connect the Lemon Squeezy checkout"). `Live shell` means the page exists
but the product is still pre-launch.

## Homepage stays compact, the microsite carries the depth

Homepage rows (`ProductRow`) are intentionally tight because the catalog may grow
to dozens of products. Keep the registry card fields scannable:
- `eyebrow` — 1–3 words naming the lane;
- `description` — one sentence, ideally ≤~130 chars;
- `outcome` — one practical next step, ideally ≤~95 chars;
- `points` — three bullets, 2–3 words each.

Put the rich explanation in the **microsite** (the free-form Landing page), not in
the homepage row. `detail.intro` should use the compact "X has its own product
microsite at /<id>/…" convention so the card defers to the microsite.

## Contact facts — use the real `contact` object, never invent

`src/data/siteData.ts` exports a `contact` object. **Use it**; do not invent
`hello@wysp.dev` or placeholder socials. Current values (verify against the live
file — they can change):
- email: `whisper.bix@gmail.com`
- discord: `@whisper3029`
- github: `https://github.com/whisperky`

For a `primaryAction` or CTA that's a contact link, build it from `contact.email`
(e.g. `` `mailto:${contact.email}?subject=…` ``) rather than hard-coding an
address. Launch URLs (download / Chrome Web Store / checkout / invite) start as
**placeholder constants** in the product's `config.ts`, commented to swap at
launch.
