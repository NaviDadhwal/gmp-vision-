import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, ChevronDown, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SITE_SETTINGS } from '../../data/settings';
import { initiateWhatsAppInquiry } from '../../lib/whatsapp';

export const Navbar: React.FC = () => {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleWhatsApp = () => {
    initiateWhatsAppInquiry({ topic: 'Direct Inquiry via Website Header' });
  };

  const navLinks = [
    { label: 'Products', path: '/products' },
    { label: 'Projects & Clients', path: '/projects' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.6rem, 2vw, 1.25rem)', flexWrap: 'wrap', fontSize: 'clamp(0.72rem, 2vw, 0.8rem)' }}>
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
              gap: '1.75rem',
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
                marginLeft: '0.5rem',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(61, 174, 43, 0.35)',
              }}
            >
              <span>Request Quote</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* 7-Division Mega Menu (Desktop Drawer) */}
        <MegaMenu isOpen={isMegaOpen} onClose={() => setIsMegaOpen(false)} />

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: '#051C42',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Link
              to="/solutions"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: '#3DAE2B', fontSize: '1rem', fontWeight: 700, textDecoration: 'none' }}
            >
              All 7 Solutions & Divisions →
            </Link>
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: location.pathname === item.path ? '#3DAE2B' : '#CBD5E1',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginTop: '0.5rem',
                textAlign: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              Request a Technical Quote <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </nav>

      {/* Responsive media queries */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
