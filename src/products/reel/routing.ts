import { landingMetadata, notFoundMetadata, privacyMetadata } from './content';
import { PRIVACY_PATH, PRODUCT_ROOT } from './config';

export type ReelResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'privacy'; key: 'privacy' }
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

  if (normalizedPath === PRIVACY_PATH) {
    return { type: 'privacy', key: 'privacy' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/reel\/?/, '') || 'not-found' };
}

export function metadataForReelPage(page: ReelResolvedPage) {
  if (page.type === 'privacy') {
    return privacyMetadata;
  }

  return page.type === 'not-found' ? notFoundMetadata : landingMetadata;
}

export function getReelMetadataForPath(routePath: string) {
  return metadataForReelPage(resolveReelPage(routePath));
}
