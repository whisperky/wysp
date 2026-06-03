import { contact } from '../../data/siteData';
import { Brand } from '../brand/Brand';
import { AppLink } from '../navigation/AppLink';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Brand subtitle="apps and tools by Whisper" />
      <div className="footer-links">
        <AppLink href="/#products">Products</AppLink>
        <AppLink href="/#follow">Follow</AppLink>
        <AppLink href="/#suggest">Suggest</AppLink>
        <a href={contact.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`mailto:${contact.email}`}>Email</a>
      </div>
    </footer>
  );
}
