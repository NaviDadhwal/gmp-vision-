import React, { useState } from 'react';
import {
  Wind,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  FileText,
  Layers,
  Shield,
} from 'lucide-react';
import { FILTRATION_CATALOG, IFilterProduct, AIR_DISTRIBUTION_HARDWARE, IAirDistributionItem } from '../../../data/filters';
import { SortableList } from '../components/SortableList';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

export const FiltrationAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'filters' | 'hardware'>('filters');

  const [filtersList, setFiltersList] = useState<IFilterProduct[]>(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_filters');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return FILTRATION_CATALOG;
  });

  const [hardwareList, setHardwareList] = useState<IAirDistributionItem[]>(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_hardware');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return AIR_DISTRIBUTION_HARDWARE;
  });

  const [editingFilter, setEditingFilter] = useState<IFilterProduct | null>(null);
  const [isNewFilter, setIsNewFilter] = useState(false);
  const [appsInput, setAppsInput] = useState('');
  const [dimsInput, setDimsInput] = useState('');

  const saveFiltersToStorage = (updated: IFilterProduct[]) => {
    setFiltersList(updated);
    localStorage.setItem('gmp_mock_filters', JSON.stringify(updated));
  };

  const handleOpenEditFilter = (filter: IFilterProduct) => {
    setIsNewFilter(false);
    setEditingFilter({ ...filter });
    setAppsInput((filter.applications || []).join(', '));
    setDimsInput((filter.dimensionsAvailable || []).join(', '));
  };

  const handleOpenCreateFilter = () => {
    setIsNewFilter(true);
    const newFlt: IFilterProduct = {
      id: `flt-${Date.now()}`,
      category: 'gel-seal-hepa',
      name: '',
      micronRating: '0.3 Micron (0.3µ)',
      efficiency: '99.997% @ 0.3µ (H14 EN1822)',
      mediaConstruction: 'Water-repellent ultra-fine micro-fiber glass paper',
      frame: 'Anodized Extruded Aluminum with silicone gel channel',
      applications: ['Terminal cleanroom ceilings', 'LAF units', 'Bio-safety hoods'],
      keyFeature: 'Hermetic fluid knife-edge seal eliminates bypass leakage',
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
      specSheetUrl: '#',
      dimensionsAvailable: ['610 x 610 x 69 mm', '610 x 610 x 100 mm'],
    };
    setEditingFilter(newFlt);
    setAppsInput(newFlt.applications.join(', '));
    setDimsInput(newFlt.dimensionsAvailable.join(', '));
  };

  const handleSaveFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFilter) return;

    const finalized: IFilterProduct = {
      ...editingFilter,
      applications: appsInput
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),
      dimensionsAvailable: dimsInput
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
    };

    let updated: IFilterProduct[];
    if (isNewFilter) {
      updated = [finalized, ...filtersList];
    } else {
      updated = filtersList.map((f) => (f.id === finalized.id ? finalized : f));
    }

    saveFiltersToStorage(updated);
    setEditingFilter(null);
  };

  const handleDeleteFilter = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this air filter?')) return;
    const updated = filtersList.filter((f) => f.id !== id);
    saveFiltersToStorage(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Cleanroom Filtration & Air Distribution Catalog
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            EN 779 & EN 1822 compliant filtration media, terminal housings, pass boxes, and air showers.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreateFilter}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Air Filter Specification
        </Button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #E2E8F0' }}>
        <button
          type="button"
          onClick={() => setActiveTab('filters')}
          style={{
            padding: '0.65rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderBottom: activeTab === 'filters' ? '3px solid #0A3B85' : '3px solid transparent',
            color: activeTab === 'filters' ? '#0A3B85' : '#64748B',
          }}
        >
          Primary & HEPA Filters ({filtersList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hardware')}
          style={{
            padding: '0.65rem 1.25rem',
            fontWeight: 700,
            fontSize: '0.85rem',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            borderBottom: activeTab === 'hardware' ? '3px solid #0A3B85' : '3px solid transparent',
            color: activeTab === 'hardware' ? '#0A3B85' : '#64748B',
          }}
        >
          Air Distribution Hardware ({hardwareList.length})
        </button>
      </div>

      {activeTab === 'filters' && (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              fontSize: '0.8rem',
              color: '#475569',
            }}
          >
            <span>
              💡 <strong>Drag handle on left</strong> to arrange display order on the public Filtration Catalog page.
            </span>
            <Badge variant="success">EN 1822 / EN 779 Certified</Badge>
          </div>

          <SortableList
            items={filtersList}
            onReorder={(reordered) => saveFiltersToStorage(reordered)}
            renderItem={(filter) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                  <img
                    src={filter.image}
                    alt={filter.name}
                    style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-navy, #051C42)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {filter.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#0A3B85', fontWeight: 600 }}>
                      Rating: {filter.micronRating} | Efficiency: {filter.efficiency}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '2px' }}>
                      Frame: {filter.frame}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEditFilter(filter)}
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
                    <Edit2 size={13} /> Edit Filter
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteFilter(filter.id)}
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
                    aria-label="Delete filter"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )}
          />
        </>
      )}

      {activeTab === 'hardware' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hardwareList.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                padding: '1rem',
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'center',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-navy, #051C42)' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '2px' }}>{item.description}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.72rem', background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', color: '#0A3B85', fontWeight: 600 }}>
                    Material: {item.material}
                  </span>
                </div>
              </div>
              <Badge variant="primary">{item.type.replace('-', ' ').toUpperCase()}</Badge>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Filter Modal */}
      {editingFilter && (
        <Modal
          isOpen={Boolean(editingFilter)}
          onClose={() => setEditingFilter(null)}
          title={isNewFilter ? 'Add Air Filter Specification' : `Edit: ${editingFilter.name}`}
          maxWidth="750px"
        >
          <form onSubmit={handleSaveFilter} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Filter Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingFilter.name}
                  onChange={(e) => setEditingFilter({ ...editingFilter, name: e.target.value })}
                  placeholder="e.g. Gel-Seal Mini-Pleat HEPA Filter"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Filtration Category
                </label>
                <select
                  value={editingFilter.category}
                  onChange={(e) => setEditingFilter({ ...editingFilter, category: e.target.value as any })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="pre-filter">Pre-Filter (10µ)</option>
                  <option value="fine-filter">Fine Filter (1µ-5µ)</option>
                  <option value="pocket-bag">Pocket Bag Filter</option>
                  <option value="gel-seal-hepa">Gel-Seal HEPA (H14)</option>
                  <option value="standard-hepa">Standard Deep Pleat HEPA</option>
                  <option value="high-flow-hepa">High Flow V-Bank HEPA</option>
                  <option value="semi-hepa">Semi-HEPA (EU9/10)</option>
                  <option value="wire-mesh">Wire Mesh Moisture Separator</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Micron Rating *
                </label>
                <input
                  type="text"
                  required
                  value={editingFilter.micronRating}
                  onChange={(e) => setEditingFilter({ ...editingFilter, micronRating: e.target.value })}
                  placeholder="e.g. 0.3 Micron (0.3µ)"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Efficiency Rating *
                </label>
                <input
                  type="text"
                  required
                  value={editingFilter.efficiency}
                  onChange={(e) => setEditingFilter({ ...editingFilter, efficiency: e.target.value })}
                  placeholder="e.g. 99.997% @ 0.3µ (H14 EN1822)"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Media Construction & Frame
              </label>
              <input
                type="text"
                required
                value={editingFilter.mediaConstruction}
                onChange={(e) => setEditingFilter({ ...editingFilter, mediaConstruction: e.target.value })}
                placeholder="Micro-glass pleated media with polyurethane seal"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', marginBottom: '6px' }}
              />
              <input
                type="text"
                required
                value={editingFilter.frame}
                onChange={(e) => setEditingFilter({ ...editingFilter, frame: e.target.value })}
                placeholder="Frame material: Anodized Extruded Aluminum"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Standard Dimensions Available (comma-separated)
              </label>
              <input
                type="text"
                value={dimsInput}
                onChange={(e) => setDimsInput(e.target.value)}
                placeholder="610 x 610 x 69 mm, 610 x 305 x 69 mm"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Applications (comma-separated)
              </label>
              <input
                type="text"
                value={appsInput}
                onChange={(e) => setAppsInput(e.target.value)}
                placeholder="Terminal cleanroom ceiling, LAF hoods, Pharma formulation"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Image URL
              </label>
              <input
                type="url"
                required
                value={editingFilter.image}
                onChange={(e) => setEditingFilter({ ...editingFilter, image: e.target.value })}
                placeholder="https://..."
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid #E2E8F0',
              }}
            >
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingFilter(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={15} /> Save Filter Specification
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
