import React, { useState } from 'react';
import {
  Settings,
  Save,
  RotateCcw,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  FileText,
  Plus,
  Trash2,
  Eye,
} from 'lucide-react';
import { SITE_SETTINGS } from '../../../data/settings';
import { Button } from '../../../components/ui/Button';

export const SettingsAdminPage: React.FC = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_settings');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return SITE_SETTINGS;
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newMetricLabel, setNewMetricLabel] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gmp_mock_settings', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleResetDefaults = () => {
    if (!window.confirm('Reset all site settings and metrics to default values?')) return;
    setSettings(SITE_SETTINGS);
    localStorage.removeItem('gmp_mock_settings');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetricLabel.trim()) return;
    const updatedMetrics = [
      ...settings.tickerMetrics,
      { label: newMetricLabel.trim(), icon: 'CheckCircle' },
    ];
    setSettings({ ...settings, tickerMetrics: updatedMetrics });
    setNewMetricLabel('');
  };

  const handleRemoveMetric = (index: number) => {
    const updated = settings.tickerMetrics.filter((_: any, i: number) => i !== index);
    setSettings({ ...settings, tickerMetrics: updated });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Header */}
      <div className="admin-page-banner">
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Global Brand & Operational Settings
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Configure live hero messaging, executive contact helplines, plant locations, and compliance ticker metrics.
          </p>
        </div>

        <div className="admin-page-actions">
          <Button variant="outline" size="sm" onClick={handleResetDefaults} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RotateCcw size={14} /> Reset Defaults
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Save size={15} /> Save All Changes
          </Button>
        </div>
      </div>

      {savedSuccess && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#F0FDF4',
            border: '1px solid #86EFAC',
            color: '#166534',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} color="#166534" />
          Brand settings saved successfully! Changes are immediately active across public pages.
        </div>
      )}

      {/* Main Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
        {/* Left Column: Hero & Brand Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Hero Content Section */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={18} color="#0A3B85" /> Hero Messaging & Value Proposition
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Homepage Hero Headline
                </label>
                <textarea
                  rows={3}
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Hero Subheadline Description
                </label>
                <textarea
                  rows={4}
                  value={settings.heroSubheadline}
                  onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Compliance & Experience Ticker */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: '0 0 1rem 0' }}>
              Homepage Metrics & Ticker Items
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {settings.tickerMetrics.map((metric: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-navy, #051C42)' }}>{metric.label}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMetric(idx)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddMetric} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={newMetricLabel}
                onChange={(e) => setNewMetricLabel(e.target.value)}
                placeholder="e.g. 100% USFDA & WHO-GMP Audit Readiness"
                style={{ flex: '1 1 180px', minWidth: '140px', padding: '0.45rem 0.65rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.82rem', boxSizing: 'border-box' }}
              />
              <Button type="submit" variant="outline" size="sm" style={{ flex: '1 1 auto' }}>
                <Plus size={14} /> Add Metric
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Contact, GSTIN, & Facility Addresses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Contact Numbers & Channels */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={18} color="#0A3B85" /> Helplines & Corporate Identification
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="admin-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Primary Phone *
                  </label>
                  <input
                    type="text"
                    value={settings.contact.primaryPhone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...settings.contact, primaryPhone: e.target.value },
                      })
                    }
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Secondary Phone
                  </label>
                  <input
                    type="text"
                    value={settings.contact.secondaryPhone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...settings.contact, secondaryPhone: e.target.value },
                      })
                    }
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    WhatsApp Broadcast Number (Digits only)
                  </label>
                  <input
                    type="text"
                    value={settings.contact.whatsappNumber}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...settings.contact, whatsappNumber: e.target.value },
                      })
                    }
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                    Official GSTIN
                  </label>
                  <input
                    type="text"
                    value={settings.contact.gstin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        contact: { ...settings.contact, gstin: e.target.value },
                      })
                    }
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Inquiry Email Address *
                </label>
                <input
                  type="email"
                  value={settings.contact.primaryEmail}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      contact: { ...settings.contact, primaryEmail: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          {/* Plant Locations */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              padding: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-navy, #051C42)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={18} color="#0A3B85" /> Facility Addresses
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Una Registered Office */}
              <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0A3B85', marginBottom: '4px' }}>
                  Registered Office (Una, HP)
                </div>
                <input
                  type="text"
                  value={settings.registeredOffice.addressLine1}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      registeredOffice: { ...settings.registeredOffice, addressLine1: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.82rem', marginBottom: '4px' }}
                />
                <input
                  type="text"
                  value={settings.registeredOffice.addressLine2}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      registeredOffice: { ...settings.registeredOffice, addressLine2: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                />
              </div>

              {/* Nalagarh Manufacturing Plant */}
              <div style={{ padding: '0.75rem', backgroundColor: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3DAE2B', marginBottom: '4px' }}>
                  Manufacturing & Assembly Plant (Nalagarh / Baddi, HP)
                </div>
                <input
                  type="text"
                  value={settings.manufacturingFacility.addressLine1}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      manufacturingFacility: { ...settings.manufacturingFacility, addressLine1: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.82rem', marginBottom: '4px' }}
                />
                <input
                  type="text"
                  value={settings.manufacturingFacility.addressLine2}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      manufacturingFacility: { ...settings.manufacturingFacility, addressLine2: e.target.value },
                    })
                  }
                  style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
