import React, { useState } from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { SITE_SETTINGS } from '../data/settings';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../lib/whatsapp';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Record mock lead
    try {
      const existing = JSON.parse(localStorage.getItem('gmp_mock_leads') || '[]');
      const newLead = {
        _id: 'contact_' + Date.now(),
        companyName: formData.company,
        contactName: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'contact_form',
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('gmp_mock_leads', JSON.stringify([newLead, ...existing]));
    } catch (e) {
      // ignore
    }

    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    initiateWhatsAppInquiry({
      clientName: formData.company || formData.name,
      topic: 'Contact Page Inquiry',
    });
  };

  return (
    <div>
      <SEOHead
        title="Contact Technical Team & Facilities"
        description="Connect with GMP VISION technical directors and regional offices in Una and Nalagarh, Himachal Pradesh. Direct phone, email, and WhatsApp contact."
        canonicalPath="/contact"
      />

      {/* Header Banner */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '780px' }}>
            <Badge variant="green" className="mb-2">Direct Technical Inquiries</Badge>
            <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', margin: '0.4rem 0 1rem' }}>
              Connect with GMP VISION Engineering
            </h1>
            <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Whether you are planning a greenfield pharmaceutical cleanroom or upgrading existing AHU & piping infrastructure, our engineering leadership is ready to evaluate your requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md-grid-cols-1">
            {/* Direct Contact Cards */}
            <div>
              <h2 style={{ fontSize: '1.75rem', color: '#051C42', marginBottom: '1.25rem' }}>
                Operational Contact Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div className="card-elevated" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '8px', backgroundColor: 'rgba(10, 59, 133, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={22} color="#0A3B85" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>DIRECT TELEPHONE</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#051C42' }}>
                      <a href={`tel:${SITE_SETTINGS.contact.primaryPhone}`}>{SITE_SETTINGS.contact.primaryPhone}</a> • <a href={`tel:${SITE_SETTINGS.contact.secondaryPhone}`}>{SITE_SETTINGS.contact.secondaryPhone}</a>
                    </div>
                  </div>
                </div>

                <div className="card-elevated" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '8px', backgroundColor: 'rgba(61, 174, 43, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Mail size={22} color="#3DAE2B" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>CORPORATE EMAIL</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#051C42' }}>
                      <a href={`mailto:${SITE_SETTINGS.contact.primaryEmail}`}>{SITE_SETTINGS.contact.primaryEmail}</a>
                    </div>
                  </div>
                </div>

                <div className="card-elevated" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '8px', backgroundColor: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={22} color="#25D366" />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>WHATSAPP TECHNICAL HOTLINE</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#051C42' }}>
                      <button onClick={handleWhatsApp} style={{ color: '#25D366', fontWeight: 700 }}>
                        +91 9817343117 (Instant Chat)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Commitments */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Clock size={18} color="#3DAE2B" />
                  <strong style={{ color: '#051C42', fontSize: '0.95rem' }}>Response Time Guarantee:</strong>
                </div>
                <p style={{ color: '#64748B', fontSize: '0.88rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  {SITE_SETTINGS.contact.responseTime}. For urgent plant breakdowns or validation deadlines, call directly.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#0A3B85', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#0A3B85" />
                  <span>GSTIN Registered Entity: {SITE_SETTINGS.contact.gstin}</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="card-elevated" style={{ padding: '2.5rem', backgroundColor: '#FFFFFF', borderTop: '5px solid #3DAE2B' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#051C42', marginBottom: '0.5rem' }}>
                Send Direct Technical Enquiry
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
                Fill out the quick form below or use our multi-step quote builder for detailed BOQs.
              </p>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <CheckCircle2 size={48} color="#3DAE2B" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ color: '#051C42', marginBottom: '0.5rem' }}>Message Received</h3>
                  <p style={{ color: '#64748B', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                    Thank you, {formData.name}. Our regional engineer will reach out to {formData.phone} shortly.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. Parveen Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company / Plant Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Mankind Biotech"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md-grid-cols-1">
                    <div className="form-group">
                      <label className="form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        className="form-input"
                        placeholder="+91 98XXXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Corporate Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Requirements / Message</label>
                    <textarea
                      rows={4}
                      className="form-textarea"
                      placeholder="Describe cleanroom requirements, AHU CFM requirements, piping loop, or validation timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" style={{ width: '100%', marginTop: '0.5rem', gap: '0.5rem' }}>
                    <Send size={18} />
                    <span>Submit Enquiry</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
