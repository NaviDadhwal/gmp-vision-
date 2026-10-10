import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Layers } from 'lucide-react';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-brand-border shadow-card text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-soft border border-brand-border">
            <TelemetryBadge label="STATUS 404" variant="blue" />
            <span className="text-[11px] font-mono text-brand-navy font-bold">
              STERILE BARRIER BREACH
            </span>
          </div>

          <h1 className="text-2xl font-display font-bold text-brand-navy">
            Cleanroom Zone Not Found
          </h1>

          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
            The cleanroom sector, equipment specification, or document route you attempted to access does not exist or has been relocated to an aseptic buffer zone.
          </p>
        </div>

        <div className="pt-2 border-t border-brand-border space-y-2">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white py-2.5 rounded-md text-xs font-semibold shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Cleanroom Air-Lock (Home)
          </Link>

          <Link
            to="/divisions"
            className="w-full inline-flex items-center justify-center gap-2 bg-brand-soft hover:bg-brand-border/60 text-brand-navy py-2.5 rounded-md text-xs font-semibold border border-brand-border transition-colors"
          >
            <Layers className="w-4 h-4" />
            Explore Turnkey Divisions
          </Link>
        </div>
      </div>
    </div>
  );
};
