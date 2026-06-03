import { AppLink } from '../navigation/AppLink';

type BrandProps = {
  subtitle: string;
  onClick?: () => void;
};

export function Brand({ subtitle, onClick }: BrandProps) {
  return (
    <AppLink className="brand" href="/" aria-label="Wysp home" onClick={onClick}>
      <span className="brand-mark" aria-hidden="true">
        <img src="/assets/logo.png" alt="" />
      </span>
      <span>
        <strong>Wysp</strong>
        <small>{subtitle}</small>
      </span>
    </AppLink>
  );
}
