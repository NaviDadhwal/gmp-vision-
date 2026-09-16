export interface IProductItem {
  id: string;
  divisionSlug: string;
  category: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  specifications: Array<{ key: string; value: string }>;
  images: string[];
  isFeatured: boolean;
  tags: string[];
}

export const PRODUCTS_DATA: IProductItem[] = [
  {
    id: 'prod-1',
    divisionSlug: 'hvac-air-handling',
    category: 'Air Handling Units',
    name: 'Custom Double Skin AHU',
    slug: 'double-skin-ahu',
    tagline: 'Thermal-Break Extruded Profiles with Plug Fans',
    description: 'Engineered for pharmaceutical cleanrooms requiring ISO Class 5 to 8 air cleanliness. Features an outer pre-painted galvanized iron skin and inner SS 304 / GI lining with 40-50mm high-density injected polyurethane foam (PUF) insulation.',
    specifications: [
      { key: 'Airflow Capacity', value: '1,000 CFM to 40,000+ CFM' },
      { key: 'Insulation', value: '40mm / 50mm injected PUF (40 kg/m³ density)' },
      { key: 'Casing Profile', value: 'Thermal-break extruded anodized aluminum' },
      { key: 'Fan Type', value: 'Direct-driven backward curved plug fans / EC fans' },
      { key: 'Filtration Stages', value: 'Integrated Pre-filter (10µ) + Fine filter (3µ/5µ)' },
      { key: 'Compliance', value: 'Eurovent certified casing & cGMP Schedule M' }
    ],
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['AHU', 'HVAC', 'cGMP', 'Double Skin']
  },
  {
    id: 'prod-2',
    divisionSlug: 'hvac-air-handling',
    category: 'Dehumidifiers',
    name: 'Desiccant Rotor Dehumidification AHU (DAHU)',
    slug: 'desiccant-dehumidifier-dahu',
    tagline: 'Ultra-Low Relative Humidity (< 20% to 35% RH)',
    description: 'Specifically engineered for hygroscopic pharmaceutical formulation areas including effervescent tablet compression, soft gelatin encapsulation, dry syrup powder filling, and packaging suites.',
    specifications: [
      { key: 'Rotor Type', value: 'Active Silica Gel / Molecular Sieve Desiccant Honeycomb' },
      { key: 'RH Control Range', value: '< 20% RH to 35% RH (precision ±2%)' },
      { key: 'Reactivation Heating', value: 'Electric / Steam / Gas-fired reactivation coil' },
      { key: 'Application Areas', value: 'Effervescent suites, dry powder vials, packaging halls' },
      { key: 'Blower Control', value: 'VFD driven blowers with constant CFM tracking' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['DAHU', 'Low RH', 'Effervescent', 'Pharma']
  },
  {
    id: 'prod-3',
    divisionSlug: 'cleanroom-panels',
    category: 'Modular Wall Panels',
    name: '50mm / 80mm / 100mm PUF Cleanroom Panels',
    slug: 'puf-cleanroom-panels',
    tagline: 'Tongue & Groove Jointing with Flush Architectural Profiles',
    description: 'Sandwich panels insulated with fire-retardant rigid Polyurethane Foam (PUF), laminated between 0.6mm Pre-Painted Galvanized Iron (PPGI), Pre-Painted Galvalume (PPGL), or Stainless Steel SS 304 skins.',
    specifications: [
      { key: 'Panel Thickness', value: '50mm / 80mm / 100mm standard' },
      { key: 'Skin Material', value: 'PPGI (0.6mm) / PPGL / SS 304 Hairline finish' },
      { key: 'Insulation Core', value: 'Rigid CFC-free PUF (40 ± 2 kg/m³ density)' },
      { key: 'Joint Type', value: 'Self-aligning tongue-and-groove with silicone sealant groove' },
      { key: 'Fire Rating', value: 'B2 / Class 1 fire retardant core' },
      { key: 'Certification', value: 'ISO 14644 airtightness certified' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['PUF Panels', 'Cleanroom', 'Modular Walls', 'Schedule M']
  },
  {
    id: 'prod-4',
    divisionSlug: 'cleanroom-panels',
    category: 'Doors & Windows',
    name: 'Flush Metal Cleanroom Doors with Airlock Interlocks',
    slug: 'cleanroom-doors-airlocks',
    tagline: 'Zero-Lip Perimeter Seals with Automatic Drop Down Seals',
    description: 'Single-leaf and double-leaf flush metal cleanroom doors with concealed door closers, perimeter silicone gaskets, drop-down threshold seals, double-glazed view panels, and magnetic door interlocking systems.',
    specifications: [
      { key: 'Leaf Thickness', value: '45mm flush with wall surface' },
      { key: 'Construction', value: 'Galvanized steel powder-coated (1.2mm frame, 0.8mm shutter) / SS 304' },
      { key: 'Airlock Controller', value: 'Electromagnetic interlock prevents simultaneous door opening' },
      { key: 'View Panel', value: 'Double-glazed 6mm toughened glass flush with door surface' },
      { key: 'Hardware', value: 'SS 304 D-handles, push plates, concealed European closers' }
    ],
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['Doors', 'Airlocks', 'Cleanroom', 'Interlocking']
  },
  {
    id: 'prod-5',
    divisionSlug: 'piping-fabrication',
    category: 'Sanitary Process Piping',
    name: 'Orbital Welded SS 316L WFI & Purified Water Loops',
    slug: 'orbital-welded-wfi-loops',
    tagline: 'ASME BPE Compliant with 100% Video Boroscopy',
    description: 'High-purity distribution loops for Purified Water (PW), Water for Injection (WFI), and Pure Steam. Executed using automatic orbital TIG welding machines with closed weld heads, followed by electrochemical pickling and passivation.',
    specifications: [
      { key: 'Tube Material', value: 'Seamless SS 316L (ASTM A270 / ASME BPE SF1/SF4)' },
      { key: 'Internal Surface Finish', value: 'Ra ≤ 0.38 µm (15 µin) electropolished' },
      { key: 'Welding Method', value: 'Automatic orbital TIG with internal Argon purge gas' },
      { key: 'Inspection Quality', value: '100% video boroscopy logging + weld map documentation' },
      { key: 'Slope Gradient', value: 'Minimum 1:100 self-draining gradient without dead legs' }
    ],
    images: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['WFI', 'Purified Water', 'Orbital Welding', 'SS 316L']
  },
  {
    id: 'prod-6',
    divisionSlug: 'water-treatment',
    category: 'Reverse Osmosis',
    name: 'Multi-Stage Industrial RO Water Generation Skid',
    slug: 'industrial-ro-plant',
    tagline: 'High-Recovery Low-Fouling Pure Water Systems',
    description: 'Complete purified water generation systems comprising Multi-Grade Sand Filters (MGF), Activated Carbon Filters (ACF), automated duplex softeners, 5µ/1µ micron security cartridges, double-pass RO membranes, and Ultra-Filtration (UF).',
    specifications: [
      { key: 'Output Capacity', value: '500 LPH to 20,000+ LPH' },
      { key: 'Membrane Type', value: 'Polyamide thin-film composite sanitary membranes' },
      { key: 'Conductivity Output', value: '< 1.3 µS/cm @ 25°C (USP / EP Purified Water standard)' },
      { key: 'Control Automation', value: 'Siemens/Allen-Bradley PLC with color HMI touch screen' },
      { key: 'Sanitization', value: 'Hot water sanitizable skid option available' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['RO Plant', 'Water Treatment', 'Purified Water', 'USP']
  },
  {
    id: 'prod-7',
    divisionSlug: 'electrical-fire',
    category: 'Control Panels',
    name: 'Motor Control Centers (MCC) & VFD Automation Panels',
    slug: 'mcc-vfd-control-panels',
    tagline: 'Modular Compartmentalized Power & Airflow Modulation',
    description: 'CPRI-certified modular electrical distribution and control panels engineered for continuous industrial duty. Integrated with variable frequency drives (VFDs) for automatic duct static pressure and AHU airflow modulation.',
    specifications: [
      { key: 'Panel Standards', value: 'IEC 61439 Type 2 Form 4b compartmentalization' },
      { key: 'Ingress Protection', value: 'IP54 / IP55 powder-coated CRCA sheet steel (2mm)' },
      { key: 'VFD Brands', value: 'ABB / Schneider / Danfoss / Siemens' },
      { key: 'Safety Interlocks', value: 'Emergency stop, fire alarm trip signal integration' },
      { key: 'Busbar Material', value: '99.9% pure electrolytic grade copper / aluminum busbars' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
    tags: ['MCC', 'PCC', 'VFD', 'Electrical Panels']
  },
  {
    id: 'prod-8',
    divisionSlug: 'automation-validation',
    category: 'Validation Services',
    name: 'In-Situ DOP/PAO HEPA Filter Integrity Testing & Validation',
    slug: 'dop-pao-hepa-testing',
    tagline: 'Calibrated Aerosol Photometer Scans for Zero Leakage',
    description: 'Comprehensive regulatory validation executing in-situ aerosol challenge testing (using PAO/DOP aerosol generators and calibrated photometers) on ceiling terminal filters and equipment HEPA packs.',
    specifications: [
      { key: 'Test Standard', value: 'ISO 14644-3 / USFDA Aseptic Processing Guideline' },
      { key: 'Aerosol Challenge', value: 'Polyalphaolefin (PAO-4) / Di-octyl Phthalate (DOP)' },
      { key: 'Detection Equipment', value: 'Calibrated ATI 2i Aerosol Photometer' },
      { key: 'Pass Criteria', value: 'Leakage rate ≤ 0.01% of upstream challenge concentration' },
      { key: 'Deliverables', value: 'NABL traceable calibration certificate + qualification report' }
    ],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    tags: ['DOP Testing', 'PAO', 'HEPA Validation', 'ISO 14644']
  }
];

export const products = PRODUCTS_DATA;
