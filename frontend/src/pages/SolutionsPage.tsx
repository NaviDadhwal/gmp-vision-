import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { DIVISIONS_DATA } from '../data/divisions';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, CheckCircle2, ShieldCheck, Layers } from 'lucide-react';
import { ComplianceBar } from '../components/ui/ComplianceBar';

export const SolutionsPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="7 Turnkey Engineering Solutions & Divisions"
        description="Comprehensive turnkey contracting solutions covering Cleanroom PUF Panels, HVAC Air Handling, Air Filtration, Process Piping, Water Treatment, and Validation."
        canonicalPath="/solutions"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <Badge variant="green" className="mb-2">Turnkey Contracting Framework</Badge>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.5rem 0 1rem' }}>
              All Solutions in One Project: 7 Integrated Engineering Divisions
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.65 }}>
              GMP VISION delivers single-source responsibility. By uniting cleanroom modular architecture, HVAC mechanical systems, high-purity piping, and regulatory validation, we eliminate interface friction and ensure zero audit compliance gaps.
            </p>
          </div>
        </div>
      </section>

      <ComplianceBar />

      {/* Divisions In-Depth Overview */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {DIVISIONS_DATA.map((div, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={div.id}
                  id={div.slug}
                  className="card-elevated"
                  style={{
                    padding: '2.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '2.5rem',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ order: isEven ? 2 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                      <span className="stencil-number" style={{ fontSize: '2.5rem' }}>0{div.number}</span>
                      <Badge variant="blue">{div.tagline}</Badge>
                    </div>

                    <h2 style={{ fontSize: '1.75rem', color: '#051C42', marginBottom: '0.75rem' }}>
                      {div.title}
                    </h2>

                    <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                      {div.fullDesc}
                    </p>

                    <h4 style={{ fontSize: '0.95rem', color: '#051C42', marginBottom: '0.5rem', fontWeight: 700 }}>
                      Key Engineering Capabilities:
                    </h4>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
                      {div.capabilities.slice(0, 4).map((cap, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.88rem', color: '#334155' }}>
                          <CheckCircle2 size={16} color="#3DAE2B" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <Link to={`/solutions/${div.slug}`} className="btn btn-primary">
                        <span>View Full Division Scope & Products</span>
                        <ArrowRight size={16} />
                      </Link>
                      <Link to={`/request-quote`} className="btn btn-outline">
                        Enquire for Division 0{div.number}
                      </Link>
                    </div>
                  </div>

                  <div style={{ order: isEven ? 1 : 2 }}>
                    <img
                      src={div.heroImage}
                      alt={div.title}
                      style={{
                        width: '100%',
                        height: '360px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        boxShadow: 'var(--shadow-md)',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
