import React from 'react';
import { Link } from 'react-router-dom';
import { Download, Mail, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CleanroomFooter: React.FC = () => {
  const divisions = [
    { name: 'Modular Cleanroom Panels', slug: 'cleanroom-panels' },
    { name: 'HVAC & AHU Air Handling', slug: 'hvac-ahu-systems' },
    { name: 'Terminal Air Filtration', slug: 'air-filtration-systems' },
    { name: 'Validation & DQ/IQ/OQ/PQ', slug: 'cleanroom-validation' },
    { name: 'Cleanroom Doors & Pass Boxes', slug: 'doors-airlocks-passboxes' },
    { name: 'Electrical & MEP Contracting', slug: 'electrical-cleanroom-lighting' },
    { name: 'Epoxy & Cleanroom Flooring', slug: 'epoxy-coving-flooring' },
  ];

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-700/60">
          {/* Col 1: Brand Info & Standards */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="GMP VISION" className="h-10 w-auto bg-white rounded p-1" />
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                GMP <span className="text-brand-green">VISION</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              India’s premier turnkey engineering contractor specializing in modular cleanrooms,
              custom double-skin AHUs, precision HVAC cascades, and Schedule M / ISO 14644 validation.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-gray-800 text-brand-green border border-gray-700">
                <CheckCircle2 className="w-3 h-3 text-brand-green" /> WHO-GMP
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-gray-800 text-brand-primary border border-gray-700">
                <ShieldCheck className="w-3 h-3 text-brand-primary" /> ISO 14644-1
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                Schedule M
              </span>
            </div>
          </div>

          {/* Col 2: Turnkey Divisions */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono uppercase tracking-wider text-brand-green font-semibold">
              Turnkey Divisions
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {divisions.slice(0, 4).map((d) => (
                <li key={d.slug}>
                  <Link to={`/divisions/${d.slug}`} className="hover:text-white transition-colors">
                    {d.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/divisions" className="text-brand-primary font-medium hover:underline text-xs">
                  View All 7 Divisions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono uppercase tracking-wider text-brand-green font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Equipment Catalog
                </Link>
              </li>
              <li>
                <Link to="/filters" className="hover:text-white transition-colors">
                  Air Filters (G4 to U15)
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/rfq" className="hover:text-white transition-colors">
                  Cleanroom RFQ Estimator
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About & Credentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact & Brochure */}
          <div className="space-y-3">
            <h4 className="text-sm font-mono uppercase tracking-wider text-brand-green font-semibold">
              Engineering Office
            </h4>
            <div className="space-y-2.5 text-xs text-gray-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>Plot No. 42, Industrial Area Phase II, Panchkula, Haryana 134113</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-green shrink-0" />
                <a href="tel:+919817343117" className="hover:text-white font-mono">
                  +91-9817343117
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-green shrink-0" />
                <a href="mailto:info@gmpvision.com" className="hover:text-white">
                  info@gmpvision.com
                </a>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="/Broucher.pdf"
                download="GMP_VISION_Corporate_Brochure.pdf"
                className="inline-flex items-center gap-2 bg-brand-primary/20 hover:bg-brand-primary text-white border border-brand-primary/40 px-3.5 py-2 rounded text-xs font-semibold transition-all duration-200"
              >
                <Download className="w-3.5 h-3.5 text-brand-green" />
                Download Catalog PDF
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} GMP VISION Engineering Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-white transition-colors font-mono">
              Staff Portal
            </Link>
            <span className="text-gray-600">|</span>
            <span>Cleanroom Spec ISO 14644-1:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
