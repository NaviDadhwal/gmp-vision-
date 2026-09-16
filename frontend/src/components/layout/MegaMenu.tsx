import React from 'react';
import { Link } from 'react-router-dom';
import { DIVISIONS_DATA } from '../../data/divisions';
import { ArrowRight, Layers, Wind, ShieldCheck, Activity, Droplets, Zap, Cpu } from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers size={22} />,
  Wind: <Wind size={22} />,
  ShieldCheck: <ShieldCheck size={22} />,
  Activity: <Activity size={22} />,
  Droplets: <Droplets size={22} />,
  Zap: <Zap size={22} />,
  Cpu: <Cpu size={22} />,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#051C42',
        borderTop: '2px solid #3DAE2B',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        animation: 'fadeIn 0.2s ease',
      }}
      onMouseLeave={onClose}
    >
      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '0.75rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#3DAE2B', fontWeight: 700 }}>
              Turnkey Contracting Scope
            </span>
            <h3 style={{ color: '#FFFFFF', fontSize: '1.25rem', margin: '0.2rem 0 0 0' }}>
              7 Integrated Engineering Divisions
            </h3>
          </div>
          <Link
            to="/solutions"
            onClick={onClose}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#52C23F',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            Overview of All Solutions <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 lg-grid-cols-2 md-grid-cols-1">
          {DIVISIONS_DATA.map((div) => (
            <Link
              key={div.id}
              to={`/solutions/${div.slug}`}
              onClick={onClose}
              style={{
                display: 'flex',
                gap: '0.85rem',
                padding: '1rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(61, 174, 43, 0.1)';
                e.currentTarget.style.borderColor = '#3DAE2B';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(61, 174, 43, 0.15)',
                  color: '#3DAE2B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {ICON_MAP[div.iconName] || <Layers size={20} />}
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3DAE2B', letterSpacing: '0.04em' }}>
                  DIV 0{div.number}
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '0.92rem', margin: '0.15rem 0', fontWeight: 600, lineHeight: 1.3 }}>
                  {div.title}
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>
                  {div.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
