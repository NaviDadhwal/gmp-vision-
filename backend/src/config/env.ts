import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend root regardless of cwd
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.union([z.string(), z.number()]).transform(Number).default(5000),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required').default('mongodb+srv://gmpvision69_db_user:mTIcQduOB8r4CC60@gmpvision.6uksgwp.mongodb.net/gmpvision'),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters').default('oXrOiH76CIQO2gR68dcp9BRW76rdQNcdIsZ4MxkZNG0'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters').default('FKFhwmxERdvOFVP6tt9IZ4jc8QlQ781ovcFCug4ej0w'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  CORS_ORIGINS: z.string().default('http://localhost:5173,http://localhost:3000'),
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(''),
  CLOUDINARY_API_KEY: z.string().optional().default(''),
  CLOUDINARY_API_SECRET: z.string().optional().default(''),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.union([z.string(), z.number()]).transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('noreply@gmpvision.com'),
  ADMIN_NOTIFICATION_EMAIL: z.string().email().default('gmpvision3@gmail.com'),
  SUPERADMIN_EMAIL: z.string().email().default('admin@gmpvision.com'),
  SUPERADMIN_PASSWORD: z.string().min(8).default('Admin@GMPVision2026!'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.warn('⚠️ [Config] Using fallback environment variables:', parsed.error.flatten().fieldErrors);
}

export const env = parsed.success ? parsed.data : envSchema.parse({});

