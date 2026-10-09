import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';

import { authRouter } from './modules/auth/auth.routes';
import { adminRouter } from './modules/admins/admin.routes';
import { divisionRouter } from './modules/divisions/division.routes';
import { productRouter } from './modules/products/product.routes';
import { filterRouter } from './modules/filters/filter.routes';
import { projectRouter } from './modules/projects/project.routes';
import { clientRouter } from './modules/clients/client.routes';
import { settingRouter } from './modules/settings/setting.routes';
import { leadRouter } from './modules/leads/lead.routes';
import { mediaRouter } from './modules/media/media.routes';

export const app = express();

// 1. Trust proxy for rate limiting behind reverse proxies (Render, Railway, Nginx)
app.set('trust proxy', 1);

// 2. Health & Readiness Probes (Unauthenticated, excluded from strict rate limits)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/ready', (_req, res) => {
  const isDbReady = mongoose.connection.readyState === 1;
  if (isDbReady) {
    res.status(200).json({ status: 'ready', database: 'connected' });
  } else {
    res.status(503).json({ status: 'unhealthy', database: 'disconnected' });
  }
});

// 3. Security Headers via Helmet with tuned CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://images.unsplash.com'],
        connectSrc: ["'self'", ...env.CORS_ORIGINS.split(',')],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 4. CORS with explicit origin allowlist
const allowedOrigins = env.CORS_ORIGINS.split(',').map((origin) => origin.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// 5. Body Parsing with payload cap to prevent memory exhaustion
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// 6. NoSQL Operator Injection Sanitization (Express 5 Safe)
app.use((req, _res, next) => {
  if (req.body) {
    mongoSanitize.sanitize(req.body);
  }
  if (req.params) {
    mongoSanitize.sanitize(req.params);
  }
  if (req.query) {
    mongoSanitize.sanitize(req.query);
  }
  next();
});

// 7. HTTP Request Logging (Development Only)
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 8. Rate Limiting Tiers (instructions.md Section 4)
const isBypass = (req: express.Request) =>
  env.NODE_ENV === 'test' || req.headers['x-test-bypass'] === 'true';

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isBypass(req),
  message: {
    success: false,
    error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests. Please try again shortly.' },
  },
});
app.use('/api', globalLimiter);

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  skip: (req) => isBypass(req),
  message: {
    success: false,
    error: { code: 'AUTH_RATE_LIMIT', message: 'Too many failed login attempts. Please wait 1 minute.' },
  },
});
app.use('/api/v1/auth/login', authLimiter);

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skip: (req) => isBypass(req) || req.method !== 'POST',
  message: {
    success: false,
    error: {
      code: 'LEAD_RATE_LIMIT',
      message: 'Inquiry limit reached. Please contact us directly at +91-9817343117.',
    },
  },
});
app.use('/api/v1/leads', leadLimiter);

// 9. API Module Mounts
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/divisions', divisionRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/filters', filterRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/leads', leadRouter);
app.use('/api/v1/media', mediaRouter);

// 10. 404 Catch-All Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested API route does not exist.',
    },
  });
});

// 11. Central RFC 7807 Error Handler (Always last)
app.use(errorHandler);
