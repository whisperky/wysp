import type { PageMetadata } from '../../lib/pageMetadata';
import { AppLink } from '../../components/navigation/AppLink';
import { InlineCta } from './components/LanesBlocks';
import { ProductVisual } from './components/LanesVisuals';
import { LANES_ROUTES, PRODUCT_ROOT, lanesAbsoluteUrl } from './config';
import { articleSchema, buildFaqSchema, softwareApplicationSchema } from './schema';
import type { FaqItem, GuidePageContent } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'Can I name my Mac desktops?',
    answer:
      'Not natively. macOS calls them Desktop 1 through Desktop 10 and has no built-in rename option. Lanes adds custom names, colors, and SF Symbol icons that follow you into the menu bar and Mission Control.',
  },
  {
    question: 'How do I see my Space names in Mission Control?',
    answer:
      'Lanes overlays your custom labels on top of every Mission Control thumbnail. The labels use the color and icon you assigned each Lane. No SIP changes, no Dock injection.',
  },
  {
    question: "What's the fastest way to switch between Mac desktops?",
    answer:
      'Lanes Quick Switcher, Command-G, lets you pick by typing a name, pressing a number key, or using the arrow keys. It is useful once you have more than three or four Spaces.',
  },
  {
    question: 'How do I stop Mac Spaces from rearranging themselves?',
    answer:
      'Open System Settings, go to Desktop & Dock, scroll to Mission Control, and turn off Automatically rearrange Spaces based on most recent use. Lanes Setup Health flags this setting if it turns back on.',
  },
  {
    question: 'Can I run things automatically when I switch to a Space?',
    answer:
      'Yes. Lanes lets each Lane carry an automation profile for appearance, mute, Focus, Dock auto-hide, app launch, and project-folder opening, then runs it when you enter.',
  },
  {
    question: 'Is Lanes available on the Mac App Store?',
    answer:
      'No. Lanes depends on private macOS Spaces APIs, so it is distributed directly with Developer ID signing and notarization rather than through the Mac App Store.',
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Lanes - Switch between macOS workspaces in a blink',
  description:
    'Lanes turns every macOS Space into a named, colored, automated Lane. Switch with Command-G and let your Mac configure itself when you arrive.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [softwareApplicationSchema(), buildFaqSchema(landingFaqs)],
};

