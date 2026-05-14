import {
  Bell,
  Bot,
  Boxes,
  Code2,
  Mail,
  MessageCircle,
  Phone,
  Send,
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
