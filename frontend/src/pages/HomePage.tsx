import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { JsonLd, GLOBAL_ORGANIZATION_SCHEMA } from '../components/seo/JsonLd';
import { ComplianceBar } from '../components/ui/ComplianceBar';
import { GMPModernHero } from '../components/ui/gmp-modern-hero';
import { DIVISIONS_DATA } from '../data/divisions';
import { FILTRATION_CATALOG } from '../data/filters';
import { CLIENTS_DATA } from '../data/clients';
import { SITE_SETTINGS } from '../data/settings';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, ShieldCheck, Award, Layers, Wind, Droplets, Activity, Zap, Cpu } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';
import { getClientLogo } from '../components/common/ClientLogos';

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers size={24} />,
  Wind: <Wind size={24} />,
  ShieldCheck: <ShieldCheck size={24} />,
  Activity: <Activity size={24} />,
  Droplets: <Droplets size={24} />,
  Zap: <Zap size={24} />,
  Cpu: <Cpu size={24} />,
};

export const HomePage: React.FC = () => {
  const [filterTab, setFilterTab] = useState<'pre-filter' | 'fine-filter' | 'pocket-bag' | 'gel-seal-hepa'>('gel-seal-hepa');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Consultation & URS',
      desc: 'Deep technical review of User Requirement Specifications (URS), cleanroom ISO classifications, and process equipment heat loads.',
    },
    {
      num: '02',
      title: '3D Layout & Heat Load',
      desc: 'CAD 3D architectural panel layout, duct routing modeling, and psychrometric CFM calculations based on ISHRAE guidelines.',
    },
    {
      num: '03',
      title: 'In-House Fabrication',
      desc: 'Precision manufacturing of Double Skin AHUs, desiccant rotors, SMACNA GI ducting, and SS 304 terminal housings at our Nalagarh facility.',
    },
    {
      num: '04',
      title: 'Installation & Piping',
      desc: 'On-site erection of PUF modular panels, walk-on ceilings, sanitary orbital welded process loops, and electrical power skids.',
    },
    {
      num: '05',
      title: 'Testing & Balancing',
      desc: 'Comprehensive air balancing, air changes per hour (ACPH) verification, room-to-room pressure cascading, and velocity mapping.',
    },
    {
      num: '06',
      title: 'IQ/OQ/PQ Validation',
      desc: 'In-situ DOP/PAO HEPA integrity testing, airborne particle counts, and full GDP-compliant qualification documentation for audits.',
    },
  ];

  const featuredFilters = FILTRATION_CATALOG.filter((f) =>
    ['pre-filter', 'fine-filter', 'pocket-bag', 'gel-seal-hepa'].includes(f.category)
  );

  const selectedFilter = featuredFilters.find((f) => f.category === filterTab) || featuredFilters[0];

  return (
    <div className="bg-[#000000] text-white selection:bg-white selection:text-black">
      <SEOHead
        title="Turnkey Cleanroom (CRP), HVAC & MEP Contractor"
        description="GMP VISION: Single-source Turnkey Engineering, Cleanroom (CRP), HVAC Air Handling, Air Filtration, Process Piping, and 21 CFR Part 11 Validation Services."
        canonicalPath="/"
      />
      <JsonLd schema={GLOBAL_ORGANIZATION_SCHEMA} />

      {/* 1. 21ST.DEV HIGH CONTRAST OBSIDIAN HERO */}
      <GMPModernHero />

      {/* 2. METRICS TICKER BAR */}
      <div className="ticker-wrap border-y border-white/[0.08] bg-[#050505]">
        <div className="ticker-content">
          {[...SITE_SETTINGS.tickerMetrics, ...SITE_SETTINGS.tickerMetrics].map((m, idx) => (
            <div key={idx} className="ticker-item text-neutral-300 font-mono text-xs">
              <Award size={14} className="text-[#3DAE2B]" />
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 7 TURNKEY DIVISIONS BENTO GRID */}
      <section className="section-padding bg-[#000000] border-b border-white/[0.08]">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs text-neutral-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3DAE2B]" />
              <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-300">Unified Turnkey EPC Model</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              7 Integrated Engineering Divisions
            </h2>
            <p className="text-neutral-400 text-base leading-relaxed">
              Unlike fragmented subcontractors, GMP VISION handles architectural cleanroom envelope, double-skin HVAC, HEPA filtration, and cGMP validation under one unified engineering SLA.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
            {DIVISIONS_DATA.map((div) => (
              <div 
                key={div.id} 
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-xl bg-[#0A0A0A] border border-white/[0.08] transition-all hover:border-white/[0.2] hover:bg-[#0E0E0E] hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="h-11 w-11 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#38BDF8] group-hover:text-[#3DAE2B] transition-colors">
                      {ICON_MAP[div.iconName] || <Layers size={22} />}
                    </div>
                    <span className="font-mono text-xs tracking-widest text-neutral-600 group-hover:text-neutral-400 transition-colors">
                      0{div.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-medium text-white mb-1.5 tracking-tight">
                    {div.title}
                  </h3>

                  <div className="text-xs font-mono font-medium text-[#3DAE2B] mb-3">
                    {div.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                    {div.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {div.standards.map((st, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-neutral-300"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/solutions/${div.slug}`}
                  className="flex items-center justify-between text-xs font-semibold text-white pt-4 border-t border-white/[0.08] group-hover:text-[#3DAE2B] transition-colors mt-auto"
                >
                  <span>Explore Technical Specifications</span>
                  <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-[#3DAE2B] transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE BADGE BAR */}
      <div className="bg-[#050505] border-b border-white/[0.08]">
        <ComplianceBar />
      </div>

      {/* 5. INTERACTIVE AIR FILTRATION CATALOG PREVIEW */}
      <section className="section-padding bg-[#050505] border-b border-white/[0.08]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-neutral-400 mb-2">
                <span className="text-[#38BDF8]">Division 03</span>
                <span>Air Filtration Plant</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mb-2">
                Cleanroom Air Filtration Systems
              </h2>
              <p className="text-neutral-400 text-sm max-w-xl">
                Manufactured to EN 1822 & ISO 29463 standards. From washable 10µ pre-filtration to 99.997% H14 Gel-Seal HEPA modules.
              </p>
            </div>

            <Link 
              to="/solutions/air-filtration" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.12] bg-white/[0.03] text-xs font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              <span>View Full Filter Catalog</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Filter Category Tabs - Linear Style Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {[
              { key: 'gel-seal-hepa', label: 'Mini Pleat Gel-Seal HEPA (H13/H14)' },
              { key: 'pocket-bag', label: 'Multi-Pocket Synthetic Bags' },
              { key: 'fine-filter', label: 'Micro-Fiber Fine Filters (1µ-5µ)' },
              { key: 'pre-filter', label: 'Washable Primary Pre-Filters (10µ)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterTab(tab.key as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  filterTab === tab.key
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'bg-white/[0.03] border border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Filter Spec Card - Bento Panel */}
          {selectedFilter && (
            <div className="rounded-2xl border border-white/[0.1] bg-[#0A0A0A] p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#3DAE2B]/10 text-[#3DAE2B] border border-[#3DAE2B]/30">
                      {selectedFilter.efficiency}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      Micron Rating: <strong className="text-white">{selectedFilter.micronRating}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium text-white mb-2 tracking-tight">
                    {selectedFilter.name}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-xs text-neutral-300 font-mono mb-4">
                    <ShieldCheck size={14} className="text-[#3DAE2B]" />
                    <span>{selectedFilter.keyFeature}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5">
                    {selectedFilter.mediaConstruction}
                  </p>

                  <div className="mb-6">
                    <span className="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                      Cleanroom Application Zones:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFilter.applications.map((app, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-neutral-300">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link 
                      to="/solutions/air-filtration" 
                      className="px-5 py-2.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-sm"
                    >
                      Filter Specs & Technical Cut Sheets
                    </Link>
                    <button
                      onClick={() => initiateWhatsAppInquiry({ topic: `Filter Inquiry: ${selectedFilter.name}` })}
                      className="px-5 py-2.5 rounded-lg border border-white/[0.15] bg-transparent text-white text-xs font-medium hover:bg-white/[0.06] transition-colors"
                    >
                      Instant WhatsApp Quote
                    </button>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#050505]">
                  <img
                    src={selectedFilter.image}
                    alt={selectedFilter.name}
                    className="w-full h-64 sm:h-80 object-cover opacity-85 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. TURNKEY WORKFLOW (CONCEPT TO COMMISSIONING) */}
      <section className="section-padding bg-[#000000] border-b border-white/[0.08]">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#3DAE2B] font-semibold">
              Stage-Gated Project Delivery
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mt-2 mb-3">
              Concept to Regulatory Validation
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Standard operating workflow ensuring HVAC air balancing, cascaded pressure differentials, and GDP qualification are met on time.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-6 rounded-xl border transition-all cursor-pointer ${
                  activeWorkflowStep === idx 
                    ? 'bg-[#0E0E0E] border-[#3DAE2B]/60 shadow-lg shadow-[#3DAE2B]/5' 
                    : 'bg-[#0A0A0A] border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-xl font-bold text-neutral-400">
                    {step.num}
                  </span>
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-mono ${
                    activeWorkflowStep === idx ? 'bg-[#3DAE2B] text-black font-bold' : 'bg-white/[0.06] text-neutral-500'
                  }`}>
                    ✓
                  </div>
                </div>

                <h3 className="text-base font-medium text-white mb-2 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CLIENT PORTFOLIO SHOWCASE */}
      <section className="section-padding bg-[#050505] border-b border-white/[0.08]">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8] font-semibold">
              100+ Turnkey Plant Installations
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mt-2 mb-3">
              Trusted by Pharmaceutical Leaders
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Delivering ISO Class 5 to Class 8 facilities across Baddi, Nalagarh, Paonta Sahib, Dera Bassi, Ahmedabad, and Hyderabad.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 lg-grid-cols-3 md-grid-cols-2 sm-grid-cols-1">
            {CLIENTS_DATA.map((client) => (
              <div
                key={client.id}
                className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.08] flex flex-col justify-between items-center min-h-[120px] transition-all hover:border-white/[0.2] hover:bg-[#0E0E0E]"
              >
                <div className="h-10 flex items-center justify-center w-full">
                  {getClientLogo(client.name, 32)}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 border-t border-white/[0.06] pt-2 w-full text-center mt-3 truncate">
                  <span className="text-neutral-200">{client.sector}</span> • {client.location}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              to="/projects" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.12] bg-white/[0.03] text-xs font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              <span>Explore All Plant Case Studies</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ABBREVIATED QUICK RFQ ESTIMATOR - BENTO CARD */}
      <section className="section-padding bg-[#000000]">
        <div className="container">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/[0.12] bg-[#0A0A0A] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0A3B85] via-[#3DAE2B] to-[#38BDF8]" />
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1 text-xs text-neutral-400 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#3DAE2B] animate-pulse" />
              <span>4-Hour Engineering Turnaround</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-white mb-3">
              Request Technical Proposal & BOQ Estimate
            </h2>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto mb-8">
              Submit your room dimensions, required ISO cleanroom class, or equipment load. Our design engineers will generate preliminary CFM sizing and budgetary BOQ.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link 
                to="/rfq" 
                className="w-full sm:w-auto h-11 px-8 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <span>Launch Turnkey Quote Builder</span>
                <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => initiateWhatsAppInquiry({ topic: 'Direct Homepage RFQ Inquire' })}
                className="w-full sm:w-auto h-11 px-6 rounded-lg border border-white/[0.15] bg-transparent text-white text-xs font-medium hover:bg-white/[0.06] transition-colors"
              >
                Chat on WhatsApp Hotline
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
