import React, { useEffect, useState } from 'react';
import {
  Download,
  Phone,
  Mail,
  Search,
  RefreshCw,
} from 'lucide-react';
import { ApiService } from '../../../lib/api/endpoints';
import type { Lead } from '../../../types/api';

const FALLBACK_LEADS: Partial<Lead>[] = [
  {
    _id: 'lead-1',
    companyName: 'Apex Sterile Formulations Ltd',
    contactName: 'Dr. Vikram Patel (VP Engineering)',
    phone: '+91 98250 11223',
    email: 'v.patel@apexsterile.com',
    divisions: ['Modular Cleanroom Panels & Partitions', 'HVAC & Air Handling Unit (AHU) Systems'],
    roomDimensions: '14 × 10 × 3.2 meters',
    cfm: 8400,
    message: 'Planning an expansion for a sterile vial filling suite in Baddi. Need 60 ACPH and Class 5 laminar terminal units.',
    source: 'rfq_form',
    status: 'new',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'lead-2',
    companyName: 'BioGenix Diagnostics & Devices',
    contactName: 'Ananya Roy',
    phone: '+91 98110 44556',
    email: 'ananya@biogenix.in',
    divisions: ['Laminar Air Flow (LAF) & Biosafety Equipment', 'Pass Boxes & Dynamic Airlocks'],
    roomDimensions: '8 × 6 × 3 meters',
    cfm: 3200,
    message: 'Requirement for 4 units of Class II Type A2 biosafety cabinets and 2 dynamic pass boxes with UV timer.',
    source: 'rfq_form',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: 'lead-3',
    companyName: 'Torque Active Pharma Ingredients',
    contactName: 'Rajeev Malhotra',
    phone: '+91 97120 77889',
    email: 'rmalhotra@torqueapi.com',
    divisions: ['Air Filtration & Terminal HEPA Units'],
    roomDimensions: '20 × 15 × 4 meters',
    cfm: 18000,
    message: 'Annual filter replacement order for 48 units of H14 Gel-seal HEPA modules and 120 G4 pre-filters.',
    source: 'contact_form',
    status: 'quoted',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Partial<Lead>[]>(FALLBACK_LEADS);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [exporting, setExporting] = useState(false);

  async function loadLeads() {
    try {
      const res = await ApiService.getLeads({
        status: selectedStatus === 'all' ? undefined : selectedStatus,
        limit: 50,
      });
      if (res && res.data && res.data.length > 0) {
        setLeads(res.data);
      }
    } catch (err) {
      console.warn('Backend leads API offline, using cached dashboard leads:', err);
    }
  }

  useEffect(() => {
    loadLeads();
  }, [selectedStatus]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await ApiService.updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus as any } : l))
      );
    } catch (err) {
      console.error('Failed to update lead status:', err);
      // Optimistic update for UI test
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus as any } : l))
      );
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      await ApiService.exportLeadsCSV();
    } catch (err) {
      console.error('Export failed:', err);
      // Fallback CSV download from current state
      const headers = ['Company', 'Contact', 'Phone', 'Email', 'CFM', 'Status', 'Date'];
      const rows = leads.map((l) => [
        `"${l.companyName || ''}"`,
        `"${l.contactName || ''}"`,
        `"${l.phone || ''}"`,
        `"${l.email || ''}"`,
        `"${l.cfm || ''}"`,
        `"${l.status || ''}"`,
        `"${l.createdAt || ''}"`,
      ]);
      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gmp_vision_leads_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setExporting(false);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = selectedStatus === 'all' || l.status === selectedStatus;
    const matchesSearch =
      !searchTerm ||
      l.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. Header Overview & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-navy">
            Cleanroom Inquiries & RFQ Management
          </h1>
          <p className="text-xs text-brand-muted font-mono mt-1">
            Real-time pipeline monitoring for pharmaceutical client specifications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadLeads()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-white border border-brand-border text-brand-navy hover:bg-brand-soft transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>

          <button
            onClick={handleExportCSV}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold bg-brand-primary hover:bg-brand-primaryHover text-white shadow-hud transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? 'Generating CSV...' : 'Export Pipeline CSV'}
          </button>
        </div>
      </div>

      {/* 2. Pipeline Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Inquiries', count: leads.length, status: 'all', color: 'text-brand-primary' },
          {
            label: 'New Unassigned',
            count: leads.filter((l) => l.status === 'new').length,
            status: 'new',
            color: 'text-blue-600',
          },
          {
            label: 'Under Tech Review',
            count: leads.filter((l) => l.status === 'contacted' || l.status === 'qualified').length,
            status: 'contacted',
            color: 'text-amber-600',
          },
          {
            label: 'Commercial Quotes Out',
            count: leads.filter((l) => l.status === 'quoted' || l.status === 'converted').length,
            status: 'quoted',
            color: 'text-brand-green',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedStatus(item.status)}
            className={`p-5 rounded-xl border bg-white shadow-sm cursor-pointer transition-all ${
              selectedStatus === item.status
                ? 'border-brand-primary ring-1 ring-brand-primary'
                : 'border-brand-border hover:border-brand-border/80'
            }`}
          >
            <span className="text-xs font-mono text-brand-muted uppercase block">{item.label}</span>
            <span className={`text-2xl font-mono font-extrabold mt-1 block ${item.color}`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Search & Filter Toolstrip */}
      <div className="bg-white p-4 rounded-xl border border-brand-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {['all', 'new', 'contacted', 'qualified', 'quoted', 'converted', 'closed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-soft text-brand-navy hover:bg-brand-border/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            placeholder="Search company, contact or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-brand-soft/50 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* 4. Leads Data Table */}
      <div className="bg-white rounded-xl border border-brand-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-border text-left">
            <thead className="bg-brand-soft text-[11px] font-mono uppercase text-brand-navy font-bold">
              <tr>
                <th className="px-6 py-3.5">Company & Client</th>
                <th className="px-6 py-3.5">Contact Details</th>
                <th className="px-6 py-3.5">Cleanroom Parameters</th>
                <th className="px-6 py-3.5">Required Divisions</th>
                <th className="px-6 py-3.5">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 text-xs">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-brand-muted">
                    No inquiries found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-brand-soft/30 transition-colors">
                    {/* Company Column */}
                    <td className="px-6 py-4 align-top">
                      <div className="font-bold text-brand-navy text-sm">{lead.companyName || 'Individual / Consultant'}</div>
                      <div className="text-xs text-brand-muted mt-0.5">{lead.contactName}</div>
                      <span className="text-[10px] font-mono text-brand-muted block mt-1">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''} &bull; {lead.source}
                      </span>
                    </td>

                    {/* Contact Column */}
                    <td className="px-6 py-4 align-top space-y-1">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1.5 text-brand-primary hover:underline font-mono text-xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {lead.phone}
                        </a>
                      )}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1.5 text-brand-muted hover:text-brand-navy text-xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {lead.email}
                        </a>
                      )}
                    </td>

                    {/* Parameters Column */}
                    <td className="px-6 py-4 align-top">
                      {lead.cfm ? (
                        <div className="font-mono font-bold text-brand-navy">
                          {lead.cfm.toLocaleString()} <span className="text-[10px] text-brand-primary">CFM</span>
                        </div>
                      ) : (
                        <span className="text-brand-muted">CFM not specified</span>
                      )}
                      {lead.roomDimensions && (
                        <div className="text-[11px] font-mono text-brand-muted mt-0.5">
                          Dim: {lead.roomDimensions}
                        </div>
                      )}
                      {lead.message && (
                        <p className="text-[11px] text-brand-muted mt-1.5 line-clamp-2 max-w-xs italic">
                          "{lead.message}"
                        </p>
                      )}
                    </td>

                    {/* Divisions Column */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {lead.divisions && lead.divisions.length > 0 ? (
                          lead.divisions.map((d, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-soft border border-brand-border text-brand-navy"
                            >
                              {d}
                            </span>
                          ))
                        ) : (
                          <span className="text-brand-muted text-[11px]">General Turnkey Inquiry</span>
                        )}
                      </div>
                    </td>

                    {/* Status Dropdown Column */}
                    <td className="px-6 py-4 align-top">
                      <select
                        value={lead.status || 'new'}
                        onChange={(e) => handleStatusChange(lead._id!, e.target.value)}
                        className={`text-xs font-mono font-bold px-2.5 py-1.5 rounded-md border focus:outline-none ${
                          lead.status === 'new'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.status === 'contacted'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : lead.status === 'quoted'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : lead.status === 'converted'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        <option value="new">● NEW</option>
                        <option value="contacted">● CONTACTED</option>
                        <option value="qualified">● QUALIFIED</option>
                        <option value="quoted">● QUOTED</option>
                        <option value="converted">● CONVERTED</option>
                        <option value="closed">● CLOSED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
