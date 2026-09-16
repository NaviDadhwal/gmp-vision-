import React from 'react';
import { SEOHead } from '../components/seo/SEOHead';
import { RFQMultiStepForm } from '../features/rfq/components/RFQMultiStepForm';
import { Badge } from '../components/ui/Badge';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export const RFQPage: React.FC = () => {
  return (
    <div style={{ backgroundColor: '#F4F7FB', minHeight: '100vh', paddingBottom: '5rem' }}>
      <SEOHead
        title="Interactive Technical RFQ & Cleanroom Quote Estimator"
        description="Build your custom cleanroom and HVAC turnkey quote. Specify cleanroom dimensions, airflow CFM, target RH, and select across 7 integrated divisions."
        canonicalPath="/request-quote"
      />

      {/* Top Banner */}
      <section style={{ backgroundColor: '#051C42', color: '#FFFFFF', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <Badge variant="green" className="mb-2">Procurement & Estimations</Badge>
          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4.5vw, 3rem)', margin: '0.4rem 0 1rem' }}>
            Interactive Project Quote Builder
          </h1>
          <p style={{ color: '#CBD5E1', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Configure your technical requirements across our 7 divisions. Your progress is saved automatically so you can resume at any time.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '2rem',
              fontSize: '0.85rem',
              color: '#94A3B8',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={16} color="#3DAE2B" />
              <span style={{ color: '#FFFFFF' }}>Non-Binding Estimate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} color="#3DAE2B" />
              <span style={{ color: '#FFFFFF' }}>4-Hour Response Time</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} color="#3DAE2B" />
              <span style={{ color: '#FFFFFF' }}>cGMP / ISO Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Step Form Container */}
      <div className="container" style={{ marginTop: '-2rem' }}>
        <RFQMultiStepForm />
      </div>
    </div>
  );
};
