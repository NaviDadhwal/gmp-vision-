import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Product } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

const FALLBACK_PRODUCTS: Partial<Product>[] = [
  {
    _id: 'prod-1',
    name: 'Modular Cleanroom PUF Wall Panel System',
    slug: 'modular-puf-wall-panels',
    category: 'Modular Panels',
    modelNumber: 'GMP-PNL-50',
    description: 'Aseptic pre-fabricated 50mm/80mm PUF sandwich wall panels with progressive tongue-and-groove jointing and factory-coved interfaces.',
    specs: {
      'Panel Thickness': '50mm / 80mm / 100mm',
      'Skin Material': '0.8mm GPSP Powder Coated / SS 304',
      'Core Density': '40 ± 2 kg/m³ High-Density Polyurethane',
      'Fire Rating': 'Class 0 / Class 1 (BS 476 Part 7)',
      'Joint Type': 'Silicone-sealed Progressive Flush Interlock',
    },
    standards: ['ISO 14644-1 Class 4-8', 'cGMP Schedule M'],
    status: 'active',
    featured: true,
  },
  {
    _id: 'prod-2',
    name: 'Double-Skin Thermal Break AHU (Air Handling Unit)',
    slug: 'double-skin-thermal-break-ahu',
    category: 'HVAC & AHU',
    modelNumber: 'GMP-AHU-15K',
    description: 'Precision cleanroom air handling unit with extruded aluminum thermal-break framework, EC plug fan, and differential pressure cascades.',
    specs: {
      'Air Capacity': '1,000 to 45,000 CFM',
      'Casing Construction': '43mm/50mm Double-Skin PUF Injected',
      'Thermal Transmittance': 'Eurovent Class T2 / TB2',
      'Fan Type': 'Direct-Drive EC Plug Fan (IE4 Equivalent)',
      'Filter Stages': 'G4 Pre + F8 Fine + Terminal H14 HEPA',
    },
    standards: ['Eurovent Certified', 'DIN 1886', 'EU cGMP Annex 1'],
    status: 'active',
    featured: true,
  },
  {
    _id: 'prod-3',
    name: 'Dynamic Pass Box with HEPA Recirculation',
    slug: 'dynamic-pass-box-hepa',
    category: 'Pass Boxes',
    modelNumber: 'GMP-DPB-600',
    description: 'Stainless steel 304 dynamic material transfer hatch equipped with internal 0.45 m/s HEPA airflow, electromagnetic interlocking, and UV-C sterilization.',
    specs: {
      'Internal Dimensions': '600 x 600 x 600 mm (Customizable)',
      'Material': 'SS 304 Mirror / Satin 240 Grit Finish',
      'Filtration': 'Mini-Pleat H14 HEPA (99.997% @ 0.3μm)',
      'Interlock System': '12V DC Electromagnetic Relay Interlocking',
      'UV Protection': 'Quartz Germicidal UV Tube with Auto Shutoff',
    },
    standards: ['ISO 14644-1 Class 5', 'WHO-GMP Schedule M'],
    status: 'active',
    featured: true,
  },
  {
    _id: 'prod-4',
    name: 'Vertical Laminar Air Flow Workstation (VLAF)',
    slug: 'vertical-laminar-airflow-workstation',
    category: 'Laminar Air Flow',
    modelNumber: 'GMP-VLAF-1200',
    description: 'Unidirectional ISO Class 5 clean air cabinet designed for critical sterile sampling, ampoule inspection, and aseptic pharmaceutical operations.',
    specs: {
      'Work Area Size': '1200 x 600 x 650 mm',
      'Air Velocity': '0.45 m/s ± 20% (Uniform Profile)',
      'Cleanliness Class': 'ISO Class 5 (Grade A / Class 100)',
      'Work Surface': 'Perforated SS 304 Removable Table Top',
      'Pressure Monitoring': 'Analogue Magnehelic Gauge (0-500 Pa)',
    },
    standards: ['ISO 14644-1 Class 5 (Grade A)', 'US FDA 21 CFR Part 211'],
    status: 'active',
    featured: true,
  },
  {
    _id: 'prod-5',
    name: 'Aseptic Flush GI / SS 304 Cleanroom Swing Door',
    slug: 'cleanroom-flush-swing-door',
    category: 'Cleanroom Doors',
    modelNumber: 'GMP-DR-S90',
    description: 'Double-glazed flush viewing window cleanroom swing door with automatic concealed bottom drop seal and heavy-duty flush SS 304 hinges.',
    specs: {
      'Clear Opening': '900 x 2100 mm / 1200 x 2100 mm (Single/Double)',
      'Door Leaf Core': 'High-Density Honeycomb / PUF / Rockwool',
      'Viewing Panel': 'Double-Glazed 5mm Toughened Flush Glass',
      'Bottom Seal': 'Automatic Concealed Neoprene Drop Seal',
      'Hardware': 'SS 304 Flush Handle, Mortise Lock & Concealed Closer',
    },
    standards: ['FDA Sanitary Guidelines', '120-Min Fire Rated'],
    status: 'active',
    featured: false,
  },
  {
    _id: 'prod-6',
    name: 'Reverse Laminar Airflow (RLAF) Dispensing Booth',
    slug: 'reverse-laminar-airflow-booth',
    category: 'Laminar Air Flow',
    modelNumber: 'GMP-RLAF-1500',
    description: 'Powder containment and dispensing booth engineered to protect operators, environment, and product during bulk chemical dispensing.',
    specs: {
      'Working Width': '1500 mm / 1800 mm / 2400 mm',
      'Containment Level': 'Safe Exposure Level down to 10 μg/m³ (OEL 3)',
      'Airflow Mode': 'Negative Pressure Recirculatory (10% Exhaust)',
      'Filtration Stages': '3-Stage (EU4 Pre, EU9 Fine, H14 Terminal)',
      'DOP Testing Port': 'Integrated Upstream PAO Injection & Scan Ports',
    },
    standards: ['ISPE Containment Guidelines', 'ISO 14644-1 Class 5'],
    status: 'active',
    featured: true,
  },
];

