import { useEffect } from 'react';

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export type PageMetadata = {
  title: string;
  description: string;
  path: string;
  ogType: 'website' | 'article';
  schema: JsonLd;
};

type PageMetadataConfig = {
  siteOrigin: string;
  imagePath: string;
  schemaId: string;
  themeColor?: string;
  icons?: {
    favicon32?: string;
    favicon128?: string;
    appleTouchIcon?: string;
  };
};

export function absoluteUrl(siteOrigin: string, path: string) {
  return `${siteOrigin}${path}`;
}

function setMetaAttribute(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.head.querySelector(
    `meta[${attributeName}="${attributeValue}"]`,
  ) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setLinkElement(rel: string, href: string, attributes: Record<string, string> = {}) {
  let element = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }

  element.href = href;
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export function usePageMetadata(metadata: PageMetadata, config: PageMetadataConfig) {
  useEffect(() => {
    const canonical = absoluteUrl(config.siteOrigin, metadata.path);
    const image = absoluteUrl(config.siteOrigin, config.imagePath);
    const previousTitle = document.title;

    document.title = metadata.title;
    setMetaAttribute('name', 'description', metadata.description);
    setMetaAttribute('property', 'og:type', metadata.ogType);
    setMetaAttribute('property', 'og:title', metadata.title);
    setMetaAttribute('property', 'og:description', metadata.description);
    setMetaAttribute('property', 'og:image', image);
    setMetaAttribute('property', 'og:url', canonical);
    setMetaAttribute('name', 'twitter:card', 'summary_large_image');
    setMetaAttribute('name', 'twitter:title', metadata.title);
    setMetaAttribute('name', 'twitter:description', metadata.description);
    setMetaAttribute('name', 'twitter:image', image);

    if (config.themeColor) {
      setMetaAttribute('name', 'theme-color', config.themeColor);
    }

    setLinkElement('canonical', canonical);

    if (config.icons?.favicon32) {
      setLinkElement('icon', config.icons.favicon32, {
        type: 'image/png',
        sizes: '32x32',
      });
    }

    if (config.icons?.favicon128) {
      setLinkElement('icon', config.icons.favicon128, {
        type: 'image/png',
        sizes: '128x128',
      });
    }

    if (config.icons?.appleTouchIcon) {
      setLinkElement('apple-touch-icon', config.icons.appleTouchIcon);
    }

    let schema = document.getElementById(config.schemaId) as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = config.schemaId;
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(metadata.schema);

    return () => {
      document.title = previousTitle;
    };
  }, [config, metadata]);
}
