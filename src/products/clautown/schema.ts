import { ASSET_ROOT, CLAUTOWN_PLAY_HREF, PRODUCT_ROOT, SITE_ORIGIN, clautownAbsoluteUrl } from './config';
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
    image: clautownAbsoluteUrl(ASSET_ROOT + '/clautown-og.png'),
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
