import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Project } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

const FALLBACK_PROJECTS: Partial<Project>[] = [
  {
    _id: 'proj-1',
    title: 'Turnkey Sterile Liquid Injectables & Lyophilization Suite',
    slug: 'sterile-liquid-injectables-suite',
    client: 'Major Multinational Pharmaceutical Formulation Corp',
    location: 'Baddi, Himachal Pradesh, India',
    division: 'Modular Cleanroom & HVAC',
    isoClass: 'ISO Class 5 (Grade A) & Grade B Background',
    areaSqFt: 14500,
    completionDate: '2025-11',
    description: 'Complete design, manufacturing, erection, and DQ/IQ/OQ/PQ validation of an aseptic vial filling, capping, and lyophilization cleanroom suite. Included double-skin thermal-break AHUs delivering +45 Pa pressure cascade.',
    images: ['/images/aseptic-filling-suite.jpg'],
    featured: true,
  },
  {
    _id: 'proj-2',
    title: 'High-Throughput Oral Solid Dosage (OSD) Formulation Facility',
    slug: 'osd-formulation-cleanroom',
    client: 'US FDA Approved Generic Tablet Manufacturer',
    location: 'Ahmedabad, Gujarat, India',
    division: 'Modular Panels & Dust Extraction',
    isoClass: 'ISO Class 7 (Grade C / Schedule M)',
    areaSqFt: 32000,
    completionDate: '2025-08',
    description: 'Turnkey modular cleanroom installation across 18 granulation, compression, and blister packaging cubicles. Reverse laminar airflow dispensing booths with dedicated containment extractors.',
    images: ['/images/modular-cleanroom-interior.jpg'],
    featured: true,
  },
  {
    _id: 'proj-3',
    title: 'Biotechnology Vaccine Fermentation & Purification Complex',
    slug: 'biotech-vaccine-fermentation',
    client: 'Leading Biopharmaceutical & Vaccine Manufacturer',
    location: 'Genome Valley, Hyderabad, Telangana, India',
    division: 'HVAC & Biosafety Equipment',
    isoClass: 'ISO Class 6 (Grade B) / BSL-2 Positive Cascade',
    areaSqFt: 21500,
    completionDate: '2025-05',
    description: 'Specialized bio-containment cleanroom engineering with 100% fresh air AHU systems, terminal gel-seal H14 HEPA modules, and automated pressure cascade monitoring with fail-safe dampers.',
    images: ['/images/hvac-ahu-plant.jpg'],
    featured: true,
  },
  {
    _id: 'proj-4',
    title: 'Potent API Bulk Chemical Synthesis & Clean Finishing Area',
    slug: 'potent-api-synthesis-clean-room',
    client: 'Export-Oriented Active Ingredient Manufacturer',
    location: 'Ankleshwar, Gujarat, India',
    division: 'Pass Boxes & Cleanroom Doors',
    isoClass: 'ISO Class 8 with Negative Pressure Air-locks',
    areaSqFt: 18000,
    completionDate: '2024-12',
    description: 'Solvent-resistant cleanroom panels with anti-static epoxy flooring, flameproof electrical fitments, dynamic air showers, and double-leaf GI cleanroom doors with magnetic interlocking.',
    images: ['/images/cleanroom-validation-testing.jpg'],
    featured: false,
  },
  {
    _id: 'proj-5',
    title: 'Class 10,000 Diagnostic Reagents & Medical Device Cleanroom',
    slug: 'diagnostic-medical-device-cleanroom',
    client: 'In-Vitro Diagnostics & Medical Devices Group',
    location: 'IMT Manesar, Haryana, India',
    division: 'Turnkey Modular Cleanroom',
    isoClass: 'ISO Class 7 (Class 10,000)',
    areaSqFt: 9500,
    completionDate: '2024-09',
    description: 'Ultra-low vibration walk-on ceiling cleanroom with automated humidity control (40% ± 3% RH at 20°C) and Class II Type A2 Biosafety workstations for molecular reagent dispensing.',
    images: ['/images/terminal-hepa-module.jpg'],
    featured: false,
  },
  {
    _id: 'proj-6',
    title: 'Aseptic Ophthalmic Drops & Eye-Care Manufacturing Unit',
    slug: 'aseptic-ophthalmic-drops-unit',
    client: 'Sterile Eye Care Specialties Ltd',
    location: 'Sikkim, India',
    division: 'Turnkey HVAC & Cleanroom',
    isoClass: 'ISO Class 5 (Grade A / Laminar Flow)',
    areaSqFt: 11200,
    completionDate: '2024-06',
    description: 'Turnkey aseptic blow-fill-seal (BFS) cleanroom installation with vertical laminar airflow over sterile filling needles and dynamic material transfer pass boxes.',
    images: ['/images/aseptic-filling-suite.jpg'],
    featured: true,
  },
];

const DIV_FILTERS = [
  'All Divisions',
  'Modular Cleanroom & HVAC',
  'Modular Panels & Dust Extraction',
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
                Turnkey Pharmaceutical Cleanroom Projects
              </h1>
              <p className="text-base text-brand-muted leading-relaxed">
                Explore our portfolio of completed sterile injectables, solid dosage, API synthesis,
                and biotechnology cleanrooms delivered with 100% first-pass regulatory compliance.
              </p>
            </div>

            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-3 rounded-md text-xs font-semibold shadow-hud shrink-0 transition-colors"
            >
              Discuss Your Facility Project
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

      {/* 3. Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj, idx) => (
            <div
              key={proj._id || idx}
              onClick={() => setActiveModalProject(proj)}
              className="bg-white rounded-xl border border-brand-border hover:border-brand-primary/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-48 bg-brand-soft overflow-hidden">
                  <img
                    src={proj.images?.[0] || '/images/modular-cleanroom-interior.jpg'}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-brand-navy/90 text-white font-mono font-bold text-[11px] backdrop-blur-sm border border-white/20">
                      {proj.isoClass || 'ISO 14644-1'}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-brand-muted font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{proj.location}</span>
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
                      <span className="px-2 py-0.5 rounded bg-brand-soft border border-brand-border text-brand-navy">
                        Year: {proj.completionDate}
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
                <span className="text-[10px] font-mono text-brand-green font-bold">
                  cGMP CERTIFIED
                </span>
              </div>
            </div>
          ))}
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
