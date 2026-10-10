import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Download,
  Activity,
  Building2,
  Phone,
  Sparkles,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import type { Division, Product, ClientPartner, SiteSettings } from '../types/api';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

export const HomePage: React.FC = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<ClientPartner[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [divs, prodsRes, clientList, siteConfig] = await Promise.allSettled([
          ApiService.getDivisions(),
          ApiService.getProducts({ featured: true, limit: 6 }),
          ApiService.getClients(),
          ApiService.getSettings(),
        ]);

        if (divs.status === 'fulfilled') setDivisions(divs.value);
        if (prodsRes.status === 'fulfilled') setFeaturedProducts(prodsRes.value.data);
        if (clientList.status === 'fulfilled') setClients(clientList.value);
        if (siteConfig.status === 'fulfilled') setSettings(siteConfig.value);
      } catch (e) {
        console.error('Failed to load home page dynamic data:', e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION: Cleanroom HUD & Industrial Engineering Showcase */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Telemetry Tag */}
              <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-full bg-brand-soft border border-brand-border">
                <TelemetryBadge label="ISO 14644-1 : CLASS 5" variant="green" pulse />
                <span className="text-xs font-mono font-medium text-brand-dark">
                  cGMP & Schedule M Turnkey Engineering
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brand-navy tracking-tight leading-[1.1]">
                Precision Cleanrooms.{' '}
                <span className="text-brand-primary">Engineered for Zero</span> Contamination.
              </h1>

              {/* Sub-headline */}
              <p className="text-lg text-brand-muted max-w-2xl leading-relaxed">
                Single-source engineering, manufacturing, and validation for pharmaceutical,
                biotechnology, and healthcare facilities. Turnkey modular panels, HVAC/AHUs,
                and high-efficiency filtration systems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/rfq"
                  className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primaryHover text-white px-6 py-3.5 rounded-md font-semibold text-base shadow-hud hover:shadow-hud-hover transition-all duration-200"
                >
                  Configure Cleanroom RFQ
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="/Broucher.pdf"
                  download="GMP_VISION_Corporate_Brochure.pdf"
                  className="inline-flex items-center gap-2 bg-white hover:bg-brand-soft text-brand-navy border border-brand-border px-5 py-3.5 rounded-md font-semibold text-base transition-colors"
                >
                  <Download className="w-5 h-5 text-brand-green" />
                  Engineering Catalog
                </a>
              </div>

              {/* Live Technical Metrics HUD */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-border">
                <div>
                  <div className="text-2xl font-display font-bold text-brand-navy">
                    {settings?.experience_years || 15}+
                  </div>
                  <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                    Years Industry Proven
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-brand-navy">
                    {settings?.projects_completed || 250}+
                  </div>
                  <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                    Turnkey Projects
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-brand-green">
                    99.997%
                  </div>
                  <div className="text-xs font-mono text-brand-muted uppercase tracking-wider">
                    DOP HEPA Efficiency
                  </div>
                </div>
              </div>
            </div>

            {/* Right Media & Instrumentation Rack Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-brand-border shadow-2xl bg-brand-soft">
                <img
                  src="/images/modular-cleanroom-interior.jpg"
                  alt="GMP VISION Modular Cleanroom Installation"
                  className="w-full h-80 sm:h-96 object-cover"
                />

                {/* Sterile Parameters Overlay Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-4 border-t border-brand-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-brand-green" />
                      Aseptic Room Status
                    </span>
                    <TelemetryBadge label="STABLE" variant="green" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="bg-brand-soft p-1.5 rounded border border-brand-border">
                      <div className="text-[10px] text-brand-muted">Pressure (ΔP)</div>
                      <div className="font-bold text-brand-primary">+45 Pa</div>
                    </div>
                    <div className="bg-brand-soft p-1.5 rounded border border-brand-border">
                      <div className="text-[10px] text-brand-muted">Air Velocity</div>
                      <div className="font-bold text-brand-dark">0.45 m/s</div>
                    </div>
                    <div className="bg-brand-soft p-1.5 rounded border border-brand-border">
                      <div className="text-[10px] text-brand-muted">ACPH</div>
                      <div className="font-bold text-brand-green">48 ACPH</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Validation Badge */}
              <div className="absolute -top-4 -left-4 bg-white px-3.5 py-2 rounded-lg border border-brand-border shadow-lg hidden sm:flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-green" />
                <div className="text-xs font-mono">
                  <div className="font-bold text-brand-navy">Schedule M / WHO-GMP</div>
                  <div className="text-[10px] text-brand-muted">100% Audit Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 7 TURNKEY DIVISIONS SECTION */}
      <section className="bg-brand-soft py-20 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-green mb-2">
                Single-Source Turnkey Contracting
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
                7 Specialized Cleanroom Divisions
              </h2>
            </div>
            <Link
              to="/divisions"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-primaryHover group"
            >
              Explore All Divisions
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divisions.slice(0, 6).map((div) => (
              <div
                key={div._id}
                className="bg-white rounded-lg p-6 border border-brand-border hover:border-brand-primary/60 transition-all duration-200 hover:shadow-hud group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-md bg-brand-soft border border-brand-border flex items-center justify-center text-brand-primary font-bold font-mono">
                      0{div.number}
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-brand-soft text-brand-muted border border-brand-border">
                      Turnkey Scope
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                    {div.title}
                  </h3>

                  <p className="text-xs text-brand-muted leading-relaxed line-clamp-3">
                    {div.tagline}
                  </p>
                </div>

                <div className="pt-6 border-t border-brand-border/60 mt-6 flex justify-between items-center text-xs">
                  <Link
                    to={`/divisions/${div.slug}`}
                    className="font-semibold text-brand-primary hover:underline flex items-center gap-1"
                  >
                    Specifications & Equipment →
                  </Link>
                  <Link
                    to="/rfq"
                    className="text-brand-muted hover:text-brand-green font-medium"
                  >
                    Quick RFQ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CLEANROOM EQUIPMENT & CATALOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary mb-2">
              Engineering Hardware & Machinery
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-navy tracking-tight">
              Featured Cleanroom Products
            </h2>
          </div>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="text-sm font-semibold text-brand-primary hover:underline"
            >
              All Modular Equipment
            </Link>
            <span className="text-brand-border">|</span>
            <Link
              to="/filters"
              className="text-sm font-semibold text-brand-green hover:underline"
            >
              Air Filters Catalog
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.slice(0, 3).map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-lg border border-brand-border overflow-hidden hover:shadow-hud transition-all duration-200 group"
            >
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                <img
                  src={prod.images[0] || '/images/hvac-ahu-plant.jpg'}
                  alt={prod.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 text-[10px] font-mono uppercase bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded font-semibold text-brand-navy border border-brand-border">
                  {prod.category}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-base text-brand-navy group-hover:text-brand-primary transition-colors">
                  {prod.name}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2">
                  {prod.description}
                </p>

                <div className="pt-3 border-t border-brand-border flex items-center justify-between text-xs">
                  <Link
                    to={`/products/${prod.slug}`}
                    className="font-semibold text-brand-primary hover:underline"
                  >
                    View Technical Drawing →
                  </Link>
                  <Link
                    to="/rfq"
                    className="font-semibold text-brand-green hover:underline"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLIENTS & PHARMACEUTICAL TRUST WALL */}
      <section className="bg-brand-soft py-16 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <div className="max-w-xl mx-auto space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-brand-muted font-bold">
              Trusted By Leading Healthcare & Biotech Manufacturers
            </h3>
            <p className="text-sm text-brand-navy font-semibold">
              Delivering Certified Cleanrooms Across Pan-India
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 pt-4">
            {clients.slice(0, 6).map((client) => (
              <div
                key={client._id}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded border border-brand-border shadow-sm text-xs font-bold text-brand-navy"
              >
                <Building2 className="w-4 h-4 text-brand-green" />
                <span>{client.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DIRECT ESTIMATION & CONSULTATION CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-brand-navy to-brand-primary text-white rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-brand-green bg-white/10 px-3 py-1 rounded">
              <Sparkles className="w-3.5 h-3.5" /> Turnkey Estimations in 24 Hours
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
              Ready to Commission Your Cleanroom or AHU System?
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              Submit your room dimensions, target ISO classification, and CFM specifications.
              Our engineering team will prepare your preliminary Layout Drawings & DQ Dossier.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0">
            <Link
              to="/rfq"
              className="bg-brand-green hover:bg-brand-greenDeep text-white font-bold px-6 py-3.5 rounded-md text-sm text-center shadow-lg transition-colors"
            >
              Start RFQ Estimator
            </Link>
            <a
              href="tel:+919817343117"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3.5 rounded-md text-sm text-center border border-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-brand-green" />
              +91-9817343117
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
