import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/klinex/';

export const KLINEX_ROUTES = {
  home: PRODUCT_ROOT,
  discover: PRODUCT_ROOT + '#discover',
  direction: PRODUCT_ROOT + '#direction',
  build: PRODUCT_ROOT + '#build',
  own: PRODUCT_ROOT + '#own',
  community: PRODUCT_ROOT + '#community',
  faq: PRODUCT_ROOT + '#faq',
  get: PRODUCT_ROOT + '#get',
} as const;

export const ASSET_ROOT = '/assets/klinex';
export const CONTACT_EMAIL = contact.email;
export const FEEDBACK_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Klinex feedback';
export const WAITLIST_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Klinex early access';

/**
 * Placeholder for the live Klinex studio. Swap this for the real app URL
 * (or a dedicated waitlist page) once Klinex opens to early access — the
 * whole site reads this one constant, so nothing else has to change.
 */
export const KLINEX_APP_HREF = KLINEX_ROUTES.get;
export const LAST_UPDATED = '2026-07-09';

export function klinexAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
