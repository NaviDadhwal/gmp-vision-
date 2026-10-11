import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  X,
  ShieldCheck,
  Wrench,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Project } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

const FALLBACK_PROJECTS: Partial<Project>[] = [
  {
    _id: 'proj-biodeal',
    title: 'Sterile Injectables & Lyophilization Complex — Turnkey HVAC & AMC',
    slug: 'biodeal-pharmaceuticals-suite',
    client: 'Biodeal Pharmaceuticals Pvt. Ltd.',
    location: 'Nalagarh, Himachal Pradesh, India',
    division: 'Annual Maintenance Contracts (AMC)',
    isoClass: 'ISO Class 5 (Grade A) & Grade B Background',
    areaSqFt: 22000,
    completionDate: '2025-01 (Active AMC)',
    description: 'Turnkey cleanroom execution and ongoing multi-year Annual Maintenance Contract (AMC). Scope includes quarterly PAO/DOP in-situ HEPA filter leak scans, AHU chilled water balancing, and 24/7 emergency response.',
    images: ['/images/aseptic-filling-suite.jpg'],
    featured: true,
  },
  {
    _id: 'proj-rachil',
    title: 'Oral Solid Dosage & Liquid Formulation Cleanroom Complex',
    slug: 'rachil-remedies-cleanroom',
    client: 'Rachil Remedies Pvt. Ltd.',
    location: 'Baddi, Himachal Pradesh, India',
    division: 'Modular Cleanroom & HVAC',
    isoClass: 'ISO Class 7 (Grade C / Schedule M)',
    areaSqFt: 16500,
    completionDate: '2024-10',
    description: 'Modular PUF partition envelope, double-skin thermal-break AHUs, dynamic pass boxes, flush cleanroom swing doors, and complete DQ/IQ/OQ/PQ validation dossiers for cGMP formulation compliance.',
    images: ['/images/modular-cleanroom-interior.jpg'],
    featured: true,
  },
  {
    _id: 'proj-wallace',
    title: 'HVAC Turnkey, Terminal Filters, Cooling Coils & Routine AMC',
    slug: 'wallace-pharma-turnkey-amc',
    client: 'M/s Wallace Pharmaceuticals Pvt. Ltd.',
    location: 'Nalagarh, Himachal Pradesh, India',
    division: 'Annual Maintenance Contracts (AMC)',
    isoClass: 'ISO Class 6 (Grade B) Sterile Liquids',
    areaSqFt: 18500,
    completionDate: '2024-08 (Active AMC)',
    description: 'Comprehensive cleanroom HVAC turnkey engineering and Annual Maintenance Contract (AMC). Routine filter changeouts, coil pressure testing, air balancing, and Schedule M re-certification.',
    images: ['/images/terminal-hepa-module.jpg'],
    featured: true,
  },
  {
    _id: 'proj-sunpharma',
    title: 'Precision Air Handling Units & Multi-Stage Filtration Cascade',
    slug: 'sun-pharma-hvac-filtration',
    client: 'Sun Pharmaceutical Industries Ltd.',
    location: 'Paonta Sahib, Himachal Pradesh, India',
    division: 'HVAC & Biosafety Equipment',
    isoClass: 'ISO Class 5-8 cGMP Facility',
    areaSqFt: 28000,
    completionDate: '2024-04',
    description: 'Supply, ducting erection, and commissioning of psychrometric double-skin AHU packages with terminal fluid gel-seal H14 HEPA boxes and automated room pressure cascading.',
    images: ['/images/hvac-ahu-plant.jpg'],
    featured: true,
  },
  {
    _id: 'proj-cbhealth',
    title: 'Modular Cleanroom Envelopes & HVAC Air Handling Installation',
    slug: 'cb-healthcare-modular-cleanroom',
    client: 'CB Healthcare Pvt. Ltd.',
    location: 'Baddi, Himachal Pradesh, India',
    division: 'Modular Cleanroom & HVAC',
    isoClass: 'ISO Class 7 (Grade C / Schedule M)',
    areaSqFt: 13800,
    completionDate: '2024-02',
    description: 'Modular PUF partition walls, walk-on ceilings, flush viewing panels, interlocked cleanroom swing doors, and HEPA air distribution for healthcare formulations.',
    images: ['/images/modular-cleanroom-interior.jpg'],
    featured: false,
  },
  {
    _id: 'proj-sharika',
    title: 'Biotech Formulation & Sterile Biosafety Suite',
    slug: 'sharika-biotech-facility',
    client: 'Sharika Biotech Pvt. Ltd.',
    location: 'Kala Amb, Himachal Pradesh, India',
    division: 'HVAC & Biosafety Equipment',
    isoClass: 'ISO Class 6 (Grade B) Bioclean Suite',
    areaSqFt: 15000,
    completionDate: '2023-11',
    description: 'Bio-containment cleanroom execution with biosafety cabinets, vertical laminar airflow hoods, and exhaust HEPA filtration cascades.',
    images: ['/images/cleanroom-validation-testing.jpg'],
    featured: false,
  },
  {
    _id: 'proj-azantic',
    title: 'Dynamic Airlock & Sterile Material Transfer Cleanroom Installation',
    slug: 'azantic-biotech-cleanroom',
    client: 'M/s Azantic Bio Tech Private Limited',
    location: 'Nalagarh, Himachal Pradesh, India',
    division: 'Pass Boxes & Cleanroom Doors',
    isoClass: 'ISO Class 7 Clean Isolation Suite',
    areaSqFt: 11500,
    completionDate: '2023-09',
    description: 'SS 304 dynamic pass boxes, mist air showers, electromagnetic interlocked doors, and HEPA purges for cross-contamination prevention.',
    images: ['/images/terminal-hepa-module.jpg'],
    featured: false,
  },
  {
    _id: 'proj-mediwell-kimbal',
    title: 'Aseptic Cleanroom Upgradation & Annual Maintenance Contract',
    slug: 'mediwell-kimbal-cleanroom',
    client: 'Mediwell Laboratories & Kimbal Pharma',
    location: 'Solan / Nalagarh, Himachal Pradesh, India',
    division: 'Annual Maintenance Contracts (AMC)',
    isoClass: 'ISO Class 7 / Schedule M',
    areaSqFt: 12200,
    completionDate: '2023-06 (Active AMC)',
    description: 'Cleanroom envelope modernization, walk-on ceilings, AHU coil replacement, and continuous particle validation testing under comprehensive AMC contract.',
    images: ['/images/aseptic-filling-suite.jpg'],
    featured: false,
  },
  {
    _id: 'proj-electrical-substation',
    title: '11kV Substation, HT/LT Panels & Cleanroom Electrical Contracting',
    slug: 'turnkey-electrical-substation-contracting',
    client: 'Sterile Parenterals & API Formulation Plant',
    location: 'Baddi Industrial Area, Himachal Pradesh, India',
    division: 'Turnkey Electrical Contracting',
    isoClass: 'CEA / IS 732 / IEC 60364 Compliant',
    areaSqFt: 35000,
    completionDate: '2024-11',
    description: 'Complete turnkey electrical contracting including 11kV HT yard, 1500 kVA oil-cooled transformer installation, synchronized sandwich bus trunking (BBT), centralized PCC/MCC panels, flameproof switchgear, and IP65 flush teardrop cleanroom lighting network.',
    images: ['/images/electrical-switchgear-panel.jpg'],
    featured: true,
  },
  {
    _id: 'proj-chemical-process',
    title: 'High-Purity Chemical Transfer Loops & Hazardous Solvent Scrubbing Contract',
    slug: 'chemical-process-piping-scrubbing',
    client: 'Bulk Drug Active Pharmaceutical Ingredients (API) Facility',
    location: 'Nalagarh, Himachal Pradesh, India',
    division: 'Chemical Process & Specialized Utilities',
    isoClass: 'ASME B31.3 / ATEX Zone 1/21',
    areaSqFt: 24000,
    completionDate: '2024-07',
    description: 'Specialized chemical process turnkey execution: orbital-welded electro-polished SS 316L solvent delivery lines with double-containment, hazardous VOC fume extraction headers, multi-stage packed-bed wet scrubbers, and chemical-resistant conductive epoxy screed flooring.',
    images: ['/images/cleanroom-validation-testing.jpg'],
    featured: true,
  },
];

