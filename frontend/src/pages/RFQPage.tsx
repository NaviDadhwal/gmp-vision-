import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Send,
  Calculator,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { ApiService } from '../lib/api/endpoints';
import { TelemetryBadge } from '../components/common/TelemetryBadge';

const DIVISION_OPTIONS = [
  'Modular Cleanroom Panels & Partitions',
  'HVAC & Air Handling Unit (AHU) Systems',
  'Cleanroom Flush Doors & Viewing Windows',
  'Laminar Air Flow (LAF) & Biosafety Equipment',
  'Pass Boxes & Dynamic Airlocks',
  'Air Filtration & Terminal HEPA Units',
  'Cleanroom SS 304 Furniture & Accessories',
];

const ISO_ACPH_PRESETS: Record<string, { label: string; acph: number; desc: string }> = {
  iso5: { label: 'ISO Class 5 (Grade A / Class 100)', acph: 60, desc: 'Critical sterile filling / unidirectional flow' },
  iso6: { label: 'ISO Class 6 (Grade B / Class 1,000)', acph: 45, desc: 'Aseptic prep & background room' },
  iso7: { label: 'ISO Class 7 (Grade C / Class 10,000)', acph: 25, desc: 'OSD tableting, compounding, diagnostic suite' },
  iso8: { label: 'ISO Class 8 (Grade D / Class 100,000)', acph: 15, desc: 'Packaging, washrooms, primary staging' },
};

