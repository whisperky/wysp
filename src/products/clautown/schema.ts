import {
  CLAUTOWN_PLAY_HREF,
  FILM_POSTER,
  FILM_VIDEO,
  OG_IMAGE,
  PRODUCT_ROOT,
  SHOTS_ROOT,
  SITE_ORIGIN,
  clautownAbsoluteUrl,
} from './config';
import type { FaqItem } from './types';

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

export function clautownSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Clautown',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web browser',
    description:
      'Clautown is a 3D town built by your real Claude Code work. Every Claude Code project becomes a district on a hex map that grows while Claude works. Connect with one click, then visit, cheer and chat with other towns. Only counts and short labels from fixed lists are sent, never your prompts or code.',
    featureList: [
      'Each Claude Code project becomes a district in a 3D hex town',
      'Districts build live while Claude Code works',
      'One-click connection through a small, readable collector',
      'Counts and short labels only: prompts, code and file names are never sent',
      'Public towns to visit, follow, cheer and chat in',
      'A shared world map where towns at level 5 can found countries',
    ],
    url: clautownAbsoluteUrl(PRODUCT_ROOT),
    image: clautownAbsoluteUrl(OG_IMAGE),
    screenshot: clautownAbsoluteUrl(SHOTS_ROOT + '/town-hud.webp'),
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
    offers: {
      '@type': 'Offer',
      name: 'Found a town',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: CLAUTOWN_PLAY_HREF,
    },
  };
}

export function clautownFilmSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Clautown: your town grows every time you code with Claude',
    description:
      'A one-minute film of Clautown, a living 3D town built by your Claude Code work: districts that build while Claude works, a capital that grows with you, towns to visit, and a shared world map.',
    thumbnailUrl: clautownAbsoluteUrl(FILM_POSTER),
    contentUrl: clautownAbsoluteUrl(FILM_VIDEO),
    uploadDate: '2026-10-28',
    duration: 'PT1M',
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
  };
}
