import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  ArrowRight,
  Search,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { AirFilter } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

const FALLBACK_FILTERS: Partial<AirFilter>[] = [
  {
    _id: 'filter-1',
    name: 'G4 Synthetic Washable Panel Pre-Filter',
    category: 'pre-filter',
    filterClass: 'G4 (EN 779:2012) / Coarse 90% (ISO 16890)',
    efficiency: '90% Arrestance on Synthetic Dust (ASHRAE 52.1)',
    initialResistance: 65,
    finalResistance: 250,
    ratedAirflow: 2000,
    dimensions: { length: 610, width: 610, depth: 50 },
    frameMaterial: 'Extruded Anodized Aluminum / Galvanized Iron',
    gasketType: 'Continuous Flat Neoprene Gasket',
  },
  {
    _id: 'filter-2',
    name: 'F8 Multi-Pocket Micro-Fiber Glass Fine Filter',
    category: 'fine-filter',
    filterClass: 'F8 (EN 779:2012) / ePM1 70% (ISO 16890)',
    efficiency: '90-95% Fractional Efficiency @ 0.4 Micron',
    initialResistance: 110,
    finalResistance: 400,
    ratedAirflow: 2000,
    dimensions: { length: 610, width: 610, depth: 600 },
    frameMaterial: 'Roll-Formed Galvanized Steel Header (25mm)',
    gasketType: 'One-Piece Seamless Polyurethane Gasket',
  },
  {
    _id: 'filter-3',
    name: 'H13 Mini-Pleat Aluminum Separator HEPA Filter',
    category: 'hepa',
    filterClass: 'H13 (EN 1822:2019) / ISO 35 H (ISO 29463)',
    efficiency: '≥ 99.95% at MPPS / 99.97% at 0.3 Micron',
    initialResistance: 220,
    finalResistance: 500,
    ratedAirflow: 1000,
    dimensions: { length: 610, width: 610, depth: 150 },
    frameMaterial: 'Extruded Anodized Aluminum with Face Protection Grid',
    gasketType: 'Seamless EPDM / PU Endless Gasket',
  },
  {
    _id: 'filter-4',
    name: 'H14 Terminal Fluid Gel-Seal Cleanroom HEPA Module',
    category: 'hepa',
    filterClass: 'H14 (EN 1822:2019) / ISO 45 H (ISO 29463)',
    efficiency: '≥ 99.995% at MPPS / 99.997% at 0.3 Micron',
    initialResistance: 120,
    finalResistance: 450,
    ratedAirflow: 650,
    dimensions: { length: 610, width: 610, depth: 70 },
    frameMaterial: 'Extruded Aluminum with Fluid Gel Channel',
    gasketType: 'Non-Newtonian Fluid Polyurethane Gel Channel',
  },
  {
    _id: 'filter-5',
    name: 'U15 Ultra-Low Penetration Air (ULPA) Filter',
    category: 'ulpa',
    filterClass: 'U15 (EN 1822:2019) / ISO 55 U (ISO 29463)',
    efficiency: '≥ 99.9995% at MPPS (0.12 - 0.17 Micron)',
    initialResistance: 140,
    finalResistance: 500,
    ratedAirflow: 550,
    dimensions: { length: 610, width: 610, depth: 75 },
    frameMaterial: 'Anodized Aluminum Profile with Double Face Guards',
    gasketType: 'Gel-Seal or Closed-Cell Expanded Neoprene',
  },
  {
    _id: 'filter-6',
    name: 'High-Temperature Silicone Sealed H14 HEPA Filter',
    category: 'hepa',
    filterClass: 'H14 High Temp (Up to 250°C Continuous)',
    efficiency: '≥ 99.995% at MPPS',
    initialResistance: 250,
    finalResistance: 600,
    ratedAirflow: 1000,
    dimensions: { length: 610, width: 610, depth: 292 },
    frameMaterial: 'Grade SS 304 Stainless Steel with Ceramic / Silicone Seal',
    gasketType: 'High-Temperature Glass Fiber Braided Gasket',
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Filtration Units' },
  { id: 'pre-filter', label: 'Pre-Filters (G3 / G4)' },
  { id: 'fine-filter', label: 'Fine / Pocket (F7 / F8 / F9)' },
  { id: 'hepa', label: 'HEPA Modules (H13 / H14)' },
  { id: 'ulpa', label: 'ULPA Modules (U15)' },
];

export const FiltersPage: React.FC = () => {
  const [filters, setFilters] = useState<Partial<AirFilter>[]>(FALLBACK_FILTERS);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function loadFilters() {
      try {
        const cat = activeTab === 'all' ? undefined : activeTab;
        const res = await ApiService.getFilters(cat);
        if (res && res.length > 0) {
          setFilters(res);
        }
      } catch (err) {
        console.warn('Backend filters endpoint offline, displaying certified fallback filtration data:', err);
      }
    }
    loadFilters();
  }, [activeTab]);

  const filteredItems = filters.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      !searchTerm ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.filterClass?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.frameMaterial?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-10 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label="EN 1822 & ISO 29463 CERTIFIED" variant="green" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              INDIVIDUALLY OIL-MIST / PAO SCAN TESTED
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
                High-Efficiency Cleanroom Air Filtration
              </h1>
              <p className="text-base text-brand-muted leading-relaxed">
                From pre-filtration dust arrestance to sub-micron terminal gel-seal HEPA and ULPA modules.
                Every filter is factory tested with certified DOP/PAO leak detection and MPPS efficiency reporting.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/Broucher.pdf"
                download="GMP_VISION_Filtration_Catalog.pdf"
                className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-4 py-2.5 rounded-md text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4 text-brand-green" />
                Filtration Datasheet
              </a>
              <Link
                to="/rfq?category=filters"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-4 py-2.5 rounded-md text-xs font-semibold shadow-hud transition-colors"
              >
                RFQ Air Filter Replacement
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-brand-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-soft text-brand-navy hover:bg-brand-border/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search by class, media or size..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md text-xs bg-brand-soft/40 border border-brand-border focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
            />
          </div>
        </div>
      </section>

      {/* 3. Filters Catalog Table / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((f, idx) => (
            <div
              key={f._id || idx}
              className="bg-white rounded-xl border border-brand-border hover:border-brand-primary/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Header */}
                <div className="p-5 border-b border-brand-border/60 bg-gradient-to-r from-brand-soft/60 to-white flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-brand-primary">
                    {f.filterClass}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-soft border border-brand-border text-brand-green font-bold">
                    VALIDATED
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <h3 className="text-base font-display font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                    {f.name}
                  </h3>

                  {/* Technical Specifications */}
                  <div className="bg-brand-soft/50 rounded-lg p-3 space-y-2 border border-brand-border/60 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-brand-muted">Efficiency:</span>
                      <span className="font-mono font-bold text-brand-navy text-right">
                        {f.efficiency}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-muted">Initial / Final ΔP:</span>
                      <span className="font-mono font-semibold text-brand-navy text-right">
                        {f.initialResistance} Pa / {f.finalResistance} Pa
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-muted">Rated Airflow:</span>
                      <span className="font-mono font-semibold text-brand-navy text-right">
                        {f.ratedAirflow} CFM
                      </span>
                    </div>
                    {f.dimensions && (
                      <div className="flex items-center justify-between">
                        <span className="text-brand-muted">Dimensions:</span>
                        <span className="font-mono font-semibold text-brand-navy text-right">
                          {f.dimensions.length} × {f.dimensions.width} × {f.dimensions.depth} mm
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-brand-muted">
                      <strong className="text-brand-navy font-mono">Frame:</strong> {f.frameMaterial}
                    </p>
                    <p className="text-brand-muted">
                      <strong className="text-brand-navy font-mono">Gasket:</strong> {f.gasketType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 border-t border-brand-border/60 bg-white flex items-center justify-between">
                <Link
                  to={`/rfq?filter=${encodeURIComponent(f.name || '')}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-brand-soft hover:bg-brand-primary hover:text-white text-brand-navy py-2 rounded-md transition-colors"
                >
                  Request Filter Quote
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Filtration Engineering Standards Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-soft rounded-xl p-8 border border-brand-border space-y-6">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-xl font-display font-bold text-brand-navy">
              ISO 14644-1 Cleanroom Particle Limits & Filter Selection Guide
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Achieving ISO Class 5 (Grade A) requires terminal H14 HEPA filters with 0.45 m/s uniform face velocity and minimum 45-60 air changes per hour (ACPH).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                iso: 'ISO Class 5 (Grade A)',
                particles: '≤ 3,520 particles/m³ @ 0.5μm',
                filter: 'Terminal H14 HEPA / U15 ULPA',
                acph: '45 - 60+ ACPH',
              },
              {
                iso: 'ISO Class 6 (Grade B)',
                particles: '≤ 35,200 particles/m³ @ 0.5μm',
                filter: 'H13 / H14 HEPA Modules',
                acph: '30 - 45 ACPH',
              },
              {
                iso: 'ISO Class 7 (Grade C)',
                particles: '≤ 352,000 particles/m³ @ 0.5μm',
                filter: 'F9 Fine + H13 HEPA',
                acph: '20 - 30 ACPH',
              },
              {
                iso: 'ISO Class 8 (Grade D)',
                particles: '≤ 3,520,000 particles/m³ @ 0.5μm',
                filter: 'G4 Pre + F8 Fine Filters',
                acph: '12 - 20 ACPH',
              },
            ].map((guide, gIdx) => (
              <div key={gIdx} className="bg-white p-4 rounded-lg border border-brand-border space-y-2">
                <span className="text-xs font-mono font-bold text-brand-primary">{guide.iso}</span>
                <p className="text-xs font-mono text-brand-navy font-semibold">{guide.particles}</p>
                <div className="text-[11px] text-brand-muted space-y-0.5 pt-1 border-t border-brand-border/60">
                  <p>Filter: {guide.filter}</p>
                  <p>Air Changes: {guide.acph}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
