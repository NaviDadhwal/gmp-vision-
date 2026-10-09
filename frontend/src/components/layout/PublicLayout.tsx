import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';
import { ScrollToTop } from '../common/ScrollToTop';
import { GMPFloatingDock } from '../ui/gmp-floating-dock';

export const PublicLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000', color: '#FFFFFF' }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1, backgroundColor: '#000000' }}>
        <Outlet />
      </main>
      <GMPFloatingDock />
      <FloatingActions />
      <Footer />
    </div>
  );
};

