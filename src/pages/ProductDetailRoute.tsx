import { useParams } from 'react-router-dom';
import { products } from '../data/siteData';
import { NotFoundPage } from './NotFoundPage';
import { ProductDetailPage } from './ProductDetailPage';

export function ProductDetailRoute() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return <NotFoundPage />;
  }

  return <ProductDetailPage product={product} />;
}
