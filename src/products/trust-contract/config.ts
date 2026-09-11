import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/trust-contract/';

export const TC_ROUTES = {
  home: PRODUCT_ROOT,
  how: PRODUCT_ROOT + '#how',
  trust: PRODUCT_ROOT + '#trust',
  tiers: PRODUCT_ROOT + '#tiers',
  server: PRODUCT_ROOT + '#server',
  tools: PRODUCT_ROOT + '#tools',
  pricing: PRODUCT_ROOT + '#pricing',
  faq: PRODUCT_ROOT + '#faq',
  join: PRODUCT_ROOT + '#join',
} as const;

export const ASSET_ROOT = '/assets/trust-contract';
export const BRAND_ROOT = ASSET_ROOT + '/brand';
export const CONTACT_EMAIL = contact.email;

// Must never expire - two temporary invites have already lapsed and broken
// every join CTA. Verify a replacement reports expires_at: null before shipping.
export const INVITE_HREF = 'https://discord.gg/AdAdrvzAVf';
export const LAST_UPDATED = '2026-08-23';

export function tcAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
