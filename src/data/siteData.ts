import {
  Aperture,
  Bell,
  Code2,
  Command,
  Gamepad2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProductStatus = 'Live shell' | 'Building' | 'Idea queue';

export type ProductDetailSection = {
  title: string;
  text: string;
};

export type Product = {
  id: string;
  name: string;
  shortName: string;
  status: ProductStatus;
  eyebrow: string;
  description: string;
  outcome: string;
  href: string;
  accent: 'cyan' | 'gold' | 'sage';
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
  };
  points: string[];
  detail: {
    intro: string;
    sections: ProductDetailSection[];
    milestones: string[];
    primaryAction: {
      label: string;
      href: string;
    };
  };
};

export type Channel = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export const contact = {
  email: 'support@wysp.pro',
  phone: '+1 872 322 0408',
  phoneHref: 'tel:+18723220408',
  discord: '@whisper3029',
  discordHref: 'https://discord.com/users/471372856580767745',
  github: 'https://github.com/whisperky',
  suggestionHref: 'mailto:support@wysp.pro?subject=Wysp tool suggestion',
};

export const products: Product[] = [
  {
    id: 'klinex',
    name: 'Klinex',
    shortName: 'Klinex',
    status: 'Building',
    eyebrow: 'Game from a sentence',
    description:
      'Describe a world in one line and Klinex co-designs and builds a real, playable 3D game you own — proven winnable before you press play.',
    outcome: 'Open the Klinex microsite to see the studio, the verified build, and how you own every world.',
    href: '/klinex/',
    accent: 'gold',
    icon: Gamepad2,
    image: {
      src: '/assets/klinex/klinex-product.svg',
      alt: 'Klinex product preview — a cinematic dark studio with an amber idea box turning the prompt "a neon cathedral horde with a lich boss" into a verified, winnable game.',
    },
    points: ['One sentence in, a real game out', 'Proven fair & winnable', 'No engine, no code — you own it'],
    detail: {
      intro:
        'Klinex has its own product microsite at /klinex/. Wysp keeps this catalog entry compact while the independent Klinex page carries the living "Stage" hero, the Director co-design flow, the direction fingerprint, the narrated verified build, the ownership model, and the community in its own cinematic dark + amber design language.',
      sections: [
        {
          title: 'Independent product home',
          text: 'The homepage card sends visitors into the Klinex microsite instead of rendering a generic Wysp detail layout — the same approach as Reel, Lanes, and Trust Contract.',
        },
        {
          title: 'One sentence becomes a real game',
          text: 'A conversational Director turns a plain-language idea into a machine-proven, playable game — no engine, no code, and no genre or mode pickers to learn.',
        },
        {
          title: 'Verified, and yours',
          text: 'Every build is proven fair and winnable before you play, cosmetic edits can never break it, and you own every world — set its visibility, export it, or let others remix it.',
        },
      ],
      milestones: [
        'Wire the real Klinex studio / early-access link into the CTAs',
        'Confirm the monetization model and connect LemonSqueezy checkout',
        'Keep the wysp.pro/klinex sitemap entry current after deployment',
      ],
      primaryAction: {
        label: 'Open Klinex',
        href: '/klinex/',
      },
    },
  },
  {
    id: 'trust-contract',
    name: 'Trust Contract',
    shortName: 'Trust Contract',
    status: 'Building',
    eyebrow: 'Discord hiring server',
    description:
      'A privacy-first Discord hiring marketplace run end to end by a bot — anonymous job posts, vetted developers, private deal rooms, and a behavior-based Trust Score.',
    outcome: 'Open the Trust Contract microsite to see the server, Trust Score ladder, tiers, and pricing.',
    href: '/trust-contract/',
    accent: 'gold',
    icon: ShieldCheck,
    image: {
      src: '/assets/trust-contract/trust-contract-product.svg',
      alt: 'Trust Contract jobs forum preview — an anonymized Gold job post authored by the bot with budget, timeline, tags and an Apply action',
    },
    points: ['Anonymous bot-posted jobs', 'Behavior-based Trust Score', 'Bronze · Silver · Gold tiers'],
    detail: {
      intro:
        'Trust Contract has its own product microsite at /trust-contract/. Wysp keeps this catalog entry compact while the independent Trust Contract page carries the hero, privacy principles, the interactive Trust Score ladder, the server map, premium tools, and full pricing in its own warm ink + antique-gold design language.',
      sections: [
        {
          title: 'Independent product home',
          text: 'The homepage card sends visitors into the Trust Contract microsite instead of rendering a generic Wysp detail layout — the same approach as Lanes and Reel.',
        },
        {
          title: 'A whole hiring server, bot-run',
          text: 'The bot provisions and runs a complete Discord marketplace: anonymous job posts, private deal rooms, a tagged jobs forum, hidden member areas, payments, archives, and lifecycle sweeps.',
        },
        {
          title: 'Trust earned, never purchased',
          text: 'A 0–100 behavior-based Trust Score drives ranked placement, while Bronze/Silver/Gold tiers control access. Paid tiers improve access and priority, never the safety reputation itself.',
        },
      ],
      milestones: [
        'Wire the real Discord invite link into the "Request an invite" CTAs',
        'Connect developer memberships and client credit-pack checkout',
        'Add wysp.pro/trust-contract to the sitemap after deployment',
      ],
      primaryAction: {
        label: 'Open Trust Contract',
        href: '/trust-contract/',
      },
    },
  },
  {
    id: 'reel',
    name: 'Reel',
    shortName: 'Reel',
    status: 'Building',
    eyebrow: 'Discord Chat Exporter',
    description:
      'A local-first Chrome extension that backs up a whole Discord server in one run, then searches it by keyword or meaning and runs AI research — all on your own machine.',
    outcome: 'Open the Reel microsite for the backup, search, AI research, privacy model, and pricing.',
    href: '/reel/',
    accent: 'sage',
    icon: Aperture,
    image: {
      src: '/assets/reel/reel-product.svg',
      alt: 'Reel preview — the jade lens, an Add to Chrome action, a whole-server backup tree, and an AI research answer over indexed Discord messages',
    },
    points: ['Full export, at once', 'Keyword + semantic search', 'AI research, with citations'],
    detail: {
      intro:
        'Reel has its own product microsite at /reel/. Wysp keeps this catalog entry compact while the independent Reel page carries the hero, backup and search mockups, privacy model, pricing, and FAQ in its own dark research-tool design language.',
      sections: [
        {
          title: 'Independent product home',
          text: 'The homepage card sends visitors into the Reel microsite instead of rendering a generic Wysp detail layout — the same approach as Lanes.',
        },
        {
          title: 'Whole-server backup & search',
          text: 'The microsite shows the one-run backup of every channel, thread and forum post into a browsable HTML / Excel / CSV / JSON archive, plus keyword and on-device semantic search and an AI research agent over the result.',
        },
        {
          title: 'Local-first by design',
          text: 'The corpus and the optional semantic embeddings live in IndexedDB on the device. History fetches reuse your existing Discord session locally and are paced gently; only small AI snippets ever leave, and only on Pro.',
        },
      ],
      milestones: [
        'Publish the Chrome Web Store listing and wire the real "Add to Chrome" URL',
        'Connect the Pro license and LemonSqueezy checkout',
        'Add wysp.pro/reel to the sitemap after deployment',
      ],
      primaryAction: {
        label: 'Open Reel',
        href: '/reel/',
      },
    },
  },
  {
    id: 'lanes',
    name: 'Lanes',
    shortName: 'Lanes',
    status: 'Building',
    eyebrow: 'macOS Spaces',
    description:
      'A native macOS menu bar app that names Spaces, switches fast, and runs per-Lane automations.',
    outcome: 'Follow the macOS launch path and request early access from Wysp.',
    href: '/lanes/',
    accent: 'gold',
    icon: Command,
    image: {
      src: '/assets/lanes-product.svg',
      alt: 'Lanes Quick Switcher product preview with named macOS work contexts',
    },
    points: ['Named Spaces', 'Quick Switcher', 'Per-Lane automation'],
    detail: {
      intro:
        'Lanes has its own product microsite at /lanes/. Wysp keeps this catalog entry compact while the independent Lanes pages carry the launch copy, guide pages, SEO/AEO answers, pricing, and press materials.',
      sections: [
        {
          title: 'Independent product home',
          text: 'The homepage card sends visitors into the Lanes microsite instead of rendering a generic Wysp detail layout.',
        },
        {
          title: 'SEO/AEO guide pages',
          text: 'The migrated Lanes site includes dedicated pages for naming macOS Spaces, Mission Control labels, fast desktop switching, and auto-rearrange fixes.',
        },
        {
          title: 'Launch assets',
          text: 'The microsite includes rebased canonicals, JSON-LD, sitemap, robots, social image, and press-kit placeholders under wysp.pro/lanes.',
        },
      ],
      milestones: [
        'Replace remaining placeholder screenshots and demo GIF before public outreach',
        'Connect the final macOS download and Lemon Squeezy checkout links',
        'Submit wysp.pro/lanes sitemap entries after deployment',
      ],
      primaryAction: {
        label: 'Open Lanes',
        href: '/lanes/',
      },
    },
  },
];

