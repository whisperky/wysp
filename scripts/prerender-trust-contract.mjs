import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const distDir = path.join(root, 'dist');
const routePaths = ['/trust-contract/'];

const siteOrigin = 'https://wysp.pro';
const assetRoot = '/assets/trust-contract';

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeScript(value) {
  return String(value).replace(/</g, '\\u003c');
}

function outputPathForRoute(routePath) {
  if (routePath.endsWith('/')) {
    return path.join(distDir, routePath.slice(1), 'index.html');
  }

  return path.join(distDir, routePath.slice(1));
}

function injectRouteHtml(indexHtml, renderedApp, metadata) {
  const canonical = `${siteOrigin}${metadata.path}`;
  const image = `${siteOrigin}${assetRoot}/brand/avatar.png`;
  const headTags = [
    `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
    `<link rel="icon" type="image/png" sizes="128x128" href="${assetRoot}/brand/avatar.png" />`,
    `<link rel="apple-touch-icon" href="${assetRoot}/brand/avatar.png" />`,
    `<meta property="og:type" content="${escapeAttribute(metadata.ogType)}" />`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta property="og:image" content="${escapeAttribute(image)}" />`,
    `<meta property="og:url" content="${escapeAttribute(canonical)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(image)}" />`,
    `<script id="trust-contract-json-ld" type="application/ld+json">${escapeScript(JSON.stringify(metadata.schema))}</script>`,
  ].join('\n    ');

  return indexHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttribute(metadata.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(metadata.description)}" />`,
    )
    .replace('</head>', `    ${headTags}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${renderedApp}</div>`);
}

const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});

try {
  const indexHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const { TrustContractProductSite, getTrustContractMetadataForPath } = await vite.ssrLoadModule(
    '/src/products/trust-contract/index.ts',
  );

  for (const routePath of routePaths) {
    const metadata = getTrustContractMetadataForPath(routePath);
    const renderedApp = renderToString(React.createElement(TrustContractProductSite, { routePath }));
    const html = injectRouteHtml(indexHtml, renderedApp, metadata);
    const filePath = outputPathForRoute(routePath);

    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, html, 'utf8');
  }
} finally {
  await vite.close();
}
