import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().min(1).max(200),
  logoUrl: z.string().url('Valid logo image URL required'),
  sector: z.enum([
    'Pharmaceutical',
    'Biotechnology',
    'Healthcare',
    'Chemical',
    'Advanced Manufacturing',
  ]),
  website: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(true),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateClientSchema = createClientSchema.partial();
