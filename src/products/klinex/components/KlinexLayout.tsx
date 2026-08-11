import { NotFoundPanel } from '../../../components/feedback/NotFoundPanel';
import { AppLink } from '../../../components/navigation/AppLink';
import { CONTACT_EMAIL, FEEDBACK_HREF, KLINEX_APP_HREF, KLINEX_ROUTES } from '../config';
import { Spark } from './KlinexGlyphs';

export function KlinexNav() {
  return (
    <nav className="klinex-nav" aria-label="Klinex primary">
      <div className="klinex-nav-inner">
        <AppLink className="klinex-brand" href={KLINEX_ROUTES.home} aria-label="Klinex home">
          <span className="klinex-logo" aria-hidden="true">K</span>
          <span className="klinex-brand-word">Klinex</span>
        </AppLink>
        <AppLink className="klinex-byline" href="/">a Wysp product</AppLink>
        <div className="klinex-nav-links">
          <AppLink href={KLINEX_ROUTES.discover}>Co-design</AppLink>
          <AppLink href={KLINEX_ROUTES.build}>Build</AppLink>
          <AppLink href={KLINEX_ROUTES.own}>Own it</AppLink>
          <AppLink href={KLINEX_ROUTES.community}>Community</AppLink>
          <AppLink href={KLINEX_ROUTES.faq}>FAQ</AppLink>
          <AppLink className="klinex-nav-home" href="/" aria-label="Wysp home">
            Home
          </AppLink>
          <AppLink className="klinex-btn klinex-btn-brand klinex-btn-sm klinex-nav-cta" href={KLINEX_APP_HREF}>
            <Spark size={14} />
            Get early access
          </AppLink>
        </div>
      </div>
    </nav>
  );
}

export function KlinexNotFound() {
  return (
    <NotFoundPanel
      eyebrow="Klinex"
      title="That Klinex page is not here."
      mainClassName="klinex-section klinex-wrap klinex-nf"
      containerClassName="klinex-nf-inner"
      headingClassName=""
      actionsClassName=""
      eyebrowClassName="klinex-eyebrow"
      action={{ href: KLINEX_ROUTES.home, label: 'Open Klinex home', className: 'klinex-btn klinex-btn-brand' }}
    >
      The studio, the Director, the verified build, and everything you own live under the Wysp product route at /klinex/.
    </NotFoundPanel>
  );
}

export function KlinexFooter() {
  return (
    <footer className="klinex-footer">
      <div className="klinex-footer-inner">
        <div className="klinex-footer-brand">
          <AppLink className="klinex-brand" href={KLINEX_ROUTES.home} aria-label="Klinex home">
            <span className="klinex-logo" aria-hidden="true">K</span>
            <span className="klinex-brand-word">Klinex</span>
          </AppLink>
          <p>
            A real game from one sentence. Describe a world, co-design it with the Director, and own a
            game that is proven fair and winnable before you play.
          </p>
        </div>
        <div className="klinex-footer-col">
          <h4>Studio</h4>
          <AppLink href={KLINEX_ROUTES.discover}>Co-design</AppLink>
          <AppLink href={KLINEX_ROUTES.direction}>The fingerprint</AppLink>
          <AppLink href={KLINEX_ROUTES.build}>Build &amp; verify</AppLink>
          <AppLink href={KLINEX_ROUTES.own}>Own it</AppLink>
        </div>
        <div className="klinex-footer-col">
          <h4>Community</h4>
          <AppLink href={KLINEX_ROUTES.community}>Play &amp; remix</AppLink>
          <AppLink href={KLINEX_ROUTES.faq}>FAQ</AppLink>
          <a href={FEEDBACK_HREF}>{CONTACT_EMAIL}</a>
        </div>
        <div className="klinex-footer-col">
          <h4>Wysp</h4>
          <AppLink href="/">Home</AppLink>
          <AppLink href="/#products">All products</AppLink>
          <AppLink href="/reel/">Reel</AppLink>
        </div>
      </div>
      <div className="klinex-colophon">
        <span>&copy; 2026 Klinex · a Wysp product.</span>
        <span>Made one sentence at a time.</span>
      </div>
    </footer>
  );
}
