import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/clautown/';

/** The live game and its policy pages. Every Play and policy link on the
 *  microsite reads these constants, so a domain change happens here only. */
export const CLAUTOWN_PLAY_HREF = 'https://clautown.vercel.app/';
export const CLAUTOWN_PRIVACY_HREF = 'https://clautown.vercel.app/privacy';
export const CLAUTOWN_TERMS_HREF = 'https://clautown.vercel.app/terms';

export const CLAUTOWN_ROUTES = {
  home: PRODUCT_ROOT,
  how: PRODUCT_ROOT + '#how',
  districts: PRODUCT_ROOT + '#districts',
  world: PRODUCT_ROOT + '#world',
  privacy: PRODUCT_ROOT + '#privacy',
  faq: PRODUCT_ROOT + '#faq',
} as const;

export const ASSET_ROOT = '/assets/clautown';
export const CONTACT_EMAIL = contact.email;
export const FEEDBACK_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Clautown feedback';

export function clautownAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
