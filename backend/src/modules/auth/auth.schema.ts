import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('A valid email address is required').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
