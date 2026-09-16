import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Star, Plus, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  isCover?: boolean;
}

interface SortableGalleryCardProps {
  item: GalleryItem;
  onSetCover: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdateCaption: (id: string, caption: string) => void;
}

const SortableGalleryCard: React.FC<SortableGalleryCardProps> = ({
  item,
  onSetCover,
  onRemove,
  onUpdateCaption,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    position: 'relative',
    flex: '1 1 140px',
    maxWidth: '220px',
    minWidth: '130px',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: item.isCover ? '2px solid var(--color-green, #3DAE2B)' : '1px solid #E2E8F0',
    overflow: 'hidden',
    boxShadow: item.isCover ? '0 0 0 2px rgba(61, 174, 43, 0.15)' : 'none',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Cover Tag */}
      {item.isCover && (
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '6px',
            zIndex: 10,
            background: 'var(--color-green, #3DAE2B)',
            color: '#FFFFFF',
            fontSize: '0.68rem',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Star size={10} fill="#FFFFFF" /> Cover
        </div>
      )}

      {/* Drag handle & Delete */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          zIndex: 10,
          display: 'flex',
          gap: '4px',
        }}
      >
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Reorder image"
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '4px',
            cursor: 'grab',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GripVertical size={14} />
        </button>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label="Remove image"
          style={{
            background: 'rgba(239, 68, 68, 0.85)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Image Thumbnail */}
      <div style={{ height: '110px', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
        <img
          src={item.url}
          alt={item.caption || 'Gallery thumbnail'}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            // Fallback placeholder on image load error
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>

      {/* Content & Actions */}
      <div style={{ padding: '0.5rem' }}>
        <input
          type="text"
          value={item.caption || ''}
          placeholder="Caption/alt text..."
          onChange={(e) => onUpdateCaption(item.id, e.target.value)}
          style={{
            width: '100%',
            fontSize: '0.75rem',
            padding: '4px 6px',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            marginBottom: '6px',
          }}
        />
        {!item.isCover && (
          <button
            type="button"
            onClick={() => onSetCover(item.id)}
            style={{
              width: '100%',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '3px 0',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: 'var(--color-primary, #0A3B85)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Make Cover
          </button>
        )}
      </div>
    </div>
  );
};

interface GalleryManagerProps {
  images: GalleryItem[];
  onChange: (images: GalleryItem[]) => void;
  maxImages?: number;
}

export const GalleryManager: React.FC<GalleryManagerProps> = ({
  images,
  onChange,
  maxImages = 10,
}) => {
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((i) => i.id === active.id);
      const newIndex = images.findIndex((i) => i.id === over.id);
      onChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      url: newUrl.trim(),
      caption: newCaption.trim(),
      isCover: images.length === 0, // first image auto-cover
    };

    onChange([...images, newItem]);
    setNewUrl('');
    setNewCaption('');
  };

  const handleSetCover = (id: string) => {
    onChange(images.map((img) => ({ ...img, isCover: img.id === id })));
  };

  const handleRemove = (id: string) => {
    const remaining = images.filter((img) => img.id !== id);
    // If removed item was cover, assign cover to first remaining
    if (images.find((i) => i.id === id)?.isCover && remaining.length > 0) {
      remaining[0].isCover = true;
    }
    onChange(remaining);
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    onChange(images.map((img) => (img.id === id ? { ...img, caption } : img)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-navy, #051C42)' }}>
          Project Gallery & Visual Proof ({images.length}/{maxImages})
        </label>
        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
          Drag items to reorder. First item acts as cover.
        </span>
      </div>

      {/* Gallery Cards Container */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((i) => i.id)} strategy={horizontalListSortingStrategy}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              minHeight: '130px',
              padding: '0.75rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '8px',
              border: '1px dashed #CBD5E1',
            }}
          >
            {images.length === 0 ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2rem 1rem',
                  color: '#94A3B8',
                  gap: '0.5rem',
                }}
              >
                <ImageIcon size={32} strokeWidth={1.5} />
                <p style={{ margin: 0, fontSize: '0.85rem' }}>No gallery photos added yet.</p>
              </div>
            ) : (
              images.map((item) => (
                <SortableGalleryCard
                  key={item.id}
                  item={item}
                  onSetCover={handleSetCover}
                  onRemove={handleRemove}
                  onUpdateCaption={handleUpdateCaption}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add Image Form */}
      {images.length < maxImages && (
        <form
          onSubmit={handleAddImage}
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            backgroundColor: '#FFFFFF',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ flex: '2 1 200px', minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Image URL / CDN Path
            </label>
            <input
              type="url"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              required
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                fontSize: '0.82rem',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
              }}
            />
          </div>

          <div style={{ flex: '2 1 200px', minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Caption / Descriptive Alt
            </label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="e.g. Class 100 Laminar Flow Hood Installation"
              style={{
                width: '100%',
                padding: '0.45rem 0.65rem',
                fontSize: '0.82rem',
                borderRadius: '4px',
                border: '1px solid #CBD5E1',
              }}
            />
          </div>

          <Button type="submit" variant="outline" size="sm" style={{ height: '36px', minWidth: '100px' }}>
            <Plus size={16} /> Add Image
          </Button>
        </form>
      )}
    </div>
  );
};
