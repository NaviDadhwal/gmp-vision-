import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { DIVISIONS_DATA } from '../data/divisions';
import { PRODUCTS_DATA } from '../data/products';
import { PROJECTS_DATA } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Calendar, FileText } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';

export const DivisionDetailPage: React.FC = () => {
  const { divisionSlug } = useParams<{ divisionSlug: string }>();

  const division = DIVISIONS_DATA.find((d) => d.slug === divisionSlug);

  if (!division) {
    return <Navigate to="/solutions" replace />;
  }

  const divisionProducts = PRODUCTS_DATA.filter((p) => p.divisionSlug === division.slug);
  const relatedProjects = PROJECTS_DATA.filter((p) => p.divisionSlug.includes(division.slug));

  const handleInquiry = () => {
    initiateWhatsAppInquiry({
      topic: `${division.title} (Division 0${division.number})`,
    });
  };

  return (
    <div>
      <SEOHead
        title={`${division.title} — Turnkey Division 0${division.number}`}
        description={division.shortDesc}
        canonicalPath={`/solutions/${division.slug}`}
      />

      {/* Hero Header */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#051C42',
          backgroundImage: `linear-gradient(135deg, rgba(5, 28, 66, 0.95) 0%, rgba(8, 43, 102, 0.90) 100%), url("${division.heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '4.5rem 0',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span className="stencil-number" style={{ fontSize: '2.5rem' }}>0{division.number}</span>
              <Badge variant="green">{division.tagline}</Badge>
            </div>

            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.3rem 0 1rem' }}>
              {division.title}
            </h1>

            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem' }}>
              {division.shortDesc}
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" onClick={handleInquiry}>
                Enquire for Division 0{division.number} on WhatsApp
              </Button>
              <Link to="/request-quote" className="btn btn-outline-white btn-lg">
                Include in Technical RFQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Capabilities & Engineering Overview */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md-grid-cols-1">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3DAE2B' }}>
                Engineering Overview
              </span>
              <h2 style={{ fontSize: '1.8rem', color: '#051C42', margin: '0.3rem 0 1rem' }}>
                Design, Supply & Validation Scope
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.96rem', marginBottom: '1.5rem' }}>
                {division.fullDesc}
              </p>

              <h4 style={{ fontSize: '1.05rem', color: '#051C42', marginBottom: '0.75rem' }}>
                Certified Regulatory Standards:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {division.standards.map((st, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      backgroundColor: '#F1F5F9',
                      borderRadius: '4px',
                      color: '#0A3B85',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    ✓ {st}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '2rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#051C42', marginBottom: '1rem' }}>
                Core Capabilities Checklist
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {division.capabilities.map((cap, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.92rem', color: '#334155' }}>
                    <CheckCircle2 size={18} color="#3DAE2B" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Associated Products in this Division */}
      {divisionProducts.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: '#F4F7FB' }}>
          <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
              <Badge variant="blue">Division Equipment</Badge>
              <h2 style={{ fontSize: '2rem', color: '#051C42', margin: '0.3rem 0 0.5rem' }}>
                Manufactured Products & Systems
              </h2>
              <p style={{ color: '#64748B' }}>
                Custom fabricated equipment and assemblies engineered specifically for Division 0{division.number}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md-grid-cols-1">
              {divisionProducts.map((prod) => (
                <div key={prod.id} className="card-elevated" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <Badge variant="green">{prod.category}</Badge>
                      {prod.isFeatured && <Badge variant="navy">Featured Model</Badge>}
                    </div>

                    <h3 style={{ fontSize: '1.35rem', color: '#051C42', marginBottom: '0.3rem' }}>
                      {prod.name}
                    </h3>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#3DAE2B', marginBottom: '0.75rem' }}>
                      {prod.tagline}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                      {prod.description}
                    </p>

                    <h4 style={{ fontSize: '0.85rem', color: '#051C42', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Technical Specifications:
                    </h4>
                    <table className="spec-table" style={{ marginBottom: '1.25rem' }}>
                      <tbody>
                        {prod.specifications.slice(0, 4).map((spec, i) => (
                          <tr key={i}>
                            <td style={{ width: '45%', fontWeight: 600 }}>{spec.key}</td>
                            <td>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link to={`/products/${prod.slug}`} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                      Full Specifications
                    </Link>
                    <button
                      onClick={() => initiateWhatsAppInquiry({ topic: `Product Inquiry: ${prod.name}` })}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      Instant Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Client References */}
      {relatedProjects.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container">
            <div style={{ marginBottom: '2.5rem' }}>
              <Badge variant="green">Proven Deployment</Badge>
              <h2 style={{ fontSize: '2rem', color: '#051C42', margin: '0.3rem 0 0.5rem' }}>
                Featured Plant Installations for Division 0{division.number}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 md-grid-cols-1">
              {relatedProjects.map((p) => (
                <div key={p.id} className="card-elevated" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#051C42', margin: 0 }}>
                      {p.clientName}
                    </h3>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: '#0A3B85', fontWeight: 700 }}>
                      {p.completionYear}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                    <MapPin size={14} color="#3DAE2B" />
                    <span>{p.location}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
                    <strong>Scope:</strong> {p.scope}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
