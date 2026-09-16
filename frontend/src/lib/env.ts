import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().default('http://localhost:5000'),
  VITE_SITE_URL: z.string().default('https://gmpvision.com'),
  VITE_WHATSAPP_NUMBER: z.string().default('919817343117'),
});

const parsed = envSchema.safeParse(import.meta.env);

export const env = parsed.success
  ? parsed.data
  : {
      VITE_API_BASE_URL: 'http://localhost:5000',
      VITE_SITE_URL: 'https://gmpvision.com',
      VITE_WHATSAPP_NUMBER: '919817343117',
    };
