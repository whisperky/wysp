import { PRIVACY_CONTACT_EMAIL, PRIVACY_EFFECTIVE_DATE, REEL_ROUTES } from '../config';

/**
 * Canonical privacy policy for the Reel extension.
 *
 * The Chrome Web Store requires a publicly reachable privacy-policy URL for any
 * extension that handles user data, and this page is that URL
 * (https://wysp.pro/reel/privacy). It must stay factually in step with what the
 * extension actually does — the mirror in the Reel repo
 * (docs/PRIVACY_POLICY.md) is the developer-facing copy of the same text.
 */
export function ReelPrivacyPage() {
  return (
    <main className="reel-section reel-wrap">
      <div className="reel-wrap-narrow reel-legal">
        <p className="reel-eyebrow">Reel</p>
        <h1>Privacy Policy</h1>

        <ul className="reel-legal-meta">
          <li>
            <strong>Effective date:</strong> {PRIVACY_EFFECTIVE_DATE}
          </li>
          <li>
            <strong>Developer:</strong> Wysp
          </li>
          <li>
            <strong>Contact:</strong> <a href={'mailto:' + PRIVACY_CONTACT_EMAIL}>{PRIVACY_CONTACT_EMAIL}</a>
          </li>
        </ul>

        <p>
          Reel is a browser extension that exports the Discord messages <strong>you can already
          read</strong> to local storage on your own device and lets you search them, build
          per-user profiles, and (on the paid tier) ask AI questions across them. This policy
          explains exactly what data Reel touches and where — if anywhere — it goes.
        </p>

        <h2>1. Data stored on your device (never sent to us)</h2>
        <p>
          Everything Reel exports lives in your browser&rsquo;s local storage (IndexedDB and{' '}
          <code>chrome.storage</code>) on your machine:
        </p>
        <ul>
          <li>
            Captured Discord messages, author names/IDs, channel/server names/IDs, timestamps,
            and derived data (search index, semantic-search embeddings).
          </li>
          <li>Your settings and preferences.</li>
          <li>Your license key and a random per-installation identifier (see §5).</li>
        </ul>
        <p>
          This data is <strong>not transmitted to the developer</strong>. You can erase all of it
          at any time with <strong>Settings → Delete all data</strong>.
        </p>

        <h2>2. Your Discord session token</h2>
        <p>
          To fetch message history and enumerate channels, Reel reads the Discord authorization
          token that your browser <strong>already sends</strong> with its own requests to Discord,
          and reuses it to call Discord&rsquo;s API <strong>on your behalf</strong>, for the
          servers and channels your account can already access.
        </p>
        <ul>
          <li>
            The token is held only in volatile session memory (<code>chrome.storage.session</code>),
            is <strong>cleared when you close the browser</strong>, is never written to disk, never
            shown in the interface, and is <strong>sent to no one except discord.com</strong>.
          </li>
          <li>Reel does not capture your Discord password, email, or 2FA.</li>
        </ul>
        <p className="reel-legal-callout">
          <strong>Important — account risk:</strong> using your own account&rsquo;s API access to
          export messages is a form of automation that may be contrary to Discord&rsquo;s Terms of
          Service and could, in principle, put your Discord account at risk. You use this feature
          at your own discretion.
        </p>

        <h2>3. Data sent to our AI service (paid &ldquo;Pro&rdquo; feature only)</h2>
        <p>
          When you ask an AI question (a Pro feature), Reel sends the following to{' '}
          <strong>our Cloudflare Worker</strong>, which forwards it to an AI model provider to
          generate the answer:
        </p>
        <ul>
          <li>Your question text.</li>
          <li>
            A <strong>small selection of message snippets</strong> the assistant chooses as
            evidence — at most 25 rows per call, each truncated (≈400 characters), including author
            display name/username/ID, message text, and channel/server names.{' '}
            <strong>Your full message archive is never sent.</strong>
          </li>
        </ul>
        <p>Handling of this data:</p>
        <ul>
          <li>
            Our Worker <strong>does not store your question or message content.</strong> It keeps
            only anonymous usage counters keyed to a hash of your license key (to enforce your
            monthly quota).
          </li>
          <li>Transmission is over HTTPS.</li>
          <li>
            <strong>AI sub-processors:</strong> the request is processed by{' '}
            <strong>Anthropic</strong> (primary model provider) and may be processed by{' '}
            <strong>OpenAI</strong> (only as a failover, and only if configured). These
            providers&rsquo; API terms do not use API-submitted content to train their models. We
            do <strong>not</strong> route your content to any AI provider that trains on submitted
            data.
          </li>
          <li>
            The on-device semantic-search model runs <strong>entirely in your browser</strong> —
            its weights are bundled inside the extension, so building the semantic index sends{' '}
            <strong>nothing</strong> to any third party.
          </li>
        </ul>
        <p>
          If you are on the free tier and never use the AI feature,{' '}
          <strong>no message content ever leaves your device.</strong>
        </p>

        <h2>4. Images</h2>
        <p>
          Server icons and avatars are loaded as images directly from Discord&rsquo;s own CDN
          (<code>cdn.discordapp.com</code>), the same as when you use Discord normally.
        </p>

        <h2>5. Licensing (paid tier)</h2>
        <p>
          If you purchase Pro, checkout and license management are handled by{' '}
          <strong>Lemon Squeezy</strong> (our payment processor and merchant of record). Reel sends
          your license key and a random per-installation identifier to Lemon Squeezy and to our
          Worker to activate and periodically re-validate your license. See Lemon Squeezy&rsquo;s
          own privacy policy for how they process payment data. We never see your full card
          details.
        </p>

        <h2>6. What we do NOT do</h2>
        <ul>
          <li>
            We do <strong>not</strong> sell or rent your data.
          </li>
          <li>
            We include <strong>no advertising, analytics, or third-party trackers.</strong>
          </li>
          <li>
            We do <strong>not</strong> build a profile of you on our servers.
          </li>
        </ul>

        <h2>7. Data retention &amp; deletion</h2>
        <ul>
          <li>
            On-device data: retained until you clear it (<strong>Settings → Delete all data</strong>)
            or uninstall the extension.
          </li>
          <li>Session token: discarded automatically when you close the browser.</li>
          <li>
            Server-side: only anonymous, license-hashed usage counters; contact us at the address
            above to request their deletion.
          </li>
        </ul>

        <h2>8. Third parties / sub-processors</h2>
        <p>
          Discord (message access + image CDN); Cloudflare (our Worker/AI proxy); Anthropic and, as
          failover, OpenAI (AI model providers); Lemon Squeezy (payments and licensing). The
          embedding model is bundled locally and is <strong>not</strong> a runtime third party.
        </p>

        <h2>9. Children</h2>
        <p>
          Reel is not directed to children under 13 (or the minimum age in your jurisdiction).
        </p>

        <h2>10. Changes</h2>
        <p>
          We may update this policy; material changes will be reflected by a new effective date at
          the top. Continued use after an update constitutes acceptance.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions or data requests: <a href={'mailto:' + PRIVACY_CONTACT_EMAIL}>{PRIVACY_CONTACT_EMAIL}</a>.
        </p>

        <p className="reel-legal-foot">
          Reel is independent and is <strong>not affiliated with, endorsed by, or sponsored by
          Discord</strong>. <a href={REEL_ROUTES.home}>Back to Reel</a>
        </p>
      </div>
    </main>
  );
}
