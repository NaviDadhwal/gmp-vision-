export interface IProjectItem {
  id: string;
  clientName: string;
  scope: string;
  location: string;
  divisionSlug: string[];
  sector: 'Pharmaceutical' | 'Biotechnology' | 'Healthcare' | 'Industrial';
  completionYear: number;
  description: string;
  equipmentSupplied: string[];
  image: string;
  isFeatured: boolean;
  testimonial?: {
    quote: string;
    author: string;
    designation: string;
  };
}

export const PROJECTS_DATA: IProjectItem[] = [
  {
    id: 'proj-1',
    clientName: 'M/s Zeon Healthcare / Lifesciences Ltd',
    scope: 'Turnkey HVAC Installation with Integrated 21 CFR Part 11 EMS',
    location: 'Paonta Sahib, Himachal Pradesh',
    divisionSlug: ['hvac-air-handling', 'automation-validation', 'air-filtration'],
    sector: 'Pharmaceutical',
    completionYear: 2023,
    description: 'Complete turnkey HVAC installation across solid oral dosage and formulation blocks. Integrated with centralized Environmental Monitoring System (EMS) logging differential pressure, temperature, and RH trends for USFDA audit readiness.',
    equipmentSupplied: ['8 Double Skin AHUs', 'Complete SMACNA GI Ductwork', 'Gel-Seal HEPA Ceiling Grid', '21 CFR Part 11 Central EMS'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    testimonial: {
      quote: 'GMP VISION delivered the turnkey HVAC and EMS installation within aggressive timelines. Their engineering precision ensured our plant passed cleanroom validation seamlessly.',
      author: 'Technical Director',
      designation: 'Zeon Lifesciences Ltd'
    }
  },
  {
    id: 'proj-2',
    clientName: 'M/s Windlas Biotech Ltd (Plants 4 & 6)',
    scope: 'AHUs, Desiccant Dehumidifiers (DAHU) & HVAC Installation',
    location: 'Dehradun, Uttarakhand',
    divisionSlug: ['hvac-air-handling', 'air-filtration'],
    sector: 'Pharmaceutical',
    completionYear: 2024,
    description: 'Designed and commissioned dedicated low-humidity HVAC systems for effervescent tablet compression and packaging suites requiring sustained <25% RH conditions.',
    equipmentSupplied: ['4 Desiccant Dehumidifiers (DAHU)', '12 Double Skin AHUs', 'Chilled Water Piping Skids', 'Terminal HEPA Modules'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    testimonial: {
      quote: 'The desiccant rotor units engineered by GMP VISION have maintained rock-solid RH levels in our hygroscopic formulation suites for over a year with zero downtime.',
      author: 'Plant Engineering Head',
      designation: 'Windlas Biotech Ltd'
    }
  },
  {
    id: 'proj-3',
    clientName: 'M/s BioMarq Labs [Mankind Pharma Group]',
    scope: 'Turnkey Cleanroom (CRP) & High-Containment HVAC System',
    location: 'Selaqui Industrial Area, Dehradun',
    divisionSlug: ['cleanroom-panels', 'hvac-air-handling', 'automation-validation'],
    sector: 'Biotechnology',
    completionYear: 2023,
    description: 'Turnkey modular cleanroom panel installation and dedicated HVAC infrastructure for specialized diagnostic reagent synthesis and quality control laboratories.',
    equipmentSupplied: ['Modular PUF Wall & Ceiling Panels (100mm)', 'Flush Cleanroom Doors with Interlocks', 'High-Flow V-Bank HEPA Filters', 'BMS Control Automation'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'proj-4',
    clientName: 'M/s Hindustan Antibiotics Ltd',
    scope: 'Turnkey Cleanroom Infrastructure & High-Capacity HVAC System',
    location: 'Pimpri, Pune, Maharashtra',
    divisionSlug: ['cleanroom-panels', 'hvac-air-handling', 'piping-fabrication'],
    sector: 'Pharmaceutical',
    completionYear: 2022,
    description: 'Major public sector pharmaceutical cleanroom modernization encompassing modular panels, sanitary process piping, and complete HVAC plant erection.',
    equipmentSupplied: ['Modular PPGI PUF Panels (80mm)', 'Heavy MS Condenser Piping', 'Double Skin AHUs', 'Cleanroom Pass Boxes & LAF'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'proj-5',
    clientName: 'M/s Infuze Well Pvt Ltd',
    scope: '54 HVAC Units Installation across 4 Large Volume Parenteral (LVP) Lines',
    location: 'Mohali, Punjab',
    divisionSlug: ['hvac-air-handling', 'piping-fabrication', 'air-filtration'],
    sector: 'Pharmaceutical',
    completionYear: 2024,
    description: 'Massive injectable manufacturing facility requiring 54 dedicated AHU units, Class 100 Grade A aseptic filling hoods, and orbital welded WFI loops.',
    equipmentSupplied: ['54 Custom Double Skin AHUs', 'Orbital Welded SS 316L WFI Loop', 'Gel-Seal H14 HEPA Grid', 'Terminal Diffusers with DOP Ports'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    isFeatured: true
  },
  {
    id: 'proj-6',
    clientName: 'M/s Penam Lifesciences / Biosciences',
    scope: 'Turnkey HVAC & Cleanroom Erection',
    location: 'Kala Amb, Himachal Pradesh & Yamuna Nagar',
    divisionSlug: ['cleanroom-panels', 'hvac-air-handling'],
    sector: 'Pharmaceutical',
    completionYear: 2022,
    description: 'End-to-end cleanroom project including PUF wall and ceiling panels, AHUs, return air risers, and epoxy flooring.',
    equipmentSupplied: ['50mm PUF Panels', 'Direct Expansion AHUs', 'Anti-static Epoxy Flooring', 'SS 304 Grills'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-7',
    clientName: 'M/s Wallace Pharma (Units 1 & 2)',
    scope: 'Ductwork, AHU Units & Chilled Water Piping Coils',
    location: 'Kala Amb, HP & Jammu',
    divisionSlug: ['hvac-air-handling', 'piping-fabrication'],
    sector: 'Pharmaceutical',
    completionYear: 2021,
    description: 'Precision GI ducting fabrication and installation alongside high-efficiency chilled water coil retrofits.',
    equipmentSupplied: ['Galvanized Iron SMACNA Ducting', 'CHW Cooling Coils', 'Modular AHUs', 'Air Dampers'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-8',
    clientName: 'M/s Verve Human Care',
    scope: 'Turnkey HVAC System & Dedicated R&D Center Fit-out',
    location: 'Dehradun, Uttarakhand',
    divisionSlug: ['hvac-air-handling', 'cleanroom-panels', 'automation-validation'],
    sector: 'Healthcare',
    completionYear: 2023,
    description: 'Modern research laboratory suite featuring Class B cleanrooms, fume hood exhaust ductwork, and specialized testing facilities.',
    equipmentSupplied: ['Walkable Cleanroom Ceiling', 'Laboratory AHU Skids', 'VAV Exhaust Fans', 'Particle Counter EMS'],
    image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-9',
    clientName: 'M/s Skins Pharma',
    scope: 'Turnkey HVAC Cleanroom Project',
    location: 'Baddi Industrial Area, Himachal Pradesh',
    divisionSlug: ['hvac-air-handling', 'air-filtration'],
    sector: 'Pharmaceutical',
    completionYear: 2022,
    description: 'Topical formulations and ointment block HVAC engineering with positive pressure cascades.',
    equipmentSupplied: ['AHUs with Plug Fans', 'Return Air Risers', 'Fine & HEPA Filters', 'Pressure Relief Dampers'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-10',
    clientName: 'M/s SKS Metals',
    scope: 'Heavy Industrial HVAC & Dehumidification System',
    location: 'Kala Amb, Himachal Pradesh',
    divisionSlug: ['hvac-air-handling', 'electrical-fire'],
    sector: 'Industrial',
    completionYear: 2023,
    description: 'Industrial ventilation and industrial humidity reduction setup for high-tolerance metal processing suites.',
    equipmentSupplied: ['Industrial Dehumidifier Units', 'Heavy MS Ventilation Ductwork', 'MCC Electrical Panels'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-11',
    clientName: 'M/s Osppa Enterprise',
    scope: 'Precision Dehumidification Project',
    location: 'Ahmedabad, Gujarat',
    divisionSlug: ['hvac-air-handling'],
    sector: 'Industrial',
    completionYear: 2021,
    description: 'Desiccant dehumidifier unit engineered for low relative humidity material drying applications.',
    equipmentSupplied: ['Desiccant Dehumidifier Unit (DAHU)', 'Reactivation Coils', 'Control Console'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  },
  {
    id: 'proj-12',
    clientName: 'M/s Apy Pharma',
    scope: 'AHU Units Supply & Erection',
    location: 'Guwahati, Assam',
    divisionSlug: ['hvac-air-handling'],
    sector: 'Pharmaceutical',
    completionYear: 2022,
    description: 'Supply and on-site assembly of modular double skin air handling units in North-East manufacturing hub.',
    equipmentSupplied: ['Double Skin AHUs', 'CHW Cooling Coils', 'Thermal Insulation'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  }
];

export const projects = PROJECTS_DATA;
