import React from 'react';

export interface JsonLdProps {
  schema: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const GLOBAL_ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'GMP VISION',
  url: 'https://gmpvision.com',
  logo: 'https://gmpvision.com/logo.png',
  image: 'https://gmpvision.com/brand-card.png',
  description: 'Turnkey Engineering, Cleanroom (CRP), HVAC Air Handling, Sanitary Process Piping, and Industrial MEP Contractor.',
  telephone: '+91-9817343117',
  email: 'gmpvision3@gmail.com',
  taxID: '02CZKPK1192C2ZQ',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, Building No. 01, Amb Daultpur Road, Bhanjal',
      addressLocality: 'Una',
      addressRegion: 'Himachal Pradesh',
      postalCode: '177213',
      addressCountry: 'IN'
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Khasra No. 231, Near MND Hub Biotech, Village Dadhi Harnam',
      addressLocality: 'Nalagarh',
      addressRegion: 'Himachal Pradesh',
      postalCode: '174101',
      addressCountry: 'IN'
    }
  ],
  openingHours: 'Mo-Sa 09:00-18:30'
};
