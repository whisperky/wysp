import { NotFoundPanel } from '../../../components/feedback/NotFoundPanel';
import { AppLink } from '../../../components/navigation/AppLink';
import { ASSET_ROOT, CHROME_STORE_HREF, CONTACT_EMAIL, FEEDBACK_HREF, REEL_ROUTES } from '../config';
import { ChromeGlyph } from './ReelGlyphs';

export function ReelNav() {
  return (
    <nav className="reel-nav" aria-label="Reel primary">
      <div className="reel-nav-inner">
        <AppLink className="reel-brand" href={REEL_ROUTES.home} aria-label="Reel home">
          <img className="reel-brand-mark" src={ASSET_ROOT + '/reel-icon.svg'} alt="" aria-hidden="true" />
          <span className="reel-brand-word">
            Reel<span className="reel-brand-sub">Discord Chat Lens</span>
          </span>
        </AppLink>
        <div className="reel-nav-links">
          <AppLink href={REEL_ROUTES.analyze}>Analyze</AppLink>
          <AppLink href={REEL_ROUTES.export}>Export</AppLink>
          <AppLink href={REEL_ROUTES.privacy}>Privacy</AppLink>
          <AppLink href={REEL_ROUTES.pricing}>Pricing</AppLink>
          <AppLink href={REEL_ROUTES.faq}>FAQ</AppLink>
          <AppLink className="reel-nav-home" href="/" aria-label="Wysp home">
            Home
          </AppLink>
          <AppLink className="reel-btn reel-nav-cta" href={CHROME_STORE_HREF}>
            <ChromeGlyph />
            Add to Chrome
          </AppLink>
        </div>
      </div>
    </nav>
  );
}

export function ReelNotFound() {
  return (
    <NotFoundPanel
      eyebrow="Reel"
      title="That Reel page is not here."
      mainClassName="reel-section reel-wrap"
      containerClassName="reel-wrap-narrow"
      headingClassName=""
      actionsClassName=""
      eyebrowClassName="reel-eyebrow"
      action={{ href: REEL_ROUTES.home, label: 'Open Reel home', className: 'reel-btn reel-btn-brand' }}
    >
      The product home, features, privacy model, and pricing live under the Wysp product route at /reel/.
    </NotFoundPanel>
  );
}

export function ReelFooter() {
  return (
    <footer className="reel-footer">
      <div className="reel-footer-inner">
        <div className="reel-footer-brand">
          <AppLink className="reel-brand" href={REEL_ROUTES.home} aria-label="Reel home">
            <img className="reel-brand-mark" src={ASSET_ROOT + '/reel-icon.svg'} alt="" aria-hidden="true" />
            <span className="reel-brand-word">Reel</span>
          </AppLink>
          <p>
            A local-first Discord chat lens: index channels you can see, ask evidence-backed questions,
            export the whole server. Pull conversation, find signal.
          </p>
        </div>
        <div className="reel-footer-col">
          <h4>Product</h4>
          <AppLink href={REEL_ROUTES.analyze}>AI analysis</AppLink>
          <AppLink href={REEL_ROUTES.export}>Server export</AppLink>
          <AppLink href={REEL_ROUTES.how}>How it works</AppLink>
          <AppLink href={REEL_ROUTES.pricing}>Pricing</AppLink>
        </div>
        <div className="reel-footer-col">
          <h4>Trust</h4>
          <AppLink href={REEL_ROUTES.privacy}>Privacy model</AppLink>
          <AppLink href={REEL_ROUTES.privacy}>Risk boundaries</AppLink>
          <AppLink href={REEL_ROUTES.faq}>FAQ</AppLink>
        </div>
        <div className="reel-footer-col">
          <h4>Wysp</h4>
          <AppLink href="/">Home</AppLink>
          <AppLink href="/#products">All products</AppLink>
          <AppLink href="/lanes/">Lanes</AppLink>
          <a href={FEEDBACK_HREF}>{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="reel-colophon">
        <span>&copy; 2026 Reel · a Wysp product.</span>
        <span>Not affiliated with Discord Inc.</span>
      </div>
    </footer>
  );
}
