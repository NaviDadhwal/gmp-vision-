import React from 'react';
import { Link } from 'react-router-dom';

export const CleanroomFooter: React.FC = () => {
  return (
    <footer className="bg-white text-[#5B6B82] py-12 border-t border-[#E4E9F1]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#E4E9F1]">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white p-0.5 flex items-center justify-center border border-[#E4E9F1] shadow-sm">
                <img
                  alt="GMP VISION Logo"
                  className="h-full w-full object-contain"
                  src="/logo.png"
                />
              </div>
              <span className="font-display font-bold text-lg text-[#16233F]">GMP VISION</span>
            </div>
            <p className="text-xs text-[#5B6B82] leading-relaxed max-w-sm">
              Turnkey cleanroom HVAC/MEP engineering, modular containment envelope contracting, laminar flow systems, and Schedule M qualification suites for pharmaceutical formulations.
            </p>
            <div className="text-xs font-mono space-y-1 pt-1 text-[#5B6B82]">
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#1F56A8]">location_on</span>
                <span>Ground Floor, Flat No. 01, Amb Daultpur Road,Bhanjal, Distt.Una, Himachal Pradesh– 177213</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#1F56A8]">phone</span>
                <span>+91 9817343117 / +91 9317343117</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#1F56A8]">mail</span>
                <span>info@gmpvision.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Engineering Divisions */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-xs text-[#16233F] uppercase tracking-wider mb-3">Divisions</h4>
            <ul className="text-xs space-y-2">
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/divisions">Modular Wall &amp; Walk-on Ceilings</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/divisions">Precision HVAC &amp; AHU Packages</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/divisions">Terminal HEPA &amp; ULPA Filtration</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/divisions">Dynamic Pass Boxes &amp; LAF Systems</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/divisions">DQ / IQ / OQ / PQ Validation Dossiers</Link></li>
            </ul>
          </div>

          {/* Col 3: Cleanroom Hardware */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-semibold text-xs text-[#16233F] uppercase tracking-wider mb-3">Hardware</h4>
            <ul className="text-xs space-y-2">
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/products">Dynamic Pass Boxes</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/products">Laminar Flow Benches</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/products">Gel-Seal HEPA Boxes</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/products">Air Showers</Link></li>
              <li><Link className="hover:text-[#1F56A8] transition-colors" to="/products">Double Flush Doors</Link></li>
            </ul>
          </div>

          {/* Col 4: Badges */}
          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-xs text-[#16233F] uppercase tracking-wider mb-3">Regulatory Compliance</h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">ISO 14644-1</span>
              <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">WHO-GMP</span>
              <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">EU ANNEX 1</span>
              <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">SCH-M READY</span>
            </div>
            <p className="text-[11px] text-[#5B6B82] leading-relaxed">
              Commissioned in compliance with CDSCO Revised Schedule M and global aseptic requirements.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5B6B82] gap-3">
          <p>© 2025 GMP VISION Turnkey Systems Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link className="hover:text-[#16233F] transition-colors" to="/about">About</Link>
            <Link className="hover:text-[#16233F] transition-colors" to="/about">Terms</Link>
            <Link className="hover:text-[#16233F] transition-colors" to="/divisions">Validation Dossiers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
