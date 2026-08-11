import type { PageMetadata } from '../../lib/pageMetadata';
import { PRODUCT_ROOT, klinexAbsoluteUrl } from './config';
import { buildFaqSchema, softwareApplicationSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. You describe the game you want in plain words. Klinex’s Director asks a few sharp questions, then builds a real, playable game for you — no engine, no scripting, and no genre or mode pickers to figure out.',
  },
  {
    question: 'Is it a real game, or just a preview?',
    answer:
      'A real one. Every build is machine-proven fair and winnable before you ever play it. From there you can play it in your browser or stream the full version in Unreal.',
  },
  {
    question: 'What does “Verified” mean?',
    answer:
      'Klinex re-plays your game hundreds of times to prove it can actually be won and is fair. The green check is confidence, never a gate or a grade — and it quietly re-proves itself after each edit.',
  },
  {
    question: 'Can I change it after it’s built?',
    answer:
      'Yes — just say what you want in plain words. Re-skinning, recoloring, or swapping a look is cosmetic and can never break the game; gameplay changes are re-proven automatically so it stays fair and winnable.',
  },
  {
    question: 'Do I own what I make?',
    answer:
      'Completely. Every world is yours — keep it Private, share with Friends, or make it Public, and export the whole project. Others can remix it into their own, and the lineage stays credited to you.',
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Klinex — a real game from one sentence · Wysp',
  description:
    'Klinex turns one plain sentence into a real, playable 3D game you own. Describe a world, co-design it with a conversational Director, and get a game that is machine-proven fair and winnable before you play — no engine, no code. Play in the browser or Unreal, then share and remix.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [softwareApplicationSchema(), buildFaqSchema(landingFaqs)],
};

export const notFoundMetadata: PageMetadata = {
  title: 'Klinex page not found | Wysp',
  description: 'The requested Klinex page could not be found. Open the Wysp-hosted Klinex product home.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Klinex page not found',
    url: klinexAbsoluteUrl(PRODUCT_ROOT),
  },
};
