import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Division, Product } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

interface DivisionDetailInfo extends Partial<Division> {
  fullDetails: string;
  equipment: string[];
}

const DIVISION_FALLBACKS: Record<string, DivisionDetailInfo> = {
  'modular-cleanroom-panels': {
    title: 'Modular Cleanroom Panels & Partitions',
    name: 'Modular Cleanroom Panels & Partitions',
    slug: 'modular-cleanroom-panels',
    icon: 'Layers',
    description: 'Aseptic pre-engineered modular wall and ceiling panels manufactured with PUF, PIR, or Rockwool insulation. Designed for seamless pharmaceutical integration.',
    fullDetails: 'GMP Vision modular cleanroom wall and ceiling systems are engineered specifically for pharmaceutical manufacturing, biotech suites, and semiconductor production. Every panel is manufactured using CNC precision forming, ensuring flush joints that eliminate horizontal ledges and particulate accumulation. Available with FM approved fire ratings, walking ceiling load ratings up to 150 kg/m², and anti-fungal siliconized sealing.',
    standards: ['ISO 14644-1 Class 4 to 8', 'WHO-GMP Schedule M', 'FM Approved Fire Resistance', 'ASTM E84 Class A'],
    features: [
      '0.6mm to 0.8mm GPSP pre-coated / powder-coated or SS 304 skins',
      'High density PUF (40 ± 2 kg/m³) or Non-combustible Rockwool (100 kg/m³)',
      'Tongue and groove interlocking system with factory recessed silicone joint lines',
      'Integrated vertical return air risers with perforated SS grilles',
      'Walk-on ceiling panels with heavy duty threaded drop rod suspension',
      'Cutouts and reinforcement for flush HEPA diffusers and light fixtures'
    ],
    equipment: [
      'Modular PUF Cleanroom Wall Panels (50mm / 80mm / 100mm)',
      'Rockwool Fire-Rated Cleanroom Panels (2hr Rating)',
      'Heavy Duty Walk-On Ceiling Panel System',
      'Extruded Aluminum Coving (Ceiling, Floor, & 3-Way Corners)',
      'Flush Return Air Risers with Volume Control Dampers'
    ]
  },
  'hvac-ahu-systems': {
    title: 'HVAC & Air Handling Unit (AHU) Systems',
    name: 'HVAC & Air Handling Unit (AHU) Systems',
    slug: 'hvac-ahu-systems',
    icon: 'Wind',
    description: 'High-performance double-skin thermal-break Air Handling Units and precision psychrometric cleanroom climate control.',
    fullDetails: 'Our pharmaceutical HVAC division designs, builds, and commissions specialized Air Handling Units designed to control temperature (21°C ± 2°C), relative humidity (45% ± 5% RH), room differential pressure cascade (+15 to +45 Pa), and air change rates up to 60 ACPH. Thermal-break aluminum framework eliminates internal and external condensation.',
    standards: ['DIN 1886 Eurovent T2/TB2', 'EN 1886 Class L1 Air Leakage', 'US FDA 21 CFR Part 211', 'EU cGMP Annex 1'],
    features: [
      'Extruded aluminum profile with thermal break barrier & 43mm/50mm PUF panels',
      'Direct-drive plug fans with IE4/EC high-efficiency backward curved impellers',
      'Hydrophilic coated aluminum cooling coils with SS 304 drain pan slope',
      'Precision steam/electric humidifiers and electric reheat batteries',
      'Modbus / BACnet integrated DDC automation controllers for VAV tracking',
      'Positive pressure retention logic with auto-modulating dampers'
    ],
    equipment: [
      'Double-Skin Thermal Break Air Handling Units (1,000 to 45,000 CFM)',
      'Once-Through / 100% Fresh Air AHU for Potent API Facilities',
      'Condensing Units & Precision Chillers',
      'Galvanized Iron (GI) Ductwork with Factory Pressure Testing',
      'Volume Control Dampers (VCD) & Fire Smoke Dampers (FSD)'
    ]
  },
  'cleanroom-doors-windows': {
    title: 'Cleanroom Flush Doors & Viewing Windows',
    name: 'Cleanroom Flush Doors & Viewing Windows',
    slug: 'cleanroom-doors-windows',
    icon: 'DoorOpen',
    description: 'Aseptic flush swing and sliding doors with automatic drop seals and double-glazed flush viewing windows.',
    fullDetails: 'Cleanroom flush doors are an essential barrier for maintaining differential pressure cascades and preventing particulate cross-contamination. Constructed without ledges, GMP Vision doors feature concealed drop seals that compress against the threshold upon closure, and double-glazed flush view panels with built-in silica desiccant to prevent internal fogging.',
    standards: ['ISO 14644-1 Airtight Seal', 'Schedule M Ledge-Free', 'BS 476 Part 22 Fire Rated', 'FDA Sanitary Design'],
    features: [
      'Single and double leaf configurations in GI powder coated or SS 304',
      'Honeycomb / Rockwool / PUF core with zero warp stability',
      'Heavy-duty flush SS 304 hinges and flush D-handles',
      'Automatic acoustic and pressure drop bottom seals',
      'Interlocking relay control (2-door / 3-door / 4-door Airlock Logic)',
      '5mm double-glazed toughened safety glass with black perimeter ceramic border'
    ],
    equipment: [
      'Flush GI Cleanroom Swing Doors (Single / Double Leaf)',
      'SS 304 Pharmaceutical Surgical Suite Doors',
      'Automated Cleanroom Sliding Doors with Foot / Radar Sensors',
      'Double Glazed Flush Cleanroom Viewing Panels',
      'Electromagnetic Microprocessor Interlocking System'
    ]
  },
  'laminar-airflow-biosafety': {
    title: 'Laminar Air Flow (LAF) & Biosafety Equipment',
    name: 'Laminar Air Flow (LAF) & Biosafety Equipment',
    slug: 'laminar-airflow-biosafety',
    icon: 'Shield',
    description: 'Class 100 unidirectional airflow workstations, reverse laminar flow dispensing booths, and Class II biosafety cabinets.',
    fullDetails: 'GMP Vision designs and manufactures clean air workstations that provide ISO Class 5 (Grade A) micro-environments for critical aseptic handling, sterile vial filling, microbial sampling, and weighing/dispensing operations. Equipped with perforated SS 304 diffusers and DOP test ports.',
    standards: ['ISO 14644-1 Class 5 (Grade A)', 'EN 12469 Biosafety Standards', 'NSF 49 Certification Criteria'],
    features: [
      'Unidirectional laminar air velocity of 0.45 m/s ± 20% across entire filter face',
      'SS 304 / SS 316L satin finish construction with coved internal corners for cleanability',
      'Gel-seal mini-pleat HEPA filters rated 99.997% at 0.3 micron',
      'Integral aerosol challenge ports and PAO upstream sampling nozzles',
      'Differential pressure Magnehelic gauges for filter pressure drop monitoring',
      'Touchscreen or digital membrane switches for fan, light, and UV timer control'
    ],
    equipment: [
      'Vertical Laminar Air Flow Workstations (VLAF)',
      'Horizontal Laminar Air Flow Workstations (HLAF)',
      'Reverse Laminar Airflow (RLAF) / Dispensing & Sampling Booths',
      'Class II Type A2 Biosafety Cabinets',
      'Mobile Dynamic HEPA Trolleys with Battery Backup'
    ]
  },
  'pass-boxes-airlocks': {
    title: 'Pass Boxes & Dynamic Airlocks',
    name: 'Pass Boxes & Dynamic Airlocks',
    slug: 'pass-boxes-airlocks',
    icon: 'Box',
    description: 'Aseptic material transfer hatches with electromagnetic interlocking, HEPA filtration, and germicidal UV lamps.',
    fullDetails: 'Designed for transferring materials between different cleanroom classification zones (e.g., Grade C to Grade B, or Grade B to Grade A) without personnel entry. Available in static versions for equal-grade zones and dynamic versions with internal recirculatory HEPA air showers.',
    standards: ['cGMP Material Handling Guidelines', 'Schedule M Approved Barrier', 'IP54 Electrical Ingress'],
    features: [
      'Full SS 304 / SS 316 construction with internal coved corners for easy wipe-down',
      'Electronic or electromagnetic interlocking preventing both doors opening simultaneously',
      'Dynamic models include built-in blower, G4 pre-filter, and H14 HEPA filter',
      'UV-C germicidal disinfection tube with door safety interlock logic',
      'Emergency door release push button and LED door status indicators',
      'Toughened glass flush view panels with siliconized peripheral seals'
    ],
    equipment: [
      'Static Pass Box (GI Powder Coated / SS 304)',
      'Dynamic Pass Box with 0.45 m/s HEPA Recirculation',
      'Air Showers for Personnel & Cargo Decontamination',
      'Floor-Mounted Trolley Transfer Airlock Chambers'
    ]
  },
  'air-filtration-systems': {
    title: 'Air Filtration & Terminal HEPA Units',
    name: 'Air Filtration & Terminal HEPA Units',
    slug: 'air-filtration-systems',
    icon: 'Filter',
    description: 'Full-spectrum air filtration from coarse G3 pre-filters to H14 terminal HEPA units and U15 ULPA filters.',
    fullDetails: 'Air filtration is the primary protective barrier in any controlled cleanroom facility. GMP Vision produces and supplies high-efficiency filters manufactured with sub-micron micro-fiberglass paper and hot-melt pleat separators. Every H13, H14, and U15 filter undergoes computerized oil mist leak testing.',
    standards: ['EN 1822:2019 MPPS Certified', 'ISO 29463 Filter Standards', 'Eurovent Certified Synthetic Media'],
    features: [
      'G3/G4 synthetic washable panel filters in extruded aluminum frames',
      'F7/F9 pocket / bag filters for secondary fine filtration in AHUs',
      'H13/H14 mini-pleat HEPA filters with aluminum separators or thermoplastic beads',
      'Polyurethane fluid gel seal or neoprene gasket seal executions',
      'Terminal ceiling HEPA modules with PAO aerosol challenge testing ports',
      'Face protective grilles on both upstream and downstream surfaces'
    ],
    equipment: [
      'Primary Pre-Filters (G3 / G4 Washable Synthetic)',
      'Secondary Pocket & Deep Pleat Filters (F7 / F8 / F9)',
      'Mini-Pleat HEPA Filters (H13 / H14 - 99.997% @ 0.3μm)',
      'Fluid Gel-Seal HEPA Modules for Cleanroom Ceilings',
      'Terminal Hood Ceiling Diffusers with Perforated Grilles'
    ]
  },
  'cleanroom-furniture-accessories': {
    title: 'Cleanroom SS 304 Furniture & Coving Profiles',
    name: 'Cleanroom SS 304 Furniture & Coving Profiles',
    slug: 'cleanroom-furniture-accessories',
    icon: 'Wrench',
    description: 'Sanitary pharmaceutical furnishings, crossover benches, garment cubicles, and coving accessories.',
    fullDetails: 'Complete your turnkey pharmaceutical cleanroom with sanitary stainless steel furniture manufactured strictly in SS 304 / SS 316. All welds are fully argon-purged, ground flush, and electro-polished or passivated to ensure zero microbial adhesion.',
    standards: ['cGMP Sanitary Equipment', 'ASTM A240 SS 304/316L', 'FDA Sterility Guidelines'],
    features: [
      'Sanitary tubular and sheet SS 304 construction with mirror or satin 240-grit finish',
      'No exposed threads, fasteners, or hollow cavities where dust can lodge',
      'Dynamic garment storage cubicles with integrated mini-HEPA air purge',
      'Crossover benches designed with shoe change compartments',
      'Two-piece clip-on aluminum coving with PVC soft lips for ceiling, wall, and floor junctions',
      'Full suite of SS 304 tables, sink units, waste bins, and mobile trolleys'
    ],
    equipment: [
      'Pharmaceutical Crossover Benches (SS 304)',
      'Dynamic Garment Storage Cubicles with UV & HEPA',
      'Sanitary SS 304 Work Tables & Inspection Desks',
      'Multi-Tier SS Shoe Racks & Lockers',
      'Clip-on Aluminum Cleanroom Coving & 3-Way Corner Pieces'
    ]
  }
};

