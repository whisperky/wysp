import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { products } from '../../data/siteData';
import type { Product } from '../../data/siteData';
import { Brand } from '../brand/Brand';
import { AppLink } from '../navigation/AppLink';

type SiteHeaderProps = {
  activeProduct?: Product;
};

export function SiteHeader({ activeProduct }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderDocked, setIsHeaderDocked] = useState(false);
  const featuredProducts = useMemo(() => products.slice(0, 3), []);
  const headerClassName = [
    'site-header',
    activeProduct ? 'detail-header' : '',
    isHeaderDocked || isMenuOpen ? 'is-docked' : '',
    isMenuOpen ? 'nav-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const updateHeaderState = () => {
      setIsHeaderDocked(window.scrollY > 24);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
    };
  }, []);

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={headerClassName}>
      <Brand subtitle="by Whisper" onClick={closeMenus} />

      <button
        className="icon-button menu-toggle"
        type="button"
        aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={isMenuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary">
        <AppLink href="/#follow" onClick={closeMenus}>
          Follow
        </AppLink>
        <AppLink href="/#suggest" onClick={closeMenus}>
          Suggest
        </AppLink>
        <div className="product-menu">
          <AppLink className="nav-pill" href="/#products" aria-haspopup="menu" onClick={closeMenus}>
            Products
            <ChevronDown size={16} aria-hidden="true" />
          </AppLink>
          <div className="dropdown" role="menu" aria-label="Products">
            {featuredProducts.map((product) => (
              <AppLink href={product.href} key={product.name} onClick={closeMenus} role="menuitem">
                <span>{product.shortName}</span>
                <small>{product.status}</small>
              </AppLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
