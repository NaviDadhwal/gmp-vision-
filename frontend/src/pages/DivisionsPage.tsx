import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Wind,
  DoorOpen,
  Shield,
  Box,
  Filter,
  Wrench,
  ArrowRight,
  CheckCircle2,
  FileText,
  PhoneCall,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Division } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

// Fallback high-fidelity data matching Stitch & GMP Vision PRD
const DEFAULT_DIVISIONS: Partial<Division>[] = [
  {
    _id: 'div-1',
    name: 'Modular Cleanroom Panels & Partitions',
    slug: 'modular-cleanroom-panels',
    icon: 'Layers',
    description: 'Precision-engineered pre-fabricated PUF, PIR, and Rockwool sandwich wall and walk-on ceiling panels with flush joints and integrated returns.',
    standards: ['ISO 14644-1 Class 5-8', 'Schedule M Compliant', 'Class 0 Fire Rated'],
    features: [
      'Modular progressive and non-progressive panel designs',
      'Factory-formed cutouts for HEPA filters, pass boxes, and services',
      'Walk-on ceiling panels tested up to 150 kg point load',
      'Flush siliconized anti-fungal joints with aluminum extruded coving'
    ],
  },
  {
    _id: 'div-2',
    name: 'HVAC & Air Handling Unit (AHU) Systems',
    slug: 'hvac-ahu-systems',
    icon: 'Wind',
    description: 'Custom engineered thermal-break double-skin AHUs, precision humidity controllers, and variable air volume systems delivering laminar airflow.',
    standards: ['DIN 1886 Class T2/TB2', 'Eurovent Certified', 'cGMP Positive Pressure'],
    features: [
      'Thermal break extruded aluminum profiles with 43mm/50mm PUF insulation',
      'Plug fans with direct-drive EC/IE4 high-efficiency motors',
      'Integrated DX and chilled water coils with SS 304 drain pans',
      'Multi-stage filtration section (Pre + Fine + Terminal HEPA)'
    ],
  },
  {
    _id: 'div-3',
    name: 'Cleanroom Flush Doors & Viewing Windows',
    slug: 'cleanroom-doors-windows',
    icon: 'DoorOpen',
    description: 'Aseptic-grade GI powder coated and SS 304 swing doors with automatic bottom drop seals, interlocking logic, and double-glazed flush view panels.',
    standards: ['FDA Cleanability Criteria', 'Schedule M Approved', '120 Min Fire Rating'],
    features: [
      'Zero-ledge flush construction on both cleanroom faces',
      'Heavy-duty SS 304 concealed lift-off hinges and flush handles',
      'Double glazed 5mm toughened safety glass with silica gel desiccant',
      'Microprocessor-based 2-door and 3-door electromagnetic interlocking'
    ],
  },
  {
    _id: 'div-4',
    name: 'Laminar Air Flow (LAF) & Biosafety Equipment',
    slug: 'laminar-airflow-biosafety',
    icon: 'Shield',
    description: 'Unidirectional Class 100 laminar flow workstations, sampling and dispensing booths (RLAF), and Class II Type A2/B2 biosafety cabinets.',
    standards: ['ISO 14644-1 Class 5 (Grade A)', 'EN 12469 Biosafety', 'NSF/ANSI 49'],
    features: [
      'Uniform velocity distribution of 0.45 m/s ± 20% across filter face',
      'SS 304 / SS 316L mirror finish interior with coved internal corners',
      'Mini-pleat HEPA filters with integral DOP/PAO test aerosol ports',
      'Magnehelic differential pressure gauges for real-time monitoring'
    ],
  },
  {
    _id: 'div-5',
    name: 'Pass Boxes & Dynamic Airlocks',
    slug: 'pass-boxes-airlocks',
    icon: 'Box',
    description: 'Static and dynamic material transfer pass boxes with UV germicidal disinfection, differential pressure cascades, and timed interlocks.',
    standards: ['cGMP Material Transfer', 'Grade B to Grade A Interface'],
    features: [
      'Dynamic version features built-in H14 HEPA filtration with 0.45 m/s airflow',
      'Electromagnetic relay interlocking preventing cross-contamination',
      'Quartz UV germicidal tube with automated safety door shut-off',
      'Heavy duty double-skinned SS 304 electro-polished build'
    ],
  },
  {
    _id: 'div-6',
    name: 'Air Filtration & Terminal HEPA Units',
    slug: 'air-filtration-systems',
    icon: 'Filter',
    description: 'Comprehensive filtration from G3 pre-filters to H14 terminal gel-seal HEPA modules and U15 ULPA units with MPPS efficiency exceeding 99.9995%.',
    standards: ['EN 1822:2019 Certified', 'ISO 29463 Compliant', 'Individual Leak Tested'],
    features: [
      'G3/G4 synthetic washable pre-filters in aluminum frames',
      'F7/F9 deep-pleat and pocket micro-fiber synthetic fine filters',
      'H13/H14 mini-pleat HEPA filters with fluid gel or polyurethane seals',
      'Factory scanned with automated aerosol photometer scan reports'
    ],
  },
  {
    _id: 'div-7',
    name: 'Cleanroom SS 304 Furniture & Coving Profiles',
    slug: 'cleanroom-furniture-accessories',
    icon: 'Wrench',
    description: 'Sanitary pharmaceutical furnishings, crossover benches, dynamic garment storage, step-over benches, and extruded aluminum/PVC coving.',
    standards: ['cGMP Sanitary Grade', 'ASTM A240 SS 304/316'],
    features: [
      'Mirror or satin 240-grit pharmaceutical sanitary finishes',
      'Fully welded seams ground flush and passivated for zero particle trapping',
      'Two-piece clip-on aluminum coving with PVC soft lips for ceiling/wall/floor',
      'Dynamic garment cubicles with integrated UV and HEPA purge'
    ],
  },
];

