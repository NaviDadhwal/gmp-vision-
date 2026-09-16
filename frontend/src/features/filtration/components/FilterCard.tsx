import React, { useState } from 'react';
import { IFilterProduct } from '../../../data/filters';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { initiateWhatsAppInquiry } from '../../../lib/whatsapp';

interface FilterCardProps {
  filter: IFilterProduct;
}

export const FilterCard: React.FC<FilterCardProps> = ({ filter }) => {
  const [showModal, setShowModal] = useState(false);

  const handleInquire = () => {
    initiateWhatsAppInquiry({
      topic: `Filter Inquiry: ${filter.name} (${filter.micronRating})`,
    });
  };

  return (
    <>
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ position: 'relative', height: '180px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
          <img
            src={filter.image}
            alt={filter.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
            <Badge variant="blue">{filter.category.replace('-', ' ')}</Badge>
          </div>
          <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
            <span
              style={{
                backgroundColor: '#051C42',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
              }}
            >
              {filter.micronRating}
            </span>
          </div>
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#051C42', marginBottom: '0.4rem' }}>
              {filter.name}
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#257518',
                backgroundColor: 'rgba(61, 174, 43, 0.08)',
                padding: '0.3rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.78rem',
                fontWeight: 600,
                marginBottom: '0.85rem',
              }}
            >
              <ShieldCheck size={14} />
              <span>{filter.keyFeature}</span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1rem' }}>
              {filter.mediaConstruction}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button variant="outline" size="sm" onClick={() => setShowModal(true)} style={{ flex: 1 }}>
              Tech Specs
            </Button>
            <Button variant="primary" size="sm" onClick={handleInquire} style={{ flex: 1 }}>
              Enquire
            </Button>
          </div>
        </div>
      </div>

      {/* Tech Specs Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={`Technical Specification — ${filter.name}`} maxWidth="680px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge variant="green">{filter.efficiency}</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#0A3B85', fontWeight: 700 }}>
              Class Rating: {filter.micronRating}
            </span>
          </div>

          <table className="spec-table">
            <tbody>
              <tr>
                <td style={{ fontWeight: 600, width: '35%' }}>Media Construction</td>
                <td>{filter.mediaConstruction}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Casing / Frame</td>
                <td>{filter.frame}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Filtration Efficiency</td>
                <td>{filter.efficiency}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Standard Dimensions</td>
                <td>{filter.dimensionsAvailable.join(', ')}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Recommended Applications</td>
                <td>{filter.applications.join(', ')}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <a
              href="/Broucher.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ gap: '0.4rem', fontSize: '0.85rem' }}
            >
              <FileText size={15} /> Download Full Spec Sheet (PDF)
            </a>
            <Button variant="primary" onClick={handleInquire}>
              Request Pricing Quote
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
