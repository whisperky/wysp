import { landingMetadata, notFoundMetadata } from './content';
import { PRODUCT_ROOT } from './config';

export type ReelResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'not-found'; key: string };

export function normalizeReelPath(routePath: string) {
  const pathOnly = routePath.split(/[?#]/)[0] || PRODUCT_ROOT;

  if (pathOnly === '/reel') {
    return PRODUCT_ROOT;
  }

  return pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
}

export function resolveReelPage(routePath: string): ReelResolvedPage {
  const normalizedPath = normalizeReelPath(routePath);

  if (normalizedPath === PRODUCT_ROOT) {
    return { type: 'home', key: 'home' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/reel\/?/, '') || 'not-found' };
}

export function metadataForReelPage(page: ReelResolvedPage) {
  return page.type === 'not-found' ? notFoundMetadata : landingMetadata;
}

export function getReelMetadataForPath(routePath: string) {
  return metadataForReelPage(resolveReelPage(routePath));
}