// --- Homepage "facts" band -------------------------------------------------
// wysp.pro is a read-only showcase: it never holds accounts or payments, it only
// *displays* counts. All three cards are fed by public/stats.json, refreshed
// hourly from the LemonSqueezy API (read-only aggregates, no per-customer data)
// by .github/workflows/refresh-stats.yml — see scripts/fetch-stats.mjs.
// Everything reads 0 until the first product actually sells.

export type StatKey = 'customers' | 'subscribers' | 'revenue';
export type StatCard = { key: StatKey; label: string; icon: string };

export const statCards: StatCard[] = [
  { key: 'customers', label: 'Total Customers', icon: 'fas fa-users' },
  { key: 'subscribers', label: 'Paid Subscribers', icon: 'fab fa-gratipay' },
  { key: 'revenue', label: 'Revenue to Date', icon: 'fas fa-coins' },
];

export const channels: Channel[] = [
  { label: 'GitHub', value: 'whisperky', href: contact.github, icon: Code2 },
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: Mail },
  { label: 'Discord', value: contact.discord, href: contact.discordHref, icon: MessageCircle },
  { label: 'Phone', value: contact.phone, href: contact.phoneHref, icon: Phone },
];

export const suggestionPrompts = [
  { label: 'Report a pain', icon: MessageCircle },
  { label: 'Request a tool', icon: Send },
  { label: 'Follow a launch', icon: Bell },
];
