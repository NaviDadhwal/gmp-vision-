import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import {
  LogOut,
  Globe,
} from 'lucide-react';
import { ApiService } from '../../../lib/api/endpoints';
import { TelemetryBadge } from '../../../components/common/TelemetryBadge';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await ApiService.getMe();
        setAdminUser(user);
      } catch (err) {
        // If unauthenticated or token expired, redirect to login
        console.warn('Admin session unverified:', err);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await ApiService.logout();
    } catch (e) {
      console.warn('Logout:', e);
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-brand-soft flex flex-col font-sans">
      {/* Top Admin Telemetry Navigation Bar */}
      <header className="bg-white border-b border-brand-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <img src="/logo.png" alt="GMP Vision" className="h-8 w-auto" />
              <span className="text-sm font-mono font-bold text-brand-navy tracking-tight hidden sm:inline">
                CONSOLE // <span className="text-brand-primary">ADMIN CONTROL</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <TelemetryBadge label="SYSTEM LIVE" variant="green" pulse />
              <span className="text-xs font-mono text-brand-muted">
                SESSION: {adminUser?.email || 'ENGINEERING DESK'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-muted hover:text-brand-navy transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-brand-soft hover:bg-red-50 text-brand-navy hover:text-red-600 border border-brand-border transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Admin Sterile Footer */}
      <footer className="bg-white border-t border-brand-border py-4 text-center text-xs font-mono text-brand-muted">
        GMP VISION PHARMACEUTICAL CLEANROOM SYSTEMS &bull; SECURE CONSOLE v2.0
      </footer>
    </div>
  );
};
