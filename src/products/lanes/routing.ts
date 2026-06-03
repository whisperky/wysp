import { guidePages, landingMetadata, notFoundMetadata, pressMetadata } from './content';
import { LANES_ROUTES, PRODUCT_ROOT } from './config';
import type { GuidePageContent } from './types';

export type LanesResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'guide'; key: string; guide: GuidePageContent }
  | { type: 'press'; key: 'press' }
  | { type: 'not-found'; key: string };

const pageByPath = new Map(guidePages.map((page) => [page.metadata.path, page]));

export function normalizeLanesPath(routePath: string) {
  const pathOnly = routePath.split(/[?#]/)[0] || PRODUCT_ROOT;

  if (pathOnly === '/lanes') {
    return PRODUCT_ROOT;
  }

  return pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
}

export function resolveLanesPage(routePath: string): LanesResolvedPage {
  const normalizedPath = normalizeLanesPath(routePath);
  if (normalizedPath === PRODUCT_ROOT) {
    return { type: 'home', key: 'home' };
  }

  const guide = pageByPath.get(normalizedPath);

  if (guide) {
    return { type: 'guide', key: guide.slug, guide };
  }

  if (normalizedPath === LANES_ROUTES.press) {
    return { type: 'press', key: 'press' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/lanes\/?/, '') || 'not-found' };
}

export function getLanesMetadataForPath(routePath: string) {
  return metadataForLanesPage(resolveLanesPage(routePath));
}

export function metadataForLanesPage(page: LanesResolvedPage) {
  return page.type === 'guide'
    ? page.guide.metadata
    : page.type === 'press'
      ? pressMetadata
      : page.type === 'not-found'
        ? notFoundMetadata
        : landingMetadata;
}
