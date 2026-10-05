import { Schema, model, Document } from 'mongoose';

export interface ITestimonial {
  quote: string;
  author: string;
  designation: string;
}

export interface IProject extends Document {
  clientName: string;
  scope: string;
  location: string;
  division: string[];
  completionYear: number;
  description: string;
  images: string[];
  isFeatured: boolean;
  testimonial?: ITestimonial;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema = new Schema<IProject>(
  {
    clientName: { type: String, required: true, trim: true },
    scope: { type: String, required: true },
    location: { type: String, required: true },
    division: { type: [String], default: [] },
    completionYear: { type: Number, required: true },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false, index: true },
    testimonial: {
      quote: { type: String, default: '' },
      author: { type: String, default: '' },
      designation: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

ProjectSchema.index({ isActive: 1, order: 1 });
ProjectSchema.index({ division: 1 });

export const ProjectModel = model<IProject>('Project', ProjectSchema);
