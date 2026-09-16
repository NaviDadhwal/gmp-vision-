import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
  monochrome?: boolean;
}

// 1. Mankind / BioMarq Labs
export const MankindLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Mankind Pharma / BioMarq">
    <rect width="36" height="36" rx="6" fill="#0A3B85" />
    <path d="M18 9V27M9 18H27" stroke="#3DAE2B" strokeWidth="4" strokeLinecap="round" />
    <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
    <text x="44" y="22" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="800" fill="#051C42" letterSpacing="-0.02em">
      Mankind
    </text>
    <text x="115" y="22" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="800" fill="#3DAE2B">
      +
    </text>
    <text x="44" y="34" fontFamily="'Inter', sans-serif" fontSize="9" fontWeight="600" fill="#64748B" letterSpacing="0.08em">
      BIOMARQ LABS
    </text>
  </svg>
);

// 2. Windlas Biotech Ltd
export const WindlasLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 170 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Windlas Biotech">
    <circle cx="18" cy="20" r="14" fill="#051C42" />
    <path d="M11 20C11 15 15 11 20 11C23 11 25 13 25 16C25 21 16 23 16 26" stroke="#3DAE2B" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="21" cy="26" r="1.5" fill="#3DAE2B" />
    <text x="40" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#0A3B85" letterSpacing="-0.01em">
      WINDLAS
    </text>
    <text x="40" y="33" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="700" fill="#3DAE2B" letterSpacing="0.06em">
      BIOTECH LIMITED
    </text>
  </svg>
);

// 3. Zeon Lifesciences Ltd
export const ZeonLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 175 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Zeon Lifesciences">
    <polygon points="18,6 30,13 30,27 18,34 6,27 6,13" fill="#0A3B85" />
    <polygon points="18,10 26,15 26,25 18,30 10,25 10,15" fill="#FFFFFF" />
    <path d="M13 16H23L13 24H23" stroke="#3DAE2B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="38" y="21" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="800" fill="#051C42" letterSpacing="0.02em">
      ZEON
    </text>
    <text x="38" y="33" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#64748B" letterSpacing="0.05em">
      LIFESCIENCES LTD
    </text>
  </svg>
);

// 4. Hindustan Antibiotics Ltd (HAL)
export const HALLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Hindustan Antibiotics Ltd">
    <rect x="2" y="6" width="30" height="28" rx="4" fill="#051C42" />
    <text x="7" y="25" fontFamily="'DM Sans', sans-serif" fontSize="13" fontWeight="900" fill="#FFFFFF" letterSpacing="0.05em">
      HAL
    </text>
    <text x="40" y="20" fontFamily="'DM Sans', sans-serif" fontSize="13" fontWeight="800" fill="#051C42">
      Hindustan Antibiotics
    </text>
    <text x="40" y="32" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" fill="#3DAE2B" letterSpacing="0.04em">
      GOVT. OF INDIA ENTERPRISE
    </text>
  </svg>
);

// 5. Wallace Pharma
export const WallaceLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Wallace Pharma">
    <circle cx="16" cy="20" r="12" fill="#0A3B85" />
    <path d="M10 16L14 24L18 18L22 24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="36" y="22" fontFamily="'DM Sans', sans-serif" fontSize="16" fontWeight="800" fill="#051C42" letterSpacing="-0.02em">
      WALLACE
    </text>
    <text x="36" y="33" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#64748B" letterSpacing="0.08em">
      PHARMACEUTICALS
    </text>
  </svg>
);

// 6. Infuze Well Pvt Ltd
export const InfuzeWellLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 165 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Infuze Well">
    <rect x="4" y="6" width="26" height="28" rx="6" fill="#F0FDF4" stroke="#3DAE2B" strokeWidth="2" />
    <path d="M17 11V29M12 18H22" stroke="#3DAE2B" strokeWidth="2.5" strokeLinecap="round" />
    <text x="38" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      INFUZE
    </text>
    <text x="96" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#3DAE2B">
      WELL
    </text>
    <text x="38" y="33" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="600" fill="#64748B" letterSpacing="0.06em">
      STERILE HEALTHCARE
    </text>
  </svg>
);

// 7. Penam Lifesciences
export const PenamLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 165 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Penam Lifesciences">
    <rect x="4" y="8" width="24" height="24" rx="4" fill="#0A3B85" />
    <circle cx="16" cy="20" r="6" fill="#3DAE2B" />
    <text x="36" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      PENAM
    </text>
    <text x="36" y="32" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#64748B" letterSpacing="0.06em">
      LIFESCIENCES LTD
    </text>
  </svg>
);

