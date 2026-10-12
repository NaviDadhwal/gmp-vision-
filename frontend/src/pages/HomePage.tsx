import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../lib/api/endpoints';
import { CLIENT_LOGOS } from '../data/clientLogos';

interface TrustMetric {
  value: string;
  suffix?: string;
  title: string;
  icon: string;
}

const TRUST_METRICS: TrustMetric[] = [
  { value: '20', suffix: '+', title: 'Years Experience', icon: 'history' },
  { value: '10+', suffix: '+', title: 'Projects Completed', icon: 'domain' },
  { value: '180', suffix: '+', title: 'Pharma Clients', icon: 'groups' },
  { value: '1.5M', suffix: '+', title: 'Sq.Ft Commissioned', icon: 'straighten' },
];

interface CoreDivisionCard {
  id: string;
  category: string;
  title: string;
  desc: string;
  href: string;
  linkText: string;
  icon: string;
}

const CORE_DIVISIONS: CoreDivisionCard[] = [
  {
    id: '01',
    category: 'ENVELOPE ISOLATION',
    title: 'Modular Wall & Walk-on Ceilings',
    desc: '50mm & 80mm PUF/Rockwool panels, flush silicone joints, and antimicrobial PPGI skins.',
    href: '/divisions',
    linkText: 'View Panels',
    icon: 'domain_verification',
  },
  {
    id: '02',
    category: 'HVAC & DEHUMIDIFICATION',
    title: 'Psychrometric AHU Packages',
    desc: 'Thermal break double-skin air handlers, desiccant rotors, and 5K–45K CFM cascade ducting.',
    href: '/divisions',
    linkText: 'AHU Specs',
    icon: 'hvac',
  },
  {
    id: '03',
    category: 'STERILE AIRFLOW',
    title: 'Dynamic Pass Boxes & LAF Units',
    desc: 'SS 304 interlocked chambers, laminar hoods, mist showers, and UV sterilization timers.',
    href: '/products',
    linkText: 'View Equipment',
    icon: 'air',
  },
  {
    id: '07',
    category: 'REGULATORY COMPLIANCE',
    title: 'DQ / IQ / OQ / PQ Validation Dossiers',
    desc: 'Full particle count mapping, recovery tests, and Schedule M validation packages for audits.',
    href: '#rfq-section',
    linkText: 'Audit Protocols',
    icon: 'verified_user',
  },
];

interface HardwareComponent {
  sku: string;
  name: string;
  img: string;
  specs: [string, string][];
}

const PRECISION_COMPONENTS: HardwareComponent[] = [
  {
    sku: 'SKU-MP50',
    name: 'cGMP Modular Wall Panels',
    img: '/images/modular-cleanroom-interior.jpg',
    specs: [
      ['Core Density:', '40 kg/m³ PUF'],
      ['Thickness:', '50 / 80 / 100mm'],
    ],
  },
  {
    sku: 'SKU-DPB304',
    name: 'Dynamic Pass Box Unit',
    img: '/images/aseptic-filling-suite.jpg',
    specs: [
      ['Filtration:', '0.3µm @ 99.997%'],
      ['Interlock:', 'Electro-magnetic'],
    ],
  },
  {
    sku: 'SKU-AHU45',
    name: 'Double-Skin Air Handling Unit',
    img: '/images/hvac-ahu-plant.jpg',
    specs: [
      ['Air Volume:', '5,000–45,000 CFM'],
      ['Thermal Break:', 'TB2 Profile'],
    ],
  },
  {
    sku: 'SKU-HEPA-H14',
    name: 'Gel-Seal Terminal HEPA Box',
    img: '/images/terminal-hepa-module.jpg',
    specs: [
      ['Efficiency:', 'EN 1822 H14'],
      ['Seal Type:', 'Knife-Edge Gel'],
    ],
  },
];

interface CaseStudy {
  client: string;
  location: string;
  area: string;
  title: string;
  sub: string;
  desc: string;
  img: string;
  badge: string;
  badgeIcon: string;
  status: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Wallace Pharmaceuticals Pvt. Ltd.',
    location: 'NALAGARH, HP',
    area: '18,500 SQ.FT',
    title: 'Wallace Pharmaceuticals Pvt. Ltd.',
    sub: 'HVAC Turnkey, Filters & Coils — Active AMC',
    desc: '24,000 CFM modular AHUs, cooling coil pressure testing, terminal HEPA filtration, and ongoing Annual Maintenance Contract (AMC).',
    img: '/images/hvac-ahu-plant.jpg',
    badge: 'Turnkey + AMC Active',
    badgeIcon: 'verified',
    status: 'Completed & Active AMC',
  },
  {
    client: 'Biodeal Pharmaceuticals Pvt. Ltd.',
    location: 'NALAGARH, HP',
    area: '22,000 SQ.FT',
    title: 'Biodeal Pharmaceuticals Pvt. Ltd.',
    sub: 'Sterile Injectables Suite — Turnkey & Routine AMC',
    desc: 'Turnkey cleanroom execution and multi-year Annual Maintenance Contract (AMC). Quarterly PAO/DOP HEPA filter integrity scans and room balancing.',
    img: '/images/aseptic-filling-suite.jpg',
    badge: 'Active AMC Contract',
    badgeIcon: 'check_circle',
    status: '2025 Active AMC',
  },
  {
    client: 'Rachil Remedies Pvt. Ltd.',
    location: 'BADDI, HP',
    area: '16,500 SQ.FT',
    title: 'Rachil Remedies Pvt. Ltd.',
    sub: 'Solid Dosage & Liquid Cleanroom Complex',
    desc: 'Modular PUF wall envelope, double-skin thermal-break AHUs, dynamic pass boxes, flush cleanroom swing doors, and complete cGMP validation.',
    img: '/images/modular-cleanroom-interior.jpg',
    badge: 'Schedule M Passed',
    badgeIcon: 'check_circle',
    status: 'Completed 2024',
  },
];