const DIV_FILTERS = [
  'All Divisions',
  'Annual Maintenance Contracts (AMC)',
  'Turnkey Electrical Contracting',
  'Chemical Process & Specialized Utilities',
  'Modular Cleanroom & HVAC',
  'HVAC & Biosafety Equipment',
  'Pass Boxes & Cleanroom Doors',
  'Turnkey Modular Cleanroom',
];

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Partial<Project>[]>(FALLBACK_PROJECTS);
  const [selectedDiv, setSelectedDiv] = useState<string>('All Divisions');
  const [activeModalProject, setActiveModalProject] = useState<Partial<Project> | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await ApiService.getProjects({ limit: 50 });
        if (res && res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        console.warn('Backend projects endpoint offline, rendering validated case studies fallback:', err);
      }
    }
    loadProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    return selectedDiv === 'All Divisions' || p.division === selectedDiv;
  });

  return (
    <div className="space-y-12 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-10 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label="PORTFOLIO & CASE STUDIES" variant="blue" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              PROVEN EXECUTION ACROSS 150+ PHARMA PLANTS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
                Turnkey Cleanroom Projects &amp; AMC Operations
              </h1>
              <p className="text-base text-brand-muted leading-relaxed">
                Explore our portfolio of completed sterile injectables, solid dosage, and biotech facilities,
                alongside turnkey electrical substations, chemical process piping contracts, and ongoing <strong>Annual Maintenance Contracts (AMC)</strong> keeping pharma manufacturing plants continuously audit-ready.
              </p>
            </div>

            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-3 rounded-md text-xs font-semibold shadow-hud shrink-0 transition-colors"
            >
              Discuss Your Facility / AMC
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Division Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DIV_FILTERS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedDiv(cat)}
              className={`px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedDiv === cat
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-white text-brand-navy border border-brand-border hover:bg-brand-soft'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2.5 AMC Lifecycle Support Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#16233F] via-[#1a2d52] to-[#1F56A8] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-[#1F56A8]/40 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-400/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ANNUAL MAINTENANCE CONTRACTS (AMC)
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white/90 text-[10px] font-mono">
                  ISO 14644-2 &amp; SCHEDULE M
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Comprehensive AMC Support For Operating Pharma Plants
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl">
                We provide ongoing multi-year Annual Maintenance Contracts (AMC) across Himachal Pradesh (Baddi, Nalagarh, Paonta Sahib) and pan-India. From routine HEPA filter replacements and PAO leak scanning to AHU motor overhauls and emergency response, we safeguard your sterile certification.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">AHU Preventive Servicing</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">Quarterly PAO/DOP Scans</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">24/7 Breakdown SLA</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/10 border border-white/15 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">Schedule M Dossiers</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/rfq?division=Annual%20Maintenance%20Contracts%20(AMC)"
                className="w-full text-center px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-display font-semibold text-xs tracking-wider uppercase shadow-md transition-colors"
              >
                Inquire For Plant AMC
              </Link>
              <button
                onClick={() => setSelectedDiv('Annual Maintenance Contracts (AMC)')}
                className="w-full text-center px-5 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white font-mono text-xs border border-white/20 transition-colors"
              >
                Filter AMC Projects ({projects.filter(p => p.division === 'Annual Maintenance Contracts (AMC)').length || 3})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => {
            const isAmc = proj.division === 'Annual Maintenance Contracts (AMC)' || proj.completionDate?.includes('AMC');
            return (
              <div
                key={proj._id || idx}
                onClick={() => setActiveModalProject(proj)}
                className={`bg-white rounded-xl border ${
                  isAmc ? 'border-emerald-500/40 hover:border-emerald-500' : 'border-brand-border hover:border-brand-primary/50'
                } shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group`}
              >
                <div>
                  {/* Visual Image Header */}
                  <div className="relative h-48 bg-brand-soft overflow-hidden">
                    <img
                      src={proj.images?.[0] || '/images/modular-cleanroom-interior.jpg'}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-brand-navy/90 text-white font-mono font-bold text-[11px] backdrop-blur-sm border border-white/20">
                        {proj.isoClass || 'ISO 14644-1'}
                      </span>
                      {isAmc && (
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono font-bold text-[10px] shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          AMC ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-brand-muted font-mono">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                        <span>{proj.location}</span>
                      </div>
                      <span className="text-[11px] text-brand-navy font-semibold">{proj.client}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-brand-navy group-hover:text-brand-primary transition-colors leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Telemetry Chips */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] font-mono">
                      {proj.areaSqFt && (
                        <span className="px-2 py-0.5 rounded bg-brand-soft border border-brand-border text-brand-navy">
                          Area: {proj.areaSqFt.toLocaleString()} sq.ft
                        </span>
                      )}
                      {proj.completionDate && (
                        <span className={`px-2 py-0.5 rounded border text-brand-navy ${isAmc ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-brand-soft border-brand-border'}`}>
                          {proj.completionDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-5 border-t border-brand-border/60 bg-white flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-primary group-hover:underline flex items-center gap-1">
                    View Full Case Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className={`text-[10px] font-mono font-bold ${isAmc ? 'text-emerald-600' : 'text-brand-green'}`}>
                    {isAmc ? 'AMC CONTRACT ACTIVE' : 'cGMP CERTIFIED'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Case Study Modal Inspector */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-brand-border shadow-2xl relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-soft hover:bg-brand-border text-brand-navy transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 bg-brand-soft">
              <img
                src={activeModalProject.images?.[0] || '/images/modular-cleanroom-interior.jpg'}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="px-2.5 py-1 rounded bg-brand-primary text-white text-xs font-mono font-bold">
                    {activeModalProject.isoClass}
                  </span>
                  <h3 className="text-xl font-bold">{activeModalProject.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-brand-soft border border-brand-border text-xs font-mono">
                <div>
                  <span className="text-brand-muted block">Location:</span>
                  <span className="font-bold text-brand-navy">{activeModalProject.location}</span>
                </div>
                <div>
                  <span className="text-brand-muted block">Floor Area:</span>
                  <span className="font-bold text-brand-navy">
                    {activeModalProject.areaSqFt?.toLocaleString()} sq.ft
                  </span>
                </div>
                <div>
                  <span className="text-brand-muted block">Division:</span>
                  <span className="font-bold text-brand-navy">{activeModalProject.division}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider font-mono">
                  Engineering Scope & Execution Summary
                </h4>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {activeModalProject.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-brand-navy uppercase tracking-wider font-mono">
                  Regulatory Compliance Achieved
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['ISO 14644-1 Compliant', 'WHO-GMP Schedule M', 'EU cGMP Annex 1', 'US FDA 21 CFR Part 211'].map((reg, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-brand-soft border border-brand-border text-xs font-mono text-brand-navy flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                      {reg}
                    </span>
                  ))}
                </div>
              </div>

              {(activeModalProject.division === 'Annual Maintenance Contracts (AMC)' || activeModalProject.completionDate?.includes('AMC')) && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 font-mono uppercase">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Annual Maintenance Contract (AMC) SLA Commitments</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] text-emerald-800">
                    <li>• Routine quarterly in-situ PAO HEPA leak tests</li>
                    <li>• Preventive AHU belt, bearing &amp; coil servicing</li>
                    <li>• Dynamic room pressure cascade re-balancing</li>
                    <li>• Guaranteed 24-hour on-site breakdown response</li>
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-md text-xs font-semibold bg-brand-soft text-brand-navy hover:bg-brand-border"
                >
                  Close
                </button>
                <Link
                  to={`/rfq?project=${activeModalProject.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-xs font-semibold bg-brand-primary hover:bg-brand-primaryHover text-white shadow-hud"
                >
                  Request Similar Project Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
