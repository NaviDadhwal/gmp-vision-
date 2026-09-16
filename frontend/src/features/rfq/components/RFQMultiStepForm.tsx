import React, { useState } from 'react';
import { useRFQPersistence } from '../hooks/useRFQPersistence';
import { DIVISIONS_DATA } from '../../../data/divisions';
import { CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, Send, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../../../lib/whatsapp';

export const RFQMultiStepForm: React.FC = () => {
  const {
    formData,
    step,
    setStep,
    updateField,
    toggleDivision,
    clearDraft,
    hasRestoredDraft,
    setHasRestoredDraft,
  } = useRFQPersistence();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState('');

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.contactName.trim()) newErrors.contactName = 'Contact person name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid corporate email is required';
    } else if (currentStep === 2) {
      if (formData.divisions.length === 0) newErrors.divisions = 'Please select at least one required turnkey division';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);

    const leadId = 'GMP-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedLeadId(leadId);

    // Record to mock leads in localStorage for standalone admin testing
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('gmp_mock_leads') || '[]');
        const newRecord = {
          _id: leadId,
          companyName: formData.companyName,
          contactName: formData.contactName,
          designation: formData.designation,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          divisions: formData.divisions,
          roomDimensions: formData.roomDimensions,
          cfm: formData.cfm ? Number(formData.cfm) : null,
          targetDate: formData.targetDate,
          message: formData.message || 'RFQ Estimator Submission',
          source: 'rfq_form',
          status: 'new',
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('gmp_mock_leads', JSON.stringify([newRecord, ...existing]));
      } catch (err) {
        console.debug('LocalStorage write skipped', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      clearDraft();
    }, 800);
  };

  const handleFollowupWhatsApp = () => {
    initiateWhatsAppInquiry({
      clientName: formData.companyName,
      topic: `RFQ Submission Reference #${submittedLeadId} (${formData.divisions.join(', ')})`,
    });
  };

  if (isSubmitted) {
    return (
      <div
        className="card-elevated"
        style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          maxWidth: '680px',
          margin: '0 auto',
          borderTop: '6px solid #3DAE2B',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(61, 174, 43, 0.15)',
            color: '#3DAE2B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <CheckCircle2 size={42} />
        </div>

        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0A3B85', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Inquiry Successfully Logged
        </span>
        <h2 style={{ fontSize: '1.85rem', margin: '0.4rem 0 1rem', color: '#051C42' }}>
          Thank You, {formData.contactName || 'Valued Client'}
        </h2>
        <p style={{ color: '#475569', fontSize: '0.98rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Your technical requirements for <strong>{formData.companyName}</strong> have been assigned Reference ID: <strong style={{ color: '#0A3B85' }}>#{submittedLeadId}</strong>. Our senior engineering team will review your specifications and prepare an initial proposal within 4 business hours.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '380px', margin: '0 auto' }}>
          <button
            onClick={handleFollowupWhatsApp}
            className="btn btn-primary"
            style={{ width: '100%', gap: '0.5rem' }}
          >
            <span>Follow-up Instantly on WhatsApp</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
            className="btn btn-outline"
            style={{ width: '100%' }}
          >
            Submit Another Project Requirement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card-elevated"
      style={{
        padding: '2rem',
        backgroundColor: '#FFFFFF',
        maxWidth: '850px',
        margin: '0 auto',
        borderTop: '5px solid #0A3B85',
      }}
    >
      {/* Restored Draft Alert Banner */}
      {hasRestoredDraft && (
        <div
          style={{
            backgroundColor: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#166534',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} color="#166534" />
            <span>Draft restored from your recent session (saved automatically).</span>
          </div>
          <button
            onClick={clearDraft}
            style={{
              color: '#DC2626',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Clear Form
          </button>
        </div>
      )}

      {/* Step Indicators */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '3px',
              backgroundColor: '#E2E8F0',
              zIndex: 1,
              transform: 'translateY(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              width: `${((step - 1) / 3) * 90}%`,
              height: '3px',
              backgroundColor: '#3DAE2B',
              zIndex: 1,
              transform: 'translateY(-50%)',
              transition: 'width 0.3s ease',
            }}
          />

          {[
            { num: 1, label: 'Contact Info' },
            { num: 2, label: 'Scope / Divisions' },
            { num: 3, label: 'Technical Specs' },
            { num: 4, label: 'Notes & Submit' },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: step >= s.num ? '#3DAE2B' : '#FFFFFF',
                  color: step >= s.num ? '#FFFFFF' : '#64748B',
                  border: step >= s.num ? '2px solid #3DAE2B' : '2px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  transition: 'all 0.3s ease',
                }}
              >
                {step > s.num ? <Check size={18} /> : s.num}
              </div>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: step === s.num ? 700 : 500,
                  color: step === s.num ? '#051C42' : '#64748B',
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit}>
        {/* STEP 1: Contact Information */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#051C42' }}>
              Step 1: Company & Procurement Contact
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Please provide your facility details so we can assign the relevant regional project director.
            </p>

            <div className="grid grid-cols-2 gap-4 md-grid-cols-1">
              <div className="form-group">
                <label className="form-label">Company / Facility Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Mankind Pharma / Windlas Biotech"
                  value={formData.companyName}
                  onChange={(e) => updateField('companyName', e.target.value)}
                  aria-invalid={Boolean(errors.companyName)}
                />
                {errors.companyName && <span className="form-error">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Contact Person Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  aria-invalid={Boolean(errors.contactName)}
                />
                {errors.contactName && <span className="form-error">{errors.contactName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Designation / Role</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. GM Engineering / Projects Head"
                  value={formData.designation}
                  onChange={(e) => updateField('designation', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Corporate Email Address *</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Direct Phone / Mobile *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="+91 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Project Plant Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Baddi, HP / Dehradun, UK / Pune, MH"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Project Scope & Divisions */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#051C42' }}>
              Step 2: Select Required Turnkey Divisions
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select all engineering scopes required for your plant. GMP VISION delivers single-source execution across all 7.
            </p>

            {errors.divisions && (
              <div style={{ color: '#DC2626', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} /> {errors.divisions}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              {DIVISIONS_DATA.map((div) => {
                const isSelected = formData.divisions.includes(div.title);
                return (
                  <div
                    key={div.id}
                    onClick={() => toggleDivision(div.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #3DAE2B' : '1px solid #E2E8F0',
                      backgroundColor: isSelected ? 'rgba(61, 174, 43, 0.06)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        border: isSelected ? 'none' : '2px solid #CBD5E1',
                        backgroundColor: isSelected ? '#3DAE2B' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && <Check size={16} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3DAE2B' }}>DIV 0{div.number}</span>
                        <h4 style={{ fontSize: '1rem', margin: 0, color: '#051C42', fontWeight: 600 }}>{div.title}</h4>
                      </div>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748B' }}>{div.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Technical Parameters */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#051C42' }}>
              Step 3: Technical Specifications & Parameters
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Optional preliminary dimensions and targets to help our design team calculate preliminary heat loads and CFM.
            </p>

            <div className="grid grid-cols-2 gap-4 md-grid-cols-1">
              <div className="form-group">
                <label className="form-label">Room Dimensions (L × W × H)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. 25m × 15m × 3m ceiling"
                  value={formData.roomDimensions}
                  onChange={(e) => updateField('roomDimensions', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Airflow / CFM (if known)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="e.g. 15000"
                  value={formData.cfm}
                  onChange={(e) => updateField('cfm', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Relative Humidity (% RH)</label>
                <select
                  className="form-select"
                  value={formData.targetRH}
                  onChange={(e) => updateField('targetRH', e.target.value)}
                >
                  <option value="">Select Range</option>
                  <option value="Ultra-Low (<20% to 25% RH - Desiccant Required)">Ultra-Low (&lt;20% to 25% RH - Desiccant Required)</option>
                  <option value="Controlled Low (30% to 40% RH)">Controlled Low (30% to 40% RH)</option>
                  <option value="Standard Cleanroom (45% to 55% RH)">Standard Cleanroom (45% to 55% RH)</option>
                  <option value="General Comfort (50% to 65% RH)">General Comfort (50% to 65% RH)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Cleanroom Classification Target</label>
                <select
                  className="form-select"
                  value={formData.isoClass}
                  onChange={(e) => updateField('isoClass', e.target.value)}
                >
                  <option value="">Select ISO / Cleanroom Class</option>
                  <option value="ISO Class 5 (Grade A / Class 100 - Sterile Filling)">ISO Class 5 (Grade A / Class 100 - Sterile Filling)</option>
                  <option value="ISO Class 7 (Grade B/C / Class 10,000)">ISO Class 7 (Grade B/C / Class 10,000)</option>
                  <option value="ISO Class 8 (Grade D / Class 100,000 - Solid Oral)">ISO Class 8 (Grade D / Class 100,000 - Solid Oral)</option>
                  <option value="CNC / Unclassified Controlled Area">CNC / Unclassified Controlled Area</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Target Project Handover Timeline</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Q4 2025 / Within 4 Months"
                  value={formData.targetDate}
                  onChange={(e) => updateField('targetDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Detailed Message & BOQ */}
        {step === 4 && (
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#051C42' }}>
              Step 4: Special Conditions & Submission
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Please share specific design criteria, equipment make preferences, or BOQ drawing references.
            </p>

            <div className="form-group">
              <label className="form-label">Project Scope Description / Special Requirements</label>
              <textarea
                className="form-textarea"
                rows={5}
                placeholder="Describe specific details, existing AHU equipment to be replaced, chiller capacity, cleanroom panel thickness (50/80/100mm), or utility hookups..."
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
              />
            </div>

            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <ShieldCheck size={24} color="#3DAE2B" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                <strong>Have engineering drawings or an AHU schedule?</strong> You can also email architectural layouts and equipment schedules directly to <a href="mailto:gmpvision3@gmail.com" style={{ color: '#0A3B85', fontWeight: 600 }}>gmpvision3@gmail.com</a>.
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #E2E8F0',
          }}
        >
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="btn btn-outline"
              style={{ gap: '0.4rem' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary"
              style={{ gap: '0.4rem' }}
            >
              Continue to Step {step + 1} <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg"
              style={{ gap: '0.5rem' }}
            >
              {isSubmitting ? (
                <span>Submitting Specifications...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Technical RFQ</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