interface FiltrationStage {
  stage: string;
  name: string;
  desc: string;
  standard: string;
  isTerminal?: boolean;
}

const FILTRATION_STAGES: FiltrationStage[] = [
  {
    stage: 'STAGE 01 • PRE-FILTER',
    name: 'Primary Coarse G4',
    desc: '10µm - 20µm capture protecting AHU blowers.',
    standard: 'EN 779 G4 (90% Arrestance)',
  },
  {
    stage: 'STAGE 02 • INTERMEDIATE',
    name: 'Fine Bag Filters F7-F9',
    desc: '3µm - 5µm atmospheric dust pre-HEPA strip.',
    standard: 'EN 779 F9 (85-95%)',
  },
  {
    stage: 'STAGE 03 • TERMINAL HEPA',
    name: 'Gel-Seal Mini-Pleat H14',
    desc: '0.3µm sterile core barrier with zero bypass.',
    standard: 'EN 1822 H14 (99.997%)',
    isTerminal: true,
  },
  {
    stage: 'STAGE 04 • STERILE CORE',
    name: 'Ultra-Low ULPA U15',
    desc: '0.12µm injectable filling line isolation.',
    standard: 'EN 1822 U15 (99.9995%)',
    isTerminal: true,
  },
];

export const HomePage: React.FC = () => {
  const equipRailRef = useRef<HTMLDivElement>(null);

  // RFQ Form state
  const [rfqName, setRfqName] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqFacility, setRfqFacility] = useState('');
  const [rfqGrade, setRfqGrade] = useState('ISO Class 7 / Grade C');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrollRail = (direction: 'left' | 'right') => {
    if (equipRailRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      equipRailRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await ApiService.submitLead({
        contactName: rfqName,
        phone: rfqPhone,
        companyName: rfqFacility ? `Facility Area: ${rfqFacility} sq.ft` : 'Direct RFQ',
        message: `Inquiry for ${rfqGrade}. Estimated cleanroom area: ${rfqFacility || 'Not specified'} sq.ft.`,
        source: 'rfq_form',
      });
    } catch (err: any) {
      console.warn('Backend unavailable, showing offline confirmation:', err);
    } finally {
      setSubmitted(true);
      setSubmitting(false);
      setRfqName('');
      setRfqPhone('');
      setRfqFacility('');
      setTimeout(() => {
        setSubmitted(false);
      }, 8000);
    }
  };

  return (
    <div className="bg-white text-[#16233F] antialiased selection:bg-[#1F56A8]/10 selection:text-[#1F56A8]">
      {/* 2. HERO SECTION: IMMERSIVE PHOTOGRAPHIC SHOWCASE */}
      <section className="relative overflow-hidden py-12 lg:py-20 border-b border-[#E4E9F1] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Text & Actions */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F9FC] border border-[#E4E9F1] text-[#1F56A8] text-xs font-mono font-medium mb-5 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F56A8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F56A8]"></span>
                </span>
                <span className="tracking-wide">TURNKEY PHARMA CLEANROOM &amp; HVAC</span>
              </div>
              <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[52px] text-[#16233F] tracking-tight leading-[1.1] mb-5">
                Engineering <span className="text-[#1F56A8]">Sterile Environments</span>
              </h1>
              <p className="text-base text-[#5B6B82] leading-relaxed max-w-lg mb-8">
                High-containment cleanroom envelopes, psychrometric AHU air systems, and certified sterile filtration cascades compliant with EU GMP Annex 1 and Revised Schedule M.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-8 w-full sm:w-auto">
                <a
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1F56A8] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-[#16233F] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
                  href="#rfq-section"
                >
                  <span>Request Project Sizing</span>
                  <span className="material-symbols-outlined text-[15px] font-bold transition-transform duration-200 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#F7F9FC] text-[#16233F] border border-[#E4E9F1] font-display font-semibold text-xs tracking-wider uppercase hover:bg-white hover:border-[#1F56A8]/40 active:scale-[0.98] transition-all duration-200"
                  href="#projects"
                >
                  <span>View Case Studies</span>
                </a>
              </div>
              {/* Animated Engineering Mouse-Pill Scroll Indicator */}
              <div className="pt-2 flex items-center gap-3 text-[#5B6B82] select-none">
                <a className="group flex items-center gap-3 cursor-pointer" href="#divisions">
                  <div className="w-5 h-8 rounded-full border border-[#737783]/40 bg-white/60 flex items-start justify-center p-1 group-hover:border-[#1F56A8] transition-colors">
                    <div className="w-1 h-2 rounded-full bg-[#1F56A8] animate-scroll-wheel"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest font-semibold uppercase text-[#5B6B82] group-hover:text-[#1F56A8] transition-colors flex items-center gap-1">
                      EXPLORE ENGINEERING
                      <span className="material-symbols-outlined text-xs animate-bounce group-hover:text-[#1F56A8]">
                        expand_more
                      </span>
                    </span>
                    <span className="text-[9px] font-mono text-[#737783]">Scroll to inspect capabilities</span>
                  </div>
                </a>
              </div>
            </div>
            {/* Right Visual: High-Fidelity Cleanroom Photo Container with Floating Glass Badges */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-[#E4E9F1] bg-[#F7F9FC] shadow-lg group">
                <img
                  alt="Modern sterile cleanroom interior with modular panels and dynamic pass box"
                  className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  src="/images/modular-cleanroom-interior.jpg"
                />
                {/* Top Overlay Bar with Telemetry Status Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-[#E4E9F1] shadow-sm flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#16233F] uppercase tracking-wider">
                      ISO Class 5 Certified
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-[#E4E9F1] shadow-sm flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                    </span>
                    <span className="material-symbols-outlined text-[#25D366] text-sm font-bold">verified</span>
                    <span className="text-[11px] font-mono font-semibold text-[#16233F]">Schedule M Ready</span>
                  </div>
                </div>
                {/* Bottom Overlay Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#E4E9F1] shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#1F56A8] font-semibold block">
                      Aseptic Process Suite
                    </span>
                    <span className="text-xs font-semibold text-[#16233F]">
                      Modular flush PUF walls &amp; integrated magnetic airlock transfer
                    </span>
                  </div>
                  <a
                    className="shrink-0 ml-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1F56A8] hover:text-[#16233F] font-mono transition-transform duration-200 hover:translate-x-0.5"
                    href="#projects"
                  >
                    <span>Explore</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST METRICS BAR WITH SMOOTH HOVER LIFT */}
      <section className="relative bg-[#F7F9FC] border-b border-[#E4E9F1] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4">
            {TRUST_METRICS.map((metric) => (
              <div
                key={metric.title}
                className="p-4 rounded-xl bg-white border border-[#E4E9F1] flex items-center gap-3.5 shadow-xs hover:-translate-y-1 hover:shadow-lg hover:border-[#1F56A8]/40 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-lg bg-[#F7F9FC] border border-[#E4E9F1] text-[#1F56A8] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#1F56A8] group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-xl">{metric.icon}</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5 leading-none mb-1">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#16233F] tracking-tight">
                      {metric.value}
                    </span>
                    {metric.suffix && (
                      <span className="font-display font-extrabold text-xl text-[#1F56A8]">
                        {metric.suffix}
                      </span>
                    )}
                  </div>
                  <span className="font-display font-medium text-[11px] sm:text-xs text-[#5B6B82] uppercase tracking-wider block">
                    {metric.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISUAL DIVISIONS SHOWCASE: IMAGE-DRIVEN BENTO GRID */}
      <section className="py-20 border-b border-[#E4E9F1] bg-white" id="divisions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-[#1F56A8] tracking-widest block mb-1.5">
                // CAPABILITIES BENTO
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#16233F] tracking-tight">
                Turnkey Engineering Divisions
              </h2>
            </div>
            <p className="text-sm text-[#5B6B82] max-w-sm">
              High-precision architectural envelopes, MEP psychrometrics, electrical substations, and certified chemical process cascades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {/* Bento 1: Central Plant Utilities & Primary MEP */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E4E9F1] bg-[#16233F] relative group shadow-sm hover:shadow-xl hover:border-[#1F56A8]/40 transition-all duration-300 flex flex-col justify-between min-h-[460px]">
              <img
                alt="Pharmaceutical Plant Utilities: Electrical Transformer, Diesel Engine DG Set, Air Compressor, and Steam Boiler"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                src="/images/plant-utilities-equipment.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16233F] via-[#16233F]/75 to-[#16233F]/40 pointer-events-none"></div>

              <div className="relative z-10 p-5 sm:p-6 flex flex-wrap justify-between items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#1F56A8] uppercase tracking-wider shadow-xs">
                  DIVISION 05 • PLANT UTILITIES &amp; MEP
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#1F56A8] text-[10px] font-mono font-bold text-white shadow-xs">
                  24/7 CONTINUOUS OPERATION
                </span>
              </div>

              <div className="relative z-20 px-6 py-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span>Primary Utilities (Transformer • DG Set • Compressor • Boiler)</span>
                </div>
              </div>

              <div className="relative z-10 p-5 sm:p-6 text-white">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                  Central Plant Utilities &amp; Primary MEP
                </h3>
                <p className="text-xs text-white/90 mb-3.5 leading-relaxed">
                  Heavy electromechanical plant utility packages engineered for uninterruptible cleanroom power, instrument-grade compressed air, and sterile clean process steam.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-white border border-white/20">
                    IEEE / IS 2026 Distribution
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-white border border-white/20">
                    CPCB-IV+ Silent DG Sets
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-white border border-white/20">
                    ISO 8573-1 Class 0 Air
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F56A8]/40 text-blue-200 border border-blue-400/40">
                    IBR / ASME Steam Boilers
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 mb-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 font-bold block mb-1">
                    Engineering Highlights:
                  </span>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>11kV/433V step-down substation transformer with copper windings &amp; bus ducts</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>Acoustic silent diesel engine (DG set) with automated AMF changeover synchronization</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>Oil-free rotary screw air compressor with vertical receiver tank &amp; desiccant dryer</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>Skid-mounted industrial steam boiler with modulating burner &amp; sterile steam piping</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white hover:text-white/90 transition-colors font-display"
                    href="/divisions"
                  >
                    <span>Utilities Infrastructure</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1.5 transition-transform duration-200">
                      arrow_forward
                    </span>
                  </a>
                  <a
                    href="#rfq-section"
                    className="text-[11px] font-mono uppercase tracking-wider text-blue-300 hover:text-white transition-colors"
                  >
                    Request Utilities Quote ➔
                  </a>
                </div>
              </div>
            </div>

            {/* Bento 2: Air Filtration & Terminal HEPA Units */}
            <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#E4E9F1] bg-[#16233F] relative group shadow-sm hover:shadow-xl hover:border-[#1F56A8]/40 transition-all duration-300 flex flex-col justify-between min-h-[460px]">
              <img
                alt="Terminal HEPA filter gel seal installation and particle counter probe testing"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                src="/images/terminal-hepa-module.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16233F] via-[#16233F]/75 to-[#16233F]/40 pointer-events-none"></div>

              <div className="relative z-10 p-5 sm:p-6 flex flex-wrap justify-between items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-[#1F56A8] uppercase tracking-wider shadow-xs">
                  DIVISION 04 • AIR FILTRATION
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#1F56A8] text-[10px] font-mono font-bold text-white shadow-xs">
                  MPPS &gt; 99.9995%
                </span>
              </div>

              <div className="relative z-20 px-6 py-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span>Terminal Gel-Seal HEPA (Individual Scan Tested)</span>
                </div>
              </div>

              <div className="relative z-10 p-5 sm:p-6 text-white">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 leading-tight">
                  Air Filtration &amp; Terminal HEPA Units
                </h3>
                <p className="text-xs text-white/90 mb-3.5 leading-relaxed">
                  Comprehensive filtration from G3 pre-filters to H14 terminal gel-seal HEPA modules and U15 ULPA units with MPPS efficiency exceeding 99.9995%.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-white border border-white/20">
                    EN 1822:2019 Certified
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-white border border-white/20">
                    ISO 29463 Compliant
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F56A8]/40 text-blue-200 border border-blue-400/40">
                    Individual Leak Tested
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 mb-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/70 font-bold block mb-1">
                    Engineering Highlights:
                  </span>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>G3/G4 synthetic washable pre-filters in aluminum frames</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>F7/F9 deep-pleat and pocket micro-fiber synthetic fine filters</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[11px] text-white/95">
                    <span className="material-symbols-outlined text-[14px] text-blue-400 shrink-0 mt-0.5">check_circle</span>
                    <span>H13/H14 mini-pleat HEPA filters with fluid gel or polyurethane seals</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white hover:text-white/90 transition-colors font-display"
                    href="/filters"
                  >
                    <span>Filtration Protocols</span>
                    <span className="material-symbols-outlined text-[15px] group-hover:translate-x-1.5 transition-transform duration-200">
                      arrow_forward
                    </span>
                  </a>
                  <a
                    href="#rfq-section"
                    className="text-[11px] font-mono uppercase tracking-wider text-blue-300 hover:text-white transition-colors"
                  >
                    Request Filter Quote ➔
                  </a>
                </div>
              </div>
            </div>

            {/* Bento Row 2: 4 Core Turnkey Engineering Divisions */}
            {CORE_DIVISIONS.map((div) => (
              <div
                key={div.id}
                className="col-span-1 md:col-span-1 lg:col-span-3 rounded-2xl p-6 bg-[#F7F9FC] border border-[#E4E9F1] hover:border-[#1F56A8] hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E9F1] text-[#1F56A8] flex items-center justify-center group-hover:bg-[#1F56A8] group-hover:text-white transition-colors duration-300 shadow-xs">
                      <span className="material-symbols-outlined text-xl">{div.icon}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#5B6B82] group-hover:text-[#1F56A8] transition-colors">
                      {div.id}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#1F56A8] font-bold uppercase tracking-wider block mb-1">
                    {div.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-[#16233F] mb-2 group-hover:text-[#1F56A8] transition-colors">
                    {div.title}
                  </h4>
                  <p className="text-xs text-[#5B6B82] leading-relaxed">
                    {div.desc}
                  </p>
                </div>
                <a
                  className="mt-6 inline-flex items-center gap-1 text-xs font-semibold uppercase text-[#1F56A8] group-hover:text-[#16233F] transition-colors font-display"
                  href={div.href}
                >
                  <span>{div.linkText}</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1.5 transition-transform duration-200">
                    arrow_forward
                  </span>
                </a>
              </div>
            ))}

            {/* Bento Row 3: Turnkey Electrical & Chemical Process Contracts */}
            <div className="col-span-1 md:col-span-1 lg:col-span-6 rounded-2xl p-6 sm:p-7 bg-[#F7F9FC] border border-[#E4E9F1] hover:border-[#1F56A8] hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E9F1] text-[#1F56A8] flex items-center justify-center group-hover:bg-[#1F56A8] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <span className="material-symbols-outlined text-xl">electric_bolt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1F56A8]/10 text-[#1F56A8] border border-[#1F56A8]/20">
                      TURNKEY CONTRACT
                    </span>
                    <span className="text-xs font-mono font-bold text-[#5B6B82] group-hover:text-[#1F56A8] transition-colors">
                      08
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#1F56A8] font-bold uppercase tracking-wider block mb-1">
                  HT/LT POWER DISTRIBUTION &amp; CLEANROOM ELECTRIFICATION
                </span>
                <h4 className="font-display font-bold text-xl text-[#16233F] mb-2 group-hover:text-[#1F56A8] transition-colors">
                  Turnkey Electrical Contracting &amp; HT/LT Substations
                </h4>
                <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                  Full-scope pharmaceutical electrical contracting: 11kV/33kV indoor/outdoor substations, power transformers, motorized sandwich bus trunking (BBT), PCC/MCC panels, flameproof (FLP / Ex-d) switchgear, IP65 flush teardrop cleanroom lighting, and automated BMS synchronization.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    IS 732 / IEC 60364
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    11kV Substations &amp; Bus Ducts
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    IP65 Flush Cleanroom LEDs
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F56A8]/10 text-[#1F56A8] border border-[#1F56A8]/30">
                    Flameproof Ex-d Rated
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E4E9F1] flex items-center justify-between">
                <a
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-[#1F56A8] group-hover:text-[#16233F] transition-colors font-display"
                  href="/divisions"
                >
                  <span>Electrical Scope</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1.5 transition-transform duration-200">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="text-[11px] font-mono font-semibold text-[#1F56A8] hover:underline"
                  href="/rfq?division=Turnkey%20Electrical%20Contracting%20%26%20HT%2FLT%20Power%20Systems"
                >
                  Request Electrical RFQ →
                </a>
              </div>
            </div>

            <div className="col-span-1 md:col-span-1 lg:col-span-6 rounded-2xl p-6 sm:p-7 bg-[#F7F9FC] border border-[#E4E9F1] hover:border-[#1F56A8] hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E9F1] text-[#1F56A8] flex items-center justify-center group-hover:bg-[#1F56A8] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <span className="material-symbols-outlined text-xl">science</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#1F56A8]/10 text-[#1F56A8] border border-[#1F56A8]/20">
                      PROCESS CONTRACT
                    </span>
                    <span className="text-xs font-mono font-bold text-[#5B6B82] group-hover:text-[#1F56A8] transition-colors">
                      09
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-[#1F56A8] font-bold uppercase tracking-wider block mb-1">
                  API SYNTHESIS &amp; SPECIALIZED PROCESS PIPING
                </span>
                <h4 className="font-display font-bold text-xl text-[#16233F] mb-2 group-hover:text-[#1F56A8] transition-colors">
                  Chemical Process &amp; Specialized Industrial Contracting
                </h4>
                <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                  Specialized chemical plant &amp; bulk drug utility contracts: orbital-welded electro-polished SS 316L chemical transfer loops with double-containment, hazardous VOC solvent exhaust headers, multi-stage PP/FRP packed-bed wet scrubbers, and acid/alkali-resistant anti-static epoxy screeds.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    ASME B31.3 Chemical Piping
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    Orbital SS 316L Manifolds
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white border border-[#E4E9F1] text-[#16233F]">
                    PP/FRP Wet Scrubbers
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#1F56A8]/10 text-[#1F56A8] border border-[#1F56A8]/30">
                    ATEX / PESO Compliant
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E4E9F1] flex items-center justify-between">
                <a
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase text-[#1F56A8] group-hover:text-[#16233F] transition-colors font-display"
                  href="/divisions"
                >
                  <span>Process Specs</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1.5 transition-transform duration-200">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="text-[11px] font-mono font-semibold text-[#1F56A8] hover:underline"
                  href="/rfq?division=Chemical%20Process%20Piping%20%26%20Specialized%20Industrial%20Contracting"
                >
                  Request Chemical RFQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRECISION COMPONENTS RAIL */}
      <section className="py-20 border-b border-[#E4E9F1] bg-[#F7F9FC]" id="equipment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-[#1F56A8] tracking-widest block mb-1.5">
                // HARDWARE CATALOG
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#16233F] tracking-tight">
                Precision cGMP Components
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous"
                className="w-9 h-9 rounded-lg bg-white border border-[#E4E9F1] text-[#16233F] flex items-center justify-center hover:bg-[#1F56A8] hover:text-white active:scale-95 transition-all shadow-sm"
                id="equip-prev"
                onClick={() => scrollRail('left')}
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
              <button
                aria-label="Next"
                className="w-9 h-9 rounded-lg bg-white border border-[#E4E9F1] text-[#16233F] flex items-center justify-center hover:bg-[#1F56A8] hover:text-white active:scale-95 transition-all shadow-sm"
                id="equip-next"
                onClick={() => scrollRail('right')}
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
          <div
            ref={equipRailRef}
            className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            id="equip-rail"
          >
            {PRECISION_COMPONENTS.map((item) => (
              <div
                key={item.sku}
                className="min-w-[280px] md:min-w-[320px] snap-start rounded-xl p-5 bg-white border border-[#E4E9F1] flex flex-col justify-between hover:border-[#1F56A8] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 shadow-sm group"
              >
                <div>
                  <div className="h-40 rounded-lg bg-[#F7F9FC] border border-[#E4E9F1] mb-4 overflow-hidden relative flex items-center justify-center">
                    <img
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      src={item.img}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono bg-white/90 text-[#1F56A8] font-bold border border-[#E4E9F1]">
                      {item.sku}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#16233F] mb-2 group-hover:text-[#1F56A8] transition-colors">
                    {item.name}
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#5B6B82] border-t border-[#E4E9F1] pt-3 mb-4">
                    {item.specs.map(([label, val]) => (
                      <div key={label} className="flex justify-between">
                        <span>{label}</span>
                        <span className="text-[#16233F] font-mono font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  className="w-full py-2.5 rounded-lg text-center text-xs font-semibold uppercase tracking-wider font-display bg-[#F7F9FC] hover:bg-[#1F56A8] hover:text-white text-[#1F56A8] border border-[#E4E9F1] hover:border-[#1F56A8] transition-all duration-200 active:scale-[0.99]"
                  href="#rfq-section"
                >
                  View Specifications
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REAL PROJECT GALLERY (PHOTOGRAPHIC CASE STUDIES) */}
      <section className="py-20 border-b border-[#E4E9F1] bg-white" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-[#1F56A8] tracking-widest block mb-1.5">
                // TRACK RECORD
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#16233F] tracking-tight">
                Real Project Executions
              </h2>
            </div>
            <Link
              className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#1F56A8] hover:text-[#16233F] transition-colors"
              to="/projects"
            >
              <span>View All Projects</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-200">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.client}
                className="rounded-xl overflow-hidden border border-[#E4E9F1] bg-white shadow-sm flex flex-col justify-between group hover:border-[#1F56A8] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      src={cs.img}
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/95 text-[10px] font-mono font-bold text-[#1F56A8] border border-[#E4E9F1]">
                      {cs.location}
                    </div>
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/60 text-[10px] font-mono text-white">
                      {cs.area}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-[#16233F] mb-1 group-hover:text-[#1F56A8] transition-colors">
                      {cs.title}
                    </h3>
                    <span className="text-xs font-mono text-[#1F56A8] block mb-2 font-medium">
                      {cs.sub}
                    </span>
                    <p className="text-xs text-[#5B6B82] leading-relaxed">
                      {cs.desc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 border-t border-[#E4E9F1] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#5B6B82]">{cs.status}</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                    <span className="material-symbols-outlined text-emerald-600 text-xs font-bold">{cs.badgeIcon}</span>
                    {cs.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AMC Lifecycle Support Announcement Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#16233F] via-[#1a2d52] to-[#1F56A8] text-white flex flex-col md:flex-row items-center justify-between gap-5 border border-[#1F56A8]/40 shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-inner">
                <span className="material-symbols-outlined text-emerald-400 text-2xl">verified_user</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-display font-bold text-base text-white">We Also Offer Comprehensive Annual Maintenance Contracts (AMC)</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 font-mono text-[10px] font-bold">
                    24/7 SUPPORT
                  </span>
                </div>
                <p className="text-xs text-white/80 max-w-2xl leading-relaxed">
                  Keep your cleanrooms certified and audit-ready with quarterly in-situ PAO/DOP HEPA filter leak scans, AHU motor and coil maintenance, airflow velocity balancing, and Schedule M re-certifications.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                to="/projects"
                className="flex-1 md:flex-initial text-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs border border-white/20 transition-colors whitespace-nowrap"
              >
                View AMC Projects
              </Link>
              <a
                href="#rfq-section"
                className="flex-1 md:flex-initial text-center px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-display font-semibold text-xs tracking-wider uppercase shadow-md transition-colors whitespace-nowrap"
              >
                Inquire For Plant AMC
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AIR FILTRATION CASCADE STRIP */}
      <section className="py-16 border-b border-[#E4E9F1] bg-[#F7F9FC]" id="filtration">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase text-[#1F56A8] tracking-widest block mb-1">
                // 4-STAGE CASCADE
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#16233F] tracking-tight">
                Sterile Air Filtration Sequence
              </h2>
            </div>
            <span className="text-xs font-mono text-[#5B6B82]">EN 779 &amp; EN 1822 CERTIFIED</span>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-[#E4E9F1] z-0"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {FILTRATION_STAGES.map((s) => (
                <div
                  key={s.stage}
                  className="p-5 rounded-xl bg-white border border-[#E4E9F1] shadow-sm hover:-translate-y-1 hover:border-[#1F56A8] hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-5 h-5 rounded-full bg-[#F7F9FC] border-2 transition-colors duration-300 flex items-center justify-center ${
                        s.isTerminal
                          ? 'border-[#1F56A8] group-hover:bg-[#1F56A8]'
                          : 'border-[#5B6B82] group-hover:border-[#1F56A8] group-hover:bg-[#1F56A8]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold transition-colors ${
                        s.isTerminal
                          ? 'text-[#1F56A8]'
                          : 'text-[#5B6B82] group-hover:text-[#1F56A8]'
                      }`}
                    >
                      {s.stage}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#16233F] mb-1 group-hover:text-[#1F56A8] transition-colors">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#5B6B82] mb-3">{s.desc}</p>
                  <span className="text-[10px] font-mono text-[#1F56A8] font-semibold block">
                    {s.standard}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PHARMACEUTICAL CLIENT LOGOS WITH CONTINUOUS RIGHT-TO-LEFT SCROLL */}
      <section className="py-12 border-b border-[#E4E9F1] bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#5B6B82] font-semibold block">
            TRUSTED BY PRESTIGIOUS PHARMACEUTICAL CLIENTS &amp; HEALTHCARE LEADERS
          </span>
        </div>

        <div className="relative w-full overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />

          <div className="animate-marquee-rtl flex items-center gap-4">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
              <Link
                key={`${client.name}-${idx}`}
                to="/projects"
                className="group flex items-center gap-3.5 py-3 px-4 sm:px-5 rounded-xl bg-[#F7F9FC] border border-[#E4E9F1] hover:border-[#1F56A8]/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 shrink-0 select-none cursor-pointer"
                title={`View ${client.name} Projects & Case Studies`}
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E4E9F1] flex items-center justify-center p-1.5 shrink-0 group-hover:border-[#1F56A8]/30 group-hover:shadow-2xs transition-all">
                  {client.logo}
                </div>
                <div className="text-left">
                  <span className="font-display font-bold text-xs sm:text-sm text-[#16233F] group-hover:text-[#1F56A8] transition-colors whitespace-nowrap block">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-[#5B6B82] font-mono whitespace-nowrap block">
                    {client.sub}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-5">
          <p className="text-xs font-mono text-[#5B6B82] flex items-center justify-center gap-1.5 flex-wrap">
            <span>Executing ISO Class 5–8 cGMP Envelopes across 250+ facilities ·</span>
            <Link to="/projects" className="text-[#1F56A8] font-bold hover:underline inline-flex items-center gap-1">
              View All Client Projects
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </Link>
          </p>
        </div>
      </section>

      {/* 9. STREAMLINED RFQ CONVERSION SECTION */}
      <section className="py-20 border-b border-[#E4E9F1] bg-white" id="rfq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7F9FC] border border-[#E4E9F1] rounded-2xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E4E9F1] text-[#1F56A8] text-xs font-mono font-medium mb-4 shadow-2xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1F56A8] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1F56A8]"></span>
                    </span>
                    <span>TECHNICAL ADVISORY &amp; RFQ DESK</span>
                  </div>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#16233F] tracking-tight mb-4">
                    Initiate Your Cleanroom Project
                  </h2>
                  <p className="text-sm text-[#5B6B82] leading-relaxed mb-6 max-w-xl">
                    Connect with our senior MEP &amp; validation engineering team to schedule a technical discovery call, review room layout drawings, or obtain a comprehensive turnkey commercial proposal.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs text-[#16233F]">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-[#E4E9F1]">
                      <span className="material-symbols-outlined text-[#25D366] text-base font-bold shrink-0">
                        check_circle
                      </span>
                      <span className="font-medium">Revised Schedule M &amp; EU GMP</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-[#E4E9F1]">
                      <span className="material-symbols-outlined text-[#25D366] text-base font-bold shrink-0">
                        check_circle
                      </span>
                      <span className="font-medium">Free Layout &amp; CFM Load Sizing</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-[#E4E9F1]">
                      <span className="material-symbols-outlined text-[#25D366] text-base font-bold shrink-0">
                        check_circle
                      </span>
                      <span className="font-medium">Single-Point Pan-India Execution</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-white/70 border border-[#E4E9F1]">
                      <span className="material-symbols-outlined text-[#25D366] text-base font-bold shrink-0">
                        check_circle
                      </span>
                      <span className="font-medium">Certified DQ/IQ/OQ/PQ Dossiers</span>
                    </div>
                  </div>
                </div>

                <form
                  className="space-y-3 bg-white p-6 rounded-xl border border-[#E4E9F1] shadow-xs"
                  id="rfq-form"
                  onSubmit={handleRfqSubmit}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block text-[11px] font-mono uppercase tracking-wider text-[#5B6B82] font-semibold mb-1"
                        htmlFor="rfq-name"
                      >
                        Contact Person *
                      </label>
                      <input
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4E9F1] bg-[#F7F9FC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F56A8]/20 focus:border-[#1F56A8] transition-all"
                        id="rfq-name"
                        placeholder="Dr. / Er. Full Name"
                        required
                        type="text"
                        value={rfqName}
                        onChange={(e) => setRfqName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[11px] font-mono uppercase tracking-wider text-[#5B6B82] font-semibold mb-1"
                        htmlFor="rfq-phone"
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4E9F1] bg-[#F7F9FC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F56A8]/20 focus:border-[#1F56A8] transition-all"
                        id="rfq-phone"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        type="tel"
                        value={rfqPhone}
                        onChange={(e) => setRfqPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        className="block text-[11px] font-mono uppercase tracking-wider text-[#5B6B82] font-semibold mb-1"
                        htmlFor="rfq-facility"
                      >
                        Facility Area (Sq.Ft)
                      </label>
                      <input
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4E9F1] bg-[#F7F9FC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F56A8]/20 focus:border-[#1F56A8] transition-all"
                        id="rfq-facility"
                        placeholder="e.g. 15,000"
                        type="text"
                        value={rfqFacility}
                        onChange={(e) => setRfqFacility(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[11px] font-mono uppercase tracking-wider text-[#5B6B82] font-semibold mb-1"
                        htmlFor="rfq-grade"
                      >
                        Target Cleanliness Class
                      </label>
                      <select
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4E9F1] bg-[#F7F9FC] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1F56A8]/20 focus:border-[#1F56A8] transition-all"
                        id="rfq-grade"
                        value={rfqGrade}
                        onChange={(e) => setRfqGrade(e.target.value)}
                      >
                        <option value="ISO Class 5 / Grade A">ISO Class 5 / Grade A</option>
                        <option value="ISO Class 6 / Grade B">ISO Class 6 / Grade B</option>
                        <option value="ISO Class 7 / Grade C">ISO Class 7 / Grade C</option>
                        <option value="ISO Class 8 / Grade D">ISO Class 8 / Grade D</option>
                        <option value="Turnkey Electrical Contracting & Substation">Turnkey Electrical Contracting &amp; Substation</option>
                        <option value="Chemical Process Piping & Plant Contracting">Chemical Process Piping &amp; Plant Contracting</option>
                        <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC) &amp; Re-Validation</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#1F56A8] text-white font-display font-semibold text-xs tracking-wider uppercase hover:bg-[#16233F] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 shadow-sm disabled:opacity-50"
                      type="submit"
                      disabled={submitting}
                    >
                      <span>{submitting ? 'Submitting...' : 'Submit RFQ Specifications'}</span>
                      <span className="material-symbols-outlined text-[15px] font-bold">send</span>
                    </button>
                    <a
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white hover:opacity-90 active:scale-[0.99] font-display font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
                      href="https://wa.me/919317343117"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[17px] font-bold">chat</span>
                      <span>WhatsApp Hotline</span>
                    </a>
                  </div>
                  {submitted && (
                    <div
                      className="p-3 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 text-xs text-[#16233F] flex items-center gap-2"
                      id="form-feedback"
                    >
                      <span className="material-symbols-outlined text-[#25D366] text-base font-bold">
                        check_circle
                      </span>
                      <span>Thank you. Our Chief Validation Engineer will reach out within 2 hours.</span>
                    </div>
                  )}
                </form>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="p-6 rounded-xl bg-white border border-[#E4E9F1] shadow-sm relative overflow-hidden hover:border-[#1F56A8]/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F7F9FC] border border-[#E4E9F1] text-[#1F56A8] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">architecture</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-[#F7F9FC] border border-[#E4E9F1] text-[10px] font-mono text-[#1F56A8] font-bold uppercase">
                      TURNKEY EPC
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#16233F] mb-1.5">
                    Engineering Discovery &amp; Sizing
                  </h3>
                  <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                    Direct consultation with HVAC psychrometric specialists and sterile cleanroom architects tailored to your drug dosage form and cleanroom grade requirements.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E4E9F1] text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-[#16233F]">
                      <span className="material-symbols-outlined text-[#25D366] text-sm font-bold">timer</span>
                      <span>24-Hour SLA Turnaround</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#16233F]">
                      <span className="material-symbols-outlined text-[#1F56A8] text-sm font-bold">lock</span>
                      <span>Strict NDA Assurance</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E4E9F1] flex items-center justify-between text-xs hover:border-[#1F56A8]/40 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#F7F9FC] border border-[#E4E9F1] flex items-center justify-center text-[#1F56A8]">
                      <span className="material-symbols-outlined text-base">verified</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#16233F] block">Audit-Grade Compliance</span>
                      <span className="text-[11px] text-[#5B6B82] font-mono">
                        USFDA • EU GMP • WHO • CDSCO
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#25D366]/10 text-[#25D366] font-bold border border-[#25D366]/30">
                    ACTIVE
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E4E9F1] flex items-center justify-between text-xs hover:border-[#1F56A8]/40 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-[#F7F9FC] border border-[#E4E9F1] flex items-center justify-center text-[#1F56A8]">
                      <span className="material-symbols-outlined text-base">phone_in_talk</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#16233F] block">Direct EPC Line</span>
                      <span className="text-[11px] text-[#5B6B82] font-mono">
                        +91-93173-43117 (Mon-Sat 9AM-8PM)
                      </span>
                    </div>
                  </div>
                  <a
                    className="px-3 py-1.5 rounded text-xs font-mono bg-[#F7F9FC] text-[#1F56A8] font-bold border border-[#E4E9F1] hover:bg-[#1F56A8] hover:text-white transition-colors"
                    href="tel:+919317343117"
                  >
                    CALL NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
