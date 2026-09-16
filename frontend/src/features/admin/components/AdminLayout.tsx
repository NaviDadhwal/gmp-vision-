import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  Wind,
  Building2,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../../auth/AuthProvider';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileNavOpen]);

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/leads', label: 'Leads & RFQ Queue', icon: Inbox },
    { to: '/admin/projects', label: 'Projects & Case Studies', icon: Briefcase },
    { to: '/admin/products', label: 'Turnkey Products', icon: Layers },
    { to: '/admin/filtration', label: 'Filtration Catalog', icon: Wind },
    { to: '/admin/clients', label: 'Client Showcase', icon: Building2 },
    { to: '/admin/settings', label: 'Site Settings & Metrics', icon: Settings },
  ];

  return (
    <div className="admin-layout-root">
      {/* Mobile Backdrop */}
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 28, 66, 0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 90,
          }}
          aria-label="Close navigation overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${mobileNavOpen ? 'admin-sidebar-open' : ''}`}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="GMP VISION"
              style={{
                height: '36px',
                width: 'auto',
                backgroundColor: '#FFFFFF',
                padding: '3px',
                borderRadius: '4px',
              }}
              onError={(e) => {
                // Fallback to text if image unavailable
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                GMP VISION
              </div>
              <div style={{ fontSize: '0.68rem', color: '#3DAE2B', fontWeight: 700, letterSpacing: '0.05em' }}>
                CONTROL PORTAL
              </div>
            </div>
          </Link>
          <button
            onClick={() => setMobileNavOpen(false)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
              padding: '6px',
            }}
            className="mobile-close-btn"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Status Bar */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#0A3B85',
              border: '2px solid #3DAE2B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: '#FFFFFF',
            }}
          >
            {user?.name?.charAt(0) || 'P'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {user?.name || 'Administrator'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#3DAE2B' }}>
              <ShieldCheck size={12} /> Superadmin Access
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
          <div
            style={{
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#64748B',
              padding: '0 0.75rem 0.5rem',
              fontWeight: 700,
            }}
          >
            Operations & CMS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileNavOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    backgroundColor: isActive ? '#0A3B85' : 'transparent',
                    borderLeft: isActive ? '3px solid #3DAE2B' : '3px solid transparent',
                    transition: 'all 0.15s ease',
                  })}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div
          style={{
            padding: '1rem 0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              color: '#94A3B8',
              textDecoration: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ExternalLink size={14} /> View Live Portal
            </span>
            <span style={{ fontSize: '0.65rem', background: '#3DAE2B', color: '#FFF', padding: '1px 5px', borderRadius: '3px' }}>
              PROD
            </span>
          </Link>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.78rem',
              color: '#F87171',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
            <button
              onClick={() => setMobileNavOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: '#051C42',
                cursor: 'pointer',
                padding: '4px',
              }}
              className="mobile-menu-trigger"
              aria-label="Open Admin Menu"
            >
              <Menu size={22} />
            </button>
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#64748B',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                Cleanroom Facility Management
              </div>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#051C42',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                Administrative Control Deck
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <span
              className="admin-header-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.75rem',
                color: '#2F8E1E',
                backgroundColor: 'rgba(61, 174, 43, 0.1)',
                padding: '4px 10px',
                borderRadius: '9999px',
                fontWeight: 600,
              }}
              title="System Online (Standalone Mode)"
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3DAE2B',
                  boxShadow: '0 0 8px #3DAE2B',
                  flexShrink: 0,
                }}
              />
              <span className="admin-header-badge-text">System Online</span>
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
