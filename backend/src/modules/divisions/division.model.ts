import { Schema, model, Document } from 'mongoose';

export interface IDivision extends Document {
  number: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  heroImage: string;
  icon: string;
  metaTitle?: string;
  metaDescription?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const DivisionSchema = new Schema<IDivision>(
  {
    number: { type: Number, required: true, min: 1, max: 7 },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    icon: { type: String, default: 'Layers' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

DivisionSchema.index({ isActive: 1, order: 1 });

export const DivisionModel = model<IDivision>('Division', DivisionSchema);
