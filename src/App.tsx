import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  AppWindow,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Menu,
  Workflow,
  Wrench,
  X,
} from 'lucide-react';
import {
  channels,
  contact,
  products,
  stats,
  suggestionPrompts,
} from './siteData';
import type { Product } from './siteData';

const factIconClasses = ['fas fa-download', 'fas fa-users', 'fab fa-gratipay'] as const;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderDocked, setIsHeaderDocked] = useState(false);
  const featuredProducts = useMemo(() => products.slice(0, 3), []);
  const currentSlug = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const activeProduct = products.find((product) => product.id === currentSlug);
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
    <>
      <header className={headerClassName}>
        <a className="brand" href="/" aria-label="Wysp home" onClick={closeMenus}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/logo.png" alt="" />
          </span>
          <span>
            <strong>Wysp</strong>
            <small>by Whisper</small>
          </span>
        </a>

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
          <a href="/#follow" onClick={closeMenus}>
            Follow
          </a>
          <a href="/#suggest" onClick={closeMenus}>
            Suggest
          </a>
          <div className="product-menu">
            <a
              className="nav-pill"
              href="/#products"
              aria-haspopup="menu"
              onClick={closeMenus}
            >
              Products
              <ChevronDown size={16} aria-hidden="true" />
            </a>
            <div className="dropdown" role="menu" aria-label="Products">
              {featuredProducts.map((product) => (
                <a href={product.href} key={product.name} onClick={closeMenus} role="menuitem">
                  <span>{product.shortName}</span>
                  <small>{product.status}</small>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {activeProduct ? <ProductDetailPage product={activeProduct} /> : <HomePage />}

      <footer className="site-footer">
        <a className="brand" href="/" aria-label="Wysp home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/logo.png" alt="" />
          </span>
          <span>
            <strong>Wysp</strong>
            <small>apps and tools by Whisper</small>
          </span>
        </a>
        <div className="footer-links">
          <a href="/#products">Products</a>
          <a href="/#follow">Follow</a>
          <a href="/#suggest">Suggest</a>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${contact.email}`}>Email</a>
        </div>
      </footer>
    </>
  );
}

function HomePage() {
  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    document.querySelector(window.location.hash)?.scrollIntoView();
  }, []);

  return (
    <main id="top">
      <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-copy">
              <h1 id="hero-title">Quiet productivity</h1>
              <p>
                Wysp is a personal home for useful browser, desktop, and web tools
                by Whisper.
              </p>
            </div>
            <div className="hero-lanes" aria-label="Wysp product lanes: apps, tools, and systems">
              <svg
                className="hero-stream"
                viewBox="0 0 440 360"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="streamToolsApps"
                    x1="99"
                    y1="258"
                    x2="220"
                    y2="48"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--color-flow-honey)" />
                    <stop offset="46%" stopColor="var(--color-flow-honey)" />
                    <stop offset="76%" stopColor="var(--color-flow-mint)" />
                    <stop offset="100%" stopColor="var(--color-flow-teal)" />
                  </linearGradient>
                  <linearGradient
                    id="streamAppsSystems"
                    x1="220"
                    y1="48"
                    x2="341"
                    y2="258"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--color-flow-teal)" />
                    <stop offset="42%" stopColor="var(--color-flow-teal)" />
                    <stop offset="75%" stopColor="var(--color-flow-mint)" />
                    <stop offset="100%" stopColor="var(--color-flow-sage)" />
                  </linearGradient>
                  <linearGradient
                    id="streamSystemsTools"
                    x1="341"
                    y1="258"
                    x2="99"
                    y2="258"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--color-flow-sage)" />
                    <stop offset="44%" stopColor="var(--color-flow-sage)" />
                    <stop offset="78%" stopColor="var(--color-flow-mint)" />
                    <stop offset="100%" stopColor="var(--color-flow-honey)" />
                  </linearGradient>
                  <linearGradient
                    id="streamOrbitGradient"
                    x1="78"
                    y1="66"
                    x2="362"
                    y2="318"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="var(--color-flow-honey-strong)" />
                    <stop offset="42%" stopColor="var(--color-flow-teal-strong)" />
                    <stop offset="72%" stopColor="var(--color-flow-sage-strong)" />
                    <stop offset="100%" stopColor="var(--color-flow-honey-strong)" />
                  </linearGradient>
                </defs>
                <circle
                  className="stream-aura"
                  cx="220"
                  cy="188"
                  r="140"
                  pathLength={720}
                />
                <path
                  className="stream-segment stream-tools-apps"
                  d="M99 258A140 140 0 0 1 220 48"
                />
                <path
                  className="stream-segment stream-apps-systems"
                  d="M220 48A140 140 0 0 1 341 258"
                />
                <path
                  className="stream-segment stream-systems-tools"
                  d="M341 258A140 140 0 0 1 99 258"
                />
                <circle
                  className="stream-flow"
                  cx="220"
                  cy="188"
                  r="140"
                  pathLength={720}
                  transform="rotate(150 220 188)"
                />
              </svg>
              <div className="lane-card lane-card-apps">
                <div className="lane-card-head">
                  <span className="lane-icon" aria-hidden="true">
                    <AppWindow size={18} strokeWidth={2.2} />
                  </span>
                  <span className="lane-number">01</span>
                </div>
                <strong>Apps</strong>
              </div>
              <div className="lane-card lane-card-tools">
                <div className="lane-card-head">
                  <span className="lane-icon" aria-hidden="true">
                    <Wrench size={18} strokeWidth={2.2} />
                  </span>
                  <span className="lane-number">02</span>
                </div>
                <strong>Tools</strong>
              </div>
              <div className="lane-card lane-card-systems">
                <div className="lane-card-head">
                  <span className="lane-icon" aria-hidden="true">
                    <Workflow size={18} strokeWidth={2.2} />
                  </span>
                  <span className="lane-number">03</span>
                </div>
                <strong>Systems</strong>
              </div>
            </div>
          </div>
      </section>

      <div className="platform-wave-divider" aria-hidden="true">
        <div className="wave-track wave-track-one">
          <svg viewBox="0 0 2880 180" preserveAspectRatio="none" focusable="false">
            <path d="M0 82C240 22 480 22 720 82C960 142 1200 142 1440 82C1680 22 1920 22 2160 82C2400 142 2640 142 2880 82V180H0Z" />
          </svg>
        </div>
        <div className="wave-track wave-track-two">
          <svg viewBox="0 0 2880 180" preserveAspectRatio="none" focusable="false">
            <path d="M0 98C220 58 500 56 720 98C940 140 1220 138 1440 98C1660 58 1940 56 2160 98C2380 140 2660 138 2880 98V180H0Z" />
          </svg>
        </div>
        <div className="wave-track wave-track-three">
          <svg viewBox="0 0 2880 180" preserveAspectRatio="none" focusable="false">
            <path d="M0 116C180 78 540 78 720 116C900 154 1260 154 1440 116C1620 78 1980 78 2160 116C2340 154 2700 154 2880 116V180H0Z" />
          </svg>
        </div>
        <div className="wave-track wave-track-four">
          <svg viewBox="0 0 2880 180" preserveAspectRatio="none" focusable="false">
            <path d="M0 132C260 92 460 92 720 132C980 172 1180 172 1440 132C1700 92 1900 92 2160 132C2420 172 2620 172 2880 132V180H0Z" />
          </svg>
        </div>
      </div>

      <section className="platform-showcase" aria-labelledby="platform-showcase-title">
        <div className="platform-showcase-inner">
          <div className="section-heading inverted">
            <div className="special-divider" aria-hidden="true">
              <span />
              <span />
            </div>
            <h2 id="platform-showcase-title">Multi Platform.</h2>
            <p>All in one solution.</p>
          </div>
          <div className="platform-cards-art">
            <img
              src="/assets/platform-cards.svg"
              alt="Platform cards for macOS, web, and Windows products"
            />
          </div>
        </div>
      </section>

      <section className="facts-section" aria-labelledby="facts-title">
        <div className="section-heading facts-heading">
          <h2 id="facts-title">Some solid facts</h2>
          <p>Let the numbers speak about us</p>
        </div>
        <div className="facts-grid">
          {stats.map((stat, index) => {
            const iconClassName = factIconClasses[index] ?? factIconClasses[0];

            return (
              <article className="fact-counter" key={stat.label}>
                <div className="fact-icon" aria-hidden="true">
                  <i className={iconClassName} />
                </div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            );
          })}
          </div>
      </section>

      <section className="products-section" id="products" aria-labelledby="products-title">
          <div className="section-heading">
            <span>Products</span>
            <h2 id="products-title">The catalog starts clean and grows with you.</h2>
            <p>
              Compact product rows keep the homepage easy to scan as the catalog
              grows from a few launches into a full shelf.
            </p>
          </div>

          <div className="product-list">
            {products.map((product, index) => (
              <ProductRow product={product} index={index} key={product.name} />
            ))}
          </div>
      </section>

      <section className="follow-section" id="follow" aria-labelledby="follow-title">
          <div className="section-heading">
            <span>Follow</span>
            <h2 id="follow-title">Reach Whisper where the work already happens.</h2>
            <p>
              Follow the code, send product ideas, or use a direct contact path when
              a tool should turn into a real conversation.
            </p>
          </div>

          <div className="channel-grid">
            {channels.map((channel) => (
              <a
                className="channel-link"
                href={channel.href}
                key={channel.label}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={`${channel.label}: ${channel.value}`}
              >
                <channel.icon size={22} aria-hidden="true" />
                <span className="channel-copy">
                  <strong>{channel.label}</strong>
                  <small>{channel.value}</small>
                </span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
      </section>

      <section className="suggest-section" id="suggest" aria-labelledby="suggest-title">
          <div className="suggest-copy">
            <span>Suggest</span>
            <h2 id="suggest-title">Let users point you toward useful problems.</h2>
            <p>
              The project can stay personal while still giving visitors a clear way to
              request tools, report pain points, or follow launches.
            </p>
            <a className="button primary" href={contact.suggestionHref}>
              Send a suggestion
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="suggest-panel" aria-label="Suggestion categories">
            {suggestionPrompts.map((prompt) => (
              <div className="suggest-row" key={prompt.label}>
                <prompt.icon size={22} aria-hidden="true" />
                <span>{prompt.label}</span>
                <CheckCircle2 size={18} aria-hidden="true" />
              </div>
            ))}
          </div>
      </section>
    </main>
  );
}

type ProductRowProps = {
  product: Product;
  index: number;
};

function ProductRow({ product, index }: ProductRowProps) {
  const isReversed = index % 2 === 1;

  return (
    <article className={isReversed ? 'product-row is-reversed' : 'product-row'}>
      <div className={`product-visual accent-${product.accent}`}>
        <img src={product.image.src} alt={product.image.alt} />
        <div className="product-visual-badge" aria-hidden="true">
          <product.icon size={24} />
        </div>
      </div>

      <div className="product-copy">
        <span className={`status accent-${product.accent}`}>{product.status}</span>
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul>
          {product.points.map((point) => (
            <li key={point}>
              <CheckCircle2 size={17} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <p className="product-outcome">{product.outcome}</p>
        <a href={product.href} className="text-link">
          Learn more
          <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

function ProductDetailPage({ product }: { product: Product }) {
  return (
    <main id="top" className="detail-main">
      <section className={`product-detail-hero accent-${product.accent}`} aria-labelledby="detail-title">
        <div className="product-detail-copy">
          <a className="back-link" href="/#products">
            <ArrowRight size={16} aria-hidden="true" />
            Back to products
          </a>
          <span className={`status accent-${product.accent}`}>{product.status}</span>
          <p className="eyebrow">{product.eyebrow}</p>
          <h1 id="detail-title">{product.name}</h1>
          <p>{product.detail.intro}</p>
          <div className="detail-actions">
            <a className="button primary" href={product.detail.primaryAction.href}>
              {product.detail.primaryAction.label}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="button ghost" href="/#suggest">
              Send feedback
            </a>
          </div>
        </div>
        <div className="product-detail-visual">
          <img src={product.image.src} alt={product.image.alt} />
        </div>
      </section>

      <section className="detail-section" aria-labelledby="detail-structure-title">
        <div className="section-heading">
          <span>Product detail</span>
          <h2 id="detail-structure-title">Ready to grow from placeholder to launch page.</h2>
          <p>
            Every detail page uses the same product data shape, so a future product can
            start from generated copy and swap in real media when it is ready.
          </p>
        </div>
        <div className="detail-grid">
          {product.detail.sections.map((section) => (
            <article className="detail-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-roadmap" aria-labelledby="roadmap-title">
        <div>
          <span>Next steps</span>
          <h2 id="roadmap-title">Launch notes stay honest.</h2>
        </div>
        <ul>
          {product.detail.milestones.map((milestone) => (
            <li key={milestone}>
              <CheckCircle2 size={18} aria-hidden="true" />
              {milestone}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
