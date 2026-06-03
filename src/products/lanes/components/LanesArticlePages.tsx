import { AppLink } from '../../../components/navigation/AppLink';
import { ASSET_ROOT, CONTACT_EMAIL, EARLY_ACCESS_HREF, LAST_UPDATED } from '../config';
import type { GuidePageContent } from '../types';
import { RelatedLinks } from './LanesBlocks';

export function GuidePage({ page }: { page: GuidePageContent }) {
  return (
    <main>
      <article className="lanes-article">
        <p className="lanes-crumb">
          <AppLink href="/lanes/">Lanes</AppLink> / Guides / {page.crumb}
        </p>
        <header className="lanes-page-head">
          <h1>{page.h1}</h1>
          <p>Updated {LAST_UPDATED} / {page.readTime}</p>
        </header>
        <div className="lanes-answer-box">
          <span>Short answer</span>
          <p>{page.answer}</p>
        </div>
        {page.body}
        <RelatedLinks links={page.related} />
      </article>
    </main>
  );
}

export function PressPage() {
  return (
    <main>
      <article className="lanes-article">
        <p className="lanes-crumb">
          <AppLink href="/lanes/">Lanes</AppLink> / Press kit
        </p>
        <header className="lanes-page-head">
          <h1>Press kit</h1>
          <p>Everything you need to write about Lanes.</p>
        </header>

        <h2>Boilerplate</h2>
        <p>
          <strong>Short:</strong> Lanes turns every macOS Space into a Lane, named, colored, and
          automated, so power users can switch work contexts with one keystroke.
        </p>
        <p>
          <strong>Medium:</strong> Lanes is a native macOS menu bar app that gives every desktop Space
          an identity and an automation profile: appearance, Focus, Dock auto-hide, app launch, and
          project folder. It adds a Quick Switcher, Mission Control overlays, per-app time tracking,
          and Setup Health checks for the macOS settings Spaces utilities depend on.
        </p>
        <p>
          <strong>Long:</strong> Apple&apos;s Spaces feature has existed since 2007, but users still
          cannot name Spaces natively. Lanes focuses on the everyday moment of returning to the right
          context without scanning every desktop. Each Space gets a name, color, icon, optional
          project folder, and automation profile.
        </p>

        <h2>Fact sheet</h2>
        <ul className="lanes-fact-list">
          <Fact label="Name" value="Lanes" />
          <Fact label="Category" value="macOS productivity utility, workspace manager" />
          <Fact label="Platform" value="macOS 13 Ventura and later, Apple silicon + Intel" />
          <Fact label="Bundle ID" value="app.lanes.mac" />
          <Fact label="Size" value="About 6 MB target" />
          <Fact label="Tech stack" value="Swift, AppKit, SwiftUI" />
          <Fact label="Distribution" value="Direct, Developer ID signed and notarized at launch" />
          <Fact label="Pricing" value="$4.99/month or $49/year, 2 Macs per license" />
          <Fact label="Free trial" value="14 days, full app" />
          <Fact label="Website" value="wysp.pro/lanes" />
          <Fact label="Press contact" value={CONTACT_EMAIL} />
        </ul>

        <h2>Download brand assets</h2>
        <p>
          Existing app-icon PNG assets are available now. Product screenshots and the demo GIF should
          be captured from the signed macOS build before outreach, so this press kit does not ship
          fake screenshot downloads.
        </p>
        <div className="lanes-press-grid">
          <PressAsset
            title="App icon"
            text="Existing Lanes app icon PNGs from the product repo."
            links={[
              { label: '1024 PNG', href: `${ASSET_ROOT}/lanes-icon.png` },
              { label: '512 PNG', href: `${ASSET_ROOT}/lanes-icon-512.png` },
              { label: '256 PNG', href: `${ASSET_ROOT}/lanes-icon-256.png` },
            ]}
          />
          <PressAsset
            title="Favicon"
            text="Small icon assets used by the Wysp-hosted Lanes pages."
            links={[
              { label: '32 PNG', href: `${ASSET_ROOT}/favicon.png` },
              { label: '128 PNG', href: `${ASSET_ROOT}/favicon-128.png` },
            ]}
          />
          <PressAsset
            title="Screenshots"
            text="Capture menu bar chip, Quick Switcher, Mission Control overlay, Automations, Time Report, and Setup Health from the app."
          />
          <PressAsset
            title="Demo GIF"
            text="Record a short loop: Quick Switcher opens, filters by name, switches, then the menu bar chip changes."
          />
        </div>

        <h2>Quotes from the maker</h2>
        <blockquote>
          <p>
            "Apple has shipped Spaces for years without ever letting you name them. Mission Control
            shows you layout, not intent. Lanes fixes that one moment."
          </p>
        </blockquote>
        <blockquote>
          <p>
            "Every Spaces utility I tried either broke on a macOS update or required SIP changes.
            Lanes is the version I wanted: native, safe, and clean to uninstall."
          </p>
        </blockquote>

        <h2>About the maker</h2>
        <p>
          Lanes is built by Whisper as part of Wysp, a personal product hub for focused productivity
          apps, utilities, and automation tools.
        </p>

        <h2>Press inquiries</h2>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for review-license keys,
          embargoes, or anything not covered here.
        </p>

        <RelatedLinks
          links={[
            { label: 'Back to', title: 'Lanes home', href: '/lanes/' },
            { label: 'Get the app', title: 'Request early access', href: EARLY_ACCESS_HREF },
          ]}
        />
      </article>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <li>
      <span>{label}</span>
      <strong>{value}</strong>
    </li>
  );
}

function PressAsset({
  title,
  text,
  links = [],
}: {
  title: string;
  text: string;
  links?: { label: string; href: string }[];
}) {
  return (
    <article className="lanes-press-card">
      <h3>{title}</h3>
      <p>{text}</p>
      {links.length > 0 ? (
        <div className="lanes-press-links">
          {links.map((link) => (
            <AppLink href={link.href} key={link.href}>
              {link.label}
            </AppLink>
          ))}
        </div>
      ) : null}
    </article>
  );
}
