export interface IFilterProduct {
  id: string;
  category: 'pre-filter' | 'fine-filter' | 'pocket-bag' | 'gel-seal-hepa' | 'standard-hepa' | 'high-flow-hepa' | 'semi-hepa' | 'wire-mesh';
  name: string;
  micronRating: string;
  efficiency: string;
  mediaConstruction: string;
  frame: string;
  applications: string[];
  keyFeature: string;
  image: string;
  specSheetUrl?: string;
  dimensionsAvailable: string[];
}

export interface IAirDistributionItem {
  id: string;
  name: string;
  type: 'terminal-housing' | 'grill-diffuser' | 'pass-box' | 'air-shower' | 'laf-bench' | 'rlaf-booth';
  description: string;
  material: string;
  features: string[];
  image: string;
}

export const FILTRATION_CATALOG: IFilterProduct[] = [
  {
    id: 'flt-1',
    category: 'pre-filter',
    name: 'Washable Synthetic Pre-Filter',
    micronRating: '10 Micron (10µ)',
    efficiency: '90% arrestance (G3/G4)',
    mediaConstruction: 'Non-woven synthetic polyester washable media with galvanized steel wire backing grid',
    frame: 'Extruded Anodized Aluminum / Galvanized Iron (GI)',
    applications: ['Fresh air intakes', 'AHU primary stage', 'Return air risers', 'General ventilation'],
    keyFeature: 'Washable media with high dust holding capacity',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 50 mm', '610 x 305 x 50 mm', 'Custom sizes on order']
  },
  {
    id: 'flt-2',
    category: 'fine-filter',
    name: 'Micro-Fiber Fine Filter',
    micronRating: '1µ / 3µ / 5µ',
    efficiency: '95% @ specified micron (EU5 to EU9 / F7-F9)',
    mediaConstruction: 'High-density synthetic non-woven micro-fiber pleated with hot-melt adhesive spacers',
    frame: 'Aluminum Alloy / Galvanized Iron sheet (24 Gauge)',
    applications: ['Secondary filtration stage in pharma AHUs', 'Hospital operation theatres', 'Cleanroom pre-HEPA protection'],
    keyFeature: 'Low initial pressure drop and extended service life',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 150 mm', '610 x 305 x 150 mm', '610 x 610 x 300 mm']
  },
  {
    id: 'flt-3',
    category: 'pocket-bag',
    name: 'Multi-Pocket Aerodynamic Bag Filter',
    micronRating: '3µ / 5µ / 10µ',
    efficiency: '65% to 85% ASHRAE (EU6 / EU7)',
    mediaConstruction: 'Multi-layer progressive density synthetic melt-blown media stitched into aerodynamic pockets',
    frame: 'Galvanized Steel Header (25mm) / Aluminum Header',
    applications: ['High dust burden cleanroom AHUs', 'Paint booth recirculating loops', 'HVAC secondary protection'],
    keyFeature: 'Self-supporting pockets ensure uniform airflow without pinching',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 600 mm (6/8 Pockets)', '610 x 305 x 600 mm (3/4 Pockets)']
  },
  {
    id: 'flt-4',
    category: 'gel-seal-hepa',
    name: 'Mini Pleat Gel-Seal HEPA Filter',
    micronRating: '0.3 Micron (0.3µ)',
    efficiency: '99.997% @ 0.3µ (H13/H14 Grade)',
    mediaConstruction: 'Ultra-fine water-repellent micro-glass fiber paper with continuous hot-melt thread separation',
    frame: 'Extruded Anodized Aluminum with continuous perimeter Gel Channel (polyurethane / silicone fluid)',
    applications: ['Grade A & Grade B sterile pharmaceutical suites', 'Aseptic filling lines', 'Terminal ceiling hoods'],
    keyFeature: 'Zero bypass air leakage via self-healing gel channel seal',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 75 mm (Gel Seal)', '610 x 610 x 90 mm', '1220 x 610 x 75 mm']
  },
  {
    id: 'flt-5',
    category: 'standard-hepa',
    name: 'Deep Pleat Standard HEPA Filter',
    micronRating: '0.3 Micron (0.3µ)',
    efficiency: '99.97% to 99.99% @ 0.3µ (H13)',
    mediaConstruction: 'Micro-glass fiber paper folded over corrugated aluminum foil separators',
    frame: 'Anodized Aluminum / Stainless Steel (SS 304)',
    applications: ['High airflow cleanroom ceilings', 'Laminar airflow workbenches', 'Bio-safety cabinets (BSL-2/3)'],
    keyFeature: 'High mechanical strength capable of handling up to 1000 Pa burst pressure',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 150 mm', '610 x 610 x 300 mm', '305 x 610 x 300 mm']
  },
  {
    id: 'flt-6',
    category: 'high-flow-hepa',
    name: 'High Flow V-Bank HEPA Filter',
    micronRating: '0.3 Micron (0.3µ)',
    efficiency: '99.99% @ 0.3µ (H13/H14)',
    mediaConstruction: 'Multiple mini-pleat panels configured in V-banks sealed with polyurethane into frame',
    frame: 'Corrosion-resistant ABS plastic / Galvanized Steel casing',
    applications: ['High CFM supply and exhaust ducts (up to 2000+ CFM per filter)', 'Air handling unit terminal stages'],
    keyFeature: 'Handles double the airflow of standard HEPA at identical face velocity',
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 292 mm (4V or 5V Packs)']
  },
  {
    id: 'flt-7',
    category: 'semi-hepa',
    name: 'Pleated Semi-HEPA Filter',
    micronRating: '0.3 Micron (0.3µ)',
    efficiency: '95% @ 0.3µ (EU9 / EU10)',
    mediaConstruction: 'Pleated micro-glass fiber media with EVA hot melt spacers',
    frame: 'Extruded Aluminum Frame with neoprene gasket',
    applications: ['Cleanroom airlocks and transition corridors', 'Secondary protection for final terminal HEPA'],
    keyFeature: 'Cost-effective bridge between fine filtration and ultra-high efficiency HEPA',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 69 mm', '610 x 610 x 100 mm']
  },
  {
    id: 'flt-8',
    category: 'wire-mesh',
    name: 'All-Aluminum Wire Mesh Filter',
    micronRating: 'Coarse particulate',
    efficiency: '65% arrestance (G2)',
    mediaConstruction: 'Multi-layered crimped aluminum wire mesh arranged in alternating corrugations',
    frame: 'Extruded Aluminum / Stainless Steel SS 304',
    applications: ['Fresh air moisture separators', 'Kitchen exhaust grease extraction', 'Industrial spark arrestors'],
    keyFeature: '100% washable, reusable, and flame-retardant',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    specSheetUrl: '#',
    dimensionsAvailable: ['610 x 610 x 25 mm', '610 x 610 x 50 mm', 'Custom dimensions']
  }
];

