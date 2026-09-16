import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Briefcase,
  Layers,
  Wind,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  Download,
  Plus,
} from 'lucide-react';
import { projects } from '../../../data/projects';
import { products } from '../../../data/products';
import { filterCategories } from '../../../data/filters';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    // Load leads from localStorage with fallback defaults
    try {
      const stored = JSON.parse(localStorage.getItem('gmp_mock_leads') || '[]');
      if (stored.length > 0) {
        setLeads(stored);
      } else {
        const seedLeads = [
          {
            _id: 'rfq_1001',
            companyName: 'Mankind Pharma Ltd.',
            contactName: 'Dr. R. K. Sharma',
            phone: '+91-9816098765',
            email: 'rksharma@mankindpharma.com',
            source: 'rfq',
            status: 'new',
            projectType: ['Modular Cleanroom Systems', 'HVAC & Air Handling Units'],
            cleanroomClass: 'ISO 7 (Class 10,000)',
            areaSqFt: '14,500 sq.ft',
            message: 'Requirement for sterile injectable block expansion at Paonta Sahib facility.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            _id: 'rfq_1002',
            companyName: 'Sun Pharmaceutical Industries',
            contactName: 'Vikram Mehta (VP Projects)',
            phone: '+91-9817211223',
            email: 'vikram.mehta@sunpharma.com',
            source: 'rfq',
            status: 'reviewing',
            projectType: ['Air Filtration & Containment', 'DQ/IQ/OQ/PQ Validation'],
            cleanroomClass: 'ISO 5 (Class 100)',
            areaSqFt: '8,200 sq.ft',
            message: 'Terminal HEPA replacement (H14 EN1822) and annual DOP/PAO leak integrity testing.',
            createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
          },
          {
            _id: 'wa_1003',
            companyName: 'Torrent Pharmaceuticals Ltd.',
            contactName: 'Ashok Patel',
            phone: '+91-9817343117',
            email: 'ashok.p@torrentpharma.com',
            source: 'whatsapp',
            status: 'contacted',
            projectType: ['Purified Water & WFI Loops'],
            cleanroomClass: 'Oral Solid Dosage Area',
            areaSqFt: '6,000 sq.ft',
            message: 'Direct WhatsApp inquiry from Solutions Page regarding orbital welded SS-316L distribution loop.',
            createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
          },
        ];
        localStorage.setItem('gmp_mock_leads', JSON.stringify(seedLeads));
        setLeads(seedLeads);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const newCount = leads.filter((l) => l.status === 'new').length;

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Company', 'Contact', 'Phone', 'Email', 'Source', 'Status', 'Area', 'Date'];
    const rows = leads.map((l) => [
      l._id,
      `"${l.companyName || ''}"`,
      `"${l.contactName || ''}"`,
      l.phone || '',
      l.email || '',
      l.source || 'web',
      l.status || 'new',
      `"${l.areaSqFt || ''}"`,
      new Date(l.createdAt).toLocaleDateString(),
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GMP_VISION_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Executive Dashboard
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Operational telemetry, commercial RFQ intake pipeline, and digital asset management.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Button variant="outline" size="sm" onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={15} /> Export Leads CSV
          </Button>
          <Link to="/admin/projects" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={15} /> Add Project
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Card 1: Leads */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Total RFQ Inquiries
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary, #0A3B85)', marginTop: '0.25rem' }}>
                {leads.length}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(10, 59, 133, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A3B85',
              }}
            >
              <Inbox size={22} />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
            <span style={{ color: '#3DAE2B', fontWeight: 700 }}>{newCount} New</span> awaiting review
          </div>
          <Link
            to="/admin/leads"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: '#0A3B85',
              fontWeight: 600,
              marginTop: '0.75rem',
              textDecoration: 'none',
            }}
          >
            Review leads queue <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 2: Projects */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Turnkey Projects
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', marginTop: '0.25rem' }}>
                {projects.length}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(61, 174, 43, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3DAE2B',
              }}
            >
              <Briefcase size={22} />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B' }}>
            <CheckCircle2 size={14} color="#3DAE2B" /> 100% Commissioned & Handed Over
          </div>
          <Link
            to="/admin/projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: '#0A3B85',
              fontWeight: 600,
              marginTop: '0.75rem',
              textDecoration: 'none',
            }}
          >
            Manage project case studies <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 3: Products */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Turnkey Products
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', marginTop: '0.25rem' }}>
                {products.length}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(10, 59, 133, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0A3B85',
              }}
            >
              <Layers size={22} />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B' }}>
            AHUs, Panels, RO & WFI, Panels
          </div>
          <Link
            to="/admin/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: '#0A3B85',
              fontWeight: 600,
              marginTop: '0.75rem',
              textDecoration: 'none',
            }}
          >
            Update catalog specifications <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Card 4: Filtration */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                Filtration Categories
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', marginTop: '0.25rem' }}>
                {filterCategories.length}
              </div>
            </div>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: 'rgba(61, 174, 43, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3DAE2B',
              }}
            >
              <Wind size={22} />
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748B' }}>
            EN 779 & EN 1822 Compliant
          </div>
          <Link
            to="/admin/filtration"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: '#0A3B85',
              fontWeight: 600,
              marginTop: '0.75rem',
              textDecoration: 'none',
            }}
          >
            Manage filter specifications <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Recent RFQs Section */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: 0 }}>
              Recent Commercial RFQs & WhatsApp Leads
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0.2rem 0 0 0' }}>
              Real-time engineering inquiries captured across web forms and WhatsApp click beacons.
            </p>
          </div>
          <Link to="/admin/leads" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" size="sm">
              View All ({leads.length}) →
            </Button>
          </Link>
        </div>

        {/* Leads Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 600 }}>Client / Company</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Contact Person</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Facility Class / Scope</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Source</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem 1.5rem', fontWeight: 600 }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead) => (
                <tr
                  key={lead._id}
                  style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                >
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--color-navy, #051C42)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={16} color="#0A3B85" />
                      {lead.companyName || 'Enterprise Inquirer'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1rem', color: '#334155' }}>
                    <div>{lead.contactName || 'N/A'}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{lead.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 1rem', color: '#475569' }}>
                    <div style={{ fontWeight: 600, color: '#0A3B85' }}>{lead.cleanroomClass || 'Turnkey MEP'}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{lead.areaSqFt || 'Turnkey Project'}</div>
                  </td>
                  <td style={{ padding: '1rem 1rem' }}>
                    <Badge variant={lead.source === 'whatsapp' ? 'success' : 'primary'}>
                      {lead.source === 'whatsapp' ? 'WhatsApp' : 'RFQ Builder'}
                    </Badge>
                  </td>
                  <td style={{ padding: '1rem 1rem' }}>
                    <Badge
                      variant={
                        lead.status === 'new'
                          ? 'danger'
                          : lead.status === 'reviewing'
                          ? 'warning'
                          : 'success'
                      }
                    >
                      {lead.status?.toUpperCase() || 'NEW'}
                    </Badge>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748B', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                      <Clock size={13} />
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operations Quick Shortcuts & Architecture Integrity */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {/* Module Management Links */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: '0 0 1rem 0' }}>
            CMS Module Quick Navigation
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { to: '/admin/leads', title: 'Leads & RFQ Queue', desc: 'Process quote inquiries & update deal statuses' },
              { to: '/admin/projects', title: 'Case Study Portfolio', desc: 'Add photos, scope details, and ISO classifications' },
              { to: '/admin/products', title: 'Turnkey Equipment', desc: 'Configure AHU, water, and panel specifications' },
              { to: '/admin/filtration', title: 'Air Filtration Catalog', desc: 'Manage EN 779/1822 specs and filter datasheets' },
              { to: '/admin/clients', title: 'Client Trust Showcase', desc: 'Reorder pharma logos and industrial references' },
              { to: '/admin/settings', title: 'Global Brand Settings', desc: 'Live adjust hero text, ticker metrics, and contact numbers' },
            ].map((m) => (
              <Link
                key={m.to}
                to={m.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background-color 0.15s',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A3B85' }}>{m.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{m.desc}</div>
                </div>
                <ArrowUpRight size={16} color="#0A3B85" />
              </Link>
            ))}
          </div>
        </div>

        {/* Security & System Integrity Card */}
        <div
          style={{
            backgroundColor: '#051C42',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} color="#3DAE2B" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                System Architecture Status
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.5 }}>
              GMP VISION frontend is executing with strict in-memory JWT storage, DOMPurify XSS sanitization, and autonomous local storage persistence.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                <span style={{ color: '#94A3B8' }}>Authentication Closure:</span>
                <span style={{ color: '#3DAE2B', fontWeight: 600 }}>Encapsulated (tokenStore)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                <span style={{ color: '#94A3B8' }}>RFQ Draft Session:</span>
                <span style={{ color: '#3DAE2B', fontWeight: 600 }}>24-Hour TTL SessionStorage</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.35rem' }}>
                <span style={{ color: '#94A3B8' }}>WhatsApp Lead Beacon:</span>
                <span style={{ color: '#3DAE2B', fontWeight: 600 }}>navigator.sendBeacon Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                <span style={{ color: '#94A3B8' }}>Primary Facility:</span>
                <span style={{ color: '#F8FAFC' }}>Una & Nalagarh (Baddi Corridor)</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Corporate Helpline:</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#3DAE2B' }}>+91-9817343117 / +91-9816043117</div>
          </div>
        </div>
      </div>
    </div>
  );
};
