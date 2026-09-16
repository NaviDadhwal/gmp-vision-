import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './auth/AuthProvider';
import { RequireAuth } from './components/RequireAuth';
import { ErrorBoundary } from './components/ErrorBoundary';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './features/admin/components/AdminLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { SolutionsPage } from './pages/SolutionsPage';
import { DivisionDetailPage } from './pages/DivisionDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { RFQPage } from './pages/RFQPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Pages
import { AdminLoginPage } from './features/admin/pages/AdminLoginPage';
import { AdminDashboard } from './features/admin/pages/AdminDashboard';
import { LeadsPage } from './features/admin/pages/LeadsPage';
import { ProjectsAdminPage } from './features/admin/pages/ProjectsAdminPage';
import { ProductsAdminPage } from './features/admin/pages/ProductsAdminPage';
import { FiltrationAdminPage } from './features/admin/pages/FiltrationAdminPage';
import { ClientsAdminPage } from './features/admin/pages/ClientsAdminPage';
import { SettingsAdminPage } from './features/admin/pages/SettingsAdminPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Customer-Facing Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/solutions" element={<SolutionsPage />} />
                  <Route path="/solutions/:slug" element={<DivisionDetailPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:slug" element={<ProductDetailPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/rfq" element={<RFQPage />} />

                  {/* URL Aliases & Redirects */}
                  <Route path="/request-quote" element={<Navigate to="/rfq" replace />} />
                  <Route path="/filtration" element={<Navigate to="/solutions/air-filtration" replace />} />
                  <Route path="/filtration-catalog" element={<Navigate to="/solutions/air-filtration" replace />} />
                  <Route path="/validation" element={<Navigate to="/solutions/automation-validation" replace />} />
                  <Route path="/validation-services" element={<Navigate to="/solutions/automation-validation" replace />} />
                </Route>

                {/* Admin Authentication */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Protected Admin CMS Operations */}
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <AdminLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="leads" element={<LeadsPage />} />
                  <Route path="projects" element={<ProjectsAdminPage />} />
                  <Route path="products" element={<ProductsAdminPage />} />
                  <Route path="filtration" element={<FiltrationAdminPage />} />
                  <Route path="clients" element={<ClientsAdminPage />} />
                  <Route path="settings" element={<SettingsAdminPage />} />
                </Route>

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
