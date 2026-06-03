import type { PageMetadata } from '../../lib/pageMetadata';
import { PRODUCT_ROOT, reelAbsoluteUrl } from './config';
import { buildFaqSchema, softwareApplicationSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'Does Reel use my Discord login or a bot?',
    answer:
      'No. Reel never asks for a token, never logs in as you, and never runs a bot or gateway client. It only reads messages already rendered in your own browser tab, when you click to capture.',
  },
  {
    question: 'Where do my messages go?',
    answer:
      'Into IndexedDB on your own machine. On the free tier nothing ever leaves your device. On Pro, the AI agent sends only the small snippets a tool selects — capped at 25 rows per call — to run analysis. Your full corpus is never uploaded.',
  },
  {
    question: 'How is exporting a whole server different from other tools?',
    answer:
      'Most exporters work one channel at a time. Reel discovers and queues every channel and thread you can read across an entire server, then writes a single CSV or JSONL with permalinks, timestamps and authors — ready for a notebook or spreadsheet.',
  },
  {
    question: 'What do I actually get for free?',
    answer:
      "One server, one channel, up to 500 messages, full-text search, sorting and filtering, and both export formats. It's a complete workflow for a focused slice of data — no AI, but no nagging either.",
  },
  {
    question: 'Is this allowed?',
    answer:
      "Reel is independent and not affiliated with Discord. Indexing channels can breach Discord's Terms of Service. Use it on communities you have a right to access, and at your own risk — the privacy section spells out the boundaries we hold to.",
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Reel — Discord Chat Lens · Wysp',
  description:
    'Reel is a local-first Chrome extension that indexes Discord channels you can already see, then lets an AI agent answer evidence-backed questions over your own private database — and export an entire server, not one channel at a time.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [softwareApplicationSchema(), buildFaqSchema(landingFaqs)],
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
