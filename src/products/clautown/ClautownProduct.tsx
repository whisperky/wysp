import { useHashScroll } from '../../hooks/useHashScroll';
import { usePageMetadata } from '../../lib/pageMetadata';
import { LandingPage } from './components/ClautownLandingPage';
import { ClautownFooter, ClautownNav, ClautownNotFound } from './components/ClautownLayout';
import { ASSET_ROOT, OG_IMAGE, PRODUCT_ROOT, SITE_ORIGIN } from './config';
import { metadataForClautownPage, resolveClautownPage } from './routing';

const clautownMetadataConfig = {
  siteOrigin: SITE_ORIGIN,
  imagePath: OG_IMAGE,
  schemaId: 'clautown-json-ld',
  themeColor: '#17130e',
  icons: {
    favicon128: ASSET_ROOT + '/clautown-icon-128.png',
    appleTouchIcon: ASSET_ROOT + '/clautown-apple-touch.png',
  },
};

function currentPath(routePath?: string) {
  if (routePath) {
    return routePath;
  }

  return typeof window === 'undefined' ? PRODUCT_ROOT : window.location.pathname;
}

export function ClautownProductSite({ routePath, scrollKey }: { routePath?: string; scrollKey?: string } = {}) {
  const page = resolveClautownPage(currentPath(routePath));
  const metadata = metadataForClautownPage(page);

  usePageMetadata(metadata, clautownMetadataConfig);
  useHashScroll(scrollKey ?? page.key);

  return (
    <div className={'clautown-site clautown-page-' + page.type}>
      <ClautownNav />
      {page.type === 'not-found' ? <ClautownNotFound /> : <LandingPage />}
      <ClautownFooter />
    </div>
  );
}

export { getClautownMetadataForPath } from './routing';
