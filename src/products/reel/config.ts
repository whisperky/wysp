import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/reel/';

export const REEL_ROUTES = {
  home: PRODUCT_ROOT,
  analyze: PRODUCT_ROOT + '#analyze',
  export: PRODUCT_ROOT + '#export',
  how: PRODUCT_ROOT + '#how',
  privacy: PRODUCT_ROOT + '#privacy',
  pricing: PRODUCT_ROOT + '#pricing',
  faq: PRODUCT_ROOT + '#faq',
  get: PRODUCT_ROOT + '#get',
} as const;

export const ASSET_ROOT = '/assets/reel';
export const CONTACT_EMAIL = contact.email;
export const FEEDBACK_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Reel feedback';

/**
 * Placeholder for the published Chrome Web Store listing.
 * Swap this for the real listing URL once Reel is live on the store.
 */
export const CHROME_STORE_HREF = REEL_ROUTES.get;
export const LAST_UPDATED = '2026-05-29';

export function reelAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
