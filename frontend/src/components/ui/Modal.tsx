import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = '750px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(5, 28, 66, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog-box"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          width: '100%',
          maxWidth,
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 25px -5px rgba(5, 28, 66, 0.3)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="modal-header-box"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid #E2E8F0',
            backgroundColor: '#051C42',
            color: '#FFFFFF',
            gap: '0.75rem',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              color: '#FFFFFF',
              opacity: 0.8,
              padding: '0.35rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              flexShrink: 0,
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-box" style={{ padding: '1.25rem', overflowY: 'auto' }}>
          {children}
        </div>
      </div>

      <style>{`
        .modal-backdrop-container {
          padding: 1.5rem;
          box-sizing: border-box;
        }
        @media (max-width: 640px) {
          .modal-backdrop-container {
            padding: 0.5rem !important;
          }
          .modal-dialog-box {
            max-height: 96vh !important;
            max-height: calc(100dvh - 1rem) !important;
            border-radius: 8px !important;
          }
          .modal-header-box {
            padding: 0.75rem 1rem !important;
          }
          .modal-header-box h3 {
            font-size: 0.98rem !important;
          }
          .modal-body-box {
            padding: 1rem 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};
