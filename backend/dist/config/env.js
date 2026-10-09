"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from backend root regardless of cwd
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    PORT: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform(Number).default(5000),
    MONGODB_URI: zod_1.z.string().min(1, 'MONGODB_URI is required').default('mongodb+srv://gmpvision69_db_user:mTIcQduOB8r4CC60@gmpvision.6uksgwp.mongodb.net/gmpvision'),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters').default('oXrOiH76CIQO2gR68dcp9BRW76rdQNcdIsZ4MxkZNG0'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters').default('FKFhwmxERdvOFVP6tt9IZ4jc8QlQ781ovcFCug4ej0w'),
    JWT_ACCESS_EXPIRES_IN: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
    CORS_ORIGINS: zod_1.z.string().default('http://localhost:5173,http://localhost:3000'),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().optional().default(''),
    CLOUDINARY_API_KEY: zod_1.z.string().optional().default(''),
    CLOUDINARY_API_SECRET: zod_1.z.string().optional().default(''),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).transform(Number).optional(),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASS: zod_1.z.string().optional(),
    EMAIL_FROM: zod_1.z.string().default('noreply@gmpvision.com'),
    ADMIN_NOTIFICATION_EMAIL: zod_1.z.string().email().default('gmpvision3@gmail.com'),
    SUPERADMIN_EMAIL: zod_1.z.string().email().default('admin@gmpvision.com'),
    SUPERADMIN_PASSWORD: zod_1.z.string().min(8).default('Admin@GMPVision2026!'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.warn('⚠️ [Config] Using fallback environment variables:', parsed.error.flatten().fieldErrors);
}
exports.env = parsed.success ? parsed.data : envSchema.parse({});
