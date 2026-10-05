import { Schema, model, Document, Types } from 'mongoose';

export interface ISpecification {
  key: string;
  value: string;
}

export interface IProduct extends Document {
  divisionId: Types.ObjectId;
  category: string;
  subcategory?: string;
  name: string;
  slug: string;
  description: string;
  specifications: ISpecification[];
  images: string[];
  tags: string[];
  isFeatured: boolean;
  brochureUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductSchema = new Schema<IProduct>(
  {
    divisionId: {
      type: Schema.Types.ObjectId,
      ref: 'Division',
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    subcategory: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    brochureUrl: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ divisionId: 1, isActive: 1, order: 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export const ProductModel = model<IProduct>('Product', ProductSchema);