export const DivisionsPage: React.FC = () => {
  const [divisions, setDivisions] = useState<Partial<Division>[]>(DEFAULT_DIVISIONS);

  useEffect(() => {
    async function fetchDivisions() {
      try {
        const data = await ApiService.getDivisions();
        if (data && data.length > 0) {
          setDivisions(data);
        }
      } catch (err) {
        console.warn('Backend unavailable, using cleanroom validated divisions fallback:', err);
      }
    }
    fetchDivisions();
  }, []);

  const getDivisionIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-6 h-6 text-brand-primary" />;
      case 'DoorOpen':
        return <DoorOpen className="w-6 h-6 text-brand-primary" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-brand-primary" />;
      case 'Box':
        return <Box className="w-6 h-6 text-brand-primary" />;
      case 'Filter':
        return <Filter className="w-6 h-6 text-brand-primary" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-brand-primary" />;
      default:
        return <Layers className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-12 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border">
            <TelemetryBadge label="TURNKEY DIVISIONS" variant="blue" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              Single-Source cGMP Engineering Scope
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight">
            Turnkey Cleanroom & HVAC Engineering Divisions
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-3xl leading-relaxed">
            GMP Vision operates seven fully integrated engineering divisions providing end-to-end design,
            in-house manufacturing, certified installation, and comprehensive validation documentation (DQ/IQ/OQ/PQ)
            for pharmaceutical and biotechnology infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-2.5 rounded-md text-sm font-semibold shadow-hud transition-colors"
            >
              Request Division Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/Broucher.pdf"
              download="GMP_VISION_Turnkey_Brochure.pdf"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              <FileText className="w-4 h-4 text-brand-green" />
              Download Full Division Catalog
            </a>
          </div>
        </div>
      </section>

      {/* 2. Interactive Divisions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, idx) => (
            <div
              key={division._id || division.slug || idx}
              className="bg-white rounded-xl border border-brand-border hover:border-brand-primary/40 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Card Header with Division Number & Icon */}
              <div className="p-6 border-b border-brand-border/60 bg-gradient-to-r from-brand-soft/40 to-white flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-white border border-brand-border shadow-sm flex items-center justify-center group-hover:bg-brand-soft transition-colors">
                  {getDivisionIcon(division.icon)}
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-brand-primary">DIV-0{idx + 1}</span>
                  <p className="text-[10px] font-mono text-brand-muted">GMP CERTIFIED</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h2 className="text-xl font-display font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                    {division.name}
                  </h2>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {division.description}
                  </p>

                  {/* Standards Badges */}
                  {division.standards && division.standards.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {division.standards.map((std, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-brand-soft text-brand-navy border border-brand-border"
                        >
                          {std}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Key Features List */}
                  {division.features && division.features.length > 0 && (
                    <div className="pt-3 border-t border-brand-border/60 space-y-2">
                      <p className="text-xs font-mono font-bold text-brand-navy uppercase tracking-wider">
                        Engineering Highlights:
                      </p>
                      <ul className="space-y-1.5">
                        {division.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-brand-muted flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between">
                  <Link
                    to={`/divisions/${division.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-primaryHover group-hover:translate-x-0.5 transition-all"
                  >
                    Explore Division Equipment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to={`/rfq?division=${division.slug}`}
                    className="text-xs font-mono font-medium text-brand-muted hover:text-brand-green transition-colors"
                  >
                    Quick RFQ
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Turnkey Execution Process Lifecycle */}
      <section className="bg-brand-soft border-y border-brand-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              Standardized Validation Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy">
              5-Stage Turnkey Qualification Methodology
            </h2>
            <p className="text-sm sm:text-base text-brand-muted">
              Every GMP Vision turnkey installation complies with ISO 14644-1, WHO-GMP, and US FDA 21 CFR Part 211 guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Design Qualification (DQ)',
                desc: 'CFM load calculations, room pressure cascade modeling, and 3D BIM clash detection layout.',
              },
              {
                step: '02',
                title: 'Factory Fabrication',
                desc: 'CNC-punched PUF/Rockwool panels, welded double-skin AHUs, and factory leak-tested HEPA filters.',
              },
              {
                step: '03',
                title: 'Installation (IQ)',
                desc: 'Cleanroom erection by certified technicians, flush coving sealants, and duct pressure testing.',
              },
              {
                step: '04',
                title: 'Operation (OQ)',
                desc: 'Airflow velocity profiling, PAO/DOP filter integrity scan, and differential pressure validation.',
              },
              {
                step: '05',
                title: 'Performance (PQ)',
                desc: 'Non-viable airborne particle counts at rest & operational, recovery tests, and handover dossier.',
              },
            ].map((phase, pIdx) => (
              <div
                key={pIdx}
                className="bg-white p-5 rounded-lg border border-brand-border relative flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-2xl font-mono font-extrabold text-brand-primary/20">
                    {phase.step}
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-1">{phase.title}</h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">{phase.desc}</p>
                </div>
                <div className="h-1 w-full bg-brand-soft rounded overflow-hidden">
                  <div className="h-full bg-brand-primary w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact / RFQ CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-brand-green border border-white/20">
              ● CONSULT OUR SENIOR HVAC ENGINEERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Ready to engineer your next pharmaceutical or healthcare cleanroom?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Submit your architectural layouts, required ISO classifications, or CFM requirements.
              Our turnkey engineering desk provides conceptual schematics and estimates within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <Link
              to="/rfq"
              className="inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3.5 rounded-md font-semibold text-sm shadow-lg transition-colors"
            >
              Start Online RFQ
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919818818818"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3.5 rounded-md font-medium text-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-brand-green" />
              Direct Phone Call
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
