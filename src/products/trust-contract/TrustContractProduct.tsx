import { useHashScroll } from '../../hooks/useHashScroll';
import { usePageMetadata } from '../../lib/pageMetadata';
import { LandingPage } from './components/TrustContractLandingPage';
import { TcFooter, TcNav, TcNotFound } from './components/TrustContractLayout';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN } from './config';
import { metadataForTrustContractPage, resolveTrustContractPage } from './routing';

const trustContractMetadataConfig = {
  siteOrigin: SITE_ORIGIN,
  imagePath: ASSET_ROOT + '/brand/avatar.png',
  schemaId: 'trust-contract-json-ld',
  themeColor: '#16131b',
  icons: {
    favicon128: ASSET_ROOT + '/brand/avatar.png',
    appleTouchIcon: ASSET_ROOT + '/brand/avatar.png',
  },
};

function currentPath(routePath?: string) {
  if (routePath) {
    return routePath;
  }

  return typeof window === 'undefined' ? PRODUCT_ROOT : window.location.pathname;
}

export function TrustContractProductSite({ routePath, scrollKey }: { routePath?: string; scrollKey?: string } = {}) {
  const page = resolveTrustContractPage(currentPath(routePath));
  const metadata = metadataForTrustContractPage(page);

  usePageMetadata(metadata, trustContractMetadataConfig);
  useHashScroll(scrollKey ?? page.key);

  return (
    <div className={'tc-site tc-page-' + page.type} data-screen-label="Trust Contract microsite">
      <TcNav />
      {page.type === 'not-found' ? <TcNotFound /> : <LandingPage />}
      <TcFooter />
    </div>
  );
}

export { getTrustContractMetadataForPath } from './routing';
