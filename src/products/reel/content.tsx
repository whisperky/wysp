import type { PageMetadata } from '../../lib/pageMetadata';
import { PRIVACY_PATH, PRODUCT_ROOT, reelAbsoluteUrl } from './config';
import { buildFaqSchema, softwareApplicationSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'Does Reel use my Discord login or a bot?',
    answer:
      'No bot, and you never paste a token. For full history, Reel reuses your existing Discord session — captured passively, kept in temporary memory, used only to talk to Discord. No password, no crawling.',
  },
  {
    question: 'Where do my messages go?',
    answer:
      'Into IndexedDB on your machine — embeddings included, computed on-device. Free tier: nothing leaves. Pro: only the ≤25-row snippets a tool picks per AI call. Your full corpus is never uploaded.',
  },
  {
    question: 'How is exporting a whole server different from other tools?',
    answer:
      'Most tools go one channel at a time. Reel queues every channel, thread and forum in one run, into HTML, Excel, CSV or JSON — permalinks, timestamps and authors intact. Re-runs fetch only what is new.',
  },
  {
    question: 'What do I actually get for free?',
    answer:
      'One server, one channel, 500 messages — with keyword + semantic search, sort/filter, and every export format. AI research and whole-server backup are Pro.',
  },
  {
    question: 'Is this allowed?',
    answer:
      "Reel is independent, not affiliated with Discord. Automated access can be against Discord's ToS, so Reel paces gently and only runs on your click. Use it on communities you have a right to, at your own risk.",
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Reel — Discord Chat Lens · Wysp',
  description:
    'Reel is a local-first Chrome extension that backs up an entire Discord server — every channel, thread and forum post — into a private, searchable archive on your machine. Find anything by keyword or meaning with on-device semantic search, ask an AI for research with citations, and export to HTML, Excel, CSV or JSON.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [softwareApplicationSchema(), buildFaqSchema(landingFaqs)],
};

export const privacyMetadata: PageMetadata = {
  title: 'Reel privacy policy · Wysp',
  description:
    'How Reel handles your data: what stays on your device, what the paid AI feature sends, how your Discord session token is used, and who the sub-processors are.',
  path: PRIVACY_PATH,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reel privacy policy',
    url: reelAbsoluteUrl(PRIVACY_PATH),
  },
};

export const notFoundMetadata: PageMetadata = {
  title: 'Reel page not found | Wysp',
  description: 'The requested Reel page could not be found. Open the Wysp-hosted Reel product home.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reel page not found',
    url: reelAbsoluteUrl(PRODUCT_ROOT),
  },
};
