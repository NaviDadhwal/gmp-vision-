import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';

// Public pages loaded lazily for optimal initial bundle & fast paint
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const DivisionsPage = lazy(() => import('./pages/DivisionsPage').then((m) => ({ default: m.DivisionsPage })));
const DivisionDetailPage = lazy(() => import('./pages/DivisionDetailPage').then((m) => ({ default: m.DivisionDetailPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const FiltersPage = lazy(() => import('./pages/FiltersPage').then((m) => ({ default: m.FiltersPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const RFQPage = lazy(() => import('./pages/RFQPage').then((m) => ({ default: m.RFQPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Admin feature imports (lazy loaded to prevent admin bundle leakage to public clients)
const AdminLayout = lazy(() => import('./features/admin/components/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const AdminLoginPage = lazy(() => import('./features/admin/pages/AdminLoginPage').then((m) => ({ default: m.AdminLoginPage })));
const AdminDashboard = lazy(() => import('./features/admin/pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="w-9 h-9 border-2 border-[#E4E9F1] border-t-[#1F56A8] rounded-full animate-spin"></div>
      <span className="mt-3 text-[11px] font-mono text-[#5B6B82] tracking-wider uppercase">
        Loading Suite...
      </span>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          {/* 1. Public Daylight Cleanroom Showcase Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/divisions" element={<DivisionsPage />} />
            <Route path="/divisions/:slug" element={<DivisionDetailPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/filters" element={<FiltersPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/rfq" element={<RFQPage />} />
            <Route path="/contact" element={<RFQPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* 2. Admin Security Gateway & Portal */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
