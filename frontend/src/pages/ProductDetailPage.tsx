import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Product } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      try {
        const prod = await ApiService.getProductBySlug(slug);
        if (prod) setProduct(prod);
      } catch (err) {
        console.warn('Backend unavailable or product not in DB, using fallback rendering:', err);
      }
    }
    loadProduct();
  }, [slug]);

  // Derived title from slug if product is not fetched from backend
  const fallbackTitle = slug
    ? slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
    : 'Pharmaceutical Equipment';

  const title = product?.name || fallbackTitle;
  const model = product?.modelNumber || 'GMP-SPEC-STD';
  const category = product?.category || 'Turnkey Cleanroom Equipment';
  const description =
    product?.description ||
    'High-integrity pharmaceutical cleanroom component manufactured in compliance with WHO-GMP and ISO 14644-1. Engineered for maximum chemical cleanability, minimal particle retention, and laminar airflow integration.';

  const specs = product?.specs || {
    'Design Compliance': 'ISO 14644-1 Class 5 / Class 7, WHO-GMP Schedule M',
    'Primary Material': 'Electrolytic Galvanized Steel (0.8mm) / SS 304 (240 Grit Finish)',
    'Surface Treatment': 'Pure Polyester Powder Coated (60-80 Micron Anti-Bacterial)',
    'Joint Sealing': 'Medical-Grade Anti-Fungal RTV Neutral Silicone Gasket',
    'Leakage Class': 'Airtight Pressure Retention according to EN 1886 Class L1',
    'Factory Testing': 'Aerosol Photometer Scan / Differential Pressure Test Dossier',
  };

  const standards = product?.standards || [
    'ISO 14644-1 Class 5',
    'Schedule M Approved',
    'EU cGMP Annex 1',
  ];

  return (
    <div className="space-y-12 py-8">
      {/* 1. Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primaryHover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Equipment Catalog
        </Link>
      </div>

      {/* 2. Product Header & Overview */}
      <section className="bg-white border-b border-brand-border pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label={model} variant="blue" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              CATEGORY: {category.toUpperCase()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-4xl leading-relaxed">
            {description}
          </p>

          {/* Compliance Standards */}
          <div className="flex flex-wrap gap-2 pt-2">
            {standards.map((std, sIdx) => (
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
              to={`/rfq?product=${slug || 'custom'}`}
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-6 py-3 rounded-md font-semibold text-sm shadow-hud transition-colors"
            >
              Request Quotation & Drawing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/Broucher.pdf"
              download={`${slug || 'equipment'}_spec_sheet.pdf`}
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-5 py-3 rounded-md font-medium text-sm transition-colors"
            >
              <Download className="w-4 h-4 text-brand-green" />
              Download Technical Datasheet
            </a>
          </div>
        </div>
      </section>

      {/* 3. Detailed Technical Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Specifications Table */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-display font-bold text-brand-navy">
              Technical Specifications & Tolerances
            </h2>

            <div className="bg-white rounded-xl border border-brand-border shadow-card overflow-hidden">
              <table className="min-w-full divide-y divide-brand-border">
                <thead className="bg-brand-soft">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-mono font-bold text-brand-navy uppercase tracking-wider">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-mono font-bold text-brand-navy uppercase tracking-wider">
                      Specification / Standard
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-brand-border/60">
                  {Object.entries(specs).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-soft/30'}>
                      <td className="px-6 py-4 text-xs font-semibold text-brand-navy whitespace-nowrap">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-brand-muted">
                        {String(val)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* QA & Validation Assurance */}
            <div className="bg-brand-soft p-6 rounded-xl border border-brand-border space-y-3">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                Factory Acceptance & Validation Package (FAT)
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                All units are tested at our certified manufacturing plant prior to dispatch.
                Every shipment includes raw material test certificates (MTC), motor test certificates,
                filter leak test reports (DOP / PAO photometer), and IQ/OQ qualification protocols.
              </p>
            </div>
          </div>

          {/* Right Column: Engineering RFQ Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-brand-border shadow-card space-y-4">
              <span className="text-xs font-mono font-bold text-brand-primary uppercase">
                ENGINEERING CONSULTATION
              </span>
              <h3 className="text-lg font-display font-bold text-brand-navy">
                Need customized dimensions or materials?
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                We manufacture bespoke lengths, depths, electrical controls, and stainless steel grades
                (SS 304, SS 316, or SS 316L) tailored to your cleanroom layout.
              </p>

              <div className="pt-2">
                <Link
                  to={`/rfq?product=${slug || 'custom'}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white p-3 rounded-md font-semibold text-xs transition-colors shadow-sm"
                >
                  Configure Custom RFQ
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="pt-3 border-t border-brand-border text-center">
                <a
                  href="tel:+919818818818"
                  className="text-xs font-mono text-brand-primary hover:underline font-bold"
                >
                  Emergency Tech Desk: +91-9818818818
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
