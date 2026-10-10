import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  ArrowRight,
} from 'lucide-react';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-12 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand-border">
            <TelemetryBadge label="GMP CORPORATE PROFILE" variant="green" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              ISO 9001:2015 & cGMP VALIDATED INFRASTRUCTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight">
            Pioneering Pharmaceutical Cleanroom Engineering
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-3xl leading-relaxed">
            GMP Vision is an engineering and turnkey manufacturing pioneer dedicated exclusively to
            controlled contamination environments, modular cleanroom envelopes, precision HVAC systems,
            and aseptic bio-containment equipment for global life sciences.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-5 py-2.5 rounded-md text-xs font-semibold shadow-hud transition-colors"
            >
              Consult Our Applications Engineers
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/Broucher.pdf"
              download="GMP_VISION_Corporate_Brochure.pdf"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-4 py-2.5 rounded-md text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 text-brand-green" />
              Download Corporate Profile (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics & Telemetry Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '18+', label: 'Years of Engineering Excellence', note: 'Founded in 2008' },
            { value: '150+', label: 'Turnkey Cleanrooms Built', note: 'Pharma, Biotech & Devices' },
            { value: '500,000+', label: 'Sq.Ft Cleanroom Space', note: 'ISO Class 4 to Class 8' },
            { value: '100%', label: 'First-Pass Audit Success', note: 'US FDA, WHO & EU GMP' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-brand-border shadow-card space-y-2 text-center"
            >
              <span className="text-3xl sm:text-4xl font-mono font-extrabold text-brand-primary block">
                {stat.value}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-brand-navy">{stat.label}</h3>
              <p className="text-[11px] font-mono text-brand-muted">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. In-House Manufacturing Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              FACILITY & PRODUCTION CAPACITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy">
              Advanced CNC Fabrication & Clean Testing Tunnels
            </h2>
            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              Operating out of dedicated manufacturing facilities in Delhi NCR and Baddi Industrial Area,
              GMP Vision houses computerized CNC turret punch presses, automated hydraulic press brakes,
              and continuous high-pressure PUF injection machines.
            </p>

            <ul className="space-y-3">
              {[
                'Automated 9-tank chemical pre-treatment and conveyorized powder coating line',
                'In-house PAO / DOP aerosol photometer testing tunnel for HEPA validation',
                'Precision psychrometric air handling performance test chamber',
                'Grade SS 304 / SS 316 dedicated sanitary fabrication bay with argon purging',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-navy">
                  <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-xl">
              <img
                src="/images/modular-cleanroom-interior.jpg"
                alt="GMP Vision Cleanroom Manufacturing"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="px-2.5 py-1 rounded bg-brand-green text-white font-mono font-bold text-xs">
                    CERTIFIED PLANT
                  </span>
                  <p className="text-sm font-semibold">
                    In-House Modular Panel, Door & AHU Manufacturing Unit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Regulatory Compliance Standards */}
      <section className="bg-brand-soft border-y border-brand-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              REGULATORY ACCREDITATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy">
              Engineered Strictly to International Pharmacopoeias
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted">
              Our designs and qualification dossiers withstand the most stringent audits by national and international health authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'ISO 14644-1 / ISO 14644-2',
                scope: 'Airborne Particulate Cleanliness Classes',
                desc: 'Full compliance from Class 3 to Class 8. Certified recovery time calculations and particle counter verification at rest and in operation.',
              },
              {
                title: 'WHO-GMP & Revised Schedule M',
                scope: 'Good Manufacturing Practices for Drugs',
                desc: 'Strict airlock segregation, differential pressure cascades (+15 to +45 Pa), non-shedding surfaces, and anti-fungal siliconized coving.',
              },
              {
                title: 'US FDA 21 CFR Part 211 & EU cGMP Annex 1',
                scope: 'Manufacture of Sterile Medicinal Products',
                desc: 'Grade A unidirectional laminar airflow (0.45 m/s ± 20%), continuous environmental monitoring system (EMS) ports, and smoke study validation.',
              },
            ].map((reg, rIdx) => (
              <div key={rIdx} className="bg-white p-6 rounded-xl border border-brand-border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-lg bg-brand-soft text-brand-primary flex items-center justify-center font-mono font-bold text-sm">
                  0{rIdx + 1}
                </div>
                <h3 className="text-base font-bold text-brand-navy">{reg.title}</h3>
                <p className="text-xs font-mono text-brand-green font-semibold">{reg.scope}</p>
                <p className="text-xs text-brand-muted leading-relaxed">{reg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl font-display font-bold">
              Schedule a Technical Factory Visit or Project Audit
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              We welcome pharmaceutical engineering teams, quality assurance directors, and project consultants to inspect our manufacturing lines and clean air testing laboratory.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3.5 rounded-md text-xs font-semibold shadow-lg shrink-0 transition-colors"
          >
            Schedule Plant Visit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
