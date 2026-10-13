import type { PageMetadata } from '../../lib/pageMetadata';
import { PRIVACY_PATH, PRODUCT_ROOT, reelAbsoluteUrl } from './config';
import { buildFaqSchema, softwareApplicationSchema } from './schema';
import type { FaqItem } from './types';

export const landingFaqs: FaqItem[] = [
  {
    question: 'How do I ask AI about a Discord server?',
    answer:
      'Open a server you are in, click the Reel button in Discord’s top bar, and use the Ask tab. When you send a question, Reel reads the server with your own Discord session — newest messages first, for a limited time — and saves what it reads on your device. The AI then searches what is saved and answers with links to the messages. Later questions read only what is new.',
  },
  {
    question: 'What do I actually get for free?',
    answer:
      '3 AI questions, with no account. You also get capture and export within the free limits: one server, one channel, 500 messages. Pro adds more questions, Deep mode, saved questions with a daily Watch, and whole-server backup.',
  },
  {
    question: 'Where do my messages go?',
    answer:
      'Into IndexedDB on your machine — embeddings included, computed on-device. Exporting and searching do not upload your messages. When you ask an AI question, only your question, the message excerpts its searches return (capped per search), and a little context about the server go through our Worker to Anthropic. Our Worker does not store your question or message content.',
  },
  {
    question: 'Does Reel use my Discord login or a bot?',
    answer:
      'No bot, and you never paste a token. Reel reuses your existing Discord session — captured passively, kept in temporary memory, used only to talk to Discord — to read messages when you export or send an AI question. No password, no background crawling.',
  },
  {
    question: 'How do you limit the free questions?',
    answer:
      'Reel creates a random device ID and keeps it in the extension; with Chrome sync on, it syncs with your Chrome profile. Our Worker stores a one-way hash of it, with the number of questions used. To limit abuse it also keeps a one-way hash of your IP address for up to 24 hours. The privacy policy has the full details.',
  },
  {
    question: 'How is exporting a whole server different from other tools?',
    answer:
      'Most tools go one channel at a time. Reel queues every channel, thread and forum in one run, into HTML, Excel, CSV or JSONL — permalinks, timestamps and authors intact. Re-runs fetch only what is new. Whole-server export is a Pro feature; the free tier exports one channel, up to 500 messages.',
  },
  {
    question: 'How do I export a Discord chat to Excel or CSV?',
    answer:
      'Open the channel, click the Reel button in Discord’s toolbar, open the Export tab, pick a message count or date range, and export. Download the result as Excel (XLSX, one sheet per channel), CSV, JSONL or a browsable HTML archive. The free tier caps each channel at 500 messages.',
  },
  {
    question: 'Can I download my Discord message history?',
    answer:
      'Yes — any channel your account can already read. The free tier covers one channel, up to 500 messages; Pro covers whole servers, threads and forum posts included. Messages are saved to a private archive on your own device, where you can search them by keyword or meaning and re-export any time.',
  },
  {
    question: 'Is this allowed?',
    answer:
      'Reel is independent, not affiliated with Discord. Automated access can be against Discord’s ToS, so Reel paces gently and only reads when you export or ask a question. Use it on communities you have a right to, at your own risk.',
  },
];

export const landingMetadata: PageMetadata = {
  title: 'Discord Chat Exporter & AI Search — Reel · Wysp',
  description:
    'Ask AI about any Discord server right inside Discord. Reel reads the server and answers with links to the messages — 3 free questions. Export chats to HTML, Excel, CSV or JSONL, into a private archive on your own machine, and search it by keyword or meaning.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: [softwareApplicationSchema(), buildFaqSchema(landingFaqs)],
};

export const privacyMetadata: PageMetadata = {
  title: 'Reel privacy policy · Wysp',
  description:
    'How Reel handles your data: what stays on your device, what AI questions send (Pro and the 3 free ones), how your Discord session token is used, what we keep to limit free questions, and who the sub-processors are.',
  path: PRIVACY_PATH,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reel privacy policy',
    url: reelAbsoluteUrl(PRIVACY_PATH),
  },
};

export const notFoundMetadata: PageMetadata = {
  title: 'Reel page not found | Wysp',
  description: 'The requested Reel page could not be found. Open the Wysp-hosted Reel product home.',
  path: PRODUCT_ROOT,
  ogType: 'website',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Reel page not found',
    url: reelAbsoluteUrl(PRODUCT_ROOT),
  },
};
