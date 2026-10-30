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
          paid tier). When you ask a question, Reel first reads the server you are viewing. This policy explains exactly what data Reel
          touches and where — if anywhere — it goes.
        </p>
        <p>
          <strong>Consent.</strong> Reel does nothing until you agree. When you install it, a page
          opens with one checkbox: &ldquo;I agree that Reel reads the Discord chats I open,
          including DMs, saves them on this device, and sends my AI questions and the messages
          they need to Reel&rsquo;s server and Anthropic.&rdquo; The side panel asks for the same
          agreement until you give it. Until then nothing is read and AI questions are refused.
          Your agreement is saved on your device. You can withdraw it at any time (see §2).
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
          <li>
            Your private notes about DMs. Notes never leave your device.
          </li>
          <li>
            Messages Reel saves from a DM when you press &ldquo;Read this chat&rdquo;. They are
            kept in a separate table, apart from server data. They do not appear in the Analyzer, in exports, in the semantic index or in any
            AI search tool, and they are never uploaded.
          </li>
          <li>Your license key and a random per-installation identifier (see §5).</li>
          <li>A random one-time code for a purchase you start from Reel (see §5).</li>
          <li>
            A random device identifier that limits free questions (see §3). It is kept in the
            extension&rsquo;s storage. If Chrome sync is on, it syncs with your Chrome profile.
          </li>
        </ul>
        <p>
          Your stored messages are <strong>not uploaded to us</strong>. The only message content
          that leaves your device is what §3 describes. You can erase the stored messages and the
          data built from them at any time with <strong>Settings → Delete all local data</strong>.
          This also deletes all saved DMs and DM notes. To remove only one saved DM chat, use{' '}
          <strong>Delete saved chat</strong> in the DM panel; it keeps your note for that chat.
        </p>

        <h2>2. Your Discord session token</h2>
        <p>
          To read message history and list channels, Reel reads the Discord authorization
          token that your browser <strong>already sends</strong> with its own requests to Discord,
          and reuses it to call Discord&rsquo;s API <strong>on your behalf</strong>, for the
          servers and channels your account can already access. Reel keeps this token only after
          you agree on the consent page.
        </p>
        <p>
          <strong>Withdrawing consent.</strong> You can withdraw consent at any time in{' '}
          <strong>Settings → Privacy &amp; data → Consent</strong>. After you confirm, Reel removes
          the stored consent and the Discord token and its other session caches (server and
          profile caches), stops keeping the token, stops Live sync, refuses AI questions, and
          shows the consent card again in the side panel. Data already saved on your device stays
          there until you use <strong>Delete all local data</strong>.
        </p>
        <p>Reel fetches messages from Discord in three cases:</p>
        <ul>
          <li>
            <strong>When you export.</strong> Reel reads the channels you chose.
          </li>
          <li>
            <strong>When you open a DM.</strong> If the side panel is open on a DM, Reel makes up
            to three calls and reads no messages: the DM&rsquo;s info (the people in it and the
            last message id), the other person&rsquo;s profile card (1:1 DMs only), and your
            server list (only to name the servers you share with them). The profile call uses an
            undocumented Discord endpoint that Discord&rsquo;s own app also uses. Reel keeps the
            profile for 5 minutes and the server list for 10 minutes in the browser&rsquo;s
            session memory only. They are never written to disk and never sent to us or to the
            AI. Reel reads that DM&rsquo;s messages only when you press &ldquo;Read this
            chat&rdquo; (no AI): newest first, for up to about 15 seconds the first time and
            about 5 seconds after that. It saves them on your device in a separate table, apart from
            server data. It never reads other DMs.
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
          an export, send a question or read a DM, at a limited pace (about 2.8 requests per second at most).
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
          <li>
            Your question text, and the earlier questions and answers in the same chat.
          </li>
          <li>
            <strong>Message excerpts</strong> that the assistant&rsquo;s searches return as
            evidence. A search returns at most 25 messages per call in Fast mode and at most 100
            in Deep mode. The user-investigation tool returns the latest 40 messages by default and
            at most 200. Each excerpt is cut to between 280 and 800 characters, unless the
            assistant asks for whole messages (4,000 characters at most). An answer can take up
            to 8 steps in Fast mode and up to 14 in Deep mode (for a free question: up to 14 for
            the first, 10 for the others). Search results include the message text, the message ID,
            the author&rsquo;s @username (or name and ID when there is none), the channel name,
            and the time to the minute. Messages shown as evidence about a person carry the
            channel, the text and the day. People in a result also carry up to four short account
            facts that Reel works out on your device, for example &ldquo;account 6 years old&rdquo;.
          </li>
          <li>
            Context for the answer: the name of the server, a short summary of what Reel
            has saved for it (counts and date range), and short notes the assistant kept from
            earlier answers about that server.
          </li>
        </ul>
        <p>
          <strong>Direct messages.</strong> DMs get no AI. No DM text is ever sent to our Worker
          or to Anthropic. AI questions are only about servers. The &ldquo;About them&rdquo; part
          of the DM panel (the profile card, facts from your saved messages from that person in
          servers, the servers you share with their totals, and the counts, links and files of
          the DM you read) is shown on your device and sends nothing to us or
          to the AI. Your private note about a DM is saved only on your device and is never sent.
        </p>
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
            monthly quota); for free questions, as described below. For Pro it also counts how
            many requests, and how much AI usage, went through Fast and through Deep. This is a
            usage counter only, with no question or message content.
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
          <strong>Free questions.</strong> Without Pro you get 3 free questions. The first
          searches as deep as Deep mode; the others run in Fast mode. To enforce the limit:
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
        <p>
          <strong>Buying from inside Reel.</strong> When you open checkout from Reel, Reel adds a
          random one-time code to the checkout and keeps a copy on your device. Lemon Squeezy
          sends the code back to our Worker with your new license key. The Worker stores the key
          encrypted with that code, and does not keep the code itself, so only your copy of Reel
          can read the key. While Settings or the side panel is open, Reel asks the Worker for the
          key and activates it as if you had pasted it. The Worker deletes the key when Reel picks
          it up. A key that is not picked up within 24 hours can no longer be picked up, and the
          Worker deletes it the next time any copy of Reel checks for a purchase. These checks
          are counted per network under a one-way hash of the IP address (see §7). Pasting the
          key from your purchase email still works.
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
            data</strong>, or <strong>Delete saved chat</strong> for one saved DM chat) or
            uninstall the extension. With Chrome sync on, Chrome may also keep a
            synced copy of the device identifier in your Chrome profile.
          </li>
          <li>Session token: discarded automatically when you close the browser.</li>
          <li>
            Server-side, Pro: usage counters keyed to a one-way hash of your license key,
            including how many requests used Fast and how many used Deep.
          </li>
          <li>
            Server-side, free questions: a one-way hash of your device identifier, the number of
            free questions used, their AI usage, and when they were used. We keep these to
            enforce the free-question limit.
          </li>
          <li>Server-side, IP address: a one-way hash, for up to 24 hours.</li>
          <li>
            Server-side, after a purchase from inside Reel: your new license key, encrypted with a
            one-time code that only your copy of Reel holds, until Reel picks it up (see §5).
          </li>
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
