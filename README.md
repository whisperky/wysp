# Wysp

Wysp is a personal productivity product hub for apps, tools, experiments, and lightweight automation ideas by Whisper. It gives the business a clean public home where visitors can browse current products, follow what is being built, and send suggestions for useful tools.

The project is built as a Vite + React + TypeScript frontend. Product content is data-driven, so new products can be added in one place and automatically appear in the homepage catalog, navigation dropdown, and product detail route.

## Features

- Responsive landing page for the Wysp brand and product catalog
- Product rows for apps, utilities, and automation ideas
- Generated detail pages based on product IDs, such as `/wysp-hub/`
- Contact and follow section with GitHub, email, Discord, and phone links
- Suggestion call-to-action using a prefilled email link
- Custom visual assets in `public/assets`
- Mobile navigation, animated header, animated hero lanes, and responsive sections

## Product Lanes

The current catalog includes:

- **Wysp Hub**: the public front door for products, notes, experiments, and future launch pages
- **Tiny Tools**: small single-purpose utilities for practical productivity tasks
- **Whisper Automations**: future lightweight workflows, templates, and AI-assisted systems

## Tech Stack

- React 19
- TypeScript
- Vite
- Lucide React icons
- Font Awesome icons
- CSS modules are not used; global styling lives in `src/styles.css`

## Project Structure

```text
.
├── public/
│   └── assets/              # Logo, product art, and platform visuals
├── src/
│   ├── App.tsx              # Main layout, homepage, product rows, detail pages
│   ├── main.tsx             # React entry point
│   ├── siteData.ts          # Product, contact, channel, and stats data
│   └── styles.css           # Global responsive styles and animations
├── index.html               # Vite HTML shell and metadata
├── package.json             # Scripts and dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite React configuration
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

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Updating Products

Product data lives in `src/siteData.ts`. To add or update a product, edit the `products` array.

Each product controls:

- Homepage catalog content
- Navigation dropdown label and status
- Product route through the `id` field
- Product detail page sections and milestones
- Primary action link
- Accent color and icon
- Product image and alt text

For example, a product with `id: 'tiny-tools'` is available at:

```text
/tiny-tools/
```

## Notes

- The app currently uses client-side route detection from `window.location.pathname`.
- Product detail pages are generated from the local `products` array rather than a router package.
- Static assets should be placed in `public/assets` and referenced with paths like `/assets/logo.png`.
- The existing placeholder product artwork can be replaced with real product screenshots as each tool launches.

