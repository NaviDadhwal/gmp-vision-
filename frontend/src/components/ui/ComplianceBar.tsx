import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.25rem 0',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'center' }}>
            <ShieldCheck size={16} color="#3DAE2B" style={{ flexShrink: 0 }} />
            <span
              style={{
                fontSize: 'clamp(0.72rem, 2.2vw, 0.8rem)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#A3A3A3',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Certified Regulatory Compliance Standards
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            {standards.map((s, idx) => (
              <div
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.82rem',
                }}
                title={s.desc}
              >
                <CheckCircle2 size={13} color="#3DAE2B" style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{s.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
