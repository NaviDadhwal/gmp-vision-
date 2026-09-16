import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { PRODUCTS_DATA } from '../data/products';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const [activeImage, setActiveImage] = useState<string>(product.images[0] || '');

  const handleInquiry = () => {
    initiateWhatsAppInquiry({
      topic: `Product Quote Request: ${product.name}`,
    });
  };

  return (
    <div>
      <SEOHead
        title={`${product.name} — Technical Specifications`}
        description={product.description}
        canonicalPath={`/products/${product.slug}`}
        type="product"
      />

      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '3rem 0' }}>
        <div className="container">
          <Link
            to="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#3DAE2B',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            <ArrowLeft size={16} /> Back to All Products
          </Link>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <Badge variant="green">{product.category}</Badge>
            {product.isFeatured && <Badge variant="navy">Featured Model</Badge>}
          </div>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: '0.2rem 0 0.5rem' }}>
            {product.name}
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', margin: 0 }}>
            {product.tagline}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md-grid-cols-1">
            {/* Gallery */}
            <div>
              <div style={{ borderRadius: '10px', overflow: 'hidden', height: '380px', backgroundColor: '#F1F5F9', marginBottom: '1rem' }}>
                <img
                  src={activeImage || product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      style={{
                        width: '80px',
                        height: '60px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: activeImage === img ? '2px solid #3DAE2B' : '1px solid #CBD5E1',
                        padding: 0,
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Specs */}
            <div>
              <h2 style={{ fontSize: '1.5rem', color: '#051C42', marginBottom: '0.75rem' }}>
                Engineering Overview
              </h2>
              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              <h3 style={{ fontSize: '1.15rem', color: '#051C42', marginBottom: '0.75rem' }}>
                Technical Specification Table:
              </h3>
              <table className="spec-table" style={{ marginBottom: '2rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '45%' }}>Parameter</th>
                    <th>Specification Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{spec.key}</td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Button variant="primary" size="lg" onClick={handleInquiry} icon={<MessageCircle size={18} />}>
                  Inquire Model on WhatsApp
                </Button>
                <Link to="/request-quote" className="btn btn-secondary btn-lg">
                  Add to Formal RFQ
                </Link>
                <a
                  href="/Broucher.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ gap: '0.4rem' }}
                >
                  <FileText size={16} /> Download Full Spec Sheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