export const RFQPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedDiv = searchParams.get('division');
  const preselectedProd = searchParams.get('product');

  // Dimension Estimator State
  const [unit, setUnit] = useState<'meters' | 'feet'>('meters');
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(8);
  const [height, setHeight] = useState<number>(3);
  const [targetIso, setTargetIso] = useState<string>('iso7');

  // Form State
  const [companyName, setCompanyName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [message, setMessage] = useState<string>(
    preselectedProd ? `Inquiring regarding product model: ${preselectedProd}. Please provide drawing and quote.` : ''
  );
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(
    preselectedDiv ? [preselectedDiv] : ['Modular Cleanroom Panels & Partitions', 'HVAC & Air Handling Unit (AHU) Systems']
  );

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // CFM Estimation Logic
  // Length x Width x Height in meters -> cu.ft = (L * 3.28084) * (W * 3.28084) * (H * 3.28084)
  const volumeCuFt =
    unit === 'meters'
      ? (length * 3.28084) * (width * 3.28084) * (height * 3.28084)
      : length * width * height;

  const acph = ISO_ACPH_PRESETS[targetIso]?.acph || 25;
  const estimatedCfm = Math.round((volumeCuFt * acph) / 60);

  const handleToggleDivision = (div: string) => {
    if (selectedDivisions.includes(div)) {
      setSelectedDivisions(selectedDivisions.filter((d) => d !== div));
    } else {
      setSelectedDivisions([...selectedDivisions, div]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!phone || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number for engineering consultation.');
      return;
    }

    setSubmitting(true);
    try {
      const roomDimFormatted = `${length} × ${width} × ${height} ${unit}`;
      await ApiService.submitLead({
        companyName,
        contactName,
        email,
        phone,
        location,
        divisions: selectedDivisions,
        roomDimensions: roomDimFormatted,
        cfm: estimatedCfm,
        message: message || 'Cleanroom RFQ estimation requested through online portal.',
        source: 'rfq_form',
      });
      setSuccess(true);
    } catch (err: any) {
      console.error('Lead submission failed:', err);
      // If backend is offline or network fails, provide friendly validation message
      setErrorMsg(
        err?.response?.data?.message ||
        'Unable to reach submission server at this moment. You can also contact our engineering desk directly at +91-9818818818 or info@gmpvision.in.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. Header Banner */}
      <section className="bg-white border-b border-brand-border pb-10 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <TelemetryBadge label="ONLINE RFQ & ESTIMATOR" variant="green" pulse />
            <span className="text-xs font-mono font-medium text-brand-navy">
              PROMPT 24-HOUR TECHNICAL ESTIMATE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight">
            Cleanroom Engineering & RFQ Portal
          </h1>

          <p className="text-base sm:text-lg text-brand-muted max-w-3xl leading-relaxed">
            Estimate airflow capacity (CFM), specify room dimensions, select your required turnkey divisions,
            and submit your project parameters directly to our senior HVAC engineering desk.
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Layout: CFM Estimator & RFQ Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Dimension & CFM Estimator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-card space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-primary" />
                  <h2 className="text-base font-display font-bold text-brand-navy">
                    Cleanroom Airflow & CFM Estimator
                  </h2>
                </div>
                {/* Unit Switcher */}
                <div className="flex items-center bg-brand-soft rounded-md p-1 border border-brand-border">
                  <button
                    type="button"
                    onClick={() => setUnit('meters')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      unit === 'meters'
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-navy'
                    }`}
                  >
                    Meters
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('feet')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded ${
                      unit === 'feet'
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'text-brand-muted hover:text-brand-navy'
                    }`}
                  >
                    Feet
                  </button>
                </div>
              </div>

              {/* Room Dimensions Inputs */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-brand-muted mb-1">
                    Length ({unit === 'meters' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-brand-soft/50 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-brand-muted mb-1">
                    Width ({unit === 'meters' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-brand-soft/50 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-medium text-brand-muted mb-1">
                    Height ({unit === 'meters' ? 'm' : 'ft'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm font-mono bg-brand-soft/50 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Target ISO Classification */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-medium text-brand-navy">
                  Target Cleanliness Standard & ACPH:
                </label>
                <div className="space-y-2">
                  {Object.entries(ISO_ACPH_PRESETS).map(([key, data]) => (
                    <label
                      key={key}
                      className={`flex items-start p-3 rounded-lg border text-xs cursor-pointer transition-colors ${
                        targetIso === key
                          ? 'border-brand-primary bg-brand-soft'
                          : 'border-brand-border hover:bg-brand-soft/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="isoPreset"
                        value={key}
                        checked={targetIso === key}
                        onChange={() => setTargetIso(key)}
                        className="mt-0.5 text-brand-primary focus:ring-brand-primary"
                      />
                      <div className="ml-3">
                        <span className="font-bold text-brand-navy block">{data.label}</span>
                        <span className="text-brand-muted text-[11px] block">{data.desc}</span>
                        <span className="text-brand-primary font-mono text-[10px] font-bold">
                          Design ACPH: {data.acph} Air Changes / Hr
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result Box */}
              <div className="bg-brand-navy text-white p-5 rounded-xl space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-green font-bold block">
                  ● CALCULATED AIR HANDLING DEMAND
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-white/70">Estimated CFM:</span>
                  <span className="text-3xl font-mono font-extrabold text-white">
                    {estimatedCfm.toLocaleString()} <span className="text-sm font-normal text-brand-green">CFM</span>
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/80">
                  <span>Room Volume:</span>
                  <span>{Math.round(volumeCuFt).toLocaleString()} cu.ft</span>
                </div>
                <p className="text-[11px] text-white/60 leading-snug">
                  *Preliminary engineering guidance based on standard thermal balance. Exact AHU tonnage and static pressure will be finalized after heat-load analysis.
                </p>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-card space-y-4">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider font-mono">
                Direct Engineering Desk
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-navy block">Telephone Hotline:</span>
                    <a href="tel:+919818818818" className="text-brand-primary hover:underline font-mono">
                      +91-9818818818
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-navy block">Official RFQ Mail:</span>
                    <a href="mailto:info@gmpvision.in" className="text-brand-primary hover:underline font-mono">
                      info@gmpvision.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-navy block">Corporate & Works:</span>
                    <p className="text-brand-muted leading-relaxed">
                      GMP Vision Cleanroom Systems, Delhi NCR & Baddi Works, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Submission Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl border border-brand-border shadow-card space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-brand-navy">
                  Submit Project Specifications
                </h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-1">
                  Complete the form below. Our engineering proposals include layout sketches, bill of quantities, and compliance schedules.
                </p>
              </div>

              {success ? (
                <div className="p-8 bg-brand-soft rounded-xl border border-brand-green/40 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
                  <h3 className="text-xl font-bold text-brand-navy">
                    RFQ Received Successfully!
                  </h3>
                  <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                    Thank you. Your project dimensions and division requirements have been routed to our senior cleanroom applications engineer. A formal preliminary estimate will be shared shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-brand-primary text-white text-xs font-semibold"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Divisions Selection */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono font-bold text-brand-navy uppercase">
                      Select Required Turnkey Divisions:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DIVISION_OPTIONS.map((div) => (
                        <label
                          key={div}
                          className={`flex items-center p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            selectedDivisions.includes(div)
                              ? 'border-brand-primary bg-brand-soft font-medium text-brand-navy'
                              : 'border-brand-border text-brand-muted hover:bg-brand-soft/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedDivisions.includes(div)}
                            onChange={() => handleToggleDivision(div)}
                            className="rounded text-brand-primary focus:ring-brand-primary mr-2.5"
                          />
                          <span className="truncate">{div}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Medico Life Sciences Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                        Contact Person Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Dr. Rajesh Sharma"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="engineering@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-brand-navy mb-1">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                        Project Site Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Baddi Industrial Area, Himachal Pradesh"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy"
                      />
                    </div>
                  </div>

                  {/* Project Details Message */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-brand-navy mb-1">
                      Project Scope & Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your cleanroom application (e.g., sterile injectable vs solid oral dosage), target temperature/humidity tolerances, or specific equipment required..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-brand-soft/40 border border-brand-border rounded-md focus:outline-none focus:border-brand-primary focus:bg-white text-brand-navy leading-relaxed"
                    />
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primaryHover disabled:opacity-60 text-white p-3.5 rounded-md font-semibold text-sm shadow-hud transition-all"
                  >
                    {submitting ? (
                      <span>Submitting Project Specifications...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Transmit Cleanroom RFQ to Engineering Desk
                      </>
                    )}
                  </button>

                  <p className="text-[11px] font-mono text-center text-brand-muted">
                    🔒 Submissions are protected by NDA. Technical data is stored strictly for engineering calculations.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
