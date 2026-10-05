import { Schema, model, Document } from 'mongoose';

export interface ISetting extends Document {
  key: string;
  value: any;
  description: string;
  updatedAt: Date;
}

export const SettingSchema = new Schema<ISetting>(
  {
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

SettingSchema.index({ key: 1 }, { unique: true });

export const SettingModel = model<ISetting>('Setting', SettingSchema);
