import React from 'react';

export const WhatsAppFloatingAction: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        className="relative group flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
        href="https://wa.me/919817343117"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]" />
        </span>
        <span className="material-symbols-outlined text-[20px] font-bold">chat</span>
        <span className="font-display font-semibold text-xs tracking-wider uppercase">WhatsApp Engineer</span>
      </a>
    </div>
  );
};
