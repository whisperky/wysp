import { useHashScroll } from '../../hooks/useHashScroll';
import { usePageMetadata } from '../../lib/pageMetadata';
import { LandingPage } from './components/ReelLandingPage';
import { ReelFooter, ReelNav, ReelNotFound } from './components/ReelLayout';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN } from './config';
import { metadataForReelPage, resolveReelPage } from './routing';

const reelMetadataConfig = {
  siteOrigin: SITE_ORIGIN,
  imagePath: ASSET_ROOT + '/reel-icon-128.png',
  schemaId: 'reel-json-ld',
  themeColor: '#0d1117',
  icons: {
    favicon128: ASSET_ROOT + '/reel-icon-128.png',
    appleTouchIcon: ASSET_ROOT + '/reel-icon-128.png',
  },
};

function currentPath(routePath?: string) {
  if (routePath) {
    return routePath;
  }

  return typeof window === 'undefined' ? PRODUCT_ROOT : window.location.pathname;
}

export function ReelProductSite({ routePath, scrollKey }: { routePath?: string; scrollKey?: string } = {}) {
  const page = resolveReelPage(currentPath(routePath));
  const metadata = metadataForReelPage(page);

  usePageMetadata(metadata, reelMetadataConfig);
  useHashScroll(scrollKey ?? page.key);

  return (
    <div className={'reel-site reel-page-' + page.type} data-hero="lens">
      <ReelNav />
      {page.type === 'not-found' ? <ReelNotFound /> : <LandingPage />}
      <ReelFooter />
    </div>
  );
}

export { getReelMetadataForPath } from './routing';
