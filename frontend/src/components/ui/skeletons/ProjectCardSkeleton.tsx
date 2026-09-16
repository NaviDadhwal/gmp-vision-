import React from 'react';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="skeleton" style={{ width: '100%', height: '200px' }} />
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="skeleton" style={{ width: '40%', height: '18px' }} />
        <div className="skeleton" style={{ width: '85%', height: '22px' }} />
        <div className="skeleton" style={{ width: '100%', height: '36px' }} />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <div className="skeleton" style={{ width: '60px', height: '20px' }} />
          <div className="skeleton" style={{ width: '70px', height: '20px' }} />
        </div>
      </div>
    </div>
  );
};
