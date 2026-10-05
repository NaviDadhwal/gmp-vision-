import { z } from 'zod';

export const createProductSchema = z.object({
  divisionId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Division ID format'),
  category: z.string().min(1).max(100),
  subcategory: z.string().max(100).optional(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).toLowerCase().trim(),
  description: z.string().default(''),
  specifications: z
    .array(
      z.object({
        key: z.string().min(1),
        value: z.string().min(1),
      })
    )
    .default([]),
  images: z.array(z.string().url()).default([]),
  tags: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  brochureUrl: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

export const reorderSchema = z.object({
  items: z.array(
    z.object({
      id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid resource ID'),
      order: z.number().int(),
    })
  ),
});
