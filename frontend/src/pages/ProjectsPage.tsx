import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { PROJECTS_DATA, IProjectItem } from '../data/projects';
import { CLIENTS_DATA } from '../data/clients';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MapPin, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectCaseStudyModal } from '../features/projects/components/ProjectCaseStudyModal';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';
import { getClientLogo } from '../components/common/ClientLogos';

export const ProjectsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<IProjectItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const sectors = ['all', 'Pharmaceutical', 'Biotechnology', 'Healthcare', 'Industrial'];

  const filteredProjects = PROJECTS_DATA.filter(
    (p) => selectedSector === 'all' || p.sector === selectedSector
  );

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <div>
      <SEOHead
        title="Verified Client Projects & Turnkey Plant References"
        description="Explore 100+ turnkey pharma and industrial projects executed by GMP VISION: Zeon Lifesciences, Windlas Biotech, Wallace Pharma, BioMarq Labs, and Hindustan Antibiotics."
        canonicalPath="/projects"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <Badge variant="green" className="mb-2">Execution Track Record</Badge>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.4rem 0 1rem' }}>
              Turnkey Projects & Client Portfolio
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Proven engineering capability across more than 100 sterile cleanrooms, AHU installations, and sanitary piping loops commissioned across North & West India pharmaceutical hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Client Logos Trust Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '1.75rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B' }}>
              Trusted Turnkey Partner for Pharmaceutical Leaders
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem 2.5rem' }}>
            {CLIENTS_DATA.map((client) => (
              <div key={client.id} style={{ opacity: 0.9, transition: 'transform 0.2s', display: 'flex', alignItems: 'center' }} title={client.name}>
                {getClientLogo(client.name, 32)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          {/* Sector Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2.5rem' }}>
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  setSelectedSector(sec);
                  setVisibleCount(6);
                }}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedSector === sec ? '#051C42' : '#FFFFFF',
                  color: selectedSector === sec ? '#FFFFFF' : '#475569',
                  border: selectedSector === sec ? '1px solid #051C42' : '1px solid #CBD5E1',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                }}
              >
                {sec === 'all' ? 'All Industry Sectors' : sec}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
            {displayedProjects.map((proj) => (
              <div
                key={proj.id}
                className="card-elevated"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFFFFF' }}
              >
                <div style={{ height: '200px', backgroundColor: '#E2E8F0', overflow: 'hidden' }}>
                  <img
                    src={proj.image}
                    alt={proj.clientName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <Badge variant="blue">{proj.sector}</Badge>
                      <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                        {proj.completionYear}
                      </span>
                    </div>

                    <div style={{ minHeight: '38px', display: 'flex', alignItems: 'center', marginBottom: '0.6rem' }}>
                      {getClientLogo(proj.clientName, 30)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#64748B', fontSize: '0.82rem', marginBottom: '0.85rem' }}>
                      <MapPin size={14} color="#3DAE2B" />
                      <span>{proj.location}</span>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5, margin: '0 0 1rem' }}>
                      <strong>Scope:</strong> {proj.scope}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" size="sm" onClick={() => setActiveProject(proj)} style={{ flex: 1 }}>
                      Case Study
                    </Button>
                    <button
                      onClick={() => initiateWhatsAppInquiry({ topic: `Inquiry on Project Reference: ${proj.clientName}` })}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button (Simulating Cursor Pagination) */}
          {visibleCount < filteredProjects.length && (
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              >
                Load More Projects ({filteredProjects.length - visibleCount} remaining)
              </Button>
            </div>
          )}

          {/* Client Logo Wall */}
          <div style={{ marginTop: '5rem', paddingTop: '3.5rem', borderTop: '2px solid #E2E8F0' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#051C42', marginBottom: '0.5rem' }}>
                Industrial & Pharmaceutical Client Wall
              </h2>
              <p style={{ color: '#64748B' }}>
                Partnerships built on technical integrity, timely commissioning, and after-sales support.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 lg-grid-cols-2 md-grid-cols-1">
              {CLIENTS_DATA.map((client) => (
                <div
                  key={client.id}
                  style={{
                    padding: '1.25rem',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E2E8F0',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: '#051C42', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                    {client.name}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#3DAE2B', fontWeight: 600 }}>
                    {client.sector} • {client.location}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};
