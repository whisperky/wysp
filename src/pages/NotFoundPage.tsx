import { NotFoundPanel } from '../components/feedback/NotFoundPanel';

export function NotFoundPage() {
  return (
    <NotFoundPanel
      eyebrow="404"
      title="That page is not on Wysp."
      action={{ href: '/#products', label: 'Browse products', className: 'button primary' }}
    >
      Return to the product shelf and choose a live route from the catalog.
    </NotFoundPanel>
  );
}
