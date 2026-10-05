import { z } from 'zod';

export const createAdminSchema = z.object({
  email: z.string().email('Valid email required').toLowerCase().trim(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['admin', 'superadmin']).default('admin'),
});

export const updateAdminSchema = z.object({
  role: z.enum(['admin', 'superadmin']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters long').optional(),
});
