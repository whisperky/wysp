import type { PageMetadata } from '../../lib/pageMetadata';
import { PRODUCT_ROOT, clautownAbsoluteUrl } from './config';
import { buildFaqSchema, clautownSoftwareSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'Does Clautown read my prompts or code?',
    answer:
      'No. It never sends your prompts, Claude’s answers, code, file contents or command output. The hook reads them in memory, keeps only the counts it needs, and drops the rest. Nothing is written to disk or sent.',
  },
  {
    question: 'Does it read my past Claude Code sessions?',
    answer:
      'No. Your town starts empty and builds only from what Claude Code does after you connect. Past sessions are never read, not even the one you connect from.',
  },
  {
    question: 'Does it count chats on claude.ai?',
    answer:
      'No. Chats on claude.ai cannot be observed, so they do not count. Claude Code sessions count in the terminal, in the IDE and in the desktop app.',
  },
  {
    question: 'Are my project names shared?',
    answer:
      'Not by default. New towns call their districts Project 1, Project 2 and so on. Folder names stay on your computer unless you choose to share them.',
  },
  {
    question: 'Do I need GitHub?',
    answer:
      'No. GitHub is optional and read only. There is no GitHub sign-in, and no private GitHub data is read.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Founding a town and growing it is free. The Hangar may sell optional decoration later. Nothing you can buy changes your level, your country or your Fame.',
  },
  {
    question: 'What does the collector need to run?',
    answer:
      'Node.js 20 or newer. The collector is one dependency-free file, and you can read it before you run it.',
  },
  {
    question: 'How do I delete my data?',
    answer:
      'Delete your account in Settings. It removes your town, stats, picture, follows, cheers, guestbook notes, purchases and the chat lines you wrote. A few records stay for a short time, such as moderation logs, as the privacy policy explains. Then run the uninstall command on your computer to remove the hooks.',
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Clautown · a 3D town built by your Claude Code work · Wysp',
  description:
    'A living 3D town built by your real Claude Code work. Every project becomes a district that grows while Claude works. Connect in one click. Counts and short labels only, never your words.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [clautownSoftwareSchema(), buildFaqSchema(landingFaqs)],
};

export const notFoundMetadata: PageMetadata = {
  title: 'Clautown page not found | Wysp',
  description: 'The requested Clautown page could not be found. Open the Clautown product home on Wysp.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Clautown page not found',
    url: clautownAbsoluteUrl(PRODUCT_ROOT),
  },
};
