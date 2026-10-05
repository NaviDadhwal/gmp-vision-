import { Schema, model, Document } from 'mongoose';

export type ClientSector =
  | 'Pharmaceutical'
  | 'Biotechnology'
  | 'Healthcare'
  | 'Chemical'
  | 'Advanced Manufacturing';

export interface IClient extends Document {
  name: string;
  logoUrl: string;
  sector: ClientSector;
  website?: string;
  isFeatured: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true },
    sector: {
      type: String,
      required: true,
      enum: [
        'Pharmaceutical',
        'Biotechnology',
        'Healthcare',
        'Chemical',
        'Advanced Manufacturing',
      ],
      default: 'Pharmaceutical',
    },
    website: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

ClientSchema.index({ isActive: 1, order: 1 });

export const ClientModel = model<IClient>('Client', ClientSchema);
