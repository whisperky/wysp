import { contact } from '../../data/siteData';

export const SITE_ORIGIN = 'https://wysp.pro';
export const PRODUCT_ROOT = '/clautown/';

/** The live game and its policy pages. Every Play and policy link on the
 *  microsite reads these constants. */
export const CLAUTOWN_PLAY_HREF = 'https://www.clautown.com/';
export const CLAUTOWN_DEMO_HREF = 'https://www.clautown.com/u/demo';
export const CLAUTOWN_PRIVACY_HREF = 'https://www.clautown.com/privacy';
export const CLAUTOWN_TERMS_HREF = 'https://www.clautown.com/terms';

export const CLAUTOWN_ROUTES = {
  home: PRODUCT_ROOT,
  how: PRODUCT_ROOT + '#how',
  districts: PRODUCT_ROOT + '#districts',
  yours: PRODUCT_ROOT + '#yours',
  world: PRODUCT_ROOT + '#world',
  privacy: PRODUCT_ROOT + '#privacy',
  faq: PRODUCT_ROOT + '#faq',
} as const;

export const ASSET_ROOT = '/assets/clautown';
export const FILM_ROOT = ASSET_ROOT + '/film';
export const STILLS_ROOT = FILM_ROOT + '/stills';
export const ART_ROOT = ASSET_ROOT + '/art';
export const SHOTS_ROOT = ASSET_ROOT + '/product';

export const HERO_VIDEO = FILM_ROOT + '/hero-loop.mp4';
export const HERO_POSTER = FILM_ROOT + '/hero-loop-poster.jpg';
export const FILM_VIDEO = FILM_ROOT + '/clautown-film.mp4';
export const FILM_POSTER = FILM_ROOT + '/clautown-film-poster.jpg';
export const OG_IMAGE = FILM_ROOT + '/og-image.jpg';

export const CONTACT_EMAIL = contact.email;
export const FEEDBACK_HREF = 'mailto:' + CONTACT_EMAIL + '?subject=Clautown feedback';

export function clautownAbsoluteUrl(path: string) {
  return SITE_ORIGIN + path;
}
