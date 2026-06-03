import type { FaqItem } from './types';
import { ASSET_ROOT, PRODUCT_ROOT, SITE_ORIGIN, reelAbsoluteUrl } from './config';

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
    name: 'Reel — Discord Chat Lens',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    description:
      'Reel is a local-first Chrome extension that indexes the Discord channels you can already see into a private database, then lets an AI agent answer evidence-backed questions across the whole server and export every channel at once.',
    url: reelAbsoluteUrl(PRODUCT_ROOT),
    downloadUrl: reelAbsoluteUrl('/reel/#get'),
    image: reelAbsoluteUrl(ASSET_ROOT + '/reel-icon-128.png'),
    softwareVersion: '1.0',
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Reel Free',
        price: '0',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Reel Pro Monthly',
        price: '14.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '14.99',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
          billingIncrement: 1,
        },
      },
      {
        '@type': 'Offer',
        name: 'Reel Pro Yearly',
        price: '149.00',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '149.00',
          priceCurrency: 'USD',
          billingDuration: 'P1Y',
          billingIncrement: 1,
        },
      },
    ],
  };
}
