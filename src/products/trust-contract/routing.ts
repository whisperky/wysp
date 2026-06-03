import { landingMetadata, notFoundMetadata } from './content';
import { PRODUCT_ROOT } from './config';

export type TrustContractResolvedPage =
  | { type: 'home'; key: 'home' }
  | { type: 'not-found'; key: string };

export function normalizeTrustContractPath(routePath: string) {
  const pathOnly = routePath.split(/[?#]/)[0] || PRODUCT_ROOT;

  if (pathOnly === '/trust-contract') {
    return PRODUCT_ROOT;
  }

  return pathOnly.endsWith('/') ? pathOnly : pathOnly + '/';
}

export function resolveTrustContractPage(routePath: string): TrustContractResolvedPage {
  const normalizedPath = normalizeTrustContractPath(routePath);

  if (normalizedPath === PRODUCT_ROOT) {
    return { type: 'home', key: 'home' };
  }

  return { type: 'not-found', key: normalizedPath.replace(/^\/trust-contract\/?/, '') || 'not-found' };
}

export function metadataForTrustContractPage(page: TrustContractResolvedPage) {
  return page.type === 'not-found' ? notFoundMetadata : landingMetadata;
}

export function getTrustContractMetadataForPath(routePath: string) {
  return metadataForTrustContractPage(resolveTrustContractPage(routePath));
}
