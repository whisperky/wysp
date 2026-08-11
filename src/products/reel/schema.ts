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
    name: 'Reel — Discord Chat Exporter, Search & AI',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    description:
      'Reel is a local-first Chrome extension that backs up entire Discord servers — every channel, thread and forum post — into a private, searchable archive on your own device. Search by keyword or on-device semantic meaning, run AI research with cited evidence, and export to HTML, Excel, CSV or JSON.',
    featureList: [
      'Whole-server backup — channels, threads and forum posts in one run',
      'Resumable, rate-limited history fetch (gentle on your account)',
      'On-device semantic search — find messages by meaning, no keywords needed',
      'Full-text keyword search, sort and filter',
      'AI research agent with one-click recipes and cited evidence (Pro)',
      'Export to browsable HTML, Excel (XLSX), CSV and JSONL',
      'Local-first — your corpus and embeddings stay in your browser',
    ],
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
