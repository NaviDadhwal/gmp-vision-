import React, { useState, useEffect } from 'react';
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
  Pin,
  PinOff,
} from 'lucide-react';
import { useAuth } from '../../../auth/AuthProvider';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Sliding drawer open/close state
  const [navOpen, setNavOpen] = useState(false);

  // Desktop pinned mode preference (persisted in localStorage)
  const [isPinned, setIsPinned] = useState(() => {
    try {
      return localStorage.getItem('gmp_admin_nav_pinned') === 'true';
    } catch {
      return false;
    }
  });

  // Track viewport width for desktop pinned mode (>= 1024px)
  const [isDesktop, setIsDesktop] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isCurrentlyPinned = isPinned && isDesktop;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleToggleNav = () => {
    if (isCurrentlyPinned) {
      // If pinned on desktop, clicking the toggle unpins and closes
      setIsPinned(false);
      try {
        localStorage.setItem('gmp_admin_nav_pinned', 'false');
      } catch {
        // ignore
      }
      setNavOpen(false);
    } else {
      setNavOpen((prev) => !prev);
    }
  };

  const handleCloseSidebar = () => {
    if (isCurrentlyPinned) {
      setIsPinned(false);
      try {
        localStorage.setItem('gmp_admin_nav_pinned', 'false');
      } catch {
        // ignore
      }
    }
    setNavOpen(false);
  };

  const handleTogglePin = () => {
    setIsPinned((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('gmp_admin_nav_pinned', String(next));
      } catch {
        // ignore
      }
      if (next) {
        setNavOpen(true);
      }
      return next;
    });
  };

  // Close sliding navigation on Escape key or backdrop click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navOpen && !isCurrentlyPinned) {
        setNavOpen(false);
      }
    };

    if (navOpen && !isCurrentlyPinned) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navOpen, isCurrentlyPinned]);

  // When clicking a navigation link, auto-close the drawer in sliding mode
  const handleNavLinkClick = () => {
    if (!isCurrentlyPinned) {
      setNavOpen(false);
    }
  };

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
    <div className={`admin-layout-root ${isCurrentlyPinned ? 'admin-nav-pinned' : ''}`}>
      {/* Sliding Navigation Backdrop Overlay */}
      <div
        className={`admin-nav-backdrop ${navOpen && !isCurrentlyPinned ? 'admin-nav-backdrop-visible' : ''}`}
        onClick={handleCloseSidebar}
        aria-label="Close navigation overlay"
      />

      {/* Sliding Navigation Sidebar */}
      <aside
        className={`admin-sidebar ${navOpen || isCurrentlyPinned ? 'admin-sidebar-open' : ''}`}
        aria-label="Admin Navigation Sidebar"
      >
        {/* Brand Header with Close and Pin Actions */}
        <div
          style={{
            padding: '1.15rem 1.25rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', minWidth: 0 }}
          >
            <img
              src="/logo.png"
              alt="GMP VISION"
              style={{
                height: '34px',
                width: 'auto',
                backgroundColor: '#FFFFFF',
                padding: '3px',
                borderRadius: '4px',
                flexShrink: 0,
              }}
              onError={(e) => {
                // Fallback if image unavailable
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                GMP VISION
              </div>
              <div style={{ fontSize: '0.65rem', color: '#3DAE2B', fontWeight: 700, letterSpacing: '0.05em' }}>
                CONTROL PORTAL
              </div>
            </div>
          </Link>

          {/* Action buttons: Pin/Unpin (desktop) and Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={handleTogglePin}
              className={`admin-sidebar-action-btn admin-pin-btn ${isCurrentlyPinned ? 'active' : ''}`}
              title={
                isCurrentlyPinned
                  ? 'Unpin Sidebar (Switch to Sliding Mode)'
                  : 'Pin Sidebar (Keep Docked on Desktop)'
              }
              aria-label={isCurrentlyPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
            >
              {isCurrentlyPinned ? <PinOff size={16} /> : <Pin size={16} />}
            </button>
            <button
              onClick={handleCloseSidebar}
              className="admin-sidebar-action-btn"
              title="Close Navigation Drawer (Esc)"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* User Status Bar */}
        <div
          style={{
            padding: '1rem 1.25rem',
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
              flexShrink: 0,
            }}
          >
            {user?.name?.charAt(0) || 'A'}
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
                  onClick={handleNavLinkClick}
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
            <span
              style={{
                fontSize: '0.65rem',
                background: '#3DAE2B',
                color: '#FFF',
                padding: '1px 5px',
                borderRadius: '3px',
              }}
            >
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
            {/* Sliding Navigation Toggle Button */}
            <button
              onClick={handleToggleNav}
              className={`admin-nav-toggle-btn ${navOpen || isCurrentlyPinned ? 'admin-nav-toggle-active' : ''}`}
              aria-label={navOpen ? 'Close Navigation' : 'Open Navigation'}
              title={isCurrentlyPinned ? 'Click to Unpin Sidebar' : 'Toggle Sliding Navigation'}
            >
              <Menu size={18} />
              <span className="admin-nav-toggle-text">
                {isCurrentlyPinned ? 'Sidebar Docked' : 'Navigation'}
              </span>
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
