import { Schema, model, Document } from 'mongoose';

export type LeadSource = 'rfq_form' | 'contact_form' | 'whatsapp';
export type LeadStatus = 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';

export interface ILead extends Document {
  companyName: string;
  contactName: string;
  designation?: string;
  email: string;
  phone: string;
  location?: string;
  projectType: string[];
  message: string;
  divisions: string[];
  roomDimensions?: string;
  cfm?: number;
  targetDate?: string;
  source: LeadSource;
  status: LeadStatus;
  referrerUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const LeadSchema = new Schema<ILead>(
  {
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    designation: { type: String, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    projectType: { type: [String], default: ['General Turnkey Inquiry'] },
    message: { type: String, required: true },
    divisions: { type: [String], default: [] },
    roomDimensions: { type: String, default: '' },
    cfm: { type: Number, default: null },
    targetDate: { type: String, default: '' },
    source: {
      type: String,
      enum: ['rfq_form', 'contact_form', 'whatsapp'],
      default: 'rfq_form',
      index: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
      default: 'new',
      index: true,
    },
    referrerUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

LeadSchema.index({ status: 1, createdAt: -1 });
LeadSchema.index({ createdAt: -1 });

export const LeadModel = model<ILead>('Lead', LeadSchema);
