import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { TelemetryBadge } from '../common/TelemetryBadge';

export const CleanroomHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Turnkey Divisions', path: '/divisions' },
    { label: 'Products & Equipment', path: '/products' },
    { label: 'Air Filtration', path: '/filters' },
    { label: 'Portfolio', path: '/projects' },
    { label: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-brand-border">
      {/* Top Telemetry / Compliance Ribbon */}
      <div className="bg-brand-soft border-b border-brand-border py-1.5 px-4 text-xs font-mono text-brand-muted hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-brand-dark font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
              cGMP & ISO 14644-1 Compliant Facility Engineering
            </span>
            <span className="text-brand-border">|</span>
            <span className="text-brand-primary font-medium">ΔP Cascade: +45 Pa Validated</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Direct Tech Hotline:</span>
            <a
              href="tel:+919817343117"
              className="font-bold text-brand-dark hover:text-brand-primary transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-brand-green" />
              +91-9817343117
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="GMP VISION Logo"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight text-brand-navy">
                GMP <span className="text-brand-primary">VISION</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-muted">
                Turnkey Cleanroom & MEP
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-brand-primary bg-brand-soft font-semibold'
                    : 'text-brand-navy hover:text-brand-primary hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin/login"
              title="Admin Console"
              className="p-2 text-brand-muted hover:text-brand-primary rounded-md border border-brand-border hover:border-brand-primary/40 transition-colors"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-4 py-2.5 rounded-md font-semibold text-sm shadow-sm transition-all duration-200 hover:shadow"
            >
              Request RFQ
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brand-navy hover:text-brand-primary hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-brand-border px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <div className="py-2 border-b border-brand-border flex justify-between items-center">
            <TelemetryBadge label="ISO Class 5" variant="green" pulse />
            <a href="tel:+919817343117" className="text-xs font-mono font-bold text-brand-primary">
              +91-9817343117
            </a>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'bg-brand-soft text-brand-primary font-bold'
                  : 'text-brand-navy hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Link
              to="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-brand-primary text-white py-3 rounded-md font-semibold text-sm"
            >
              Request Cleanroom RFQ
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-brand-border text-brand-navy py-2 rounded-md text-xs font-mono"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
