import { z } from 'zod';

export const createFilterSchema = z.object({
  category: z.enum([
    'pre-filter',
    'fine-filter',
    'pocket-bag',
    'gel-seal-hepa',
    'standard-hepa',
    'high-flow-hepa',
    'semi-hepa',
    'wire-mesh',
  ]),
  name: z.string().min(1).max(200),
  micronRating: z.string().min(1).max(100),
  mediaConstruction: z.string().default(''),
  frame: z.string().default(''),
  applications: z.array(z.string()).default([]),
  keyFeature: z.string().default(''),
  images: z.array(z.string().url()).default([]),
  specSheetUrl: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateFilterSchema = createFilterSchema.partial();
