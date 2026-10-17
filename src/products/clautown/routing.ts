import { landingMetadata, notFoundMetadata } from './content';
import { PRODUCT_ROOT } from './config';

export type ClautownResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'not-found'; key: string };

export function normalizeClautownPath(routePath: string) {
  const pathOnly = routePath.split(/[?#]/)[0] || PRODUCT_ROOT;

  if (pathOnly === '/clautown') {
    return PRODUCT_ROOT;
  }

  return pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
}

export function resolveClautownPage(routePath: string): ClautownResolvedPage {
  const normalizedPath = normalizeClautownPath(routePath);

  if (normalizedPath === PRODUCT_ROOT) {
    return { type: 'home', key: 'home' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/clautown\/?/, '') || 'not-found' };
}

export function metadataForClautownPage(page: ClautownResolvedPage) {
  return page.type === 'not-found' ? notFoundMetadata : landingMetadata;
}

export function getClautownMetadataForPath(routePath: string) {
  return metadataForClautownPage(resolveClautownPage(routePath));
}
