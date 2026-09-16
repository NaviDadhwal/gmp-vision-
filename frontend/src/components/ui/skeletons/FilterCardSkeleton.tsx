import React from 'react';

export const FilterCardSkeleton: React.FC = () => {
  return (
    <div className="card-elevated" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="skeleton" style={{ width: '80px', height: '22px' }} />
        <div className="skeleton" style={{ width: '90px', height: '22px' }} />
      </div>
      <div className="skeleton" style={{ width: '100%', height: '160px', borderRadius: '8px' }} />
      <div className="skeleton" style={{ width: '70%', height: '24px' }} />
      <div className="skeleton" style={{ width: '100%', height: '40px' }} />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div className="skeleton" style={{ width: '50%', height: '36px' }} />
        <div className="skeleton" style={{ width: '50%', height: '36px' }} />
      </div>
    </div>
  );
};
