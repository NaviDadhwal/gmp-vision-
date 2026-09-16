import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { SITE_SETTINGS } from '../data/settings';
import { CLIENTS_DATA } from '../data/clients';
import { getClientLogo } from '../components/common/ClientLogos';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShieldCheck, HardHat, Handshake, Lightbulb, MapPin, Award, CheckCircle2, FileText } from 'lucide-react';
import { ComplianceBar } from '../components/ui/ComplianceBar';

export const AboutPage: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="About GMP VISION — Leadership & Engineering Infrastructure"
        description="Learn about GMP VISION: 15+ years of turnkey cleanroom contracting led by Mr. Parveen Kumar (CEO) & Mr. Sachin Thakur (Projects Head) with facilities in Una and Nalagarh, HP."
        canonicalPath="/about"
      />

      {/* Header */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <Badge variant="green" className="mb-2">15+ Years Industry Leadership</Badge>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.4rem 0 1rem' }}>
              About GMP VISION
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Founded on the philosophy of <strong>"All Solutions in One Project"</strong>, GMP VISION has established itself as the trusted single-source engineering partner for pharmaceutical, biotechnology, and advanced manufacturing sectors.
            </p>
          </div>
        </div>
      </section>

      <ComplianceBar />

      {/* Story & Philosophy */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md-grid-cols-1 items-center">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3DAE2B' }}>
                Corporate Philosophy
              </span>
              <h2 style={{ fontSize: '2rem', color: '#051C42', margin: '0.4rem 0 1rem' }}>
                The "All Solutions in One Project" Turnkey Advantage
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '1rem' }}>
                Traditional industrial projects suffer when cleanroom panels are built by one vendor, AHUs supplied by another, ductwork erected by a third party, and validation outsourced to a testing agency. Discrepancies between panel cutouts and HEPA housings or duct CFM mismatches cause project delays and audit failures.
              </p>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: '1.5rem' }}>
                GMP VISION unifies all 7 disciplines under a single engineering command. From 3D heat load modeling and panel fabrication to orbital process piping and IQ/OQ/PQ validation, our integrated approach guarantees single-point accountability.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href="/Broucher.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ gap: '0.5rem' }}
                >
                  <FileText size={18} />
                  <span>Download Company Profile & Brochure</span>
                </a>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img
                src="/brand-card.png"
                alt="GMP VISION Leadership & Turnkey Scope"
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(5, 28, 66, 0.2)',
                  border: '1px solid #CBD5E1',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <Badge variant="blue">Executive Team</Badge>
            <h2 style={{ fontSize: '2.2rem', color: '#051C42', margin: '0.4rem 0 0.6rem' }}>
              Leadership with 35+ Combined Years in Cleanrooms
            </h2>
            <p style={{ color: '#64748B' }}>
              Hands-on engineering leaders who personally supervise key project milestones, layout validations, and regulatory audits.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md-grid-cols-1" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {SITE_SETTINGS.leadership.map((leader, i) => (
              <div
                key={i}
                className="card-elevated"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #0A3B85' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(10, 59, 133, 0.1)',
                      color: '#0A3B85',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                    }}
                  >
                    {leader.name.split(' ')[1]?.[0] || 'G'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', color: '#051C42', margin: 0 }}>
                      {leader.name}
                    </h3>
                    <span style={{ fontSize: '0.85rem', color: '#3DAE2B', fontWeight: 600 }}>
                      {leader.role}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#F1F5F9',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '4px',
                    fontSize: '0.82rem',
                    color: '#0A3B85',
                    fontWeight: 700,
                    width: 'fit-content',
                    marginBottom: '1rem',
                  }}
                >
                  {leader.experience}
                </div>

                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Operational Facilities */}
      <section className="section-padding" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <Badge variant="green">Physical Infrastructure</Badge>
            <h2 style={{ fontSize: '2.2rem', color: '#051C42', margin: '0.4rem 0 0.6rem' }}>
              Dual Operational Facilities in Himachal Pradesh
            </h2>
            <p style={{ color: '#64748B' }}>
              Headquartered in Una with dedicated heavy fabrication, assembly, and testing workshops in Nalagarh.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md-grid-cols-1">
            {/* Facility 1: Una */}
            <div className="card-elevated" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={24} color="#0A3B85" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#051C42', margin: '0 0 0.2rem' }}>
                    {SITE_SETTINGS.registeredOffice.title}
                  </h3>
                  <Badge variant="blue">Corporate & Design Center</Badge>
                </div>
              </div>

              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {SITE_SETTINGS.registeredOffice.addressLine1}, {SITE_SETTINGS.registeredOffice.addressLine2}, {SITE_SETTINGS.registeredOffice.city}, {SITE_SETTINGS.registeredOffice.state} – {SITE_SETTINGS.registeredOffice.pincode}, India.
              </p>

              <a
                href={SITE_SETTINGS.registeredOffice.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                Open in Google Maps →
              </a>
            </div>

            {/* Facility 2: Nalagarh */}
            <div className="card-elevated" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                <MapPin size={24} color="#3DAE2B" style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#051C42', margin: '0 0 0.2rem' }}>
                    {SITE_SETTINGS.manufacturingFacility.title}
                  </h3>
                  <Badge variant="green">Fabrication & Assembly Plant</Badge>
                </div>
              </div>

              <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {SITE_SETTINGS.manufacturingFacility.addressLine1}, {SITE_SETTINGS.manufacturingFacility.addressLine2}, {SITE_SETTINGS.manufacturingFacility.city}, {SITE_SETTINGS.manufacturingFacility.state} – {SITE_SETTINGS.manufacturingFacility.pincode}, India.
              </p>

              <a
                href={SITE_SETTINGS.manufacturingFacility.mapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-green btn-sm"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Client References & Industry Trust */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
            <Badge variant="blue">Client References</Badge>
            <h2 style={{ fontSize: '2.2rem', color: '#051C42', margin: '0.4rem 0 0.6rem' }}>
              Trusted by Top Pharmaceutical Manufacturers
            </h2>
            <p style={{ color: '#64748B' }}>
              Over 100 successful cleanroom, HVAC, and mechanical installations executed for premier healthcare brands.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 lg-grid-cols-3 md-grid-cols-2 sm-grid-cols-1">
            {CLIENTS_DATA.map((client) => (
              <div
                key={client.id}
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '110px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3DAE2B';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                }}
              >
                {getClientLogo(client.name, 34)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