export const AIR_DISTRIBUTION_HARDWARE: IAirDistributionItem[] = [
  {
    id: 'adh-1',
    name: 'HEPA Terminal Housing with DOP Ports',
    type: 'terminal-housing',
    description: 'Ceiling-mounted plenum box equipped with knife-edge or flat gasket collar, internal butterfly damper regulator, and dual ports for aerosol injection and differential pressure measurement.',
    material: 'CRCA powder coated / Stainless Steel SS 304',
    features: ['In-situ DOP/PAO test aerosol injection port', 'Room-side damper adjustment', 'Flush mounting with modular PUF ceiling'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adh-2',
    name: 'SS 304 Perforated Grills & Diffusers',
    type: 'grill-diffuser',
    description: 'Precision laser-perforated cleanroom supply air diffusers, 4-way swirl diffusers, and Return Air Risers (RAR) with quick-release filter mounting latches.',
    material: 'Stainless Steel SS 304 (20 Gauge) hairline finish',
    features: ['Removable front face for cleanroom sanitization', 'Zero sharp edges or exposed screws', 'Uniform laminar air distribution'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adh-3',
    name: 'Dynamic & Static Pass Boxes',
    type: 'pass-box',
    description: 'Cleanroom transfer hatches with electromagnetic door interlocking, UV germicidal tube, hour meter, and dynamic HEPA airflow loop (ISO Class 5 internal suite).',
    material: 'Double-walled SS 304 with toughened safety glass doors',
    features: ['Electromagnetic interlocking prevents simultaneous opening', 'Built-in UV lamp with automatic door interlock', 'HEPA filtered mini-blower for dynamic transfer'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adh-4',
    name: 'Cleanroom Personnel Air Shower',
    type: 'air-shower',
    description: 'High-velocity de-dusting chamber equipped with 16 to 24 adjustable SS nozzles producing 25 m/s jet velocity to strip particulates before cleanroom entry.',
    material: 'SS 304 / Powder coated GI with motorized magnetic interlock doors',
    features: ['Automatic optical sensor activation', 'Programmable shower cycle (0-99 sec)', 'Closed-loop 99.997% HEPA recirculation'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adh-5',
    name: 'Laminar Air Flow (LAF) Workstations',
    type: 'laf-bench',
    description: 'Horizontal and vertical ISO Class 5 sterile workstations equipped with micro-glass HEPA filter, variable speed blower, and feather-touch control panel.',
    material: 'Electro-galvanized sheet / SS 304 working table',
    features: ['ISO Class 5 air purity across entire work surface', 'Anti-glare cleanroom LED illumination', 'Magnesense differential pressure gauge'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adh-6',
    name: 'Reverse Laminar Air Flow (RLAF) Booth',
    type: 'rlaf-booth',
    description: 'Sampling and dispensing booth designed to protect operator, product, and environment during active raw material chemical handling.',
    material: 'Complete Stainless Steel SS 304 construction',
    features: ['3-stage filtration (Pre, Fine, Terminal HEPA)', 'Negative pressure barrier prevents dust migration', 'Safe-change BIBO filter housing'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
  }
];

export const filterCategories = [
  { id: 'pre-filter', label: 'Synthetic Pre-Filters (10µ / G3-G4)' },
  { id: 'fine-filter', label: 'Micro-Fiber Fine Filters (1µ-5µ / F7-F9)' },
  { id: 'pocket-bag', label: 'Pocket Bag Filters (EU6 / EU7)' },
  { id: 'gel-seal-hepa', label: 'Gel-Seal Terminal HEPA (H14 EN1822)' },
  { id: 'standard-hepa', label: 'Box-Type Deep Pleat HEPA (99.97%)' },
  { id: 'high-flow-hepa', label: 'V-Bank High Flow HEPA (2000+ CFM)' },
  { id: 'semi-hepa', label: 'Pleated Semi-HEPA Filters (EU9/10)' },
  { id: 'wire-mesh', label: 'Aluminum Wire Mesh Moisture Separators' },
];

export const filters = FILTRATION_CATALOG;
