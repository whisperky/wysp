import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { WyspLayout } from '../components/layout/WyspLayout';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProductDetailRoute } from '../pages/ProductDetailRoute';
import { LanesProductSite } from '../products/lanes';
import { ReelProductSite } from '../products/reel';
import { TrustContractProductSite } from '../products/trust-contract';
import '../products/lanes/lanes.css';
import '../products/reel/reel.css';
import '../products/trust-contract/trust-contract.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lanes/*" element={<LanesRoute />} />
        <Route path="/reel/*" element={<ReelRoute />} />
        <Route path="/trust-contract/*" element={<TrustContractRoute />} />
        <Route element={<WyspLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":productId" element={<ProductDetailRoute />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function LanesRoute() {
  const { hash, key, pathname } = useLocation();

  return <LanesProductSite routePath={pathname} scrollKey={`lanes:${key}:${pathname}:${hash}`} />;
}

function ReelRoute() {
  const { hash, key, pathname } = useLocation();

  return <ReelProductSite routePath={pathname} scrollKey={`reel:${key}:${pathname}:${hash}`} />;
}

function TrustContractRoute() {
  const { hash, key, pathname } = useLocation();

  return <TrustContractProductSite routePath={pathname} scrollKey={`trust-contract:${key}:${pathname}:${hash}`} />;
}
