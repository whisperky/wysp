import type { FaqItem } from './types';
import { ASSET_ROOT, LAST_UPDATED, PRODUCT_ROOT, SITE_ORIGIN, lanesAbsoluteUrl } from './config';

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
    name: 'Lanes',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'macOS 13+',
    description:
      'Lanes turns every macOS Space into a Lane: name, color, icon, automation profile. Switch between Lanes with one keystroke and let your Mac configure itself the second you arrive.',
    url: lanesAbsoluteUrl(PRODUCT_ROOT),
    downloadUrl: lanesAbsoluteUrl('/lanes/#download'),
    image: lanesAbsoluteUrl(ASSET_ROOT + '/lanes-icon.png'),
    softwareVersion: '1.0',
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Lanes Monthly',
        price: '4.99',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '4.99',
          priceCurrency: 'USD',
          billingDuration: 'P1M',
          billingIncrement: 1,
        },
      },
      {
        '@type': 'Offer',
        name: 'Lanes Yearly',
        price: '49.00',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '49.00',
          priceCurrency: 'USD',
          billingDuration: 'P1Y',
          billingIncrement: 1,
        },
      },
    ],
  };
}

export function articleSchema(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    dateModified: LAST_UPDATED,
    datePublished: LAST_UPDATED,
    mainEntityOfPage: lanesAbsoluteUrl(path),
    author: {
      '@type': 'Person',
      name: 'Whisper',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wysp',
      url: SITE_ORIGIN,
    },
  };
}
