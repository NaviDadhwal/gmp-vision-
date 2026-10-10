import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const CleanroomHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Divisions', path: '/divisions' },
    { label: 'Products', path: '/products' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E4E9F1] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Mark */}
        <Link className="flex items-center gap-3 group" to="/">
          <div className="h-11 w-11 rounded-lg p-0.5 flex items-center justify-center overflow-hidden border border-[#E4E9F1] bg-white shadow-sm transition-all duration-300 group-hover:border-[#1F56A8]/40 group-hover:shadow-md">
            <img
              alt="GMP VISION"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              src="/logo.png"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg tracking-tight text-[#16233F] group-hover:text-[#1F56A8] transition-colors">
                GMP VISION
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono tracking-widest uppercase bg-[#F7F9FC] text-[#1F56A8] border border-[#E4E9F1]">
                EPIC
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-[#5B6B82] font-mono -mt-0.5">
              Turnkey Cleanroom &amp; MEP
            </span>
          </div>
        </Link>

        {/* Primary Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium tracking-wide text-[#5B6B82]">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-1.5 rounded-md transition-colors ${
                isActive(link.path)
                  ? 'text-[#1F56A8] bg-[#F7F9FC] font-semibold'
                  : 'hover:text-[#16233F] hover:bg-[#F7F9FC]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Header Action Button */}
        <div className="flex items-center gap-3">
          <Link
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase bg-[#1F56A8] text-white hover:bg-[#16233F] active:scale-[0.98] transition-all duration-200 font-display shadow-sm hover:shadow-md"
            to="/rfq"
          >
            <span>Request RFQ</span>
            <span className="material-symbols-outlined text-[15px] font-bold transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>

          <a
            className="lg:hidden p-2 rounded-lg bg-[#F7F9FC] text-[#16233F] border border-[#E4E9F1] hover:bg-white active:scale-95 transition-all"
            href="tel:+919817343117"
          >
            <span className="material-symbols-outlined text-lg">call</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#F7F9FC] text-[#16233F] border border-[#E4E9F1] hover:bg-white active:scale-95 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-lg">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E4E9F1] px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                isActive(link.path)
                  ? 'text-[#1F56A8] bg-[#F7F9FC] font-semibold'
                  : 'text-[#5B6B82] hover:text-[#16233F] hover:bg-[#F7F9FC]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase bg-[#1F56A8] text-white"
            >
              Request Project RFQ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
