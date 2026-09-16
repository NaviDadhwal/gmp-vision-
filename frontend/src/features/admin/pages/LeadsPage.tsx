import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Phone,
  MessageSquare,
  Building2,
  Clock,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  FileText,
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

export const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  useEffect(() => {
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
            phone: '+919816098765',
            email: 'rksharma@mankindpharma.com',
            source: 'rfq',
            status: 'new',
            projectType: ['Modular Cleanroom Systems', 'HVAC & Air Handling Units'],
            cleanroomClass: 'ISO 7 (Class 10,000)',
            areaSqFt: '14,500 sq.ft',
            facilityType: 'Sterile Injectable Manufacturing',
            scope: ['PUF Modular Panels', 'AHU with VFD', 'SS 304 Ducting', 'H14 HEPA Filters'],
            designConditions: {
              temp: '22°C ± 2°C',
              rh: '45% ± 5% RH',
              pressure: '+15 Pa positive pressure differential',
            },
            message: 'Requirement for sterile injectable block expansion at Paonta Sahib facility.',
            createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            _id: 'rfq_1002',
            companyName: 'Sun Pharmaceutical Industries',
            contactName: 'Vikram Mehta (VP Projects)',
            phone: '+919817211223',
            email: 'vikram.mehta@sunpharma.com',
            source: 'rfq',
            status: 'reviewing',
            projectType: ['Air Filtration & Containment', 'DQ/IQ/OQ/PQ Validation'],
            cleanroomClass: 'ISO 5 (Class 100)',
            areaSqFt: '8,200 sq.ft',
            facilityType: 'Aseptic Filling Line',
            scope: ['Terminal HEPA Modules', 'Laminar Air Flow (LAF) Units', 'Validation & Particle Counts'],
            designConditions: {
              temp: '20°C ± 1°C',
              rh: '40% ± 5% RH',
              pressure: '+30 Pa cascade',
            },
            message: 'Terminal HEPA replacement (H14 EN1822) and annual DOP/PAO leak integrity testing.',
            createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
          },
          {
            _id: 'wa_1003',
            companyName: 'Torrent Pharmaceuticals Ltd.',
            contactName: 'Ashok Patel',
            phone: '+919817343117',
            email: 'ashok.p@torrentpharma.com',
            source: 'whatsapp',
            status: 'contacted',
            projectType: ['Purified Water & WFI Loops'],
            cleanroomClass: 'Oral Solid Dosage Area',
            areaSqFt: '6,000 sq.ft',
            facilityType: 'Solid Orals Facility',
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

  const updateLeadStatus = (id: string, newStatus: string) => {
    const updated = leads.map((lead) => (lead._id === id ? { ...lead, status: newStatus } : lead));
    setLeads(updated);
    localStorage.setItem('gmp_mock_leads', JSON.stringify(updated));
    if (selectedLead && selectedLead._id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const deleteLead = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    const updated = leads.filter((lead) => lead._id !== id);
    setLeads(updated);
    localStorage.setItem('gmp_mock_leads', JSON.stringify(updated));
    if (selectedLead && selectedLead._id === id) {
      setSelectedLead(null);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Company', 'Contact', 'Phone', 'Email', 'Source', 'Status', 'Class', 'Area', 'Date'];
    const rows = leads.map((l) => [
      l._id,
      `"${l.companyName || ''}"`,
      `"${l.contactName || ''}"`,
      l.phone || '',
      l.email || '',
      l.source || 'web',
      l.status || 'new',
      `"${l.cleanroomClass || ''}"`,
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

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.contactName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const openWhatsAppReply = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const greeting = encodeURIComponent(
      `Hello ${name || 'Sir/Madam'}, this is Parveen Kumar from GMP VISION Cleanroom & HVAC Engineering. Thank you for reaching out regarding your facility requirements.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${greeting}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
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
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Commercial Leads & RFQ Intake Queue
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Full lifecycle management for commercial inquiries, technical RFQ specs, and WhatsApp beacons.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={15} /> Export Cleanroom Pipeline CSV
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          padding: '1rem 1.25rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        {/* Search */}
        <div style={{ flex: '1 1 240px', minWidth: '200px', position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search company, contact person, email, or phone..."
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.2rem',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={15} color="#64748B" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.82rem',
              backgroundColor: '#FFFFFF',
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="won">Won / Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Source Filter */}
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            fontSize: '0.82rem',
            backgroundColor: '#FFFFFF',
          }}
        >
          <option value="all">All Sources</option>
          <option value="rfq">RFQ Quote Builder</option>
          <option value="whatsapp">WhatsApp Beacon</option>
          <option value="contact">Contact Form</option>
        </select>

        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#64748B', whiteSpace: 'nowrap' }}>
          Showing <strong>{filteredLeads.length}</strong> of <strong>{leads.length}</strong> leads
        </div>
      </div>

      {/* Leads Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
        }}
      >
        <div className="admin-table-container">
          <table style={{ width: '100%', minWidth: '780px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '0.75rem 1.25rem', fontWeight: 600 }}>Client & Facility</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Contact Info</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Cleanroom Class / Area</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Channel</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Lead Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Received</th>
                <th style={{ padding: '0.75rem 1.25rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
                    <Inbox size={40} style={{ margin: '0 auto 0.5rem', display: 'block', opacity: 0.5 }} />
                    No commercial leads match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    style={{ borderBottom: '1px solid #F1F5F9', transition: 'background-color 0.15s' }}
                  >
                    {/* Client */}
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-navy, #051C42)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Building2 size={16} color="#0A3B85" />
                        {lead.companyName || 'Private Enterprise'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        {lead.facilityType || 'Turnkey Project'}
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '1rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#1E293B' }}>{lead.contactName || 'Primary Contact'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#0A3B85', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <a href={`tel:${lead.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {lead.phone}
                        </a>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{lead.email}</div>
                    </td>

                    {/* Class / Area */}
                    <td style={{ padding: '1rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: '#0A3B85' }}>
                        {lead.cleanroomClass || 'Turnkey Cleanroom'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#475569' }}>
                        {lead.areaSqFt ? `${lead.areaSqFt}` : 'Custom Scope'}
                      </div>
                    </td>

                    {/* Source */}
                    <td style={{ padding: '1rem 1rem' }}>
                      <Badge variant={lead.source === 'whatsapp' ? 'success' : 'primary'}>
                        {lead.source === 'whatsapp' ? 'WhatsApp' : 'RFQ Builder'}
                      </Badge>
                    </td>

                    {/* Status Dropdown */}
                    <td style={{ padding: '1rem 1rem' }}>
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor:
                            lead.status === 'new'
                              ? '#FEF2F2'
                              : lead.status === 'reviewing'
                              ? '#FFFBEB'
                              : lead.status === 'won'
                              ? '#F0FDF4'
                              : '#F8FAFC',
                          color:
                            lead.status === 'new'
                              ? '#991B1B'
                              : lead.status === 'reviewing'
                              ? '#92400E'
                              : lead.status === 'won'
                              ? '#166534'
                              : '#1E293B',
                        }}
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '1rem 1rem', color: '#64748B', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} />
                        {new Date(lead.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          title="View Technical Details"
                          style={{
                            backgroundColor: '#F1F5F9',
                            border: '1px solid #CBD5E1',
                            borderRadius: '4px',
                            padding: '5px',
                            cursor: 'pointer',
                            color: '#0A3B85',
                          }}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openWhatsAppReply(lead.phone, lead.contactName)}
                          title="Reply on WhatsApp"
                          style={{
                            backgroundColor: 'rgba(61, 174, 43, 0.1)',
                            border: '1px solid #3DAE2B',
                            borderRadius: '4px',
                            padding: '5px',
                            cursor: 'pointer',
                            color: '#2F8E1E',
                          }}
                        >
                          <MessageSquare size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLead(lead._id)}
                          title="Delete Lead"
                          style={{
                            backgroundColor: '#FEF2F2',
                            border: '1px solid #FCA5A5',
                            borderRadius: '4px',
                            padding: '5px',
                            cursor: 'pointer',
                            color: '#DC2626',
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Detail Modal */}
      {selectedLead && (
        <Modal
          isOpen={Boolean(selectedLead)}
          onClose={() => setSelectedLead(null)}
          title={`RFQ Technical Dossier: ${selectedLead.companyName}`}
          maxWidth="700px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Header info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '0.75rem',
                backgroundColor: '#F8FAFC',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Inquiring Entity</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-navy, #051C42)' }}>
                  {selectedLead.companyName}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#334155' }}>
                  {selectedLead.contactName} ({selectedLead.phone} | {selectedLead.email})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '2px' }}>Status</div>
                <Badge
                  variant={
                    selectedLead.status === 'new'
                      ? 'danger'
                      : selectedLead.status === 'won'
                      ? 'success'
                      : 'warning'
                  }
                >
                  {selectedLead.status?.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Cleanroom Specs */}
            <div className="admin-grid-2">
              <div style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Classification</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A3B85' }}>
                  {selectedLead.cleanroomClass || 'Turnkey Cleanroom'}
                </div>
              </div>

              <div style={{ padding: '0.75rem', border: '1px solid #E2E8F0', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase' }}>Area Footprint</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0A3B85' }}>
                  {selectedLead.areaSqFt || 'Not specified'}
                </div>
              </div>
            </div>

            {/* Scope of Turnkey Supply */}
            {selectedLead.scope && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.5rem' }}>
                  Turnkey Equipment & Engineering Scope:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedLead.scope.map((s: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1E40AF',
                        fontSize: '0.78rem',
                        padding: '3px 8px',
                        borderRadius: '4px',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Design Conditions */}
            {selectedLead.designConditions && (
              <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                  Design Atmospheric & Environmental Parameters:
                </div>
                <div className="admin-grid-3" style={{ fontSize: '0.8rem', gap: '0.5rem' }}>
                  <div>
                    <span style={{ color: '#64748B' }}>Temp: </span>
                    <strong>{selectedLead.designConditions.temp || 'Standard'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>RH: </span>
                    <strong>{selectedLead.designConditions.rh || 'Standard'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B' }}>Pressure: </span>
                    <strong>{selectedLead.designConditions.pressure || 'Standard'}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiry Message */}
            {selectedLead.message && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                  Client Technical Notes / Requirements:
                </div>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    color: '#334155',
                    lineHeight: 1.5,
                  }}
                >
                  {selectedLead.message}
                </div>
              </div>
            )}

            {/* Actions in Modal */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => openWhatsAppReply(selectedLead.phone, selectedLead.contactName)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageSquare size={14} /> WhatsApp Reply
                </Button>
                <a href={`tel:${selectedLead.phone}`} style={{ textDecoration: 'none' }}>
                  <Button variant="outline" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} /> Call Client
                  </Button>
                </a>
              </div>

              <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                Close Dossier
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
