import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

export const ComplianceBar: React.FC = () => {
  const standards = [
    { code: 'cGMP', desc: 'Current Good Manufacturing Practice' },
    { code: 'WHO-TRS 961', desc: 'Technical Report Series for Sterile Facilities' },
    { code: 'USFDA 21 CFR Part 11', desc: 'Electronic Records & Audit Trails' },
    { code: 'ISO 14644-1', desc: 'Cleanrooms & Associated Controlled Environments' },
    { code: 'Schedule M', desc: 'Revised Indian Pharma Manufacturing Standards' },
    { code: 'ISHRAE / ASHRAE', desc: 'Cleanroom HVAC Design Guidelines' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
        padding: '1.25rem 0',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} color="#3DAE2B" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0A3B85' }}>
              Certified Regulatory Compliance Standards
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {standards.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.85rem',
                  backgroundColor: '#F4F7FB',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                }}
                title={s.desc}
              >
                <CheckCircle2 size={14} color="#3DAE2B" />
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#051C42' }}>{s.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
