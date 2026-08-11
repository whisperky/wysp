import type { FaqItem } from './types';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN, klinexAbsoluteUrl } from './config';

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Klinex',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web',
    description:
      'Klinex turns one plain sentence into a real, playable 3D game you own. A conversational Director co-designs it with you, then builds a game that is machine-proven fair and winnable before you ever play — no engine, no code.',
    featureList: [
      'Describe a game in one sentence — no engine, no code, no mode pickers',
      'A conversational Director co-designs the game with you',
      'Every build is machine-proven fair and winnable before you play',
      'Cosmetic edits (re-skin, recolor, swap a look) can never break the game',
      'Play in the browser or stream it in Unreal',
      'You own every world — set visibility and export the whole project',
      'Share, remix with lineage, and follow other creators',
    ],
    url: klinexAbsoluteUrl(PRODUCT_ROOT),
    image: klinexAbsoluteUrl(ASSET_ROOT + '/klinex-og.svg'),
    softwareVersion: '1.0',
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
  };
}