const CATEGORIES = [
  'All Categories',
  'Modular Panels',
  'HVAC & AHU',
  'Pass Boxes',
  'Laminar Air Flow',
  'Cleanroom Doors',
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Partial<Product>[]>(FALLBACK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await ApiService.getProducts({ limit: 50 });
        if (res && res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Backend unavailable, using validated product catalog fallback:', err);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || prod.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      prod.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.modelNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-10 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label="GMP EQUIPMENT CATALOG" variant="blue" pulse />
            <span className="text-xs font-mono text-brand-muted">
              SCHEDULE M & ISO 14644-1 COMPLIANT
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
                Pharmaceutical Cleanroom Products & Equipment
              </h1>
              <p className="text-base text-brand-muted leading-relaxed">
                Explore in-house manufactured aseptic equipment, modular panel assemblies, precision AHUs,
                and contamination control hardware with complete validation dossiers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/filters"
                className="inline-flex items-center gap-2 bg-brand-soft hover:bg-brand-soft/80 text-brand-navy border border-brand-border px-4 py-2.5 rounded-md text-xs font-bold font-mono transition-colors"
              >
                <Filter className="w-4 h-4 text-brand-primary" />
                Air Filters (HEPA / ULPA)
              </Link>
              <a
                href="/Broucher.pdf"
                download="GMP_VISION_Products_Brochure.pdf"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-4 py-2.5 rounded-md text-xs font-semibold shadow-hud transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Full Catalog
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filters & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-brand-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-brand-soft text-brand-navy hover:bg-brand-border/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              placeholder="Search equipment or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md text-xs bg-brand-soft/40 border border-brand-border focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy placeholder-brand-muted"
            />
          </div>
        </div>
      </section>

      {/* 3. Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-brand-border space-y-3">
            <Layers className="w-10 h-10 text-brand-muted mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-brand-navy">No equipment matches found</h3>
            <p className="text-xs text-brand-muted">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSearchTerm('');
              }}
              className="text-xs font-semibold text-brand-primary underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod._id || prod.slug}
                className="bg-white rounded-xl border border-brand-border hover:border-brand-primary/50 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header with Model & Category */}
                  <div className="p-5 border-b border-brand-border/60 bg-gradient-to-r from-brand-soft/50 to-white flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-brand-primary">
                      {prod.modelNumber || 'GMP-EQUIP'}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-brand-border text-brand-muted">
                      {prod.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h2 className="text-lg font-display font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                      {prod.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed line-clamp-3">
                      {prod.description}
                    </p>

                    {/* Key Technical Specifications Table */}
                    {prod.specs && (
                      <div className="bg-brand-soft/60 rounded-lg p-3 space-y-1.5 border border-brand-border/60">
                        <span className="text-[10px] font-mono font-bold uppercase text-brand-navy">
                          Technical Parameters:
                        </span>
                        {Object.entries(prod.specs).slice(0, 3).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="text-brand-muted truncate max-w-[120px]">{key}:</span>
                            <span className="font-mono font-semibold text-brand-navy text-right truncate max-w-[150px]">
                              {String(val)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Standards Badges */}
                    {prod.standards && prod.standards.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {prod.standards.map((std, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-brand-soft text-brand-navy border border-brand-border"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-5 border-t border-brand-border/60 bg-white flex items-center justify-between">
                  <Link
                    to={`/products/${prod.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-primaryHover group-hover:translate-x-0.5 transition-all"
                  >
                    View Specs & Drawings
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/rfq?product=${prod.slug}`}
                    className="text-xs font-mono font-bold text-brand-green hover:underline"
                  >
                    RFQ Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Bottom Engineering Assistance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-soft rounded-xl p-8 border border-brand-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-display font-bold text-brand-navy">
              Looking for custom dimensions or bespoke cleanroom equipment?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted">
              We fabricate custom sizes for pass boxes, LAF stations, and air handling equipment tailored to your structural constraints.
            </p>
          </div>
          <Link
            to="/rfq"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-3 rounded-md text-xs font-semibold shadow-hud shrink-0"
          >
            Submit Custom Specification
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
