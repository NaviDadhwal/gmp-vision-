import { env } from './env';

export interface WhatsAppContext {
  topic?: string;
  sourcePage?: string;
  clientName?: string;
}

export const initiateWhatsAppInquiry = (context: WhatsAppContext = {}) => {
  const number = env.VITE_WHATSAPP_NUMBER || '919817343117';
  const page = context.sourcePage || window.location.pathname;
  const topic = context.topic || 'Turnkey Cleanroom & MEP Contracting';

  const messageText = `Hello GMP VISION, I am inquiring about ${topic} via your website (${page}). Please share technical details.`;
  const encodedMessage = encodeURIComponent(messageText);

  // 1. Trigger background beacon
  const payload = JSON.stringify({
    companyName: context.clientName || 'Direct WhatsApp Visitor',
    contactName: 'WhatsApp Lead',
    phone: '+91-WHATSAPP',
    email: 'whatsapp-inquiry@placeholder.gmpvision.com',
    source: 'whatsapp',
    message: `WhatsApp direct conversation initiated from page: ${page}. Inquiring on: ${topic}`,
    projectType: [topic],
    referrerUrl: window.location.href,
  });

  const apiUrl = `${env.VITE_API_BASE_URL}/api/v1/leads`;

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon(apiUrl, blob);
    } else {
      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Standalone fallback: save to localStorage for demo CMS
      });
    }
  } catch (err) {
    console.debug('Beacon dispatch in standalone mode');
  }

  // Also record to mock storage so the admin leads table immediately reflects WhatsApp leads
  try {
    const existing = JSON.parse(localStorage.getItem('gmp_mock_leads') || '[]');
    const newLead = {
      _id: 'wa_' + Date.now(),
      companyName: context.clientName || 'Direct WhatsApp Visitor',
      contactName: 'WhatsApp Visitor',
      phone: '+91-WHATSAPP',
      email: 'whatsapp-lead@gmpvision.com',
      source: 'whatsapp',
      status: 'new',
      message: `User clicked WhatsApp CTA on: ${page} (Topic: ${topic})`,
      projectType: [topic],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('gmp_mock_leads', JSON.stringify([newLead, ...existing]));
  } catch (e) {
    // ignore storage error
  }

  // 2. Open WhatsApp in new tab
  window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
};
