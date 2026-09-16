import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Building2,
  MapPin,
  Calendar,
  Check,
  Star,
  ExternalLink,
} from 'lucide-react';
import { PROJECTS_DATA, IProjectItem } from '../../../data/projects';
import { SortableList } from '../components/SortableList';
import { GalleryManager, GalleryItem } from '../components/GalleryManager';
import { TiptapEditor } from '../components/TiptapEditor';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

export const ProjectsAdminPage: React.FC = () => {
  const [projectsList, setProjectsList] = useState<IProjectItem[]>(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_projects');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return PROJECTS_DATA;
  });

  const [editingProject, setEditingProject] = useState<IProjectItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [equipmentInput, setEquipmentInput] = useState('');

  // Persist to local storage
  const saveProjectsToStorage = (updated: IProjectItem[]) => {
    setProjectsList(updated);
    localStorage.setItem('gmp_mock_projects', JSON.stringify(updated));
  };

  const handleOpenEdit = (project: IProjectItem) => {
    setIsNew(false);
    setEditingProject({ ...project });
    setEquipmentInput(project.equipmentSupplied.join(', '));
    // Seed gallery
    setGalleryImages([
      { id: 'img_cov', url: project.image, caption: project.scope, isCover: true },
    ]);
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    const newProj: IProjectItem = {
      id: `proj-${Date.now()}`,
      clientName: '',
      scope: '',
      location: 'Baddi / Nalagarh, Himachal Pradesh',
      divisionSlug: ['cleanroom-turnkey', 'hvac-air-handling'],
      sector: 'Pharmaceutical',
      completionYear: new Date().getFullYear(),
      description: '<p>Engineering scope description...</p>',
      equipmentSupplied: ['Cleanroom Modular Panels', 'Double Skin AHU', 'Terminal HEPA Modules'],
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
      isFeatured: false,
    };
    setEditingProject(newProj);
    setEquipmentInput(newProj.equipmentSupplied.join(', '));
    setGalleryImages([
      { id: 'img_cov', url: newProj.image, caption: 'Facility Installation', isCover: true },
    ]);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const coverImg = galleryImages.find((g) => g.isCover)?.url || galleryImages[0]?.url || editingProject.image;
    const finalEquipment = equipmentInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const finalized: IProjectItem = {
      ...editingProject,
      image: coverImg,
      equipmentSupplied: finalEquipment,
    };

    let updated: IProjectItem[];
    if (isNew) {
      updated = [finalized, ...projectsList];
    } else {
      updated = projectsList.map((p) => (p.id === finalized.id ? finalized : p));
    }

    saveProjectsToStorage(updated);
    setEditingProject(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this case study project?')) return;
    const updated = projectsList.filter((p) => p.id !== id);
    saveProjectsToStorage(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="admin-page-banner">
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Turnkey Cleanroom Projects & Case Studies
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Curate pharmaceutical and industrial cleanroom installations. Reorder via drag-and-drop to adjust homepage priority.
          </p>
        </div>

        <div className="admin-page-actions">
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Add Cleanroom Project
          </Button>
        </div>
      </div>

      {/* Sortable List Instructions */}
      <div className="admin-instruction-bar">
        <span>
          💡 <strong>Drag handle on the left</strong> to change display sequence on the live website. Changes persist immediately.
        </span>
        <Badge variant="primary">{projectsList.length} Active Installations</Badge>
      </div>

      {/* Sortable Project Items */}
      <SortableList
        items={projectsList}
        onReorder={(reordered) => saveProjectsToStorage(reordered)}
        renderItem={(item) => (
          <div className="admin-item-row">
            {/* Project Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0, width: '100%' }}>
              <img
                src={item.image}
                alt={item.clientName}
                style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-navy, #051C42)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {item.clientName}
                  </div>
                  {item.isFeatured && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#FEF3C7', color: '#D97706', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                      <Star size={10} fill="#D97706" /> Featured
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#475569', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {item.scope}
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', color: '#64748B', marginTop: '2px', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={11} /> {item.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Calendar size={11} /> {item.completionYear}
                  </span>
                  <span style={{ color: '#0A3B85', fontWeight: 600 }}>{item.sector}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="admin-item-actions">
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  color: '#1E40AF',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Edit2 size={13} /> Edit Project
              </button>

              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                aria-label="Delete project"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      />

      {/* Edit / Create Project Modal */}
      {editingProject && (
        <Modal
          isOpen={Boolean(editingProject)}
          onClose={() => setEditingProject(null)}
          title={isNew ? 'Create Cleanroom Case Study' : `Edit: ${editingProject.clientName}`}
          maxWidth="820px"
        >
          <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Grid 1: Basic Info */}
            <div className="admin-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Client / Enterprise Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.clientName}
                  onChange={(e) => setEditingProject({ ...editingProject, clientName: e.target.value })}
                  placeholder="e.g. M/s Mankind Pharma Ltd"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Engineering Scope Summary *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.scope}
                  onChange={(e) => setEditingProject({ ...editingProject, scope: e.target.value })}
                  placeholder="e.g. Turnkey HVAC & Cleanroom Formulation Block"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Grid 2: Location, Sector, Year */}
            <div className="admin-grid-3">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Site Location *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  placeholder="e.g. Baddi, Himachal Pradesh"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Industry Sector
                </label>
                <select
                  value={editingProject.sector}
                  onChange={(e) => setEditingProject({ ...editingProject, sector: e.target.value as any })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Pharmaceutical">Pharmaceutical</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Completion Year
                </label>
                <input
                  type="number"
                  required
                  value={editingProject.completionYear}
                  onChange={(e) => setEditingProject({ ...editingProject, completionYear: parseInt(e.target.value) || 2024 })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Equipment Supplied */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Major Equipment Supplied (comma-separated tags)
              </label>
              <input
                type="text"
                value={equipmentInput}
                onChange={(e) => setEquipmentInput(e.target.value)}
                placeholder="e.g. Double Skin AHU, SMACNA GI Ductwork, H14 HEPA Grid, Air Showers"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            {/* Rich Text Editor for Description */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Engineering Case Study Description (Rich Text & Sanitized)
              </label>
              <TiptapEditor
                content={editingProject.description}
                onChange={(html) => setEditingProject({ ...editingProject, description: html })}
                placeholder="Detailed project summary, airflow schematics, and validation metrics..."
              />
            </div>

            {/* Gallery Manager */}
            <div>
              <GalleryManager
                images={galleryImages}
                onChange={(imgs) => setGalleryImages(imgs)}
                maxImages={8}
              />
            </div>

            {/* Featured Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
              <input
                type="checkbox"
                id="isFeatured"
                checked={editingProject.isFeatured}
                onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="isFeatured" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}>
                Feature on Homepage Case Studies Carousel
              </label>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                flexWrap: 'wrap',
                paddingTop: '1rem',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={15} /> Save Project Case Study
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
