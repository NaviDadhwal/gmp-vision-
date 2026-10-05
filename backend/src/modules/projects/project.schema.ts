import { z } from 'zod';

export const createProjectSchema = z.object({
  clientName: z.string().min(1).max(200),
  scope: z.string().min(1).max(500),
  location: z.string().min(1).max(200),
  division: z.array(z.string()).default([]),
  completionYear: z.number().int().min(2000).max(2100),
  description: z.string().default(''),
  images: z.array(z.string().url()).default([]),
  isFeatured: z.boolean().default(false),
  testimonial: z
    .object({
      quote: z.string().default(''),
      author: z.string().default(''),
      designation: z.string().default(''),
    })
    .optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateProjectSchema = createProjectSchema.partial();