export const guidePages: GuidePageContent[] = [
  {
    slug: 'name-macos-spaces',
    crumb: 'Name macOS Spaces',
    h1: "How to name macOS Spaces, and why Apple won't let you do it natively",
    readTime: '~3 min read',
    metadata: {
      title: 'How to Name macOS Spaces (Rename Your Mac Desktops) | Lanes',
      description:
        'macOS calls them Desktop 1 through Desktop 10 with no rename option. Give every Mac Space a name, color, and icon with Lanes.',
      path: LANES_ROUTES.nameMacosSpaces,
      ogType: 'article',
      schema: [
        articleSchema(
          'How to Name macOS Spaces',
          'macOS has no built-in rename for Spaces. Lanes adds names, colors, icons, Mission Control labels, and per-Space automations.',
          LANES_ROUTES.nameMacosSpaces,
        ),
        buildFaqSchema([
          {
            question: 'Can I name my Mac desktops?',
            answer:
              'Not natively. macOS calls them Desktop 1 through Desktop 10 and has no built-in rename option. Lanes adds a name, color, and SF Symbol icon to each Space, visible in the menu bar and Mission Control.',
          },
          {
            question: 'What free options exist for naming Mac desktops?',
            answer:
              'NameSpace and Spaceman are free open-source utilities for basic menu bar identity. Lanes adds names, colors, icons, Mission Control labels, automations, and time tracking.',
          },
        ]),
      ],
    },
    answer: (
      <>
        macOS has no built-in way to rename Spaces. Apple calls them <em>Desktop 1</em> through{' '}
        <em>Desktop 10</em>, and there is no rename option in System Settings or Mission Control.{' '}
        <AppLink href="/lanes/">Lanes</AppLink> adds a name, color, and SF Symbol icon to each Space, visible in
        the menu bar and on every Mission Control thumbnail.
      </>
    ),
    body: (
      <>
        <h2>Why does macOS not let me rename Spaces?</h2>
        <p>
          Apple introduced Spaces in 2007 and Mission Control in 2011. In the years since, desktop
          labels have never become editable. The system reserves Space identity for itself: names,
          order, and Mission Control labels are opaque to apps through public macOS APIs.
        </p>
        <p>
          The practical impact is simple. By Wednesday afternoon, you have four to ten desktops open
          and no idea which one has the client deck. Mission Control shows layout, not intent.
        </p>

        <h2>What are my options?</h2>
        <h3>Option 1: Use a third-party utility</h3>
        <p>
          Several macOS utilities work around the public API gap by reading Space metadata through
          private macOS frameworks. The useful distinction is what they add after they can identify a
          Space.
        </p>
        <ul>
          <li>
            <strong>Lanes</strong>: names, colors, SF Symbol icons, Mission Control labels,
            per-Space automations, per-app time tracking, and a Quick Switcher.
          </li>
          <li>
            <strong>NameSpace</strong>: open-source naming in the menu bar.
          </li>
          <li>
            <strong>Spaceman</strong>: open-source icons in the menu bar.
          </li>
          <li>
            <strong>Spaces Renamer</strong>: direct label renaming by reaching into the Dock process,
            which can be fragile across macOS versions.
          </li>
        </ul>

        <h3>Option 2: Live with Desktop 1 through Desktop 10</h3>
        <p>
          You can memorize which number holds what. That works for two or three desktops. Past that,
          it turns into a memory test.
        </p>

        <h2>How Lanes solves it</h2>
        <p>
          Open Lanes from the menu bar, choose <strong>Name This Lane</strong>, type a name like{' '}
          <strong>Client Joe</strong>, then pick a color and SF Symbol. The identity follows you
          everywhere:
        </p>
        <ul>
          <li>
            <strong>Menu bar chip</strong>: your current Lane color and name live in the top-right.
          </li>
          <li>
            <strong>Mission Control</strong>: Lanes overlays a card-style label on every desktop
            thumbnail.
          </li>
          <li>
            <strong>Quick Switcher</strong>: press <kbd>⌃⌘G</kbd>, type the name, and switch with
            arrow keys or a number key.
          </li>
        </ul>
        <p>
          Lanes does this without modifying Apple&apos;s Dock process. The Mission Control overlay is
          rendered by Lanes&apos; own floating window, so there are no SIP changes and no Dock hooks
          to clean up later.
        </p>

        <InlineCta
          title="Try Lanes free for 14 days"
          text="Full app. No credit card. macOS 13 Ventura or later."
          label="Request early access"
        />

        <h2>Why naming Spaces actually matters</h2>
        <p>
          If your work splits across more than three contexts, desktop numbers stop being
          navigation. Names, colors, and icons move the burden from recall to recognition. That is the
          whole job of a Spaces utility: get you back into the right context without scanning every
          thumbnail.
        </p>

        <h2>What about per-Space automations?</h2>
        <p>
          A close cousin of naming is making each Space behave differently. Lanes can switch
          appearance, toggle Focus through a Shortcut, auto-hide the Dock, launch apps, open a
          project folder, and mute system audio when you enter a Lane.
        </p>
      </>
    ),
    related: [
      {
        label: 'Related guide',
        title: 'See Space names in Mission Control',
        href: LANES_ROUTES.missionControlLabels,
      },
      {
        label: 'Related guide',
        title: 'Switch between Mac desktops fast',
        href: LANES_ROUTES.switchDesktopsFast,
      },
    ],
  },
  {
    slug: 'mission-control-labels',
    crumb: 'Mission Control labels',
    h1: 'How to see Space names in Mission Control on a Mac',
    readTime: '~3 min read',
    metadata: {
      title: 'How to See Space Names in Mission Control on Mac | Lanes',
      description:
        'macOS Mission Control shows Desktop 1, Desktop 2, and so on. Lanes overlays your real Space names, colors, and icons on every thumbnail.',
      path: LANES_ROUTES.missionControlLabels,
      ogType: 'article',
      schema: [
        articleSchema(
          'How to See Space Names in Mission Control on Mac',
          'Lanes overlays custom names, colors, and icons on Mission Control thumbnails without SIP changes or Dock-process injection.',
          LANES_ROUTES.missionControlLabels,
        ),
        buildFaqSchema([
          {
            question: 'How do I see Space names in Mission Control on a Mac?',
            answer:
              "macOS doesn't show Space names in Mission Control by default. Lanes overlays your custom name, color, and icon on top of every Mission Control thumbnail.",
          },
          {
            question: "Why doesn't Apple's Mission Control show desktop names?",
            answer:
              'macOS has never exposed a public API for naming Spaces. Mission Control was designed to show layout rather than intent, and there is no preference for custom labels.',
          },
        ]),
      ],
    },
    answer: (
      <>
        macOS does not show Space names in Mission Control by default, only <em>Desktop 1</em>,{' '}
        <em>Desktop 2</em>, and so on. <AppLink href="/lanes/">Lanes</AppLink> overlays your custom name, color,
        and icon on top of every Mission Control thumbnail. The overlay is a floating panel rendered
        by Lanes itself, with no SIP changes or Dock-process injection.
      </>
    ),
    body: (
      <>
        <h2>What Mission Control gives you, and what it does not</h2>
        <p>
          Open Mission Control with a trackpad gesture, <kbd>F3</kbd>, or <kbd>⌃↑</kbd>, and macOS
          shows desktop thumbnails along the top of the screen. Each one is labeled with a generic
          desktop number. That is fine for two or three desktops, but the labels carry no semantic
          information.
        </p>

        <h2>Why Apple does not show custom names</h2>
        <p>
          macOS reserves Space identity for the system. Public APIs do not expose a supported way to
          name Spaces, change Mission Control labels, or draw into the Mission Control strip.
        </p>

        <h2>How third-party tools add labels</h2>
        <h3>Approach A: Overlay</h3>
        <p>
          The app renders its own floating window on top of Mission Control and places labels where
          the thumbnails appear. When Mission Control closes, the overlay closes too. Lanes uses this
          approach because it avoids SIP changes and Dock injection.
        </p>
        <h3>Approach B: Dock injection</h3>
        <p>
          Some older utilities inject code into Apple&apos;s Dock process and rewrite the labels
          directly. The labels can look more native, but this is more fragile, can require SIP
          changes, and can break on macOS updates.
        </p>

        <h2>How Lanes shows Mission Control labels</h2>
        <p>
          Name your Spaces in Lanes, then trigger Mission Control as usual. Lanes renders a row of
          card-style labels at the top of each display, one per Space, using the assigned color and
          icon. The active Lane gets a subtle accent ring.
        </p>

        <ProductVisual variant="mission-control" />

        <InlineCta
          title="Try the Mission Control labels free"
          text="14-day full trial. No credit card. Works on macOS 13 and later."
          label="Request early access"
        />

        <h2>What about full-screen Spaces?</h2>
        <p>
          Full-screen app Spaces get labels too. Lanes shows the owning app&apos;s name, then switches
          into that Space by activating the owning app because Apple&apos;s desktop-number shortcuts do
          not target full-screen Spaces directly.
        </p>

        <h2>Setup checklist</h2>
        <ol>
          <li>
            Allow Lanes in <strong>System Settings → Privacy &amp; Security → Accessibility</strong>.
          </li>
          <li>
            Turn off <strong>Automatically rearrange Spaces based on most recent use</strong> in{' '}
            <strong>Desktop &amp; Dock → Mission Control</strong>.
          </li>
        </ol>
      </>
    ),
    related: [
      {
        label: 'Related guide',
        title: 'Name your macOS Spaces',
        href: LANES_ROUTES.nameMacosSpaces,
      },
      {
        label: 'Related guide',
        title: 'Stop Spaces from rearranging',
        href: LANES_ROUTES.autoRearrangeSpaces,
      },
    ],
  },
  {
    slug: 'switch-desktops-fast',
    crumb: 'Switch desktops fast',
    h1: 'How to switch between Mac desktops fast',
    readTime: '~4 min read',
    metadata: {
      title: 'How to Switch Between Mac Desktops Fast (Shortcuts & Tools) | Lanes',
      description:
        'Three native ways to switch macOS desktops, plus the fastest non-native way: a Lanes Quick Switcher that picks by name in one keystroke.',
      path: LANES_ROUTES.switchDesktopsFast,
      ogType: 'article',
      schema: [
        articleSchema(
          'How to Switch Between Mac Desktops Fast',
          'Use Control plus number, trackpad swipes, Mission Control, or Lanes Quick Switcher to move between Mac desktops faster.',
          LANES_ROUTES.switchDesktopsFast,
        ),
        buildFaqSchema([
          {
            question: "What's the fastest way to switch between Mac desktops?",
            answer:
              'Lanes Quick Switcher, Command-G, lets you pick by typing a name, pressing a number key, or using the arrow keys. Native options include Control plus a desktop number and trackpad swipes.',
          },
          {
            question: 'How do I enable Control plus number to switch desktops on Mac?',
            answer:
              'Open System Settings, Keyboard, Keyboard Shortcuts, Mission Control, then enable Switch to Desktop 1, Switch to Desktop 2, and the other desktop-number shortcuts you use.',
          },
        ]),
      ],
    },
    answer: (
      <>
        Three native options exist: <kbd>⌃</kbd> plus a number after you enable it, a three-finger
        trackpad swipe, or Mission Control. <AppLink href="/lanes/">Lanes</AppLink> adds a Quick Switcher{' '}
        <kbd>⌃⌘G</kbd> that picks a desktop by typing its name, which matters once you have more
        than three Spaces.
      </>
    ),
    body: (
      <>
        <h2>The three native ways</h2>
        <h3>1. Keyboard: Control plus number</h3>
        <p>
          This is the fastest native option once enabled, but macOS ships it turned off. Open{' '}
          <strong>System Settings → Keyboard → Keyboard Shortcuts → Mission Control</strong>, expand
          the Mission Control group, and enable <strong>Switch to Desktop 1</strong>,{' '}
          <strong>Switch to Desktop 2</strong>, and so on.
        </p>
        <p>
          After that, <kbd>⌃1</kbd> goes to Desktop 1, <kbd>⌃2</kbd> goes to Desktop 2, and the
          motion can become muscle memory.
        </p>

        <h3>2. Trackpad: three-finger swipe</h3>
        <p>
          Swipe left or right with three fingers, depending on your Trackpad settings. It is smooth
          and native, but slower than the keyboard for jumps of more than one desktop.
        </p>

        <h3>3. Mission Control: click the thumbnail</h3>
        <p>
          Press <kbd>F3</kbd> or <kbd>⌃↑</kbd>, then click the desktop thumbnail you want. It is the
          slowest of the three, but it works as a fallback.
        </p>

        <h2>The fastest non-native way</h2>
        <p>
          Once you have more than three or four desktops, positional switching slows down because
          you have to remember which desktop number holds which work context. A name-based picker
          wins there.
        </p>
        <p>Lanes Quick Switcher lets you:</p>
        <ul>
          <li>
            <strong>Type a name</strong>: start typing "client" and the matching Space is selected.
          </li>
          <li>
            <strong>Hit a number key</strong>: 1 through 9 jumps directly to desktop-number
            shortcuts.
          </li>
          <li>
            <strong>Arrow-key navigate</strong>: preview recent apps and active automations before
            switching.
          </li>
        </ul>

        <ProductVisual variant="quick-switcher" />

        <p>
          The default shortcut <kbd>⌃⌘G</kbd> is intentional: it avoids <kbd>⌘0</kbd>, the standard
          reset-zoom shortcut in browsers, IDEs, design tools, and document apps.
        </p>

        <InlineCta
          title="Try the Quick Switcher free"
          text="14-day full trial. No credit card."
          label="Request early access"
        />

        <h2>Bonus: Jump Back for two-Space ping-pong</h2>
        <p>
          If most of your switching is between two desktops, bind a single key to Jump Back. Lanes
          defaults this to <kbd>⇧⌘Z</kbd>: press once to go to your previous Space, press again to
          return.
        </p>

        <h2>What about full-screen apps?</h2>
        <p>
          macOS treats full-screen apps as their own Spaces, but Apple&apos;s Switch to Desktop N
          shortcuts do not target them. Lanes switches to a full-screen Space by activating the owning
          app.
        </p>

        <h2>If shortcuts stop working</h2>
        <p>Two macOS settings usually cause it:</p>
        <ul>
          <li>The Switch to Desktop N boxes get unticked after a macOS update.</li>
          <li>Automatically rearrange Spaces gets turned back on.</li>
        </ul>
        <p>
          Lanes Setup Health continuously checks both and offers one-click fixes.{' '}
          <AppLink href={LANES_ROUTES.autoRearrangeSpaces}>See how to disable auto-rearrange</AppLink>.
        </p>
      </>
    ),
    related: [
      {
        label: 'Related guide',
        title: 'Name your macOS Spaces',
        href: LANES_ROUTES.nameMacosSpaces,
      },
      {
        label: 'Related guide',
        title: 'Stop Spaces from rearranging',
        href: LANES_ROUTES.autoRearrangeSpaces,
      },
    ],
  },
  {
    slug: 'auto-rearrange-spaces',
    crumb: 'Stop Spaces from rearranging',
    h1: 'How to stop Mac Spaces from rearranging themselves',
    readTime: '~2 min read',
    metadata: {
      title: 'How to Stop Mac Spaces from Rearranging Themselves | Lanes',
      description:
        "Mac Spaces shuffle themselves by most recent use and break keyboard shortcuts. Here's the one Mission Control toggle that fixes it.",
      path: LANES_ROUTES.autoRearrangeSpaces,
      ogType: 'article',
      schema: [
        articleSchema(
          'How to Stop Mac Spaces from Rearranging Themselves',
          'Turn off Automatically rearrange Spaces based on most recent use to keep Mac desktop numbers stable.',
          LANES_ROUTES.autoRearrangeSpaces,
        ),
        buildFaqSchema([
          {
            question: 'How do I stop Mac Spaces from rearranging themselves?',
            answer:
              'Open System Settings, Desktop & Dock, Mission Control, and uncheck Automatically rearrange Spaces based on most recent use. This keeps Space numbers stable.',
          },
          {
            question: 'Does turning off auto-rearrange affect anything else?',
            answer:
              'No. It only affects automatic ordering in Mission Control. You can still create, delete, reorder, and switch Spaces manually.',
          },
        ]),
      ],
    },
    answer: (
      <>
        Open <strong>System Settings → Desktop &amp; Dock</strong>, scroll to the Mission Control
        section, and uncheck <strong>Automatically rearrange Spaces based on most recent use</strong>.
        Your desktop numbers stay stable from that point on.
      </>
    ),
    body: (
      <>
        <h2>What is actually happening</h2>
        <p>
          macOS ships with a setting called <em>Automatically rearrange Spaces based on most recent
          use</em>. When it is on, the system silently reorders your Spaces by moving recently used
          ones to the front.
        </p>
        <p>
          For casual users with two or three desktops, this can feel helpful. For anyone with four or
          more, it breaks every number-based shortcut because the Space-to-number mapping changes
          underneath you.
        </p>

        <h2>The fix, step by step</h2>
        <ol>
          <li>Open System Settings.</li>
          <li>Click Desktop &amp; Dock in the left sidebar.</li>
          <li>Scroll down to the Mission Control section.</li>
          <li>Uncheck Automatically rearrange Spaces based on most recent use.</li>
          <li>Close System Settings. The change takes effect immediately.</li>
        </ol>

        <h2>How to verify it stuck</h2>
        <p>
          Open Mission Control, note the order of your Spaces, switch between two apps on different
          Spaces, then open Mission Control again. The order should be unchanged.
        </p>

        <h2>Does this affect anything else?</h2>
        <p>No. The setting only controls automatic reordering. You can still:</p>
        <ul>
          <li>Manually reorder Spaces by dragging thumbnails in Mission Control.</li>
          <li>Create new Spaces with the plus button.</li>
          <li>Delete Spaces from Mission Control.</li>
          <li>Switch between Spaces with any shortcut, gesture, or click.</li>
        </ul>

        <h2>Why Lanes flags this for you</h2>
        <p>
          This is the common reason a Spaces utility seems to stop working. Lanes Setup Health checks
          Accessibility, auto-rearrange, and Space reader access, then shows the fix before you have
          to remember which macOS panel changed.
        </p>

        <ProductVisual variant="health" />

        <InlineCta
          title="Lanes Setup Health catches this for you"
          text="Auto-checks Accessibility, auto-rearrange, and Space reader access."
          label="Request early access"
        />

        <h2>Bonus: enable per-desktop shortcuts while you are there</h2>
        <p>
          In <strong>System Settings → Keyboard → Keyboard Shortcuts</strong>, enable the Switch to
          Desktop N shortcuts too. They are off by default and make Space switching dramatically
          faster.
        </p>
      </>
    ),
    related: [
      {
        label: 'Related guide',
        title: 'Switch between Mac desktops fast',
        href: LANES_ROUTES.switchDesktopsFast,
      },
      {
        label: 'Related guide',
        title: 'See Space names in Mission Control',
        href: LANES_ROUTES.missionControlLabels,
      },
    ],
  },
];

export const pressMetadata: PageMetadata = {
  title: 'Press Kit - Lanes for macOS',
  description:
    'Press kit for Lanes, a native macOS app that turns every desktop Space into a Lane. Boilerplate, fact sheet, app icon, and contact.',
  path: LANES_ROUTES.press,
  ogType: 'article',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Press Kit - Lanes for macOS',
    description:
      'Press kit for Lanes, a native macOS app that turns every desktop Space into a Lane.',
    url: lanesAbsoluteUrl(LANES_ROUTES.press),
  },
};

export const notFoundMetadata: PageMetadata = {
  title: 'Lanes page not found | Wysp',
  description: 'The requested Lanes page could not be found. Open the Wysp-hosted Lanes product home.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Lanes page not found',
    url: lanesAbsoluteUrl(PRODUCT_ROOT),
  },
};
