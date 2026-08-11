import { useHashScroll } from '../../hooks/useHashScroll';
import { usePageMetadata } from '../../lib/pageMetadata';
import { LandingPage } from './components/KlinexLandingPage';
import { KlinexFooter, KlinexNav, KlinexNotFound } from './components/KlinexLayout';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN } from './config';
import { metadataForKlinexPage, resolveKlinexPage } from './routing';

const klinexMetadataConfig = {
  siteOrigin: SITE_ORIGIN,
  imagePath: ASSET_ROOT + '/klinex-og.svg',
  schemaId: 'klinex-json-ld',
  themeColor: '#08080a',
};

function currentPath(routePath?: string) {
  if (routePath) {
    return routePath;
  }

  return typeof window === 'undefined' ? PRODUCT_ROOT : window.location.pathname;
}

export function KlinexProductSite({ routePath, scrollKey }: { routePath?: string; scrollKey?: string } = {}) {
  const page = resolveKlinexPage(currentPath(routePath));
  const metadata = metadataForKlinexPage(page);

  usePageMetadata(metadata, klinexMetadataConfig);
  useHashScroll(scrollKey ?? page.key);

  return (
    <div className={'klinex-site klinex-page-' + page.type} data-hero="stage">
      <KlinexNav />
      {page.type === 'not-found' ? <KlinexNotFound /> : <LandingPage />}
      <KlinexFooter />
    </div>
  );
}

export { getKlinexMetadataForPath } from './routing';
