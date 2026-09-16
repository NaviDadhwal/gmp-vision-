import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Layers,
  Wind,
  Droplets,
  Activity,
  Zap,
  Cpu,
  Briefcase,
  Building2,
  Info,
  Sparkles,
  Home,
} from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SITE_SETTINGS } from '../../data/settings';
import { DIVISIONS_DATA } from '../../data/divisions';
import { initiateWhatsAppInquiry } from '../../lib/whatsapp';

const DIVISION_ICONS: Record<string, React.ReactNode> = {
  Layers: <Layers size={16} />,
  Wind: <Wind size={16} />,
  ShieldCheck: <ShieldCheck size={16} />,
  Activity: <Activity size={16} />,
  Droplets: <Droplets size={16} />,
  Zap: <Zap size={16} />,
  Cpu: <Cpu size={16} />,
};

export const Navbar: React.FC = () => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [slidingNavOpen, setSlidingNavOpen] = useState(false);
  const [divisionsExpanded, setDivisionsExpanded] = useState(true);
  const location = useLocation();

  const handleWhatsApp = () => {
    initiateWhatsAppInquiry({ topic: 'Direct Inquiry via Website Header' });
  };

  // Keyboard accessibility and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && slidingNavOpen) {
        setSlidingNavOpen(false);
      }
    };

    if (slidingNavOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slidingNavOpen]);

  // Auto-close on route change
  useEffect(() => {
    setSlidingNavOpen(false);
    setIsMegaOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Products', path: '/products', icon: Layers },
    { label: 'Projects & Clients', path: '/projects', icon: Briefcase },
    { label: 'About Us', path: '/about', icon: Info },
    { label: 'Contact', path: '/contact', icon: Building2 },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Top Utility Bar */}
      <div
        style={{
          backgroundColor: '#031430',
          color: '#CBD5E1',
          fontSize: '0.8rem',
          padding: '0.4rem 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          {/* Left: Direct Contacts */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.6rem, 2vw, 1.25rem)',
              flexWrap: 'wrap',
              fontSize: 'clamp(0.72rem, 2vw, 0.8rem)',
            }}
          >
            <a
              href={`tel:${SITE_SETTINGS.contact.primaryPhone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#E2E8F0',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <Phone size={13} color="#3DAE2B" style={{ flexShrink: 0 }} />
              <span>{SITE_SETTINGS.contact.primaryPhone}</span>
            </a>

            <a
              href={`mailto:${SITE_SETTINGS.contact.primaryEmail}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#CBD5E1',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <Mail size={13} color="#3DAE2B" style={{ flexShrink: 0 }} />
              <span>{SITE_SETTINGS.contact.primaryEmail}</span>
            </a>

            <span
              style={{
                color: '#94A3B8',
                fontSize: '0.75rem',
                display: 'none',
              }}
              className="hidden md:inline"
            >
              GSTIN: <strong style={{ color: '#F1F5F9' }}>{SITE_SETTINGS.contact.gstin}</strong>
            </span>
          </div>

          {/* Right: Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)' }}>
            <button
              type="button"
              onClick={handleWhatsApp}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#3DAE2B',
                fontSize: 'clamp(0.74rem, 2vw, 0.8rem)',
                fontWeight: 700,
                fontFamily: 'inherit',
              }}
            >
              <MessageCircle size={14} color="#3DAE2B" style={{ flexShrink: 0 }} />
              <span>WhatsApp Direct</span>
            </button>

            <Link
              to="/rfq"
              style={{
                color: '#FFFFFF',
                backgroundColor: 'rgba(61, 174, 43, 0.2)',
                padding: '0.2rem 0.65rem',
                borderRadius: '4px',
                fontSize: '0.74rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(61, 174, 43, 0.45)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span>Instant RFQ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        style={{
          backgroundColor: 'rgba(5, 28, 66, 0.98)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '2px solid #3DAE2B',
          position: 'relative',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '74px',
          }}
        >
          {/* Brand Logo & Corporate Name */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.5rem, 2vw, 0.85rem)',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                height: 'clamp(40px, 9vw, 50px)',
                width: 'clamp(40px, 9vw, 50px)',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="GMP VISION"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', lineHeight: 1.1 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
                    color: '#FFFFFF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  GMP
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(1.15rem, 4vw, 1.45rem)',
                    color: '#3DAE2B',
                    letterSpacing: '-0.02em',
                  }}
                >
                  VISION
                </span>
              </div>
              <span
                style={{
                  fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#94A3B8',
                  marginTop: '2px',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                All Solutions in One Project
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              height: '100%',
            }}
            className="desktop-nav"
          >
            {/* Solutions Dropdown Trigger */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
              onMouseEnter={() => setIsMegaOpen(true)}
            >
              <button
                type="button"
                onClick={() => setIsMegaOpen(!isMegaOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  margin: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  color: isMegaOpen || location.pathname.startsWith('/solutions') ? '#3DAE2B' : '#E2E8F0',
                  transition: 'color 0.15s ease',
                  outline: 'none',
                }}
              >
                <span>Solutions</span>
                <ChevronDown
                  size={15}
                  style={{
                    transform: isMegaOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    marginTop: '1px',
                  }}
                />
              </button>
            </div>

            {/* Standard Nav Links */}
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#3DAE2B' : '#E2E8F0',
                    transition: 'color 0.15s ease',
                    padding: '0.5rem 0',
                    borderBottom: isActive ? '2px solid #3DAE2B' : '2px solid transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#3DAE2B')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? '#3DAE2B' : '#E2E8F0')}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* CTA Request Quote Button */}
            <Link
              to="/rfq"
              className="btn btn-primary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.15rem',
                fontSize: '0.86rem',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(61, 174, 43, 0.35)',
              }}
            >
              <span>Request Quote</span>
              <ArrowRight size={15} />
            </Link>

            {/* Desktop Sliding Navigation Bar Trigger */}
            <button
              type="button"
              onClick={() => setSlidingNavOpen(true)}
              className="site-menu-trigger-btn"
              title="Open Navigation Menu Drawer"
              aria-label="Open Navigation Drawer"
            >
              <Menu size={16} />
              <span>Menu</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setSlidingNavOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#FFFFFF',
              padding: '0.5rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* 7-Division Mega Menu (Desktop Hover Drawer) */}
        <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />
      </nav>

      {/* ================================================================
          PUBLIC SITE SLIDING NAVIGATION BAR DRAWER (Slide-out Off-Canvas)
          ================================================================ */}
      {/* Frosted Glass Backdrop Overlay */}
      <div
        className={`site-sliding-nav-backdrop ${slidingNavOpen ? 'open' : ''}`}
        onClick={() => setSlidingNavOpen(false)}
        aria-label="Close navigation overlay"
      />

      {/* Sliding Navigation Drawer */}
      <aside
        className={`site-sliding-nav-drawer ${slidingNavOpen ? 'open' : ''}`}
        aria-label="Public Site Navigation Drawer"
      >
        {/* Drawer Brand Header */}
        <div className="site-sliding-nav-header">
          <Link
            to="/"
            onClick={() => setSlidingNavOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', minWidth: 0 }}
          >
            <img
              src="/logo.png"
              alt="GMP VISION"
              style={{
                height: '34px',
                width: 'auto',
                backgroundColor: '#FFFFFF',
                padding: '2px',
                borderRadius: '6px',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0, overflow: 'hidden' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
                GMP <span style={{ color: '#3DAE2B' }}>VISION</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Turnkey Engineering
              </div>
            </div>
          </Link>

          <button
            onClick={() => setSlidingNavOpen(false)}
            className="site-sliding-nav-close-btn"
            title="Close Menu (Esc)"
            aria-label="Close navigation drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="site-sliding-nav-body">
          {/* Quick RFQ Highlight Banner */}
          <div
            style={{
              padding: '1rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(10, 59, 133, 0.4) 0%, rgba(61, 174, 43, 0.18) 100%)',
              border: '1px solid rgba(61, 174, 43, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#48BE34', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <Sparkles size={14} /> Single-Source Turnkey MEP
            </div>
            <div style={{ color: '#FFFFFF', fontSize: '0.92rem', fontWeight: 700, margin: '0.35rem 0 0.75rem' }}>
              Cleanroom, HVAC & Process Utilities
            </div>
            <Link
              to="/rfq"
              onClick={() => setSlidingNavOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', justifyContent: 'center', gap: '0.4rem' }}
            >
              <span>Instant 5-Step Quote Builder</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Core Navigation Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: 700, padding: '0 0.5rem' }}>
              Navigation Menu
            </div>

            {/* Home Link */}
            <Link
              to="/"
              onClick={() => setSlidingNavOpen(false)}
              className={`site-sliding-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Home size={17} color="#3DAE2B" />
                <span>Home</span>
              </span>
              <ChevronRight size={15} color="#94A3B8" />
            </Link>

            {/* 7 Turnkey Divisions Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setDivisionsExpanded(!divisionsExpanded)}
                className="site-sliding-nav-accordion-btn"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Layers size={17} color="#3DAE2B" />
                  <span>7 Turnkey Divisions</span>
                </span>
                <ChevronDown
                  size={16}
                  color="#94A3B8"
                  style={{
                    transform: divisionsExpanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {divisionsExpanded && (
                <div
                  style={{
                    marginTop: '0.35rem',
                    paddingLeft: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    borderLeft: '2px solid rgba(61, 174, 43, 0.3)',
                    marginLeft: '0.5rem',
                  }}
                >
                  <Link
                    to="/solutions"
                    onClick={() => setSlidingNavOpen(false)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      color: '#48BE34',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <span>View All 7 Divisions Scope →</span>
                  </Link>
                  {DIVISIONS_DATA.map((div) => (
                    <Link
                      key={div.id}
                      to={`/solutions/${div.slug}`}
                      onClick={() => setSlidingNavOpen(false)}
                      style={{
                        padding: '0.45rem 0.75rem',
                        borderRadius: '6px',
                        color: location.pathname === `/solutions/${div.slug}` ? '#FFFFFF' : '#CBD5E1',
                        backgroundColor: location.pathname === `/solutions/${div.slug}` ? 'rgba(10, 59, 133, 0.4)' : 'transparent',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ color: '#3DAE2B', display: 'flex', alignItems: 'center' }}>
                        {DIVISION_ICONS[div.iconName] || <Layers size={14} />}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        0{div.number}. {div.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Main Links */}
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSlidingNavOpen(false)}
                  className={`site-sliding-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Icon size={17} color="#3DAE2B" />
                    <span>{item.label}</span>
                  </span>
                  <ChevronRight size={15} color="#94A3B8" />
                </Link>
              );
            })}
          </div>

          {/* Quick Direct Support Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', fontWeight: 700, padding: '0 0.5rem' }}>
              Direct Engineering Support
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <a
                href={`tel:${SITE_SETTINGS.contact.primaryPhone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#E2E8F0',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <Phone size={14} color="#3DAE2B" />
                <span>Call Us</span>
              </a>
              <button
                type="button"
                onClick={handleWhatsApp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  color: '#25D366',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="site-sliding-nav-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#94A3B8' }}>
            <ShieldCheck size={14} color="#3DAE2B" />
            <span>ISO 14644-1, cGMP & USFDA 21 CFR Part 11 Validated</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
              © {new Date().getFullYear()} GMP VISION
            </span>
            <Link
              to="/admin/login"
              onClick={() => setSlidingNavOpen(false)}
              style={{ fontSize: '0.72rem', color: '#94A3B8', textDecoration: 'underline' }}
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </aside>

      {/* Responsive media query overrides */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
