import { z } from 'zod';

export const createDivisionSchema = z.object({
  number: z.number().int().min(1).max(7),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  tagline: z.string().min(1).max(300),
  description: z.string().default(''),
  heroImage: z.string().default(''),
  icon: z.string().default('Layers'),
  metaTitle: z.string().max(100).optional(),
  metaDescription: z.string().max(300).optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateDivisionSchema = createDivisionSchema.partial();
