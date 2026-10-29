import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Product } from '../../data/siteData';
import { AppLink } from '../navigation/AppLink';
import { ProductVideo } from './ProductVideo';

type ProductRowProps = {
  product: Product;
  index: number;
};

export function ProductRow({ product, index }: ProductRowProps) {
  const isReversed = index % 2 === 1;

  return (
    <article className={isReversed ? 'product-row is-reversed' : 'product-row'}>
      <div className={`product-visual accent-${product.accent}${product.image.video ? ' has-video' : ''}`}>
        {product.image.video ? (
          <ProductVideo src={product.image.video} poster={product.image.src} label={product.image.alt} />
        ) : (
          <img src={product.image.src} alt={product.image.alt} />
        )}
        <div className="product-visual-badge" aria-hidden="true">
          <product.icon size={24} />
        </div>
      </div>

      <div className="product-copy">
        <span className={`status accent-${product.accent}${product.status === 'Live' ? ' is-live' : ''}`}>
          {product.status}
        </span>
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <ul>
          {product.points.map((point) => (
            <li key={point}>
              <CheckCircle2 size={17} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <p className="product-outcome">{product.outcome}</p>
        <AppLink href={product.href} className="text-link">
          Learn more
          <ArrowRight size={17} aria-hidden="true" />
        </AppLink>
      </div>
    </article>
  );
}