// 8. Verve Human Care
export const VerveLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Verve Human Care">
    <path d="M6 14C6 9 10 6 16 6C22 6 26 9 26 14C26 22 16 28 16 34" stroke="#3DAE2B" strokeWidth="3" strokeLinecap="round" />
    <circle cx="16" cy="20" r="3" fill="#0A3B85" />
    <text x="36" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      VERVE
    </text>
    <text x="36" y="33" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#3DAE2B" letterSpacing="0.05em">
      HUMAN CARE
    </text>
  </svg>
);

// 9. Skins Pharma
export const SkinsLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 155 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Skins Pharma">
    <circle cx="16" cy="20" r="12" fill="#F8FAFC" stroke="#0A3B85" strokeWidth="2" />
    <circle cx="16" cy="20" r="6" fill="#3DAE2B" />
    <text x="36" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      SKINS
    </text>
    <text x="36" y="32" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#64748B" letterSpacing="0.05em">
      PHARMACEUTICALS
    </text>
  </svg>
);

// 10. SKS Metals
export const SKSLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 150 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="SKS Metals">
    <rect x="4" y="8" width="24" height="24" fill="#051C42" rx="3" />
    <path d="M10 15H22M10 20H18M10 25H22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <text x="36" y="22" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      SKS METALS
    </text>
    <text x="36" y="33" fontFamily="'Inter', sans-serif" fontSize="8" fontWeight="700" fill="#64748B">
      INDUSTRIAL FABRICATION
    </text>
  </svg>
);

// 11. Osppa Enterprise
export const OsppaLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Osppa Enterprise">
    <circle cx="16" cy="20" r="12" fill="#0A3B85" />
    <circle cx="16" cy="20" r="5" fill="#FFFFFF" />
    <text x="36" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      OSPPA
    </text>
    <text x="36" y="32" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#3DAE2B" letterSpacing="0.05em">
      ENTERPRISE
    </text>
  </svg>
);

// 12. Apy Pharma
export const ApyLogo: React.FC<LogoProps> = ({ height = 36, className = '' }) => (
  <svg height={height} viewBox="0 0 150 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Apy Pharma">
    <polygon points="16,6 28,26 4,26" fill="#3DAE2B" />
    <circle cx="16" cy="20" r="3" fill="#FFFFFF" />
    <text x="36" y="21" fontFamily="'DM Sans', sans-serif" fontSize="15" fontWeight="800" fill="#051C42">
      APY PHARMA
    </text>
    <text x="36" y="32" fontFamily="'Inter', sans-serif" fontSize="8.5" fontWeight="600" fill="#64748B">
      FORMULATIONS
    </text>
  </svg>
);

// Helper function to return the matching logo component for a given company name
export const getClientLogo = (name: string, height: number = 36): React.ReactNode => {
  const normalized = name.toLowerCase();

  if (normalized.includes('mankind') || normalized.includes('biomarq')) {
    return <MankindLogo height={height} />;
  }
  if (normalized.includes('windlas')) {
    return <WindlasLogo height={height} />;
  }
  if (normalized.includes('zeon')) {
    return <ZeonLogo height={height} />;
  }
  if (normalized.includes('hindustan') || normalized.includes('antibiotics') || normalized.includes('hal')) {
    return <HALLogo height={height} />;
  }
  if (normalized.includes('wallace')) {
    return <WallaceLogo height={height} />;
  }
  if (normalized.includes('infuze')) {
    return <InfuzeWellLogo height={height} />;
  }
  if (normalized.includes('penam')) {
    return <PenamLogo height={height} />;
  }
  if (normalized.includes('verve')) {
    return <VerveLogo height={height} />;
  }
  if (normalized.includes('skin')) {
    return <SkinsLogo height={height} />;
  }
  if (normalized.includes('sks')) {
    return <SKSLogo height={height} />;
  }
  if (normalized.includes('osppa')) {
    return <OsppaLogo height={height} />;
  }
  if (normalized.includes('apy')) {
    return <ApyLogo height={height} />;
  }

  // Fallback generic pharma logo badge
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: `${height - 6}px`,
          height: `${height - 6}px`,
          borderRadius: '6px',
          backgroundColor: '#0A3B85',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '12px',
        }}
      >
        {name.substring(0, 2).toUpperCase()}
      </div>
      <div style={{ fontWeight: 700, fontSize: '13px', color: '#051C42' }}>{name}</div>
    </div>
  );
};
