import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { AppLink } from '../../../components/navigation/AppLink';
import { EARLY_ACCESS_HREF } from '../config';
import type { RelatedLink, VisualVariant } from '../types';
import { ProductVisual } from './LanesVisuals';

export function BenefitCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <article className="lanes-benefit">
      <span className="lanes-benefit-icon">
        <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="lanes-section-head">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function FeatureBlock({
  tag,
  title,
  children,
  visual,
  flip = false,
}: {
  tag: string;
  title: string;
  children: ReactNode;
  visual: VisualVariant;
  flip?: boolean;
}) {
  return (
    <article className={flip ? 'lanes-feature lanes-feature-flip' : 'lanes-feature'}>
      <ProductVisual variant={visual} />
      <div className="lanes-feature-copy">
        <span>{tag}</span>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

export function PricingPlan({
  title,
  price,
  cadence,
  note,
  features,
  cta,
  highlighted = false,
}: {
  title: string;
  price: string;
  cadence: string;
  note: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <article className={highlighted ? 'lanes-plan lanes-plan-highlighted' : 'lanes-plan'}>
      {highlighted ? <span className="lanes-plan-badge">Save 18%</span> : null}
      <h3>{title}</h3>
      <p className="lanes-plan-price">
        <strong>{price}</strong>
        <span>{cadence}</span>
      </p>
      <p className="lanes-plan-note">{note}</p>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <AppLink className="lanes-btn lanes-btn-secondary" href={EARLY_ACCESS_HREF}>
        {cta}
      </AppLink>
    </article>
  );
}

export function InlineCta({ title, text, label }: { title: string; text: string; label: string }) {
  return (
    <aside className="lanes-inline-cta">
      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <AppLink className="lanes-btn lanes-btn-primary" href={EARLY_ACCESS_HREF}>
        {label}
      </AppLink>
    </aside>
  );
}

export function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <nav className="lanes-related" aria-label="Related Lanes guides">
      {links.map((link) => (
        <AppLink href={link.href} key={link.href}>
          <span>{link.label}</span>
          <strong>{link.title}</strong>
        </AppLink>
      ))}
    </nav>
  );
}
