import type { ReactNode } from 'react';
import type { PageMetadata } from '../../lib/pageMetadata';

export type FaqItem = {
  question: string;
  answer: string;
};

export type RelatedLink = {
  label: string;
  title: string;
  href: string;
};

export type GuidePageContent = {
  slug: string;
  crumb: string;
  h1: string;
  readTime: string;
  answer: ReactNode;
  metadata: PageMetadata;
  related: RelatedLink[];
  body: ReactNode;
};

export type VisualVariant =
  | 'hero'
  | 'quick-switcher'
  | 'menu-bar'
  | 'mission-control'
  | 'automations'
  | 'time-report'
  | 'health'
  | 'shortcuts';
