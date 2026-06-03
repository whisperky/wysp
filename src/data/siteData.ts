import {
  Aperture,
  Bell,
  Bot,
  Boxes,
  Code2,
  Command,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Wrench,
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
  email: 'whisper.bix@gmail.com',
  phone: '+1 872 322 0408',
  phoneHref: 'tel:+18723220408',
  discord: '@whisper3029',
  discordHref: 'https://discord.com/',
  github: 'https://github.com/whisperky',
  suggestionHref: 'mailto:whisper.bix@gmail.com?subject=Wysp tool suggestion',
};

export const products: Product[] = [
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
    eyebrow: 'Discord Chat Lens',
    description:
      'A local-first Chrome extension that indexes the Discord channels you can already see, then lets an AI agent answer evidence-backed questions across the whole server — and export every channel at once.',
    outcome: 'Open the Reel microsite to see the analyzer, server export, privacy model, and pricing.',
    href: '/reel/',
    accent: 'sage',
    icon: Aperture,
    image: {
      src: '/assets/reel/reel-product.svg',
      alt: 'Reel analyzer preview — the jade lens, an Add to Chrome action, and an AI evidence list over indexed Discord messages',
    },
    points: ['Whole-server AI analysis', 'Export every channel at once', 'Local-first, no token or bot'],
    detail: {
      intro:
        'Reel has its own product microsite at /reel/. Wysp keeps this catalog entry compact while the independent Reel page carries the hero, analyzer and export mockups, privacy model, pricing, and FAQ in its own dark "Investigation" design language.',
      sections: [
        {
          title: 'Independent product home',
          text: 'The homepage card sends visitors into the Reel microsite instead of rendering a generic Wysp detail layout — the same approach as Lanes.',
        },
        {
          title: 'Whole-server analysis & export',
          text: 'The microsite showcases the agentic analyzer with evidence-backed answers and the server-wide CSV/JSONL export that most tools can only do one channel at a time.',
        },
        {
          title: 'Privacy as the product',
          text: 'No token, no bot, no background crawling. The corpus lives in IndexedDB on the device; only the small snippets a tool selects ever reach the AI, and only on Pro.',
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
  {
    id: 'wysp-hub',
    name: 'Wysp Hub',
    shortName: 'Hub',
    status: 'Live shell',
    eyebrow: 'Home base',
    description:
      'A clean public front door for everything Whisper ships: apps, utilities, experiments, notes, and future product pages.',
    outcome: 'Browse the current catalog and follow what is being built next.',
    href: '/wysp-hub/',
    accent: 'cyan',
    icon: Boxes,
    image: {
      src: '/assets/product-template.svg',
      alt: 'Template product interface preview for Wysp Hub',
    },
    points: ['Product catalog', 'Release notes', 'Suggestion path'],
    detail: {
      intro:
        'Wysp Hub is the permanent home for this personal product studio. It gives every app, tool, and experiment a clear place to live without turning the project into a formal company site.',
      sections: [
        {
          title: 'Public product shelf',
          text: 'Visitors can scan current products, see what is building, and jump into each detail page from one calm catalog.',
        },
        {
          title: 'Personal launch notes',
          text: 'The project can stay direct and honest: shipped work, early experiments, and practical notes can sit beside each product.',
        },
        {
          title: 'Suggestion path',
          text: 'Users have a simple route to request tools or point out problems that should become future products.',
        },
      ],
      milestones: ['Keep catalog data driven', 'Add real launch images', 'Publish first product detail page'],
      primaryAction: {
        label: 'Suggest a product',
        href: `mailto:${contact.email}?subject=Wysp product suggestion`,
      },
    },
  },
  {
    id: 'tiny-tools',
    name: 'Tiny Tools',
    shortName: 'Tools',
    status: 'Building',
    eyebrow: 'Useful utilities',
    description:
      'Small focused tools that solve one annoying task well, with no enterprise ceremony and no bloated workflow.',
    outcome: 'Use simple apps as they land, then request the next practical helper.',
    href: '/tiny-tools/',
    accent: 'gold',
    icon: Wrench,
    image: {
      src: '/assets/product-template.svg',
      alt: 'Template product interface preview for Tiny Tools',
    },
    points: ['Single-purpose apps', 'Fast experiments', 'Public feedback'],
    detail: {
      intro:
        'Tiny Tools is the lane for small utilities that do one useful job cleanly. The goal is to ship practical helpers without forcing users through a heavy workflow.',
      sections: [
        {
          title: 'One task at a time',
          text: 'Each tool should have a narrow purpose, a fast first screen, and a result that is obvious without documentation.',
        },
        {
          title: 'Fast experiments',
          text: 'Promising ideas can launch as small public tools first, then grow only when users prove the problem is worth more depth.',
        },
        {
          title: 'Replaceable visuals',
          text: 'The product image starts from the shared template asset so each launched tool can swap in a real screenshot later.',
        },
      ],
      milestones: ['Collect first utility ideas', 'Ship one browser-based helper', 'Replace template media with real screenshots'],
      primaryAction: {
        label: 'Request a tiny tool',
        href: `mailto:${contact.email}?subject=Tiny Tools request`,
      },
    },
  },
  {
    id: 'whisper-automations',
    name: 'Whisper Automations',
    shortName: 'Automations',
    status: 'Idea queue',
    eyebrow: 'Personal systems',
    description:
      'Lightweight automations, templates, and AI-assisted flows for repeatable digital work.',
    outcome: 'Track early ideas and vote with suggestions before they become products.',
    href: '/whisper-automations/',
    accent: 'sage',
    icon: Bot,
    image: {
      src: '/assets/product-template.svg',
      alt: 'Template product interface preview for Whisper Automations',
    },
    points: ['Workflow helpers', 'Reusable templates', 'AI-ready patterns'],
    detail: {
      intro:
        'Whisper Automations is the future lane for repeatable systems: templates, scripts, and AI-assisted flows that remove small recurring work.',
      sections: [
        {
          title: 'Repeatable workflows',
          text: 'The product direction favors small, reusable systems that make recurring personal or business tasks easier to run.',
        },
        {
          title: 'AI-ready structure',
          text: 'Each automation can document its inputs, outputs, and expected behavior so it can later become a guided tool or agent flow.',
        },
        {
          title: 'User-shaped backlog',
          text: 'Requests and pain points can influence which automations become real products first.',
        },
      ],
      milestones: ['Document useful repeatable tasks', 'Prototype the first workflow helper', 'Turn proven flows into public products'],
      primaryAction: {
        label: 'Share an automation idea',
        href: `mailto:${contact.email}?subject=Whisper Automations idea`,
      },
    },
  },
];

export const stats = [
  { value: '563,811', label: 'Total downloads' },
  { value: '113,028', label: 'Active Users' },
  { value: '13,901', label: 'Paid Subscribers' },
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
