import { Outlet, useLocation } from 'react-router-dom';
import { products } from '../../data/siteData';
import { useHashScroll } from '../../hooks/useHashScroll';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function WyspLayout() {
  const { hash, key, pathname } = useLocation();
  const currentSlug = pathname.replace(/^\/+|\/+$/g, '');
  const activeProduct = products.find((product) => product.id === currentSlug);
  useHashScroll(`wysp-layout:${key}:${pathname}:${hash}`);

  return (
    <>
      <SiteHeader activeProduct={activeProduct} />
      <Outlet />
      <SiteFooter />
    </>
  );
}
