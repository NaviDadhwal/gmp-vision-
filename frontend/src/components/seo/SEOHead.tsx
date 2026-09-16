import React from 'react';
import { Helmet } from 'react-helmet-async';
import { env } from '../../lib/env';

export interface SEOHeadProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  type?: 'website' | 'article' | 'product';
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = 'GMP VISION: Turnkey Cleanroom (CRP), HVAC Air Handling, Air Filtration, Sanitary Process Piping, Industrial Water Treatment, and 21 CFR Part 11 Validation Services in India.',
  canonicalPath = '',
  ogImage = '/logo.png',
  type = 'website',
}) => {
  const siteUrl = env.VITE_SITE_URL || 'https://gmpvision.com';
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const fullTitle = `${title} | GMP VISION Turnkey Cleanroom & Industrial MEP`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="GMP VISION" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
    </Helmet>
  );
};
