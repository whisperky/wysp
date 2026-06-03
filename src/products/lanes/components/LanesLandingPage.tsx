import { AppLink } from '../../../components/navigation/AppLink';
import { Eye, Keyboard, Sparkles } from 'lucide-react';
import { landingFaqs } from '../content';
import { EARLY_ACCESS_HREF } from '../config';
import { BenefitCard, FeatureBlock, PricingPlan, SectionHeader } from './LanesBlocks';
import { ProductVisual } from './LanesVisuals';

export function LandingPage() {
  return (
    <main>
      <header className="lanes-hero">
        <div className="lanes-hero-copy">
          <h1>Switch lanes between work contexts on macOS.</h1>
          <p className="lanes-lead">
            macOS gives you ten desktops named <em>Desktop 1</em> through <em>Desktop 10</em>.
            Lanes turns each one into a Lane — name, color, icon, automation profile — and lets
            your Mac configure itself the second you switch in.
          </p>
          <div className="lanes-cta-row">
            <AppLink className="lanes-btn lanes-btn-primary" href="/lanes/#download">
              Download for macOS
            </AppLink>
            <AppLink className="lanes-btn lanes-btn-secondary" href="/lanes/#features">
              See all features
            </AppLink>
          </div>
          <p className="lanes-note">14-day free trial · No credit card · macOS 13 Ventura or later</p>
        </div>
        <ProductVisual variant="hero" />
      </header>

      <section className="lanes-section lanes-benefit-section" aria-label="Lanes benefits">
        <div className="lanes-container">
          <div className="lanes-benefits">
            <BenefitCard
              icon={Eye}
              title="Recognize by sight."
              text="Each Lane gets a name, color, and icon that follows you into the menu bar and Mission Control."
            />
            <BenefitCard
              icon={Keyboard}
              title="Switch with one keystroke."
              text="Quick Switcher with live previews, search highlight, number-key jumps, and a conflict-aware default shortcut."
            />
            <BenefitCard
              icon={Sparkles}
              title="Configures itself on enter."
              text="Appearance, Focus, Dock, apps, project folder, and mute state can belong to the Lane you just entered."
            />
          </div>
        </div>
      </section>

      <section id="features" className="lanes-section">
        <div className="lanes-container">
          <SectionHeader
            eyebrow="Everyday switching"
            title="The Quick Switcher you will use a hundred times a day."
            text="Open it with Command-G from anywhere. Filter by typing, jump by number, and preview each Lane's recent apps before you commit."
          />
          <div className="lanes-feature-list">
            <FeatureBlock
              tag="Daily driver"
              title="Quick Switcher with live preview"
              visual="quick-switcher"
            >
              Press <kbd>⌃⌘G</kbd> from any app. The switcher shows every Lane with color, icon,
              recent apps, and active automations. Type to filter, arrow-key to navigate, press{' '}
              <kbd>↵</kbd> to commit, rename inline, or snapshot the current Lane&apos;s apps as a
              reusable preset.
            </FeatureBlock>
            <FeatureBlock tag="At a glance" title="Menu bar chip you can spot fast" visual="menu-bar" flip>
              Your current Lane lives in the menu bar as a colored pill. The color is the identity,
              so you do not need to open Mission Control just to understand where you are.
            </FeatureBlock>
            <FeatureBlock
              tag="Ships today"
              title="Per-Lane automations run the second you enter"
              visual="automations"
              flip
            >
              Each Lane can mute audio, switch Light or Dark appearance, toggle Focus through a
              Shortcut you create once, auto-hide the Dock, launch apps, and open a project folder.
              Toggling an automation applies it immediately so you can preview the behavior.
            </FeatureBlock>
            <FeatureBlock tag="Billable hours" title="Per-app time tracking with idle detection" visual="time-report">
              Lanes counts time per Lane, breaks it down by app, pauses when you walk away from the
              keyboard, and exports per-session CSV for billable work without becoming a separate
              timer app.
            </FeatureBlock>
            <FeatureBlock tag="Setup confidence" title="Setup Health tells you when macOS settings drift" visual="health" flip>
              Accessibility, auto-rearrange Spaces, and Space reader access are visible checks, not
              hidden troubleshooting notes. Lanes tells you exactly what broke and where to fix it.
            </FeatureBlock>
            <FeatureBlock tag="Conflict-aware defaults" title="Shortcuts that do not fight your other apps" visual="shortcuts">
                Lanes defaults to <kbd>⌃⌘G</kbd> because <kbd>⌘0</kbd> is reset zoom across browsers,
                IDEs, design tools, and document apps. The recorder warns before saving bindings that
                conflict with Spotlight, the emoji picker, Command-number tab switching, or system text
                editing.
            </FeatureBlock>
          </div>
        </div>
      </section>

      <section id="pricing" className="lanes-section lanes-pricing-section">
        <div className="lanes-container">
          <SectionHeader
            eyebrow="Pricing"
            title="Try Lanes free for 14 days."
            text="The planned launch offer is the full app with no feature gating: $4.99 monthly or $49 yearly."
          />
          <div className="lanes-pricing">
            <PricingPlan
              title="Monthly"
              price="$4.99"
              cadence="/month"
              note="Try it out. Cancel anytime."
              features={['Full app, all features', '2 Macs per license', 'All future updates', 'Cancel anytime']}
              cta="Request trial access"
            />
            <PricingPlan
              title="Yearly"
              price="$49"
              cadence="/year"
              note="About $4.08 per month."
              features={['Everything in Monthly', 'Save about 18%', 'Best for long-term workflows']}
              cta="Request trial access"
              highlighted
            />
          </div>
          <div className="lanes-trust" aria-label="Lanes trust details">
            <span>Direct distribution</span>
            <span>Developer ID planned</span>
            <span>No SIP changes</span>
            <span>Data stays local</span>
          </div>
        </div>
      </section>

      <section id="faq" className="lanes-section">
        <div className="lanes-container lanes-container-narrow">
          <SectionHeader eyebrow="FAQ" title="Questions, plainly answered." />
          <div className="lanes-faq">
            {landingFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="lanes-faq-icon" aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="download" className="lanes-section lanes-final-cta">
        <div className="lanes-container lanes-container-narrow">
          <p className="lanes-kicker">Get Lanes</p>
          <h2>Stop counting desktops. Recognize them.</h2>
          <p>
            The Wysp product route for Lanes is ready now. The macOS binary and checkout link can be
            connected here when the launch build is signed and published.
          </p>
          <AppLink className="lanes-btn lanes-btn-primary" href={EARLY_ACCESS_HREF}>
            Request early access
          </AppLink>
        </div>
      </section>
    </main>
  );
}
