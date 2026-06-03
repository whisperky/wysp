import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { AppLink } from '../components/navigation/AppLink';
import type { Product } from '../data/siteData';

export function ProductDetailPage({ product }: { product: Product }) {
  return (
    <main id="top" className="detail-main">
      <section className={`product-detail-hero accent-${product.accent}`} aria-labelledby="detail-title">
        <div className="product-detail-copy">
          <AppLink className="back-link" href="/#products">
            <ArrowRight size={16} aria-hidden="true" />
            Back to products
          </AppLink>
          <span className={`status accent-${product.accent}`}>{product.status}</span>
          <p className="eyebrow">{product.eyebrow}</p>
          <h1 id="detail-title">{product.name}</h1>
          <p>{product.detail.intro}</p>
          <div className="detail-actions">
            <AppLink className="button primary" href={product.detail.primaryAction.href}>
              {product.detail.primaryAction.label}
              <ArrowRight size={18} aria-hidden="true" />
            </AppLink>
            <AppLink className="button ghost" href="/#suggest">
              Send feedback
            </AppLink>
          </div>
        </div>
        <div className="product-detail-visual">
          <img src={product.image.src} alt={product.image.alt} />
        </div>
      </section>

      <section className="detail-section" aria-labelledby="detail-structure-title">
        <div className="section-heading">
          <span>Product detail</span>
          <h2 id="detail-structure-title">Ready to grow from placeholder to launch page.</h2>
          <p>Every detail page uses the same product data shape, so a future product can start from generated copy and swap in real media when it is ready.</p>
        </div>
        <div className="detail-grid">
          {product.detail.sections.map((section) => (
            <article className="detail-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-roadmap" aria-labelledby="roadmap-title">
        <div>
          <span>Next steps</span>
          <h2 id="roadmap-title">Launch notes stay honest.</h2>
        </div>
        <ul>
          {product.detail.milestones.map((milestone) => (
            <li key={milestone}>
              <CheckCircle2 size={18} aria-hidden="true" />
              {milestone}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
