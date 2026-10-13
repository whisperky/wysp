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
          per-user profiles, and ask AI questions about a server (3 free questions, then the
          paid tier). When you ask a question, Reel first reads the server you are viewing. This
          policy explains exactly what data Reel touches and where — if anywhere — it goes.
        </p>

        <h2>1. Data stored on your device</h2>
        <p>
          Everything Reel exports or reads lives in your browser&rsquo;s local storage (IndexedDB and{' '}
          <code>chrome.storage</code>) on your machine:
        </p>
        <ul>
          <li>
            Captured Discord messages, author names/IDs, channel/server names/IDs, timestamps,
            and derived data (search index, semantic-search embeddings). This includes the
            messages Reel reads when you ask an AI question (see §2).
          </li>
          <li>Your settings and preferences.</li>
          <li>Your license key and a random per-installation identifier (see §5).</li>
          <li>
            A random device identifier that limits free questions (see §3). It is kept in the
            extension&rsquo;s storage. If Chrome sync is on, it syncs with your Chrome profile.
          </li>
        </ul>
        <p>
          Your stored messages are <strong>not uploaded to us</strong>. The only message content
          that leaves your device is what §3 describes. You can erase the stored messages and the
          data built from them at any time with <strong>Settings → Delete all local data</strong>.
        </p>

        <h2>2. Your Discord session token</h2>
        <p>
          To read message history and list channels, Reel reads the Discord authorization
          token that your browser <strong>already sends</strong> with its own requests to Discord,
          and reuses it to call Discord&rsquo;s API <strong>on your behalf</strong>, for the
          servers and channels your account can already access.
        </p>
        <p>Reel fetches messages from Discord in two cases:</p>
        <ul>
          <li>
            <strong>When you export.</strong> Reel reads the channels you chose.
          </li>
          <li>
            <strong>When you send an AI question.</strong> Reel first reads the server you are
            viewing: newest messages first, across the text and announcement channels you can see
            (Deep mode also reads active threads). It stops when a time limit is reached (at most
            about 90 seconds), saves what it read on your device, and then answers. Your next
            question reads only what is new, then goes further back.
          </li>
        </ul>
        <p>
          Reel does not crawl Discord in the background. It fetches messages only when you start
          an export or send a question, at a limited pace (about 2.8 requests per second at most).
          If you turn on Live sync (Pro), Reel also saves the messages that Discord already shows
          in your open tab. That reads the page, not Discord&rsquo;s API.
        </p>
        <ul>
          <li>
            The token is held only in volatile session memory (<code>chrome.storage.session</code>),
            is <strong>cleared when you close the browser</strong>, is never written to disk, never
            shown in the interface, and is <strong>sent to no one except discord.com</strong>.
          </li>
          <li>Reel does not capture your Discord password, email, or 2FA.</li>
        </ul>
        <p>
          <strong>Important — account risk:</strong> using your own account&rsquo;s API access to
          export messages, or to read a server when you ask an AI question, is a form of
          automation that may be contrary to Discord&rsquo;s Terms of Service and could, in
          principle, put your Discord account at risk. You use these features at your own
          discretion.
        </p>

        <h2>3. Data sent to our AI service (when you ask an AI question)</h2>
        <p>
          When you ask an AI question, Reel sends the following to{' '}
          <strong>our Cloudflare Worker</strong>, which forwards it to <strong>Anthropic</strong>{' '}
          to generate the answer. Pro questions and the 3 free questions send the same kinds of
          data:
        </p>
        <ul>
          <li>Your question text, and the earlier questions and answers in the same chat.</li>
          <li>
            <strong>Message excerpts</strong> that the assistant&rsquo;s searches return as
            evidence. A search returns at most 25 messages per call in Fast mode and at most 100
            in Deep mode. The user-investigation tool returns up to 200 messages per call by
            default and up to 1,000 when asked. Each excerpt is cut to about 800 characters. An
            answer can take up to 20 steps in Fast mode and up to 40 in Deep mode (up to 10 for a
            free question). Excerpts include the message text, the author&rsquo;s name and ID,
            channel and server names and IDs, the timestamp, and a link to the message.
          </li>
          <li>
            Context for the answer: the name and ID of the server, a short summary of what Reel
            has saved for it (counts and date range), and short notes the assistant kept from
            earlier answers about that server.
          </li>
        </ul>
        <p>
          Only the items above are sent, not the rest of your saved messages. For Pro questions,
          Reel also sends your license key and license activation ID, so the Worker can check your
          license and count your usage (see §5).
        </p>
        <p>Handling of this data:</p>
        <ul>
          <li>
            Our Worker <strong>does not store your question or message content.</strong> It keeps
            usage counters: for Pro, keyed to a one-way hash of your license key (to enforce your
            monthly quota); for free questions, as described below.
          </li>
          <li>Transmission is over HTTPS.</li>
          <li>
            <strong>AI sub-processor:</strong> Anthropic is the only AI provider that receives
            this data. Anthropic&rsquo;s commercial terms say it may not train its models on
            customer content from its services. We do <strong>not</strong> send your content
            to any other AI provider.
          </li>
          <li>
            The on-device semantic-search model runs <strong>entirely in your browser</strong> —
            its weights are bundled inside the extension, so building the semantic index sends{' '}
            <strong>nothing</strong> to any third party.
          </li>
        </ul>
        <p>
          <strong>Free questions.</strong> Without Pro you get 3 free questions, in Fast mode
          only. To enforce the limit:
        </p>
        <ul>
          <li>
            Reel creates a random <strong>device identifier</strong> and keeps it in the
            extension&rsquo;s storage. If Chrome sync is on, it syncs with your Chrome profile.
          </li>
          <li>
            When you ask a free question, Reel sends this identifier to our Worker. The Worker
            stores a <strong>one-way hash</strong> of it, with the number of free questions used,
            their AI usage, and when they were used. It does not store the raw identifier.
          </li>
          <li>
            The Worker sees your IP address when you connect, as any server does. To limit abuse
            it keeps a <strong>one-way hash</strong> of the IP address for up to 24 hours. It does
            not store the raw IP address.
          </li>
        </ul>
        <p>
          If you never ask an AI question, Reel sends no message content to us or to any AI
          provider.
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
            On-device data: retained until you clear it (<strong>Settings → Delete all local
            data</strong>) or uninstall the extension. With Chrome sync on, Chrome may also keep a
            synced copy of the device identifier in your Chrome profile.
          </li>
          <li>Session token: discarded automatically when you close the browser.</li>
          <li>Server-side, Pro: usage counters keyed to a one-way hash of your license key.</li>
          <li>
            Server-side, free questions: a one-way hash of your device identifier, the number of
            free questions used, their AI usage, and when they were used. We keep these to
            enforce the free-question limit.
          </li>
          <li>Server-side, IP address: a one-way hash, for up to 24 hours.</li>
          <li>Our Worker does not keep your questions or message content.</li>
          <li>
            To ask us to delete the counters above, email{' '}
            <a href={'mailto:' + PRIVACY_CONTACT_EMAIL}>{PRIVACY_CONTACT_EMAIL}</a>.
          </li>
        </ul>

        <h2>8. Third parties / sub-processors</h2>
        <p>
          Discord (message access + image CDN); Cloudflare (our Worker/AI proxy); Anthropic (AI
          answers: Pro and free questions); Lemon Squeezy (payments and licensing). The embedding
          model is bundled locally and is <strong>not</strong> a runtime third party.
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
