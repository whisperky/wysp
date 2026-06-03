import { NotFoundPanel } from '../../../components/feedback/NotFoundPanel';
import { AppLink } from '../../../components/navigation/AppLink';
import { BRAND_ROOT, INVITE_HREF, TC_ROUTES } from '../config';

export function TcNav() {
  return (
    <nav className="tc-nav">
      <div className="tc-container tc-nav-inner">
        <AppLink className="tc-brand" href={TC_ROUTES.home} aria-label="Trust Contract home">
          <img className="tc-brand-seal" src={BRAND_ROOT + '/avatar.png'} alt="Trust Contract server icon" />
          <span className="tc-brand-name">
            <strong>Trust Contract</strong>
            <span>Hiring Server</span>
          </span>
        </AppLink>
        <div className="tc-nav-links">
          <AppLink href={TC_ROUTES.how}>How it works</AppLink>
          <AppLink href={TC_ROUTES.trust}>Trust Score</AppLink>
          <AppLink href={TC_ROUTES.server}>The server</AppLink>
          <AppLink href={TC_ROUTES.pricing}>Pricing</AppLink>
          <AppLink href={TC_ROUTES.faq}>FAQ</AppLink>
        </div>
        <div className="tc-nav-actions">
          <AppLink className="tc-nav-parent" href="/" aria-label="Back to Wysp home">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Home
          </AppLink>
          <AppLink className="tc-btn tc-btn-gold" href={INVITE_HREF}>Request an invite</AppLink>
        </div>
      </div>
    </nav>
  );
}

export function TcNotFound() {
  return (
    <NotFoundPanel
      eyebrow="Trust Contract"
      title="That Trust Contract page is not here."
      mainClassName="tc-section-ink"
      containerClassName="tc-narrow"
      headingClassName="tc-head"
      actionsClassName="tc-hero-cta"
      eyebrowClassName="tc-eyebrow on-ink"
      action={{ href: TC_ROUTES.home, label: 'Open Trust Contract home', className: 'tc-btn tc-btn-gold' }}
    >
      The product home, Trust Score ladder, server map, and pricing live under the Wysp product route at /trust-contract/.
    </NotFoundPanel>
  );
}

export function TcFooter() {
  return (
    <footer className="tc-footer">
      <div className="tc-container">
        <div className="tc-footer-inner">
          <AppLink className="tc-brand" href={TC_ROUTES.home}>
            <img className="tc-brand-seal" src={BRAND_ROOT + '/avatar.png'} alt="Trust Contract" />
            <span className="tc-brand-name"><strong>Trust Contract</strong><span>A Wysp product</span></span>
          </AppLink>
          <nav className="tc-footer-links">
            <AppLink href={TC_ROUTES.how}>How it works</AppLink>
            <AppLink href={TC_ROUTES.trust}>Trust Score</AppLink>
            <AppLink href={TC_ROUTES.tiers}>Tiers</AppLink>
            <AppLink href={TC_ROUTES.pricing}>Pricing</AppLink>
            <AppLink href={TC_ROUTES.faq}>FAQ</AppLink>
            <AppLink href="/">← Back to Wysp</AppLink>
          </nav>
        </div>
        <div className="tc-footer-copy">© 2026 Wysp · Trust Contract. Privacy-first hiring on Discord. Bronze is free — trust is earned.</div>
      </div>
    </footer>
  );
}
