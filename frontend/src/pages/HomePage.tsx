import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { JsonLd, GLOBAL_ORGANIZATION_SCHEMA } from '../components/seo/JsonLd';
import { ComplianceBar } from '../components/ui/ComplianceBar';
import { DIVISIONS_DATA } from '../data/divisions';
import { FILTRATION_CATALOG } from '../data/filters';
import { PROJECTS_DATA } from '../data/projects';
import { CLIENTS_DATA } from '../data/clients';
import { SITE_SETTINGS } from '../data/settings';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Layers, Wind, Droplets, Activity, Zap, Cpu, Clock, Wrench } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';
import { getClientLogo } from '../components/common/ClientLogos';

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers size={28} />,
  Wind: <Wind size={28} />,
  ShieldCheck: <ShieldCheck size={28} />,
  Activity: <Activity size={28} />,
  Droplets: <Droplets size={28} />,
  Zap: <Zap size={28} />,
  Cpu: <Cpu size={28} />,
};

export const HomePage: React.FC = () => {
  const [filterTab, setFilterTab] = useState<'pre-filter' | 'fine-filter' | 'pocket-bag' | 'gel-seal-hepa'>('gel-seal-hepa');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Consultation & URS',
      desc: 'Deep technical review of User Requirement Specifications (URS), cleanroom ISO classifications, and process equipment heat loads.',
    },
    {
      num: '02',
      title: '3D Layout & Heat Load',
      desc: 'CAD 3D architectural panel layout, duct routing modeling, and psychrometric CFM calculations based on ISHRAE guidelines.',
    },
    {
      num: '03',
      title: 'In-House Fabrication',
      desc: 'Precision manufacturing of Double Skin AHUs, desiccant rotors, SMACNA GI ducting, and SS 304 terminal housings at our Nalagarh facility.',
    },
    {
      num: '04',
      title: 'Installation & Piping',
      desc: 'On-site erection of PUF modular panels, walk-on ceilings, sanitary orbital welded process loops, and electrical power skids.',
    },
    {
      num: '05',
      title: 'Testing & Balancing',
      desc: 'Comprehensive air balancing, air changes per hour (ACPH) verification, room-to-room pressure cascading, and velocity mapping.',
    },
    {
      num: '06',
      title: 'IQ/OQ/PQ Validation',
      desc: 'In-situ DOP/PAO HEPA integrity testing, airborne particle counts, and full GDP-compliant qualification documentation for audits.',
    },
  ];

  const featuredFilters = FILTRATION_CATALOG.filter((f) =>
    ['pre-filter', 'fine-filter', 'pocket-bag', 'gel-seal-hepa'].includes(f.category)
  );

  const selectedFilter = featuredFilters.find((f) => f.category === filterTab) || featuredFilters[0];

  return (
    <div>
      <SEOHead
        title="Turnkey Cleanroom (CRP), HVAC & MEP Contractor"
        description="GMP VISION: Single-source Turnkey Engineering, Cleanroom (CRP), HVAC Air Handling, Air Filtration, Process Piping, and 21 CFR Part 11 Validation Services."
        canonicalPath="/"
      />
      <JsonLd schema={GLOBAL_ORGANIZATION_SCHEMA} />

      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#051C42',
          backgroundImage: 'linear-gradient(135deg, rgba(5, 28, 66, 0.96) 0%, rgba(8, 43, 102, 0.92) 100%), url("https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=2000&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          padding: '4.5rem 0',
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(61, 174, 43, 0.15)',
                border: '1px solid #3DAE2B',
                borderRadius: '9999px',
                padding: '0.35rem 0.9rem',
                marginBottom: '1.25rem',
              }}
            >
              <ShieldCheck size={16} color="#48BE34" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>
                SINGLE-SOURCE TURNKEY MEP CONTRACTOR
              </span>
            </div>

            <h1
              style={{
                color: '#FFFFFF',
                lineHeight: 1.18,
                marginBottom: '1.25rem',
                fontSize: 'clamp(2.3rem, 5.5vw, 3.7rem)',
              }}
            >
              All Solutions in One Project: <br />
              <span style={{ color: '#48BE34' }}>Turnkey Cleanroom,</span> HVAC & Industrial Utilities
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: '#CBD5E1',
                lineHeight: 1.65,
                marginBottom: '2.25rem',
                maxWidth: '720px',
              }}
            >
              Single-source turnkey contracting across <strong>7 integrated divisions</strong> for pharmaceutical, biotechnology, healthcare, and chemical manufacturing facilities across India.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/solutions" className="btn btn-primary btn-lg" style={{ gap: '0.6rem' }}>
                <span>Explore All 7 Divisions</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/request-quote" className="btn btn-outline-white btn-lg">
                Request Technical Audit / RFQ
              </Link>
            </div>

            {/* Quick trust strip */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
                marginTop: '3rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                flexWrap: 'wrap',
                fontSize: '0.88rem',
                color: '#94A3B8',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#3DAE2B" />
                <span style={{ color: '#FFFFFF' }}>15+ Yrs Industry Experience</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#3DAE2B" />
                <span style={{ color: '#FFFFFF' }}>100+ Completed Projects</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#3DAE2B" />
                <span style={{ color: '#FFFFFF' }}>24×7 Emergency Site Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS TICKER BAR */}
      <div className="ticker-wrap">
        <div className="ticker-content">
          {[...SITE_SETTINGS.tickerMetrics, ...SITE_SETTINGS.tickerMetrics].map((m, idx) => (
            <div key={idx} className="ticker-item">
              <Award size={16} color="#3DAE2B" />
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 7 DIVISIONS GRID */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
            <Badge variant="green" className="mb-2">Unified Engineering Model</Badge>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', color: '#051C42', margin: '0.5rem 0 1rem' }}>
              7 Integrated Service & Product Divisions
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6 }}>
              Unlike fragmented contractors who handle only ducting or only panels, GMP VISION delivers end-to-end design, manufacturing, erection, and qualification under one project roof.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
            {DIVISIONS_DATA.map((div) => (
              <div
                key={div.id}
                className="card-elevated"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2rem',
                  position: 'relative',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(10, 59, 133, 0.08)',
                        color: '#0A3B85',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {ICON_MAP[div.iconName] || <Layers size={28} />}
                    </div>
                    <span className="stencil-number">0{div.number}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#051C42', marginBottom: '0.4rem', fontWeight: 700 }}>
                    {div.title}
                  </h3>

                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#3DAE2B', marginBottom: '0.85rem' }}>
                    {div.tagline}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.55, marginBottom: '1.25rem' }}>
                    {div.shortDesc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {div.standards.map((st, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          backgroundColor: '#F1F5F9',
                          borderRadius: '4px',
                          color: '#0A3B85',
                        }}
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/solutions/${div.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#0A3B85',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    marginTop: 'auto',
                    borderTop: '1px solid #E2E8F0',
                    paddingTop: '1rem',
                  }}
                >
                  <span>Explore Division Capabilities</span>
                  <ArrowRight size={16} color="#3DAE2B" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE BADGE BAR */}
      <ComplianceBar />

      {/* 5. INTERACTIVE AIR FILTRATION CATALOG PREVIEW */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <Badge variant="blue">Division 3 Catalog</Badge>
              <h2 style={{ fontSize: '2.2rem', color: '#051C42', margin: '0.4rem 0 0.5rem' }}>
                Cleanroom Air Filtration Systems
              </h2>
              <p style={{ color: '#64748B', maxWidth: '600px', margin: 0 }}>
                Direct manufacturing of tested filters from coarse 10µ pre-filtration to H14 99.997% Gel-Seal HEPA.
              </p>
            </div>

            <Link to="/solutions/air-filtration" className="btn btn-secondary">
              <span>Explore Air Filtration Solutions</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Filter Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.75rem' }}>
            {[
              { key: 'gel-seal-hepa', label: 'Mini Pleat Gel-Seal HEPA (H13/H14)' },
              { key: 'pocket-bag', label: 'Multi-Pocket Bag Filters' },
              { key: 'fine-filter', label: 'Micro-Fiber Fine Filters (1µ-5µ)' },
              { key: 'pre-filter', label: 'Washable Pre-Filters (10µ)' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterTab(tab.key as any)}
                style={{
                  padding: '0.75rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  backgroundColor: filterTab === tab.key ? '#051C42' : '#FFFFFF',
                  color: filterTab === tab.key ? '#FFFFFF' : '#475569',
                  border: filterTab === tab.key ? '1px solid #051C42' : '1px solid #CBD5E1',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Filter Spec Card */}
          {selectedFilter && (
            <div className="card-elevated" style={{ padding: '2rem', backgroundColor: '#FFFFFF' }}>
              <div className="grid grid-cols-2 gap-8 md-grid-cols-1 items-center">
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <Badge variant="green">{selectedFilter.efficiency}</Badge>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#0A3B85' }}>
                      {selectedFilter.micronRating}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.6rem', color: '#051C42', marginBottom: '0.6rem' }}>
                    {selectedFilter.name}
                  </h3>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.35rem 0.75rem',
                      backgroundColor: 'rgba(61, 174, 43, 0.1)',
                      color: '#257518',
                      fontWeight: 700,
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>{selectedFilter.keyFeature}</span>
                  </div>

                  <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {selectedFilter.mediaConstruction}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <strong style={{ display: 'block', fontSize: '0.88rem', color: '#051C42', marginBottom: '0.4rem' }}>
                      Recommended Cleanroom Applications:
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {selectedFilter.applications.map((app, i) => (
                        <span key={i} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', backgroundColor: '#F1F5F9', borderRadius: '4px', color: '#334155' }}>
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link to="/solutions/air-filtration" className="btn btn-primary">
                      Explore Division Solutions
                    </Link>
                    <button
                      onClick={() => initiateWhatsAppInquiry({ topic: `Filter Inquiry: ${selectedFilter.name}` })}
                      className="btn btn-outline"
                    >
                      Instant Quote on WhatsApp
                    </button>
                  </div>
                </div>

                <div>
                  <img
                    src={selectedFilter.image}
                    alt={selectedFilter.name}
                    style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '10px', boxShadow: 'var(--shadow-md)' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. TURNKEY WORKFLOW (CONCEPT TO COMMISSIONING) */}
      <section className="section-padding" style={{ backgroundColor: '#051C42', color: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#3DAE2B', fontWeight: 700 }}>
              Engineering Execution Lifecycle
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.3rem', margin: '0.4rem 0 1rem' }}>
              From Concept to Regulatory Commissioning
            </h2>
            <p style={{ color: '#CBD5E1', fontSize: '0.98rem', lineHeight: 1.6 }}>
              A disciplined, stage-gated engineering methodology ensuring cleanroom projects are delivered on schedule and validated for immediate audit readiness.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                style={{
                  backgroundColor: activeWorkflowStep === idx ? 'rgba(61, 174, 43, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeWorkflowStep === idx ? '2px solid #3DAE2B' : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: '#3DAE2B' }}>
                    {step.num}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: activeWorkflowStep === idx ? '#3DAE2B' : 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                    }}
                  >
                    ✓
                  </div>
                </div>

                <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>

                <p style={{ color: '#CBD5E1', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CLIENT PORTFOLIO SHOWCASE */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
            <Badge variant="blue">Proven Track Record</Badge>
            <h2 style={{ fontSize: '2.2rem', color: '#051C42', margin: '0.4rem 0 1rem' }}>
              Trusted by Leading Pharmaceutical & Industrial Plants
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.98rem' }}>
              Over 100 successful cleanroom and HVAC turnkey installations across Himachal Pradesh, Uttarakhand, Punjab, Gujarat, and Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 lg-grid-cols-3 md-grid-cols-2 sm-grid-cols-1">
            {CLIENTS_DATA.map((client) => (
              <div
                key={client.id}
                style={{
                  padding: '1.25rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  minHeight: '120px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3DAE2B';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  {getClientLogo(client.name, 34)}
                </div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: '#64748B',
                    borderTop: '1px solid #F1F5F9',
                    paddingTop: '0.5rem',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#0A3B85' }}>{client.sector}</span> • {client.location}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/projects" className="btn btn-outline" style={{ gap: '0.5rem' }}>
              <span>View All 12 Featured Plant Case Studies</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. ABBREVIATED QUICK RFQ ESTIMATOR */}
      <section className="section-padding" style={{ backgroundColor: '#F4F7FB', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div
            className="card-elevated"
            style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '3rem 2.5rem',
              backgroundColor: '#FFFFFF',
              borderTop: '5px solid #0A3B85',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2rem' }}>
              <Badge variant="green">Fast Turnaround</Badge>
              <h2 style={{ fontSize: '2rem', color: '#051C42', margin: '0.4rem 0 0.6rem' }}>
                Request a Technical Proposal & BOQ Estimate
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.92rem' }}>
                Share your plant parameters. Our engineering department prepares preliminary design calculations and cost estimates within 4 business hours.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/request-quote" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
                <span>Open Full 5-Step Quote Builder</span>
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => initiateWhatsAppInquiry({ topic: 'Direct Homepage RFQ Inquire' })}
                className="btn btn-outline-green btn-lg"
              >
                Chat with Technical Team on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
