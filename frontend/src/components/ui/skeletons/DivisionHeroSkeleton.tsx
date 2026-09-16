import React from 'react';

export const DivisionHeroSkeleton: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#051C42', padding: '5rem 0', color: '#fff' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '800px' }}>
        <div className="skeleton" style={{ width: '120px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
        <div className="skeleton" style={{ width: '90%', height: '48px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
        <div className="skeleton" style={{ width: '70%', height: '28px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
        <div className="skeleton" style={{ width: '100%', height: '72px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <div className="skeleton" style={{ width: '160px', height: '44px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
          <div className="skeleton" style={{ width: '160px', height: '44px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6 lg-grid-cols-2 md-grid-cols-1">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="card-elevated" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="skeleton" style={{ width: '100%', height: '180px', borderRadius: '8px' }} />
          <div className="skeleton" style={{ width: '50%', height: '18px' }} />
          <div className="skeleton" style={{ width: '80%', height: '22px' }} />
          <div className="skeleton" style={{ width: '100%', height: '40px' }} />
          <div className="skeleton" style={{ width: '100%', height: '38px', marginTop: '0.5rem' }} />
        </div>
      ))}
    </div>
  );
};
