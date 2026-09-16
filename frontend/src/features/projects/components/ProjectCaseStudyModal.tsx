import React from 'react';
import { Modal } from '../../../components/ui/Modal';
import { IProjectItem } from '../../../data/projects';
import { MapPin, Calendar, CheckCircle2, Quote } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { initiateWhatsAppInquiry } from '../../../lib/whatsapp';
import { getClientLogo } from '../../../components/common/ClientLogos';

interface ProjectCaseStudyModalProps {
  project: IProjectItem | null;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const handleInquire = () => {
    initiateWhatsAppInquiry({
      topic: `Reference Project: ${project.clientName} (${project.scope})`,
    });
  };

  return (
    <Modal isOpen={Boolean(project)} onClose={onClose} title="Project Reference Case Study" maxWidth="800px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <img
          src={project.image}
          alt={project.clientName}
          style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '8px' }}
        />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3DAE2B', fontWeight: 700 }}>
                {project.sector} Plant Installation
              </span>
              <h3 style={{ color: '#051C42', fontSize: '1.4rem', margin: '0.2rem 0 0' }}>
                {project.clientName}
              </h3>
            </div>
            <div style={{ backgroundColor: '#F8FAFC', padding: '6px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center' }}>
              {getClientLogo(project.clientName, 32)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', color: '#64748B', fontSize: '0.88rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={16} color="#0A3B85" />
              <span>{project.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Calendar size={16} color="#0A3B85" />
              <span>Commissioned: {project.completionYear}</span>
            </div>
          </div>

          <div style={{ padding: '0.85rem 1rem', backgroundColor: '#F4F7FB', borderRadius: '6px', borderLeft: '4px solid #0A3B85', marginBottom: '1rem' }}>
            <strong style={{ display: 'block', color: '#051C42', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Scope of Work:</strong>
            <span style={{ color: '#334155', fontSize: '0.92rem' }}>{project.scope}</span>
          </div>

          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, margin: '0 0 1.25rem' }}>
            {project.description}
          </p>

          <h4 style={{ fontSize: '1rem', color: '#051C42', marginBottom: '0.6rem' }}>Equipment & Systems Supplied:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {project.equipmentSupplied.map((eq, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', color: '#334155' }}>
                <CheckCircle2 size={16} color="#3DAE2B" />
                <span>{eq}</span>
              </div>
            ))}
          </div>

          {project.testimonial && (
            <div
              style={{
                backgroundColor: 'rgba(61, 174, 43, 0.08)',
                border: '1px solid rgba(61, 174, 43, 0.25)',
                borderRadius: '8px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Quote size={28} color="#3DAE2B" style={{ flexShrink: 0 }} />
                <div>
                  <p style={{ fontStyle: 'italic', color: '#051C42', fontSize: '0.92rem', margin: '0 0 0.5rem', lineHeight: 1.5 }}>
                    "{project.testimonial.quote}"
                  </p>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#257518' }}>
                    {project.testimonial.author} — {project.testimonial.designation}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={handleInquire}>Inquire for Similar Project</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
