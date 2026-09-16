import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Save,
  Tag,
  Star,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';
import { PRODUCTS_DATA, IProductItem } from '../../../data/products';
import { SortableList } from '../components/SortableList';
import { GalleryManager, GalleryItem } from '../components/GalleryManager';
import { TiptapEditor } from '../components/TiptapEditor';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';

export const ProductsAdminPage: React.FC = () => {
  const [productsList, setProductsList] = useState<IProductItem[]>(() => {
    try {
      const cached = localStorage.getItem('gmp_mock_products');
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS_DATA;
  });

  const [editingProduct, setEditingProduct] = useState<IProductItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([]);
  const [tagsInput, setTagsInput] = useState('');

  const saveProductsToStorage = (updated: IProductItem[]) => {
    setProductsList(updated);
    localStorage.setItem('gmp_mock_products', JSON.stringify(updated));
  };

  const handleOpenEdit = (prod: IProductItem) => {
    setIsNew(false);
    setEditingProduct({ ...prod });
    setSpecs(prod.specifications || []);
    setTagsInput((prod.tags || []).join(', '));
    setGalleryImages(
      prod.images.map((url, idx) => ({
        id: `img_${idx}`,
        url,
        caption: prod.name,
        isCover: idx === 0,
      }))
    );
  };

  const handleOpenCreate = () => {
    setIsNew(true);
    const newProd: IProductItem = {
      id: `prod-${Date.now()}`,
      divisionSlug: 'hvac-air-handling',
      category: 'Air Handling Units',
      name: '',
      slug: '',
      tagline: '',
      description: '<p>Engineered to cGMP cleanroom specifications...</p>',
      specifications: [
        { key: 'Capacity', value: 'Custom engineered' },
        { key: 'Material', value: 'GI / SS 304' },
      ],
      images: [
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      ],
      isFeatured: false,
      tags: ['Cleanroom', 'cGMP'],
    };
    setEditingProduct(newProd);
    setSpecs(newProd.specifications);
    setTagsInput(newProd.tags.join(', '));
    setGalleryImages([
      { id: 'img_0', url: newProd.images[0], caption: 'Product Spec', isCover: true },
    ]);
  };

  const handleAddSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleUpdateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const finalImages = galleryImages.map((g) => g.url);
    const finalTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const generatedSlug =
      editingProduct.slug ||
      editingProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const finalized: IProductItem = {
      ...editingProduct,
      slug: generatedSlug,
      specifications: specs.filter((s) => s.key.trim() || s.value.trim()),
      images: finalImages.length > 0 ? finalImages : editingProduct.images,
      tags: finalTags,
    };

    let updated: IProductItem[];
    if (isNew) {
      updated = [finalized, ...productsList];
    } else {
      updated = productsList.map((p) => (p.id === finalized.id ? finalized : p));
    }

    saveProductsToStorage(updated);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this turnkey product?')) return;
    const updated = productsList.filter((p) => p.id !== id);
    saveProductsToStorage(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div className="admin-page-banner">
        <div>
          <h1 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)', fontWeight: 800, color: 'var(--color-navy, #051C42)', margin: 0 }}>
            Turnkey Cleanroom & HVAC Equipment Catalog
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: '0.25rem 0 0 0' }}>
            Manage technical equipment, modular panels, water systems, and validation services with dynamic specification grids.
          </p>
        </div>

        <div className="admin-page-actions">
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} /> Add Equipment Item
          </Button>
        </div>
      </div>

      {/* Reorder Header */}
      <div className="admin-instruction-bar">
        <span>
          💡 <strong>Drag handle on left</strong> to arrange display priority across the turnkey product catalog.
        </span>
        <Badge variant="primary">{productsList.length} Catalog Items</Badge>
      </div>

      {/* Sortable Product List */}
      <SortableList
        items={productsList}
        onReorder={(reordered) => saveProductsToStorage(reordered)}
        renderItem={(item) => (
          <div className="admin-item-row">
            {/* Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0, width: '100%' }}>
              <img
                src={item.images[0]}
                alt={item.name}
                style={{ width: '60px', height: '45px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-navy, #051C42)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {item.name}
                  </div>
                  {item.isFeatured && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: '#FEF3C7', color: '#D97706', fontSize: '0.68rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                      <Star size={10} fill="#D97706" /> Featured
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#0A3B85', fontWeight: 600 }}>{item.tagline}</div>
                <div style={{ display: 'flex', gap: '12px', fontSize: '0.72rem', color: '#64748B', marginTop: '2px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#475569', fontWeight: 500 }}>Category: {item.category}</span>
                  <span>{item.specifications?.length || 0} Engineering Specs</span>
                </div>
              </div>
            </div>

            {/* Actions */}
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
                <Edit2 size={13} /> Edit Product
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
                aria-label="Delete product"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        )}
      />

      {/* Edit / Create Product Modal */}
      {editingProduct && (
        <Modal
          isOpen={Boolean(editingProduct)}
          onClose={() => setEditingProduct(null)}
          title={isNew ? 'New Turnkey Equipment Item' : `Edit: ${editingProduct.name}`}
          maxWidth="850px"
        >
          <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Grid 1: Name, Tagline */}
            <div className="admin-grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Equipment / Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="e.g. Custom Double Skin AHU"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Engineering Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  placeholder="e.g. Thermal-Break Extruded Aluminum Profiles"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Grid 2: Category, Division, Slug */}
            <div className="admin-grid-3">
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Category
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  placeholder="e.g. Air Handling Units"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Division Slug
                </label>
                <select
                  value={editingProduct.divisionSlug}
                  onChange={(e) => setEditingProduct({ ...editingProduct, divisionSlug: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value="hvac-air-handling">HVAC & Air Handling</option>
                  <option value="cleanroom-turnkey">Modular Cleanrooms</option>
                  <option value="purified-water-loops">Purified Water & WFI</option>
                  <option value="electrical-mep">Electrical & Automation</option>
                  <option value="automation-validation">Validation Services</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editingProduct.slug}
                  onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                  placeholder="auto-generated from name"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Description Editor */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                Technical Description (Rich Text & Sanitized)
              </label>
              <TiptapEditor
                content={editingProduct.description}
                onChange={(html) => setEditingProduct({ ...editingProduct, description: html })}
                placeholder="Airflow parameters, casing specs, fan ratings, and compliance..."
              />
            </div>

            {/* Dynamic Key-Value Specifications Builder */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-navy, #051C42)' }}>
                  Technical Specifications Table
                </label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSpecRow} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PlusCircle size={14} /> Add Parameter
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {specs.map((spec, index) => (
                  <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleUpdateSpec(index, 'key', e.target.value)}
                      placeholder="e.g. Airflow Capacity"
                      style={{ flex: '1 1 120px', minWidth: '100px', padding: '0.45rem', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleUpdateSpec(index, 'value', e.target.value)}
                      placeholder="e.g. 1,000 to 40,000 CFM"
                      style={{ flex: '2 1 150px', minWidth: '120px', padding: '0.45rem', fontSize: '0.82rem', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
                      title="Remove row"
                    >
                      <MinusCircle size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Manager */}
            <div>
              <GalleryManager images={galleryImages} onChange={(imgs) => setGalleryImages(imgs)} maxImages={6} />
            </div>

            {/* Tags & Featured */}
            <div className="admin-grid-2" style={{ alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>
                  Search Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. AHU, cGMP, HVAC, Plug Fan"
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="prodFeatured"
                  checked={editingProduct.isFeatured}
                  onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <label htmlFor="prodFeatured" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B', cursor: 'pointer' }}>
                  Feature in Hero Highlights
                </label>
              </div>
            </div>

            {/* Actions */}
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
              <Button type="button" variant="ghost" size="sm" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Save size={15} /> Save Turnkey Product
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
