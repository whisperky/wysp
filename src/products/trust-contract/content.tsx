import type { PageMetadata } from '../../lib/pageMetadata';
import { PRODUCT_ROOT, tcAbsoluteUrl } from './config';
import { buildFaqSchema, serviceSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'How do clients actually stay anonymous?',
    answer:
      'Clients never post in public channels. They write briefs in a private room, and the bot publishes the job to the public forum as its own message — carrying only a reference code like JOB-0184. No client name, avatar, or search history is ever attached to a public post.',
  },
  {
    question: 'Can I buy my way to a high Trust Score?',
    answer:
      'No. Trust Score measures behavior and reliability, not payment. Silver and Gold improve access, limits, priority, and tie-breaks — but the safety reputation itself is earned through completed contracts, clean disputes, and time. Evidence caps stop new accounts from climbing too fast.',
  },
  {
    question: "What's the difference between a tier and the Trust Score?",
    answer:
      'Tier (Bronze/Silver/Gold) is the paid access layer — it controls which jobs you can publicly apply to and which tools you unlock. Trust Score (0–100) is the earned reputation layer that drives ranked placement in private client suggestions. A great-fit Bronze developer can still out-rank a higher tier.',
  },
  {
    question: 'How does a developer get hired without seeing the client?',
    answer:
      "Developers apply to anonymized public posts, or get surfaced in a client's private ranked suggestions. When a client connects with you, a private deal room opens. The conversation happens there — the public marketplace never reveals either side until both choose to engage.",
  },
  {
    question: 'What happens to a contract when it ends?',
    answer:
      'When a hired contract is completed or stopped, the bot files a private archive for both client and developer before removing the live room. Each archive snapshots the job, application, feedback, and developer profile, plus a transcript with a SHA-256 hash so the file can be verified later.',
  },
  {
    question: 'Is this just a bot, or a managed server?',
    answer:
      'Both. The bot provisions and runs a complete Discord server — public channels, hidden member areas, private ticket categories, a fully tagged jobs forum, marketplace stats, lifecycle sweeps, payments, and trust scoring. You join a finished marketplace, not an empty server with a bot in the corner.',
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Trust Contract — Hire with proof · Wysp',
  description:
    'Trust Contract is a privacy-first Discord hiring marketplace. Anonymous job posts, vetted developers, and a behavior-based Trust Score — run end to end by a bot.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [serviceSchema(), buildFaqSchema(landingFaqs)],
};

export const notFoundMetadata: PageMetadata = {
  title: 'Trust Contract page not found | Wysp',
  description:
    'The requested Trust Contract page could not be found. Open the Wysp-hosted Trust Contract product home.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Trust Contract page not found',
    url: tcAbsoluteUrl(PRODUCT_ROOT),
  },
};
