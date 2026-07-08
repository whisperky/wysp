// Refreshes public/stats.json with real, read-only counts.
//
// This is the ONLY server-side piece of wysp.pro. It reads the secret
// LEMONSQUEEZY_API_KEY (+ optional LEMONSQUEEZY_STORE_ID) from the environment,
// asks LemonSqueezy how many active subscriptions exist, and writes that count
// to a static JSON file the site fetches at runtime. No accounts, no payments,
// no per-customer data — just totals.
//
// Metrics:
//   subscribers  -> live from LemonSqueezy (active subscriptions).
//   downloads    -> not in LemonSqueezy; awaits each product's own analytics.
//   activeUsers  -> same. Both are preserved from the existing file (default 0).
//
// Run hourly by .github/workflows/refresh-stats.yml, or locally: `npm run stats`.
// Safe by design: a missing key or network error leaves the numbers unchanged
// and exits 0, so nothing is ever blocked. The file is only rewritten when a
// number actually changes, keeping git history quiet.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const outFile = path.join(root, 'public', 'stats.json');

const API = 'https://api.lemonsqueezy.com/v1';
const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;

async function countActiveSubscribers() {
  // LemonSqueezy list endpoints expose a running total at meta.page.total, so
  // page[size]=1 returns the count without paging through every record.
  const storeFilter = STORE_ID ? `&filter[store_id]=${STORE_ID}` : '';
  const response = await fetch(`${API}/subscriptions?filter[status]=active${storeFilter}&page[size]=1`, {
    headers: { Accept: 'application/vnd.api+json', Authorization: `Bearer ${API_KEY}` },
  });
  if (!response.ok) {
    throw new Error(`GET /subscriptions -> HTTP ${response.status}`);
  }
  const json = await response.json();
  return json?.meta?.page?.total ?? 0;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(outFile, 'utf8'));
  } catch {
    return null;
  }
}

async function main() {
  const existing = await readExisting();
  const metrics = {
    // Preserved until each product's analytics are wired in.
    downloads: existing?.metrics?.downloads ?? 0,
    activeUsers: existing?.metrics?.activeUsers ?? 0,
    subscribers: existing?.metrics?.subscribers ?? 0,
  };

  if (API_KEY) {
    try {
      metrics.subscribers = await countActiveSubscribers();
    } catch (error) {
      console.warn(`[stats] LemonSqueezy fetch failed (${error.message}) — keeping subscribers=${metrics.subscribers}.`);
    }
  } else {
    console.warn('[stats] LEMONSQUEEZY_API_KEY not set — leaving subscribers at its current value.');
  }

  if (
    existing?.metrics &&
    existing.metrics.downloads === metrics.downloads &&
    existing.metrics.activeUsers === metrics.activeUsers &&
    existing.metrics.subscribers === metrics.subscribers
  ) {
    console.log('[stats] no change — leaving stats.json untouched.');
    return;
  }

  const output = { generatedAt: new Date().toISOString(), source: 'lemonsqueezy', metrics };
  await writeFile(outFile, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(
    `[stats] wrote stats.json (downloads=${metrics.downloads}, activeUsers=${metrics.activeUsers}, subscribers=${metrics.subscribers}).`,
  );
}

main();
