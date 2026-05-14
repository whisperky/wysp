---
name: wysp-add-product
description: Add a new product to the Wysp frontend catalog and generated detail page. Use when the user asks to add a Wysp product, uses /add-product, provides a product name/id/context, or wants one change to update the homepage products section, product dropdown, and /{product-id}/ detail route.
---

# Wysp Add Product

Use this skill inside the Wysp frontend project. The product catalog is driven by `src/siteData.ts`; one product object powers the homepage product block, the Products dropdown, and the `/{product-id}/` detail page.

## Expected Input

Accept compact prompts such as:

```text
/add-product
name: AI Chat Bot
id: ai-chat-bot
context: Browser-based assistant for answering customer questions from a small knowledge base.
```

If `id` is missing, create a lowercase kebab-case id from the name. If context is thin, make conservative product copy and mark uncertain assumptions in the final response.

## Workflow

1. Read `src/siteData.ts` and follow the existing `Product` shape exactly.
2. Use the exported `contact` object for current owner contact details. Do not invent `hello@wysp.dev` or placeholder social links.
3. Add one object to the exported `products` array.
4. Use `href: '/{id}/'` and `image.src: '/assets/product-template.svg'` unless the user provides a real image path.
5. Keep the image alt text specific to the product, even when using the template image.
6. Choose an existing accent by cycling through `cyan`, `gold`, and `sage` based on nearby products.
7. Choose an already-imported Lucide icon when it fits. If no existing icon fits, import a suitable icon from `lucide-react`.
8. Generate all product copy from the provided context:
   - `shortName`: one or two words for compact navigation.
   - `eyebrow`: one to three words that names the product lane.
   - `description`: one concise homepage sentence, ideally under 130 characters.
   - `outcome`: one practical next-step statement, ideally under 95 characters.
   - `points`: three short scan-friendly bullets, usually two or three words each.
   - `detail.intro`: detail-page lead paragraph.
   - `detail.sections`: three sections with concrete titles and useful copy.
   - `detail.milestones`: three honest next steps or launch notes.
   - `detail.primaryAction`: mailto using `contact.email` or a product URL matching the product stage.
9. Do not edit `src/App.tsx` unless the product schema or rendering contract has changed.
10. Run `npm run build`.
11. Verify the new detail URL, usually `http://127.0.0.1:5173/{id}/`, if the dev server is running.

## Copy Rules

Keep Wysp personal, calm, and direct. Avoid fake metrics, enterprise language, inflated claims, and launch promises that are not in the provided context. If a product is not launched, use `Building` or `Idea queue` and write honest next-step language.

Homepage product rows are intentionally compact because the catalog may grow to dozens of products. Keep homepage-facing fields tight and scannable; put richer explanation in `detail.intro`, `detail.sections`, and `detail.milestones` instead of expanding the homepage row.

## Output

In the final response, list the product id, homepage placement, detail URL, image placeholder path, and build result.
