import { useState, useEffect, useCallback } from 'react';

export interface IRFQFormData {
  // Step 1: Contact
  companyName: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
  // Step 2: Divisions Needed
  divisions: string[];
  // Step 3: Technical Parameters
  roomDimensions: string;
  cfm: string;
  targetRH: string;
  isoClass: string;
  targetDate: string;
  // Step 4: Notes
  message: string;
}

const STORAGE_KEY = 'gmp_rfq_draft_v1';
const TTL_HOURS = 24;

export const INITIAL_RFQ_DATA: IRFQFormData = {
  companyName: '',
  contactName: '',
  designation: '',
  email: '',
  phone: '',
  location: '',
  divisions: [],
  roomDimensions: '',
  cfm: '',
  targetRH: '',
  isoClass: '',
  targetDate: '',
  message: '',
};

export const useRFQPersistence = () => {
  const [formData, setFormData] = useState<IRFQFormData>(INITIAL_RFQ_DATA);
  const [step, setStep] = useState<number>(1);
  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(false);

  // Restore on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedAt = parsed.savedAt || 0;
        const ageHours = (Date.now() - savedAt) / (1000 * 60 * 60);

        if (ageHours < TTL_HOURS && parsed.formData) {
          setFormData(parsed.formData);
          setStep(parsed.step || 1);
          setHasRestoredDraft(true);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.debug('Failed to restore RFQ draft', e);
    }
  }, []);

  // Save changes
  useEffect(() => {
    const hasData = Object.values(formData).some((v) =>
      Array.isArray(v) ? v.length > 0 : Boolean(v)
    );

    if (hasData) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            step,
            formData,
            savedAt: Date.now(),
          })
        );
      } catch (e) {
        console.debug('Failed to save RFQ draft to sessionStorage', e);
      }
    }
  }, [formData, step]);

  const updateField = useCallback(
    (field: keyof IRFQFormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleDivision = useCallback((divisionTitle: string) => {
    setFormData((prev) => {
      const exists = prev.divisions.includes(divisionTitle);
      return {
        ...prev,
        divisions: exists
          ? prev.divisions.filter((d) => d !== divisionTitle)
          : [...prev.divisions, divisionTitle],
      };
    });
  }, []);

  const clearDraft = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setFormData(INITIAL_RFQ_DATA);
    setStep(1);
    setHasRestoredDraft(false);
  }, []);

  return {
    formData,
    step,
    setStep,
    updateField,
    toggleDivision,
    clearDraft,
    hasRestoredDraft,
    setHasRestoredDraft,
  };
};
