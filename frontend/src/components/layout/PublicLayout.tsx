import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';
import { ScrollToTop } from '../common/ScrollToTop';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <FloatingActions />
      <Footer />
    </div>
  );
};
