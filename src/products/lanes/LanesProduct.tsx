import { useHashScroll } from '../../hooks/useHashScroll';
import { usePageMetadata } from '../../lib/pageMetadata';
import { GuidePage, PressPage } from './components/LanesArticlePages';
import { LandingPage } from './components/LanesLandingPage';
import { LanesFooter, LanesNav, LanesNotFound } from './components/LanesLayout';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN } from './config';
import { metadataForLanesPage, resolveLanesPage } from './routing';

const lanesMetadataConfig = {
  siteOrigin: SITE_ORIGIN,
  imagePath: ASSET_ROOT + '/lanes-icon.png',
  schemaId: 'lanes-json-ld',
  themeColor: '#0a0a0c',
  icons: {
    favicon32: ASSET_ROOT + '/favicon.png',
    favicon128: ASSET_ROOT + '/favicon-128.png',
    appleTouchIcon: ASSET_ROOT + '/lanes-icon-256.png',
  },
};

function currentPath(routePath?: string) {
  if (routePath) {
    return routePath;
  }

  return typeof window === 'undefined' ? PRODUCT_ROOT : window.location.pathname;
}

export function LanesProductSite({ routePath, scrollKey }: { routePath?: string; scrollKey?: string } = {}) {
  const page = resolveLanesPage(currentPath(routePath));
  const metadata = metadataForLanesPage(page);

  usePageMetadata(metadata, lanesMetadataConfig);
  useHashScroll(scrollKey ?? page.key);

  return (
    <div className={'lanes-site lanes-page-' + page.type}>
      <LanesNav />
      {page.type === 'guide' ? (
        <GuidePage page={page.guide} />
      ) : page.type === 'press' ? (
        <PressPage />
      ) : page.type === 'not-found' ? (
        <LanesNotFound />
      ) : (
        <LandingPage />
      )}
      <LanesFooter />
    </div>
  );
}

export { getLanesMetadataForPath } from './routing';
