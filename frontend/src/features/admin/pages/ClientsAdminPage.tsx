import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Save,
  MapPin,
  Star,
} from 'lucide-react';
import { CLIENTS_DATA, IClientItem } from '../../../data/clients';
import { SortableList } from '../components/SortableList';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

export const ClientsAdminPage: React.FC = () => {
  const [clientsList, setClientsList] = useState<IClientItem[]>(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_clients');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return CLIENTS_DATA;
  });

  const [editingClient, setEditingClient] = useState<IClientItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  const saveClientsToStorage = (updated: IClientItem[]) => {
    setClientsList(updated);
    localStorage.setItem('gmp_mock_clients', JSON.stringify(updated));
  };

  const handleOpenEdit = (cli: IClientItem) => {
    setIsNew(false);
    setEditingClient({ ...cli });
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    const newCli: IClientItem = {
      id: `cli-${Date.now()}`,
      name: '',
      sector: 'Pharmaceutical',
      location: 'Baddi, HP',
      isFeatured: true,
      order: clientsList.length + 1,
    };
    setEditingClient(newCli);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    let updated: IClientItem[];
    if (isNew) {
      updated = [editingClient, ...clientsList];
    } else {
      updated = clientsList.map((c) => (c.id === editingClient.id ? editingClient : c));
    }

    saveClientsToStorage(updated);
    setEditingClient(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client partnership entry?')) return;
    const updated = clientsList.filter((c) => c.id !== id);
    saveClientsToStorage(updated);
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
            Client Partnerships & Verified References
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Curate pharmaceutical and biotech client references displayed on the homepage logo ticker and project pages.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleOpenCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={16} /> Add Client Reference
        </Button>
      </div>

      {/* Instructions */}
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
          💡 <strong>Drag handle on left</strong> to arrange display order on the client ticker.
        </span>
        <Badge variant="primary">{clientsList.length} Partner References</Badge>
      </div>

      {/* Sortable Client List */}
      <SortableList
        items={clientsList}
        onReorder={(reordered) => saveClientsToStorage(reordered)}
        renderItem={(item) => (
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
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(10, 59, 133, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A3B85',
                  flexShrink: 0,
                }}
              >
                <Building2 size={20} />
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-navy, #051C42)' }}>
                    {item.name}
                  </div>
                  {item.isFeatured && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#FEF3C7', color: '#D97706', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                      <Star size={10} fill="#D97706" /> Ticker
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <MapPin size={12} /> {item.location}
                  </span>
                  <span style={{ color: '#0A3B85', fontWeight: 600 }}>{item.sector}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
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
                <Edit2 size={13} /> Edit
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
                aria-label="Delete client"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      />

      {/* Edit / Create Client Modal */}
      {editingClient && (
        <Modal
          isOpen={Boolean(editingClient)}
          onClose={() => setEditingClient(null)}
          title={isNew ? 'Add Client Reference' : `Edit: ${editingClient.name}`}
          maxWidth="550px"
        >
          <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Company / Client Name *
              </label>
              <input
                type="text"
                required
                value={editingClient.name}
                onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                placeholder="e.g. M/s Windlas Biotech Ltd"
                style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Industry Sector
                </label>
                <select
                  value={editingClient.sector}
                  onChange={(e) => setEditingClient({ ...editingClient, sector: e.target.value as any })}
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
                  Manufacturing Facility Location *
                </label>
                <input
                  type="text"
                  required
                  value={editingClient.location}
                  onChange={(e) => setEditingClient({ ...editingClient, location: e.target.value })}
                  placeholder="e.g. Baddi, HP"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="isFeaturedCli"
                checked={editingClient.isFeatured}
                onChange={(e) => setEditingClient({ ...editingClient, isFeatured: e.target.checked })}
                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <label htmlFor="isFeaturedCli" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}>
                Display on Homepage Client Ticker Bar
              </label>
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
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingClient(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={15} /> Save Reference
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
