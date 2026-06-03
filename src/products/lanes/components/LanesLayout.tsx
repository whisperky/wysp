import { NotFoundPanel } from '../../../components/feedback/NotFoundPanel';
import { AppLink } from '../../../components/navigation/AppLink';
import { ASSET_ROOT, CONTACT_EMAIL, LANES_ROUTES, guideNavLinks } from '../config';

export function LanesNav() {
  return (
    <nav className="lanes-nav" aria-label="Lanes primary">
      <div className="lanes-nav-inner">
        <AppLink className="lanes-brand" href={LANES_ROUTES.home} aria-label="Lanes home">
          <img src={ASSET_ROOT + '/lanes-icon-256.png'} alt="" aria-hidden="true" />
          <span>Lanes</span>
        </AppLink>
        <div className="lanes-nav-links">
          <AppLink href="/lanes/#features">Features</AppLink>
          <AppLink href="/lanes/#pricing">Pricing</AppLink>
          <AppLink href="/lanes/#faq">FAQ</AppLink>
          <AppLink className="lanes-parent-link" href="/" aria-label="Home">
            Home
          </AppLink>
          <AppLink className="lanes-nav-cta" href="/lanes/#download">
            Download
          </AppLink>
        </div>
      </div>
    </nav>
  );
}

export function LanesNotFound() {
  return (
    <NotFoundPanel
      eyebrow="Lanes"
      title="That Lanes page is not here."
      mainClassName="lanes-not-found"
      containerClassName="lanes-container lanes-container-narrow"
      headingClassName=""
      actionsClassName=""
      eyebrowClassName="lanes-kicker"
      action={{ href: LANES_ROUTES.home, label: 'Open Lanes home', className: 'lanes-btn lanes-btn-primary' }}
    >
      The product home, launch guides, and press kit live under the Wysp product route at /lanes/.
    </NotFoundPanel>
  );
}

export function LanesFooter() {
  return (
    <footer className="lanes-footer">
      <div className="lanes-footer-inner">
        <div>
          <h2>Lanes</h2>
          <p>A native macOS app that turns every desktop Space into a Lane: named, colored, automated.</p>
        </div>
        <div>
          <h3>Product</h3>
          <AppLink href="/lanes/#features">Features</AppLink>
          <AppLink href="/lanes/#pricing">Pricing</AppLink>
          <AppLink href="/lanes/#faq">FAQ</AppLink>
          <AppLink href="/lanes/#download">Get Lanes</AppLink>
        </div>
        <div>
          <h3>Guides</h3>
          {guideNavLinks.map((link) => (
            <AppLink href={link.href} key={link.href}>
              {link.title}
            </AppLink>
          ))}
        </div>
        <div>
          <h3>Wysp</h3>
          <AppLink href="/">Home</AppLink>
          <AppLink href="/#products">All products</AppLink>
          <AppLink href={LANES_ROUTES.press}>Press kit</AppLink>
          <a href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="lanes-colophon">
        <span>&copy; 2026 Lanes. Made for macOS.</span>
        <span>Lanes is not affiliated with Apple Inc.</span>
      </div>
    </footer>
  );
}