export const DivisionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [division, setDivision] = useState<Division | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const fallback = slug && DIVISION_FALLBACKS[slug] ? DIVISION_FALLBACKS[slug] : null;

  useEffect(() => {
    async function loadData() {
      if (!slug) return;
      try {
        const data = await ApiService.getDivisionBySlug(slug);
        if (data && data.division) {
          setDivision(data.division);
          setProducts(data.products || []);
        }
      } catch (err) {
        console.warn('Backend unavailable, using rich client division specs:', err);
      }
    }
    loadData();
  }, [slug]);

  const activeTitle = division?.title || division?.name || fallback?.title || fallback?.name || 'Turnkey Division';
  const activeDesc = division?.description || fallback?.description || '';
  const activeFull = fallback?.fullDetails || division?.description || '';
  const activeStandards = division?.standards || fallback?.standards || ['ISO 14644-1', 'WHO-GMP Schedule M'];
  const activeFeatures = division?.features || fallback?.features || [];
  const activeEquipment = fallback?.equipment || [];

  return (
    <div className="space-y-16 py-8">
      {/* 1. Navigation Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/divisions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primaryHover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Turnkey Divisions
        </Link>
      </div>

      {/* 2. Division Hero Header */}
      <section className="bg-white border-b border-brand-border pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label="GMP CERTIFIED SCOPE" variant="green" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              DIVISION CODE: {slug?.toUpperCase() || 'TURNKEY'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight">
            {activeTitle}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-4xl leading-relaxed">
            {activeDesc}
          </p>

          {/* Standards Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {activeStandards.map((std, sIdx) => (
              <span
                key={sIdx}
                className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-brand-soft text-brand-navy border border-brand-border"
              >
                ● {std}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              to={`/rfq?division=${slug}`}
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-6 py-3 rounded-md font-semibold text-sm shadow-hud transition-colors"
            >
              Get Engineering Proposal for this Division
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/Broucher.pdf"
              download="GMP_VISION_Turnkey_Brochure.pdf"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-5 py-3 rounded-md font-medium text-sm transition-colors"
            >
              <Download className="w-4 h-4 text-brand-green" />
              Download Technical Specifications
            </a>
          </div>
        </div>
      </section>

      {/* 3. Engineering Scope & Technical Specs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-display font-bold text-brand-navy">
                Engineering Design & Manufacturing Standards
              </h2>
              <p className="text-brand-muted leading-relaxed text-sm sm:text-base">
                {activeFull}
              </p>
            </div>

            {/* Key Technical Features */}
            {activeFeatures.length > 0 && (
              <div className="bg-white p-6 rounded-xl border border-brand-border shadow-card space-y-4">
                <h3 className="text-lg font-display font-bold text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                  Key Manufacturing & Cleanroom Highlights
                </h3>
                <ul className="grid grid-cols-1 gap-3">
                  {activeFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="text-sm text-brand-muted flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Division Equipment Roster & RFQ Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-soft p-6 rounded-xl border border-brand-border space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-mono font-bold text-brand-navy uppercase tracking-wider">
                  Equipment Portfolio
                </h3>
                <span className="text-xs font-mono text-brand-primary">IN-HOUSE BUILT</span>
              </div>

              <div className="space-y-2.5">
                {activeEquipment.map((eq, eIdx) => (
                  <div
                    key={eIdx}
                    className="p-3 bg-white rounded-lg border border-brand-border text-xs font-medium text-brand-navy flex items-center gap-2 shadow-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {eIdx + 1}
                    </span>
                    <span>{eq}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to={`/rfq?division=${slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white p-3 rounded-md font-semibold text-xs transition-colors shadow-sm"
                >
                  Configure Equipment RFQ
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Direct Engineering Desk Card */}
            <div className="bg-white p-6 rounded-xl border border-brand-border shadow-card space-y-4">
              <h4 className="text-sm font-bold text-brand-navy">Need Custom Engineering Dimensions?</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Our design office provides complete CAD layouts, airflow psychrometrics, and structural calculations for bespoke cleanrooms.
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                <span className="text-brand-muted">HOTLINE:</span>
                <a href="tel:+919818818818" className="text-brand-primary font-bold hover:underline">
                  +91-9818818818
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Associated Equipment / Products from Backend (if any) */}
      {products.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-8 border-t border-brand-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-brand-navy">
                Associated Equipment & Models
              </h2>
              <p className="text-sm text-brand-muted">
                Pre-configured pharmaceutical cleanroom products available in this division.
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-semibold text-brand-primary hover:text-brand-primaryHover flex items-center gap-1"
            >
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white p-5 rounded-xl border border-brand-border hover:border-brand-primary shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-brand-primary font-bold">
                    {p.modelNumber || 'GMP-PROD'}
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-1">{p.name}</h3>
                  <p className="text-xs text-brand-muted mt-2 line-clamp-2">{p.description}</p>
                </div>
                <Link
                  to={`/products/${p.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                >
                  View Specifications <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
