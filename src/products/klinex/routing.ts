import { landingMetadata, notFoundMetadata } from './content';
import { PRODUCT_ROOT } from './config';

export type KlinexResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'not-found'; key: string };

export function normalizeKlinexPath(routePath: string) {
  const pathOnly = routePath.split(/[?#]/)[0] || PRODUCT_ROOT;

  if (pathOnly === '/klinex') {
    return PRODUCT_ROOT;
  }

  return pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
}

export function resolveKlinexPage(routePath: string): KlinexResolvedPage {
  const normalizedPath = normalizeKlinexPath(routePath);

  if (normalizedPath === PRODUCT_ROOT) {
    return { type: 'home', key: 'home' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/klinex\/?/, '') || 'not-found' };
}

export function metadataForKlinexPage(page: KlinexResolvedPage) {
  return page.type === 'not-found' ? notFoundMetadata : landingMetadata;
}

export function getKlinexMetadataForPath(routePath: string) {
  return metadataForKlinexPage(resolveKlinexPage(routePath));
}
