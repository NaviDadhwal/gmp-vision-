import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkItem {
  label: string;
  path: string;
  icon: string;
  description: string;
  badge?: string;
}

export const CleanroomHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks: NavLinkItem[] = [
    { label: 'Home', path: '/', icon: 'home', description: 'Overview & cleanroom showcase' },
    { label: 'Divisions', path: '/divisions', icon: 'domain', description: 'Turnkey cleanroom, electrical & chemical divisions' },
    { label: 'Products', path: '/products', icon: 'precision_manufacturing', description: 'Pass boxes, LAF & cleanroom gear' },
    { label: 'Filters', path: '/filters', icon: 'air', description: 'HEPA, ULPA & HVAC air filtration', badge: 'ISO' },
    { label: 'Projects', path: '/projects', icon: 'apartment', description: 'Pharma client execution showcase' },
    { label: 'About', path: '/about', icon: 'info', description: 'Schedule M & ISO 14644 standards' },
    { label: 'Contact', path: '/contact', icon: 'support_agent', description: 'Engineering technical desk' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close mobile menu when route changes (official React pattern for adjusting state from location)
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Handle ESC key to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E9F1] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
          {/* Brand Mark */}
          <Link className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0" to="/">
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-lg p-0.5 flex items-center justify-center overflow-hidden border border-[#E4E9F1] bg-white shadow-xs shrink-0 transition-all duration-300 group-hover:border-[#1F56A8]/40 group-hover:shadow-sm">
              <img
                alt="GMP VISION"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                src="/logo.png"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#16233F] group-hover:text-[#1F56A8] transition-colors truncate">
                  GMP VISION
                </span>
                <span className="px-1.5 py-0.2 rounded text-[8px] sm:text-[9px] font-mono tracking-widest uppercase bg-[#F7F9FC] text-[#1F56A8] border border-[#E4E9F1] shrink-0">
                  EPIC
                </span>
              </div>
              <span className="hidden sm:block text-[9px] sm:text-[10px] tracking-wider uppercase text-[#5B6B82] font-mono -mt-0.5 truncate">
                Turnkey Cleanroom &amp; MEP
              </span>
            </div>
          </Link>

          {/* Desktop Primary Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[12px] xl:text-[13px] font-medium tracking-wide text-[#5B6B82]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2.5 xl:px-3 py-1.5 rounded-md transition-colors relative whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-[#1F56A8] bg-[#F7F9FC] font-semibold'
                    : 'hover:text-[#16233F] hover:bg-[#F7F9FC]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1 px-1 py-0.2 text-[8px] font-mono uppercase bg-[#1F56A8]/10 text-[#1F56A8] rounded">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Request RFQ CTA - Responsive sizing */}
            <Link
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#1F56A8] text-white hover:bg-[#16233F] active:scale-[0.98] transition-all duration-200 font-display shadow-xs hover:shadow-sm shrink-0"
              to="/rfq"
            >
              <span className="hidden sm:inline">Request RFQ</span>
              <span className="sm:hidden">RFQ</span>
              <span className="material-symbols-outlined text-[14px] sm:text-[15px] font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>

            {/* Quick Call Button */}
            <a
              className="p-2 sm:p-2.5 rounded-lg bg-[#F7F9FC] text-[#16233F] border border-[#E4E9F1] hover:bg-white hover:border-[#1F56A8]/30 active:scale-95 transition-all flex items-center justify-center shrink-0"
              href="tel:+919817343117"
              title="Call Technical Hotline: +91 9817343117"
              aria-label="Call technical hotline"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">call</span>
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-lg bg-[#F7F9FC] text-[#16233F] border border-[#E4E9F1] hover:bg-white hover:border-[#1F56A8]/30 active:scale-95 transition-all flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <span className="material-symbols-outlined text-base sm:text-lg transition-transform duration-200">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop Scrim */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Drawer Sheet */}
      <div
        id="mobile-navigation-menu"
        className={`fixed top-16 inset-x-0 bg-white border-b border-[#E4E9F1] shadow-2xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Quick Header Banner */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E9F1] text-xs font-mono text-[#5B6B82]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#79B82E] animate-pulse"></span>
              ISO 14644 &bull; GMP TURNKEY DESK
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#1F56A8]">NAVIGATION</span>
          </div>

          {/* Navigation Links List */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                    active
                      ? 'bg-[#1F56A8]/10 text-[#1F56A8] font-semibold border border-[#1F56A8]/20'
                      : 'hover:bg-[#F7F9FC] text-[#16233F]'
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${
                      active ? 'bg-[#1F56A8] text-white' : 'bg-[#F7F9FC] text-[#5B6B82] border border-[#E4E9F1]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">{link.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium tracking-tight truncate">{link.label}</span>
                      {link.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#1F56A8]/10 text-[#1F56A8]">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#5B6B82] truncate">{link.description}</p>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Link
              to="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#1F56A8] text-white shadow-sm hover:bg-[#16233F] transition-all"
            >
              <span>Request Project RFQ &amp; BOQ</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {/* Quick Contact & Hotline Grid */}
          <div className="pt-3 border-t border-[#E4E9F1]">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#5B6B82] mb-2">
              Direct Technical Hotlines
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:+919817343117"
                className="flex items-center gap-2 p-2 rounded-lg bg-[#F7F9FC] border border-[#E4E9F1] hover:bg-white text-[#16233F] transition-colors"
              >
                <span className="material-symbols-outlined text-base text-[#1F56A8]">call</span>
                <span className="truncate font-medium">+91 98173 43117</span>
              </a>
              <a
                href="https://wa.me/919817343117?text=Hello%20GMP%20Vision%20Team%2C%20I%20would%20like%20to%20discuss%20a%20cleanroom%20project."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#16233F] transition-colors"
              >
                <span className="material-symbols-outlined text-base text-[#25D366]">chat</span>
                <span className="truncate font-medium text-[#1E7E34]">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Admin Gateway Access */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-[#5B6B82]">
            <span>Schedule M &bull; ISO Class 5-8</span>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 text-[#1F56A8] hover:underline font-mono"
            >
              <span className="material-symbols-outlined text-xs">lock</span>
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
