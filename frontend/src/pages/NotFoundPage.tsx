import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <span className="stencil-number" style={{ fontSize: '6rem', color: '#0A3B85', display: 'block', marginBottom: '0.5rem' }}>
          404
        </span>
        <h1 style={{ fontSize: '2rem', color: '#051C42', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.6 }}>
          The requested page or catalog resource could not be found. It may have been moved or updated.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return Home
          </Link>
          <Link to="/solutions" className="btn btn-outline">
            Browse All Solutions
          </Link>
        </div>
      </div>
    </div>
  );
};
