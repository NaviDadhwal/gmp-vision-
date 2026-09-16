import React, { useState, useEffect } from 'react';
import { Phone, ArrowUp, MessageCircle } from 'lucide-react';
import { initiateWhatsAppInquiry } from '../../lib/whatsapp';
import { SITE_SETTINGS } from '../../data/settings';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleWhatsApp = () => {
    initiateWhatsAppInquiry({ topic: 'Floating WhatsApp Button' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Direct Call Button */}
      <a
        href={`tel:${SITE_SETTINGS.contact.primaryPhone}`}
        className="mobile-call-btn"
        aria-label="Direct Call Support"
      >
        <Phone size={24} />
      </a>

      {/* Floating Action Container (WhatsApp & Scroll to Top) */}
      <div className="floating-actions-container">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#0A3B85',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(10, 59, 133, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.2s',
            }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        <button
          onClick={handleWhatsApp}
          className="whatsapp-float-btn"
          aria-label="Chat on WhatsApp with Lead Attribution"
          title="Chat with GMP VISION Technical Team"
        >
          <MessageCircle size={32} />
        </button>
      </div>
    </>
  );
};
