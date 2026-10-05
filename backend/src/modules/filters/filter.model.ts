import { Schema, model, Document } from 'mongoose';

export type FilterCategory =
  | 'pre-filter'
  | 'fine-filter'
  | 'pocket-bag'
  | 'gel-seal-hepa'
  | 'standard-hepa'
  | 'high-flow-hepa'
  | 'semi-hepa'
  | 'wire-mesh';

export interface IFilter extends Document {
  category: FilterCategory;
  name: string;
  micronRating: string;
  mediaConstruction: string;
  frame: string;
  applications: string[];
  keyFeature: string;
  images: string[];
  specSheetUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const FilterSchema = new Schema<IFilter>(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'pre-filter',
        'fine-filter',
        'pocket-bag',
        'gel-seal-hepa',
        'standard-hepa',
        'high-flow-hepa',
        'semi-hepa',
        'wire-mesh',
      ],
      index: true,
    },
    name: { type: String, required: true, trim: true },
    micronRating: { type: String, required: true },
    mediaConstruction: { type: String, default: '' },
    frame: { type: String, default: '' },
    applications: { type: [String], default: [] },
    keyFeature: { type: String, default: '' },
    images: { type: [String], default: [] },
    specSheetUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

FilterSchema.index({ category: 1, isActive: 1, order: 1 });

export const FilterModel = model<IFilter>('Filter', FilterSchema);
