import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { HomePage } from './pages/HomePage';
import { DivisionsPage } from './pages/DivisionsPage';
import { DivisionDetailPage } from './pages/DivisionDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FiltersPage } from './pages/FiltersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { RFQPage } from './pages/RFQPage';
import { AboutPage } from './pages/AboutPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin feature imports
import { AdminLayout } from './features/admin/components/AdminLayout';
import { AdminLoginPage } from './features/admin/pages/AdminLoginPage';
import { AdminDashboard } from './features/admin/pages/AdminDashboard';

export function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
