import type { ReactNode } from 'react';
import { AppLink } from '../navigation/AppLink';

type NotFoundPanelProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  action: {
    href: string;
    label: string;
    className: string;
  };
  mainClassName?: string;
  containerClassName?: string;
  headingClassName?: string;
  actionsClassName?: string;
  eyebrowClassName?: string;
};

export function NotFoundPanel({
  eyebrow,
  title,
  children,
  action,
  mainClassName = 'detail-main',
  containerClassName = 'detail-section',
  headingClassName = 'section-heading',
  actionsClassName = 'detail-actions',
  eyebrowClassName,
}: NotFoundPanelProps) {
  return (
    <main id="top" className={mainClassName}>
      <section className={containerClassName} aria-labelledby="not-found-title">
        <div className={headingClassName || undefined}>
          <span className={eyebrowClassName}>{eyebrow}</span>
          <h1 id="not-found-title">{title}</h1>
          <p>{children}</p>
        </div>
        <div className={actionsClassName || undefined}>
          <AppLink className={action.className} href={action.href}>
            {action.label}
          </AppLink>
        </div>
      </section>
    </main>
  );
}
