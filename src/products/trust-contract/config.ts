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

/**
 * The live Trust Contract Discord server. Every join CTA on the microsite reads
 * this one constant. Keep it pointing at a NON-EXPIRING invite — a temporary
 * one silently turns every CTA into an "Invite Invalid" page when it lapses.
 */
export const INVITE_HREF = 'https://discord.gg/QyxU4nnYzm';
export const LAST_UPDATED = '2026-08-23';

export function tcAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
