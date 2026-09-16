export interface IDivisionItem {
  id: string;
  number: number;
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  heroImage: string;
  iconName: string;
  capabilities: string[];
  keyProducts: string[];
  standards: string[];
}

export const DIVISIONS_DATA: IDivisionItem[] = [
  {
    id: 'div-1',
    number: 1,
    slug: 'cleanroom-panels',
    title: 'Cleanroom Infrastructure & Modular Panel Systems',
    tagline: 'Sterile, Flush & Airtight cGMP Enclosures',
    shortDesc: 'Complete modular cleanroom construction utilizing 50mm, 80mm, and 100mm PUF sandwich panels, flush doors, and coving.',
    fullDesc: `GMP VISION delivers turnkey architectural cleanroom envelopes engineered to meet stringent cGMP, WHO-TRS, USFDA, and ISO 14644 standards. Our prefabricated modular systems eliminate 90° dust-trapping corners, guarantee airtight room cascading, and withstand aggressive cleaning regimens.`,
    heroImage: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Layers',
    capabilities: [
      '50mm, 80mm, and 100mm PUF insulated sandwich wall panels with PPGI / PPGL / SS 304 skins',
      'Walkable and non-walkable ceiling panels with integrated suspension hardware',
      'Single and double-leaf flush cleanroom doors with interlocking airlocks and drop seals',
      'Double-glazed flush vision panels with integrated silica desiccant to eliminate condensation',
      'Aluminum and PVC covings for wall-to-floor, wall-to-ceiling, and corner transitions',
      'Self-leveling anti-static epoxy and Polyurethane (PU) flooring systems'
    ],
    keyProducts: [
      'Modular PUF Cleanroom Panels',
      'Flush Cleanroom Doors with Airlocks',
      'Double-Glazed View Panels',
      'Cleanroom Extruded Covings',
      'Walkable Ceiling Grid Panels',
      'Chemical-Resistant Epoxy Flooring'
    ],
    standards: ['cGMP', 'ISO 14644-1', 'WHO-TRS 961', 'Schedule M']
  },
  {
    id: 'div-2',
    number: 2,
    slug: 'hvac-air-handling',
    title: 'HVAC & Air Handling Systems',
    tagline: 'Custom Double Skin AHUs, DAHU & Cleanroom Ducting',
    shortDesc: 'Engineered air management systems designed for precision temperature, humidity, and airflow control in compliance with ISHRAE/ASHRAE.',
    fullDesc: `We design, supply, and erect industrial-grade HVAC systems engineered for critical pharmaceutical suites, research laboratories, and manufacturing halls. Specializing in low-humidity desiccant dehumidification (<20% to 35% RH) and high-efficiency Double Skin AHUs.`,
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Wind',
    capabilities: [
      'Custom Double Skin AHUs with thermal-break extruded aluminum profiles and backward curved plug fans',
      'Desiccant Rotor Dehumidification Air Handling Units (DAHU) for hygroscopic formulations (<20% to 35% RH)',
      'High-efficiency Chilled Water (CHW), Hot Water (HW), and Direct Steam coil technology',
      'Direct Expansion (DX) and multi-split VRV/VRF commercial installations',
      'Factory-fabricated Galvanized Iron (GI) ducting compliant with SMACNA standards',
      'Closed-cell Nitrile rubber, XLPE, and high-density Glass Wool insulation'
    ],
    keyProducts: [
      'Double Skin Air Handling Units (AHU)',
      'Desiccant Dehumidifiers (DAHU)',
      'Chilled Water / DX Coils',
      'SMACNA Galvanized Iron (GI) Ductwork',
      'Heat Recovery Units (HRU)',
      'Fan Coil Units (FCU)'
    ],
    standards: ['ISHRAE Guidelines', 'ASHRAE Standard 62.1', 'ISO Class 5-8', 'SMACNA Class 4/8']
  },
  {
    id: 'div-3',
    number: 3,
    slug: 'air-filtration',
    title: 'Air Purification & Cleanroom Filtration',
    tagline: 'Zero-Bypass Gel-Seal HEPA & High-Flow Terminal Filtration',
    shortDesc: 'Direct manufacturing and distribution of EU5 to H14 air filters, terminal housings, and sterile air distribution hardware.',
    fullDesc: `Filtration is the heart of cleanroom sterility. GMP VISION manufactures and supplies an exhaustive range of tested air filters ranging from coarse 10-micron pre-filters to H14 99.997% Mini Pleat Gel-Seal HEPA filters ensuring zero bypass leakage in Grade A/B zones.`,
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=80',
    iconName: 'ShieldCheck',
    capabilities: [
      'Pre-filters (10µ) and Fine filters (1µ, 3µ, 5µ) with washable micro-fiber media',
      'Multi-pocket aerodynamic bag filters with galvanized steel headers',
      'Mini Pleat Gel-Seal HEPA filters (H13/H14, 99.997% @ 0.3µ) with silicone fluid channel seal',
      'Standard deep-pleat and high-flow V-bank HEPA filters (up to 2000+ CFM)',
      'Ceiling terminal housings with built-in PAO/DOP aerosol challenge ports and dampers',
      'SS 304 perforated grills, swirl diffusers, and Return Air Risers (RAR)'
    ],
    keyProducts: [
      'Mini Pleat Gel-Seal HEPA (H13/H14)',
      'High-Flow V-Bank HEPA Filters',
      'Pocket / Bag Pre-Filters',
      'HEPA Terminal Housings with DOP Ports',
      'SS 304 Cleanroom Diffusers & RAR',
      'Dynamic & Static Pass Boxes'
    ],
    standards: ['EN 1822', 'ISO 29463', 'USFDA Aseptic Guide', 'cGMP Schedule M']
  },
  {
    id: 'div-4',
    number: 4,
    slug: 'piping-fabrication',
    title: 'MS & SS Process Piping & Heavy Structural Fabrication',
    tagline: 'High-Purity Orbital Welded Loops & Heavy Industrial Skids',
    shortDesc: 'Sanitary SS 304/316L distribution piping for Purified Water (PW), WFI, and Pure Steam, alongside heavy industrial MS lines.',
    fullDesc: `Engineered high-purity fluid and gas transfer loops executed with computerized automatic orbital welding and 100% certified boroscopy documentation. We also execute heavy industrial chilled water condenser circuits and custom skid fabrications.`,
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Activity',
    capabilities: [
      'Sanitary SS 304 & SS 316L piping for Purified Water (PW), Water for Injection (WFI), and Pure Steam (PS)',
      'Computerized orbital welding with internal inert gas purging and 100% video boroscopy inspection',
      'Compressed Dry Air (CDA) and high-purity Nitrogen (N2) distribution lines',
      'Heavy-gauge MS seamless and ERW industrial chilled water and cooling tower piping',
      'Heavy-duty AHU mounting skids, vibration isolation bases, and overhead catwalks',
      'Custom cleanroom SS step-over benches, cross-over platforms, and glove dispensers'
    ],
    keyProducts: [
      'Orbital Welded WFI & PW Loops',
      'Pure Steam Distribution Manifolds',
      'MS Chilled Water Industrial Piping',
      'AHU Skid Platforms & Catwalks',
      'Tri-Clamp Sanitary Valve Clusters',
      'Stainless Steel Cleanroom Furniture'
    ],
    standards: ['ASME BPE 2022', 'IS 1239 / 3589', 'cGMP Water Guidelines']
  },
  {
    id: 'div-5',
    number: 5,
    slug: 'water-treatment',
    title: 'Industrial Water Treatment Systems (RO & ETP)',
    tagline: 'Multi-Stage Pure Water Generation & Zero Liquid Discharge',
    shortDesc: 'Turnkey industrial Reverse Osmosis (RO) plants and Effluent Treatment Plants (ETP) meeting stringent CPCB/SPCB environmental norms.',
    fullDesc: `Pure water generation is fundamental to pharmaceutical formulation, while compliant effluent management protects operating licenses. GMP VISION designs multi-stage pre-treatment, membrane separation, and full Zero Liquid Discharge (ZLD) effluent systems.`,
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Droplets',
    capabilities: [
      'Multi-stage Industrial RO Plants: MGF, Activated Carbon, Automated Softeners, Micron Filtration, RO, UF, UV',
      'High recovery RO membranes with low chemical fouling and automated CIP skid systems',
      'Turnkey ETP Plants: Equalization, flash mixing, coagulation, primary/secondary clarifiers, and biological aeration',
      'Tertiary treatment with pressure sand filters, activated carbon polishers, and ozone disinfection',
      'Zero Liquid Discharge (ZLD) integration with Multi-Effect Evaporators (MEE) and filter press dewatering',
      'Complete PLC/SCADA control panel with continuous online TOC and conductivity monitoring'
    ],
    keyProducts: [
      'Industrial RO Generation Skids',
      'Effluent Treatment Plants (ETP)',
      'Multi-Effect Evaporators (ZLD)',
      'Dual Media Sand & Carbon Filters',
      'Ultrafiltration (UF) Polishing Units',
      'Automated Chemical Dosing Stations'
    ],
    standards: ['CPCB / SPCB Guidelines', 'USP Purified Water Specs', 'WHO Water for Pharma']
  },
  {
    id: 'div-6',
    number: 6,
    slug: 'electrical-fire',
    title: 'Electrical Panels & Fire Plant Systems',
    tagline: 'Power Distribution, VFD Automation & Intelligent Fire Suppression',
    shortDesc: 'Engineered MCC/PCC control panels, cleanroom flush lighting, and microprocessor addressable fire alarm and suppression networks.',
    fullDesc: `Reliable power distribution and proactive fire protection are life-safety requirements for pharmaceutical and high-tech manufacturing plants. We fabricate CPRI-certified electrical control panels and erect turnkey fire detection and suppression networks.`,
    heroImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Zap',
    capabilities: [
      'Motor Control Centers (MCC) & Power Control Centers (PCC) with high short-circuit withstand capacity',
      'VFD Automation Panels for precise AHU blower speed modulation and static duct pressure control',
      'Cleanroom Remote Operating Panels (ROP) in flush SS 304 housing for room parameter monitoring',
      'Microprocessor-based Addressable and Conventional Fire Alarm Control Panels',
      'Cleanroom optical smoke detectors, rate-of-rise heat sensors, and automated HVAC fire shutdown interlocks',
      'Clean agent gas fire suppression systems (FM-200 and CO2 total flooding) for server and electrical suites'
    ],
    keyProducts: [
      'MCC & PCC Control Panels',
      'VFD AHU Automation Panels',
      'Cleanroom SS Remote Operating Panels',
      'Addressable Fire Alarm Panels',
      'FM-200 Clean Agent Fire Suppression',
      'IP65 Cleanroom Flush LED Luminaires'
    ],
    standards: ['IEC 61439', 'NFPA 72 & 2001', 'IS 732 / IS 2189', 'NBC 2016']
  },
  {
    id: 'div-7',
    number: 7,
    slug: 'automation-validation',
    title: 'Automation, BMS/EMS & Regulatory Validation',
    tagline: '21 CFR Part 11 Compliant EMS & Comprehensive DQ/IQ/OQ/PQ',
    shortDesc: 'Environmental Monitoring Systems (EMS), centralized SCADA, and certified cleanroom validation protocols for regulatory inspections.',
    fullDesc: `GMP VISION provides complete qualification and documentation services ensuring pharmaceutical plants satisfy USFDA, cGMP, and WHO audits. From 21 CFR Part 11 electronic audit trails to in-situ DOP/PAO HEPA testing and multi-point thermal mapping.`,
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    iconName: 'Cpu',
    capabilities: [
      'Centralized SCADA and PLC control architecture for plant-wide cleanroom and utility management',
      '21 CFR Part 11 Compliance: tamper-proof electronic audit trails, automated password security, and digital signatures',
      'Real-time multi-channel logging of Differential Pressure (ΔP), Temperature, Relative Humidity (%RH), and particles',
      'HVAC Validation Protocols: Design Qualification (DQ), Installation (IQ), Operational (OQ), Performance (PQ)',
      'HEPA Filter Integrity Testing: In-situ DOP / PAO challenge testing with calibrated aerosol photometers',
      'Airborne Particle Counting (ISO Class 5 to 8 at-rest and in-operation) and area thermal mapping'
    ],
    keyProducts: [
      '21 CFR Part 11 EMS Software & Skids',
      'Centralized BMS/SCADA Automation',
      'Turnkey DQ/IQ/OQ/PQ Protocol Execution',
      'In-Situ DOP/PAO Filter Testing Service',
      'Multi-Point Thermal Mapping Reports',
      'Pure Steam Non-Condensable Gas Testing'
    ],
    standards: ['USFDA 21 CFR Part 11', 'EU GMP Annex 1', 'GAMP 5 Guidelines', 'ISO 14644-3']
  }
];
