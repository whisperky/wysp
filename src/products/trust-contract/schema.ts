import type { FaqItem } from './types';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN, tcAbsoluteUrl } from './config';

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

export function serviceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Trust Contract',
    serviceType: 'Privacy-first hiring marketplace on Discord',
    description:
      'Trust Contract is a privacy-first Discord hiring marketplace. Anonymous job posts, vetted developers, and a behavior-based Trust Score — run end to end by a bot.',
    url: tcAbsoluteUrl(PRODUCT_ROOT),
    image: tcAbsoluteUrl(ASSET_ROOT + '/brand/avatar.png'),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
    offers: [
      { '@type': 'Offer', name: 'Bronze', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Silver developer membership', price: '19', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Gold developer membership', price: '49', priceCurrency: 'USD' },
    ],
  };
}
