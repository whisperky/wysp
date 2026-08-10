import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/reel/';

/** Full privacy policy. This is the URL published to the Chrome Web Store, so
 *  it must stay stable — the store listing points at it. Distinct from
 *  REEL_ROUTES.privacy, which is the summary section on the landing page. */
export const PRIVACY_PATH = PRODUCT_ROOT + 'privacy/';

/** Shown at the top of the policy page. Bump when the policy materially changes. */
export const PRIVACY_EFFECTIVE_DATE = '2026-08-10';

/**
 * Contact address published in the privacy policy. Deliberately NOT the
 * site-wide `contact.email` (a personal address): a policy contact is a formal
 * channel for data requests, must be monitored, and reads better on a business
 * domain. Keep in step with docs/PRIVACY_POLICY.md in the Reel repo.
 */
export const PRIVACY_CONTACT_EMAIL = 'support@wysp.pro';

export const REEL_ROUTES = {
  home: PRODUCT_ROOT,
  analyze: PRODUCT_ROOT + '#analyze',
  export: PRODUCT_ROOT + '#export',
  how: PRODUCT_ROOT + '#how',
  privacy: PRODUCT_ROOT + '#privacy',
  privacyPolicy: PRIVACY_PATH,
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
export const LAST_UPDATED = '2026-06-04';

export function reelAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
