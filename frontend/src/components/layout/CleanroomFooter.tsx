import React from 'react';
import { Link } from 'react-router-dom';

export const CleanroomFooter: React.FC = () => {
  return (
    <footer className="bg-white text-[#5B6B82] py-8 border-t border-[#E4E9F1]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-6 border-b border-[#E4E9F1]">
          {/* Col 1: Brand Info & Quick Contact (4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-white p-0.5 flex items-center justify-center border border-[#E4E9F1] shadow-2xs">
                  <img
                    alt="GMP VISION Logo"
                    className="h-full w-full object-contain"
                    src="/logo.png"
                  />
                </div>
                <div>
                  <span className="font-display font-bold text-base text-[#16233F] tracking-tight block">GMP VISION</span>
                  <span className="text-[10px] font-mono text-[#1F56A8] uppercase tracking-wider block -mt-0.5 font-semibold">Turnkey Cleanroom &amp; MEP</span>
                </div>
              </div>
              <p className="text-xs text-[#5B6B82] leading-relaxed max-w-sm">
                Turnkey cleanroom HVAC/MEP contracting, sterile architectural envelopes, chemical piping &amp; Schedule M qualification.
              </p>
            </div>

            <div className="text-[11px] font-mono space-y-1 text-[#5B6B82] pt-1">
              <p className="flex items-center gap-1.5 truncate">
                <span className="material-symbols-outlined text-[13px] text-[#1F56A8] shrink-0">location_on</span>
                <span className="truncate">Bhanjal, Amb Daultpur Rd, Una, HP – 177213</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#1F56A8] shrink-0">phone</span>
                <span>+91 9817343117 / +91 9317343117</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[13px] text-[#1F56A8] shrink-0">mail</span>
                <span>info@gmpvision.com</span>
              </p>
            </div>
          </div>

          {/* Col 2: Engineering Divisions Directory in 2 compact columns (5 cols) */}
          <div className="md:col-span-5">
            <h4 className="font-display font-semibold text-xs text-[#16233F] uppercase tracking-wider mb-2.5">
              Turnkey Divisions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <ul className="space-y-1.5">
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Modular Walls &amp; Ceilings</Link></li>
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">HVAC &amp; AHU Packages</Link></li>
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Terminal HEPA &amp; ULPA</Link></li>
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Pass Boxes &amp; LAF Hoods</Link></li>
              </ul>
              <ul className="space-y-1.5">
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Electrical Contracting</Link></li>
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Chemical Process Piping</Link></li>
                <li><Link className="hover:text-[#1F56A8] transition-colors truncate block" to="/divisions">Validation Dossiers (DQ/IQ)</Link></li>
                <li><Link className="hover:text-emerald-600 transition-colors font-medium text-emerald-700 truncate block" to="/projects">Annual Maintenance (AMC)</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Regulatory Compliance Badges (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="font-display font-semibold text-xs text-[#16233F] uppercase tracking-wider mb-2.5">
                Regulatory Standards
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">ISO 14644-1</span>
                <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">WHO-GMP</span>
                <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">EU ANNEX 1</span>
                <span className="px-2 py-0.5 rounded bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold">SCH-M READY</span>
              </div>
              <p className="text-[11px] text-[#5B6B82] leading-relaxed">
                Full compliance validation for CDSCO Schedule M &amp; international regulatory audits.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F56A8] hover:underline"
              >
                <span>Request Project RFQ</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#5B6B82] gap-2">
          <p>© 2025 GMP VISION Turnkey Systems Pvt Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-[#16233F] transition-colors" to="/about">About Facility</Link>
            <Link className="hover:text-[#16233F] transition-colors" to="/divisions">Validation Protocols</Link>
            <Link className="hover:text-[#16233F] transition-colors" to="/admin/login">Admin Console</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
