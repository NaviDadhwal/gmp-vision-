import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HardHat, Handshake, Lightbulb } from 'lucide-react';
import { SITE_SETTINGS } from '../../data/settings';
import { initiateWhatsAppInquiry } from '../../lib/whatsapp';

export const Footer: React.FC = () => {
  const handleWhatsApp = () => {
    initiateWhatsAppInquiry({ topic: 'General Inquiry via Footer' });
  };

  return (
    <footer style={{ backgroundColor: '#04122E', color: '#CBD5E1', borderTop: '4px solid #3DAE2B' }}>
      {/* Brand Values Banner */}
      <div style={{ backgroundColor: '#051C42', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <ShieldCheck size={22} color="#3DAE2B" />
              <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>QUALITY ASSURED</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <HardHat size={22} color="#3DAE2B" />
              <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>SITE SAFETY FIRST</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Handshake size={22} color="#3DAE2B" />
              <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>TRANSPARENT INTEGRITY</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Lightbulb size={22} color="#3DAE2B" />
              <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.04em' }}>ENGINEERING INNOVATION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container">
          <div className="grid grid-cols-4 gap-8 lg-grid-cols-2 md-grid-cols-1">
            {/* Column 1: Company Profile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src="/logo.png"
                  alt="GMP VISION"
                  style={{
                    height: '46px',
                    width: 'auto',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    padding: '2px',
                  }}
                />
                <div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1.3rem', margin: 0, letterSpacing: '-0.02em' }}>
                    GMP <span style={{ color: '#3DAE2B' }}>VISION</span>
                  </h3>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', fontWeight: 600 }}>
                    All Solutions in One Project
                  </span>
                </div>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '0.88rem', margin: 0 }}>
                Single-source Turnkey Engineering, Cleanroom (CRP), and Industrial MEP Contractor serving pharmaceutical, biotechnology, healthcare, and chemical sectors across India.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                <div>GSTIN: <strong style={{ color: '#FFFFFF' }}>{SITE_SETTINGS.contact.gstin}</strong></div>
                <div>Leadership: <span style={{ color: '#CBD5E1' }}>Mr. Parveen Kumar (CEO) & Mr. Sachin Thakur (Projects)</span></div>
              </div>

              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href="/Broucher.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-sm"
                  style={{ gap: '0.4rem', width: 'fit-content' }}
                >
                  <FileText size={15} />
                  <span>Download Company Brochure (PDF)</span>
                </a>
              </div>
            </div>

            {/* Column 2: Turnkey Solutions */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '1.25rem', borderLeft: '3px solid #3DAE2B', paddingLeft: '0.6rem' }}>
                Turnkey Divisions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li><Link to="/solutions/cleanroom-panels" style={{ color: '#94A3B8' }}>01. Cleanroom PUF Panels</Link></li>
                <li><Link to="/solutions/hvac-air-handling" style={{ color: '#94A3B8' }}>02. HVAC & Double Skin AHUs</Link></li>
                <li><Link to="/solutions/air-filtration" style={{ color: '#94A3B8' }}>03. Air Purification & HEPA Filters</Link></li>
                <li><Link to="/solutions/piping-fabrication" style={{ color: '#94A3B8' }}>04. Sanitary SS & MS Process Piping</Link></li>
                <li><Link to="/solutions/water-treatment" style={{ color: '#94A3B8' }}>05. Industrial RO & ETP Plants</Link></li>
                <li><Link to="/solutions/electrical-fire" style={{ color: '#94A3B8' }}>06. Electrical Panels & Fire Systems</Link></li>
                <li><Link to="/solutions/automation-validation" style={{ color: '#94A3B8' }}>07. BMS/EMS & Validation Services</Link></li>
              </ul>
            </div>

            {/* Column 3: Quick Navigation */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '1.25rem', borderLeft: '3px solid #3DAE2B', paddingLeft: '0.6rem' }}>
                Quick Navigation
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                <li><Link to="/products" style={{ color: '#94A3B8' }}>All Manufactured Products</Link></li>
                <li><Link to="/projects" style={{ color: '#94A3B8' }}>Verified Client Portfolio</Link></li>
                <li><Link to="/about" style={{ color: '#94A3B8' }}>About Leadership & Infrastructure</Link></li>
                <li><Link to="/contact" style={{ color: '#94A3B8' }}>Contact & Technical Enquiries</Link></li>
                <li><Link to="/rfq" style={{ color: '#3DAE2B', fontWeight: 600 }}>Interactive Quote Builder →</Link></li>
                <li><Link to="/admin/login" style={{ color: '#64748B', fontSize: '0.78rem' }}>Admin CMS Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Operational Facilities */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '1.25rem', borderLeft: '3px solid #3DAE2B', paddingLeft: '0.6rem' }}>
                Operational Facilities
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem' }}>
                {/* Una Office */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <MapPin size={18} color="#3DAE2B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF', display: 'block' }}>{SITE_SETTINGS.registeredOffice.title}</strong>
                    <span style={{ color: '#94A3B8' }}>
                      {SITE_SETTINGS.registeredOffice.addressLine1}, {SITE_SETTINGS.registeredOffice.addressLine2}, {SITE_SETTINGS.registeredOffice.city}, {SITE_SETTINGS.registeredOffice.state} – {SITE_SETTINGS.registeredOffice.pincode}
                    </span>
                    <br />
                    <a href={SITE_SETTINGS.registeredOffice.mapsQuery} target="_blank" rel="noopener noreferrer" style={{ color: '#52C23F', fontSize: '0.78rem', textDecoration: 'underline' }}>
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                {/* Nalagarh Facility */}
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <MapPin size={18} color="#3DAE2B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ color: '#FFFFFF', display: 'block' }}>{SITE_SETTINGS.manufacturingFacility.title}</strong>
                    <span style={{ color: '#94A3B8' }}>
                      {SITE_SETTINGS.manufacturingFacility.addressLine1}, {SITE_SETTINGS.manufacturingFacility.addressLine2}, {SITE_SETTINGS.manufacturingFacility.city}, {SITE_SETTINGS.manufacturingFacility.state} – {SITE_SETTINGS.manufacturingFacility.pincode}
                    </span>
                    <br />
                    <a href={SITE_SETTINGS.manufacturingFacility.mapsQuery} target="_blank" rel="noopener noreferrer" style={{ color: '#52C23F', fontSize: '0.78rem', textDecoration: 'underline' }}>
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              marginTop: '3.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.82rem',
              color: '#64748B',
            }}
          >
            <div>
              © {new Date().getFullYear()} GMP VISION. All Rights Reserved. Built to ISO 14644 & cGMP Standards.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <button onClick={handleWhatsApp} style={{ color: '#48BE34', fontWeight: 600 }}>WhatsApp Chat Support</button>
              <a href={`tel:${SITE_SETTINGS.contact.primaryPhone}`} style={{ color: '#CBD5E1' }}>Call {SITE_SETTINGS.contact.primaryPhone}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
