import { NotFoundPanel } from '../../../components/feedback/NotFoundPanel';
import { AppLink } from '../../../components/navigation/AppLink';
import {
  ASSET_ROOT,
  CLAUTOWN_PLAY_HREF,
  CLAUTOWN_PRIVACY_HREF,
  CLAUTOWN_ROUTES,
  CLAUTOWN_TERMS_HREF,
  CONTACT_EMAIL,
  FEEDBACK_HREF,
} from '../config';

export function ClautownNav() {
  return (
    <nav className="clautown-nav" aria-label="Clautown primary">
      <div className="clautown-nav-inner">
        <AppLink className="clautown-brand" href={CLAUTOWN_ROUTES.home} aria-label="Clautown home">
          <img className="clautown-brand-mark" src={ASSET_ROOT + '/clautown-icon.svg'} alt="" aria-hidden="true" />
          <span className="clautown-brand-word">
            Clautown<span className="clautown-brand-sub">your Claude Code town</span>
          </span>
        </AppLink>
        <div className="clautown-nav-links">
          <AppLink href={CLAUTOWN_ROUTES.how}>How it connects</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.districts}>Districts</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.world}>World map</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.privacy}>Privacy</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.faq}>FAQ</AppLink>
          <AppLink href="/" aria-label="Wysp home">
            Wysp
          </AppLink>
          <AppLink className="clautown-btn clautown-btn-gold clautown-nav-cta" href={CLAUTOWN_PLAY_HREF}>
            Play Clautown
          </AppLink>
        </div>
      </div>
    </nav>
  );
}

export function ClautownNotFound() {
  return (
    <NotFoundPanel
      eyebrow="Clautown"
      title="That Clautown page is not here."
      mainClassName="clautown-section clautown-wrap"
      containerClassName="clautown-wrap-narrow"
      headingClassName=""
      actionsClassName=""
      eyebrowClassName="clautown-eyebrow"
      action={{ href: CLAUTOWN_ROUTES.home, label: 'Open Clautown home', className: 'clautown-btn clautown-btn-gold' }}
    >
      The Clautown home, with how it connects, the districts, the world map, privacy and the FAQ, lives at
      /clautown/.
    </NotFoundPanel>
  );
}

export function ClautownFooter() {
  return (
    <footer className="clautown-footer">
      <div className="clautown-footer-inner">
        <div className="clautown-footer-brand">
          <AppLink className="clautown-brand" href={CLAUTOWN_ROUTES.home} aria-label="Clautown home">
            <img className="clautown-brand-mark" src={ASSET_ROOT + '/clautown-icon.svg'} alt="" aria-hidden="true" />
            <span className="clautown-brand-word">Clautown</span>
          </AppLink>
          <p>A 3D town built by your real Claude Code work. Counts and short labels only, never your words.</p>
        </div>
        <div className="clautown-footer-col">
          <h4>Game</h4>
          <AppLink href={CLAUTOWN_PLAY_HREF}>Play Clautown</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.how}>How it connects</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.districts}>Districts</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.world}>World map</AppLink>
        </div>
        <div className="clautown-footer-col">
          <h4>Trust</h4>
          <AppLink href={CLAUTOWN_ROUTES.privacy}>Privacy summary</AppLink>
          <AppLink href={CLAUTOWN_PRIVACY_HREF}>Privacy policy</AppLink>
          <AppLink href={CLAUTOWN_TERMS_HREF}>Terms</AppLink>
          <AppLink href={CLAUTOWN_ROUTES.faq}>FAQ</AppLink>
        </div>
        <div className="clautown-footer-col">
          <h4>Wysp</h4>
          <AppLink href="/">Home</AppLink>
          <AppLink href="/#products">All products</AppLink>
          <AppLink href="/reel/">Reel</AppLink>
          <AppLink href="/lanes/">Lanes</AppLink>
          <a href={FEEDBACK_HREF}>{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="clautown-colophon">
        <span>&copy; 2026 Clautown · a Wysp product.</span>
        <span>Independent project, not affiliated with Anthropic.</span>
      </div>
    </footer>
  );
}
