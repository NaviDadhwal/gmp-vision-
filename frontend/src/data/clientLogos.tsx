import React from 'react';

export interface ClientBrand {
  name: string;
  sub: string;
  logo: React.ReactNode;
}

export const CLIENT_LOGOS: ClientBrand[] = [
  {
    name: 'SUN PHARMA',
    sub: 'Active Cleanroom & HVAC',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <circle cx="20" cy="20" r="15" stroke="#F97316" strokeWidth="2.5" opacity="0.25" />
        <path
          d="M20 7C27.2 7 33 12.8 33 20C33 27.2 27.2 33 20 33C14.2 33 9.3 29.2 7.6 24"
          stroke="#EA580C"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="6.5" stroke="#EA580C" strokeWidth="2.8" />
      </svg>
    ),
  },
  {
    name: 'WALLACE PHARMA',
    sub: 'Turnkey HVAC & AMC',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <polygon
          points="20,3 35.5,12 35.5,28 20,37 4.5,28 4.5,12"
          fill="#F4F8FD"
          stroke="#0C54A0"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <line x1="20" y1="10.5" x2="20" y2="30" stroke="#0C54A0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="10" r="1.8" fill="#0C54A0" />
        <line x1="15.5" y1="30" x2="24.5" y2="30" stroke="#0C54A0" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="11" y1="14.5" x2="29" y2="14.5" stroke="#0C54A0" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 14.5L8.5 22.5M12 14.5L15.5 22.5" stroke="#0C54A0" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 22.5C8 25.2 16 25.2 16 22.5Z" fill="#0C54A0" />
        <path d="M28 14.5L24.5 22.5M28 14.5L31.5 22.5" stroke="#0C54A0" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M24 22.5C24 25.2 32 25.2 32 22.5Z" fill="#0C54A0" />
      </svg>
    ),
  },
  {
    name: 'BIODEAL PHARMA',
    sub: 'Sterile Injectables & AMC',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <path
          d="M 28 3.5 C 19 3 10 6 5.5 12 C 3 15.5 3 21 6.5 25.5 C 4 21 4 16 7 13 C 11.5 8 19 5.5 28 5.5 Z"
          fill="#0284C7"
        />
        <path
          d="M 26 5 C 16.5 5 8.5 8.5 4.5 14.5 C 2 18.5 2 24.5 6 29 C 3.5 24 3.5 18.5 6.5 15 C 10 10.5 17 7.5 26 7 Z"
          fill="#10B981"
        />
        <path
          d="M 7.5 16 C 3 21.5 3 28 6.5 32 C 11.5 37.5 21 38 35.5 32.5 C 23.5 36 13 35 8.5 30.5 C 5 26.5 5 21 8.5 16.5 Z"
          fill="#F97316"
        />
        <g transform="translate(13, 8)">
          <path
            d="M 0 0 H 11.5 C 15.5 0 18.5 2.2 18.5 5.5 C 18.5 7.8 17 9.2 15 10 C 17.5 11 19 12.8 19 15.5 C 19 19.2 15.5 21.5 11.5 21.5 H 0 Z"
            fill="#F97316"
            stroke="#10B981"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M 3 3.5 H 9 C 11.5 3.5 13 4.5 13 5.8 C 13 7.2 11.5 8 9 8 H 3 Z"
            fill="#FFFFFF"
            stroke="#10B981"
            strokeWidth="1.1"
          />
          <path
            d="M 3 13.5 H 9.5 C 12 13.5 13.5 14.5 13.5 16 C 13.5 17.5 12 18.2 9.5 18.2 H 3 Z"
            fill="#FFFFFF"
            stroke="#10B981"
            strokeWidth="1.1"
          />
          <path d="M 3 5.8 H 8" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 3 16 H 8.5" stroke="#F97316" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
    ),
  },
  {
    name: 'RACHIL REMEDIES',
    sub: 'cGMP Cleanroom Complex',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <path d="M20 5L33 10V20C33 27.5 27 33 20 35C13 33 7 27.5 7 20V10L20 5Z" fill="#EFF6FF" stroke="#1F56A8" strokeWidth="2" />
        <path d="M15 15H21C23.2 15 24.5 16.5 24.5 18.5C24.5 20.5 23.2 22 21 22H15V26M15 22L24 26" stroke="#1F56A8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'CB HEALTHCARE',
    sub: 'Modular Cleanroom & HVAC',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <rect x="6" y="6" width="12" height="12" rx="3.5" fill="#E11D48" />
        <rect x="22" y="6" width="12" height="12" rx="3.5" fill="#84CC16" />
        <rect x="6" y="22" width="12" height="12" rx="3.5" fill="#F59E0B" />
        <rect x="22" y="22" width="12" height="12" rx="3.5" fill="#991B1B" />
      </svg>
    ),
  },
  {
    name: 'MEDIWELL',
    sub: 'Aseptic Cleanroom Upgrades',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <path d="M10 28C6 22 7 14 13 9C19 4 28 5 32 10" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="21" cy="13" r="3" fill="#DC2626" />
        <path d="M14 18C18 20 24 20 28 18M18 21L21 29L24 21" stroke="#DC2626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'SHARIKA BIOTECH',
    sub: 'Biotech Biosafety Suite',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <g transform="rotate(-38 20 20)">
          <rect x="12" y="7" width="16" height="13" rx="6.5" fill="#1E3A8A" />
          <rect x="12" y="20" width="16" height="13" rx="6.5" fill="#0284C7" />
          <circle cx="20" cy="20" r="3.2" fill="white" />
          <path d="M16 20H24" stroke="white" strokeWidth="1.5" />
        </g>
      </svg>
    ),
  },
  {
    name: 'AZANTIC BIO TECH',
    sub: 'Dynamic Airlocks & Isolation',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <polygon points="20,5 32,12 32,26 20,33 8,26 8,12" stroke="#0284C7" strokeWidth="2.2" fill="#F0F9FF" />
        <circle cx="20" cy="5" r="2.8" fill="#0284C7" />
        <circle cx="32" cy="12" r="2.8" fill="#0284C7" />
        <circle cx="32" cy="26" r="2.8" fill="#0284C7" />
        <circle cx="20" cy="33" r="2.8" fill="#0284C7" />
        <circle cx="8" cy="26" r="2.8" fill="#0284C7" />
        <circle cx="8" cy="12" r="2.8" fill="#0284C7" />
        <circle cx="20" cy="19" r="4.2" fill="#1F56A8" />
      </svg>
    ),
  },
  {
    name: 'KIMBAL PHARMA',
    sub: 'Healthcare Formulations',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <g stroke="#1E3A8A" strokeWidth="2.2" strokeLinecap="round">
          <line x1="20" y1="6" x2="20" y2="34" />
          <line x1="6" y1="20" x2="34" y2="20" />
          <line x1="10" y1="10" x2="30" y2="30" />
          <line x1="10" y1="30" x2="30" y2="10" />
          <path d="M17 8L20 6L23 8M17 32L20 34L23 32M8 17L6 20L8 23M32 17L34 20L32 23" strokeWidth="1.8" />
          <circle cx="20" cy="20" r="3" fill="#1E3A8A" />
        </g>
      </svg>
    ),
  },
  {
    name: 'CIPLA LIMITED',
    sub: 'Global Pharma Standards',
    logo: (
      <svg viewBox="0 0 40 40" className="w-7 h-7 shrink-0" fill="none">
        <g transform="translate(2, 13.5) scale(0.285)">
          <path d="M 38.37,0.28 L 47.53,0.28 L 47.53,6.12 L 38.37,6.12 z" fill="#233F8C" />
          <path
            d="M 24.86,13.71 L 34.84,13.71 C 34.84,13.71 32.56,1.13 18.31,0.005 C 18.31,0.005 5.45,-0.65 0.92,12.30 C 0.92,12.30 -2.62,20.94 4.16,29.22 C 4.16,29.22 8.59,35.34 17.69,35.49 C 17.69,35.49 25.15,36.11 30.76,29.58 C 30.76,29.58 34.53,25.22 34.80,21.59 L 24.99,21.59 C 24.99,21.59 22.25,27.21 16.35,26.05 C 16.35,26.05 10.80,25.83 9.43,19.05 C 9.43,19.05 8.45,12.49 14.68,9.88 C 14.68,9.88 21.50,7.61 24.86,13.71"
            fill="#233F8C"
          />
          <path d="M 38.37,8.80 L 47.50,8.80 L 47.50,34.90 L 38.36,34.90 z" fill="#233F8C" />
          <path
            d="M 62.04,24.70 C 63.22,26.36 65.45,27.38 67.46,26.87 C 67.89,26.76 68.27,26.52 68.71,26.41 C 70.47,25.42 71.63,23.33 71.40,21.12 C 71.09,19.59 70.10,18.02 68.64,17.32 C 67.48,16.67 65.79,16.55 64.60,17.01 C 63.59,17.41 62.69,18.05 62.03,18.98 C 60.91,20.58 60.95,23.08 62.04,24.70 M 61.19,11.32 C 61.19,11.32 62.99,9.57 64.53,9.00 C 64.53,9.00 67.82,7.69 71.60,9.18 C 71.60,9.18 75.33,10.19 78.29,14.22 C 78.29,14.22 81.07,17.98 80.66,22.48 C 80.66,22.48 80.68,27.47 76.85,31.12 C 76.85,31.12 73.33,35.16 67.72,35.11 C 67.72,35.11 64.68,35.73 61.19,32.28 L 61.19,41.85 L 51.98,41.85 L 51.98,8.81 L 61.19,8.81 L 61.19,11.20"
            fill="#233F8C"
          />
          <path d="M 84.15,0.20 L 93.36,0.20 L 93.36,34.90 L 84.15,34.90 z" fill="#233F8C" />
          <path
            d="M 105.81,22.43 C 106.04,24.54 107.61,26.20 109.40,26.84 C 111.33,27.48 113.68,26.81 115.00,25.20 C 116.18,23.79 116.43,21.81 115.82,20.09 C 115.16,18.18 113.12,16.87 111.10,16.80 C 109.37,16.79 107.75,17.63 106.71,19.00 C 106.11,20.02 105.69,21.18 105.81,22.43 M 116.15,8.80 L 125.62,8.80 L 125.62,34.90 L 116.15,34.90 L 116.15,32.49 C 116.15,32.49 113.36,35.44 109.91,35.17 C 109.91,35.17 102.57,35.55 98.59,28.65 C 98.59,28.65 96.36,24.95 96.78,21.45 C 96.78,21.45 96.81,18.16 98.46,15.45 C 98.46,15.45 99.79,12.98 101.65,11.57 C 101.65,11.57 104.94,9.07 107.37,8.93 C 107.37,8.93 112.48,7.39 116.15,11.33 L 116.15,8.80 z"
            fill="#233F8C"
          />
        </g>
      </svg>
    ),
  },
];
