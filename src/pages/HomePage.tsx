import { ArrowRight, AppWindow, CheckCircle2, ExternalLink, Workflow, Wrench } from 'lucide-react';
import { ProductRow } from '../components/products/ProductRow';
import { channels, contact, products, stats, suggestionPrompts } from '../data/siteData';
import { useHashScroll } from '../hooks/useHashScroll';

const factIconClasses = ['fas fa-download', 'fas fa-users', 'fab fa-gratipay'] as const;

export function HomePage() {
  useHashScroll('home');

  return (
    <main id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="hero-copy">
            <h1 id="hero-title">Quiet productivity</h1>
            <p>Wysp is a personal home for useful browser, desktop, and web tools by Whisper.</p>
          </div>
          <div className="hero-lanes" aria-label="Wysp product lanes: apps, tools, and systems">
            <svg className="hero-stream" viewBox="0 0 440 360" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="streamToolsApps" x1="99" y1="258" x2="220" y2="48" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--color-flow-honey)" />
                  <stop offset="46%" stopColor="var(--color-flow-honey)" />
                  <stop offset="76%" stopColor="var(--color-flow-mint)" />
                  <stop offset="100%" stopColor="var(--color-flow-teal)" />
                </linearGradient>
                <linearGradient id="streamAppsSystems" x1="220" y1="48" x2="341" y2="258" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--color-flow-teal)" />
                  <stop offset="42%" stopColor="var(--color-flow-teal)" />
                  <stop offset="75%" stopColor="var(--color-flow-mint)" />
                  <stop offset="100%" stopColor="var(--color-flow-sage)" />
                </linearGradient>
                <linearGradient id="streamSystemsTools" x1="341" y1="258" x2="99" y2="258" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--color-flow-sage)" />
                  <stop offset="44%" stopColor="var(--color-flow-sage)" />
                  <stop offset="78%" stopColor="var(--color-flow-mint)" />
                  <stop offset="100%" stopColor="var(--color-flow-honey)" />
                </linearGradient>
                <linearGradient id="streamOrbitGradient" x1="78" y1="66" x2="362" y2="318" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--color-flow-honey-strong)" />
                  <stop offset="42%" stopColor="var(--color-flow-teal-strong)" />
                  <stop offset="72%" stopColor="var(--color-flow-sage-strong)" />
                  <stop offset="100%" stopColor="var(--color-flow-honey-strong)" />
                </linearGradient>
              </defs>
              <circle className="stream-aura" cx="220" cy="188" r="140" pathLength={720} />
              <path className="stream-segment stream-tools-apps" d="M99 258A140 140 0 0 1 220 48" />
              <path className="stream-segment stream-apps-systems" d="M220 48A140 140 0 0 1 341 258" />
              <path className="stream-segment stream-systems-tools" d="M341 258A140 140 0 0 1 99 258" />
              <circle className="stream-flow" cx="220" cy="188" r="140" pathLength={720} transform="rotate(150 220 188)" />
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
            <img src="/assets/platform-cards.svg" alt="Platform cards for macOS, web, and Windows products" />
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
          <p>Compact product rows keep the homepage easy to scan as the catalog grows from a few launches into a full shelf.</p>
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
          <p>Follow the code, send product ideas, or use a direct contact path when a tool should turn into a real conversation.</p>
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
          <p>The project can stay personal while still giving visitors a clear way to request tools, report pain points, or follow launches.</p>
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
