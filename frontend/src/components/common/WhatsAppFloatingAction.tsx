import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingAction: React.FC = () => {
  const whatsappNumber = '919817343117';
  const defaultText = encodeURIComponent(
    'Hello GMP VISION engineering team, I would like to request technical consultation regarding a turnkey cleanroom / HVAC project.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Consultation"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
      <MessageSquare className="w-5 h-5 fill-current" />
      <span className="font-semibold text-sm hidden sm:inline-block tracking-wide">
        WhatsApp Hotline
      </span>
    </a>
  );
};
