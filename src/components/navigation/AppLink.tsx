import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link, useInRouterContext } from 'react-router-dom';

type AppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  reloadDocument?: boolean;
};

function isRoutableHref(href: string) {
  if (!href.startsWith('/')) {
    return false;
  }

  if (href.startsWith('//')) {
    return false;
  }

  return true;
}

export function AppLink({ href, children, reloadDocument, ...props }: AppLinkProps) {
  const isInsideRouter = useInRouterContext();

  if (!reloadDocument && isInsideRouter && isRoutableHref(href)) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
