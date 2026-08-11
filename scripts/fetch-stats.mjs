// Refreshes public/stats.json with real, read-only counts from LemonSqueezy.
//
// This is the ONLY server-side piece of wysp.pro. It reads the secret
// LEMONSQUEEZY_API_KEY (+ optional LEMONSQUEEZY_STORE_ID) from the environment,
// asks LemonSqueezy for aggregate numbers, and writes them to a static JSON
// file the site fetches at runtime. No accounts, no payments, no per-customer
// data — just totals.
//
// Metrics (all LemonSqueezy):
//   customers    -> total customers on the store
//   subscribers  -> currently active subscriptions
//   revenueCents -> store lifetime revenue (cents of `currency`), needs STORE_ID
//
// Run hourly by .github/workflows/refresh-stats.yml, or locally: `npm run stats`.
// Safe by design: a missing key or a failed call leaves that number unchanged
// and exits 0, so nothing is ever blocked. The file is only rewritten when a
// value actually changes, keeping git history quiet.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const outFile = path.join(root, 'public', 'stats.json');

const API = 'https://api.lemonsqueezy.com/v1';
const API_KEY = process.env.LEMONSQUEEZY_API_KEY;
const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID;

async function lsGet(endpoint) {
  const response = await fetch(`${API}${endpoint}`, {
    headers: { Accept: 'application/vnd.api+json', Authorization: `Bearer ${API_KEY}` },
  });
  if (!response.ok) {
    throw new Error(`GET ${endpoint} -> HTTP ${response.status}`);
  }
  return response.json();
}

// List endpoints expose a running total at meta.page.total, so page[size]=1
// returns the count without paging through every record.
const storeFilter = STORE_ID ? `&filter[store_id]=${STORE_ID}` : '';

async function countCustomers() {
  const json = await lsGet(`/customers?page[size]=1${storeFilter}`);
  return json?.meta?.page?.total ?? 0;
}

async function countActiveSubscribers() {
  const json = await lsGet(`/subscriptions?filter[status]=active${storeFilter}&page[size]=1`);
  return json?.meta?.page?.total ?? 0;
}

async function readStoreRevenue() {
  // Lifetime revenue lives on the store object; without STORE_ID we skip it.
  const json = await lsGet(`/stores/${STORE_ID}`);
  const attr = json?.data?.attributes ?? {};
  return {
    revenueCents: typeof attr.total_revenue === 'number' ? attr.total_revenue : null,
    currency: typeof attr.currency === 'string' ? attr.currency : null,
  };
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
  let currency = existing?.currency ?? 'USD';
  const metrics = {
    customers: existing?.metrics?.customers ?? 0,
    subscribers: existing?.metrics?.subscribers ?? 0,
    revenueCents: existing?.metrics?.revenueCents ?? 0,
  };

  if (!API_KEY) {
    console.warn('[stats] LEMONSQUEEZY_API_KEY not set — leaving all numbers at their current values.');
  } else {
    try {
      metrics.customers = await countCustomers();
    } catch (error) {
      console.warn(`[stats] customers fetch failed (${error.message}) — keeping ${metrics.customers}.`);
    }
    try {
      metrics.subscribers = await countActiveSubscribers();
    } catch (error) {
      console.warn(`[stats] subscribers fetch failed (${error.message}) — keeping ${metrics.subscribers}.`);
    }
    if (STORE_ID) {
      try {
        const revenue = await readStoreRevenue();
        if (revenue.revenueCents != null) {
          metrics.revenueCents = revenue.revenueCents;
        }
        if (revenue.currency) {
          currency = revenue.currency;
        }
      } catch (error) {
        console.warn(`[stats] revenue fetch failed (${error.message}) — keeping ${metrics.revenueCents}.`);
      }
    } else {
      console.warn('[stats] LEMONSQUEEZY_STORE_ID not set — revenue left unchanged.');
    }
  }

  if (
    existing?.metrics &&
    existing.currency === currency &&
    existing.metrics.customers === metrics.customers &&
    existing.metrics.subscribers === metrics.subscribers &&
    existing.metrics.revenueCents === metrics.revenueCents
  ) {
    console.log('[stats] no change — leaving stats.json untouched.');
    return;
  }

  const output = { generatedAt: new Date().toISOString(), source: 'lemonsqueezy', currency, metrics };
  await writeFile(outFile, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
  console.log(
    `[stats] wrote stats.json (customers=${metrics.customers}, subscribers=${metrics.subscribers}, revenueCents=${metrics.revenueCents} ${currency}).`,
  );
}

main();
