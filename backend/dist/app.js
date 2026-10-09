"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = require("./modules/auth/auth.routes");
const admin_routes_1 = require("./modules/admins/admin.routes");
const division_routes_1 = require("./modules/divisions/division.routes");
const product_routes_1 = require("./modules/products/product.routes");
const filter_routes_1 = require("./modules/filters/filter.routes");
const project_routes_1 = require("./modules/projects/project.routes");
const client_routes_1 = require("./modules/clients/client.routes");
const setting_routes_1 = require("./modules/settings/setting.routes");
const lead_routes_1 = require("./modules/leads/lead.routes");
const media_routes_1 = require("./modules/media/media.routes");
exports.app = (0, express_1.default)();
// 1. Trust proxy for rate limiting behind reverse proxies (Render, Railway, Nginx)
exports.app.set('trust proxy', 1);
// 2. Health & Readiness Probes (Unauthenticated, excluded from strict rate limits)
exports.app.get(['/', '/api'], (_req, res) => {
    res.status(200).json({
        name: 'GMP VISION Production API',
        status: 'online',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: '/health',
            ready: '/ready',
            api: '/api/v1',
        },
    });
});
exports.app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
exports.app.get('/ready', (_req, res) => {
    const isDbReady = mongoose_1.default.connection.readyState === 1;
    if (isDbReady) {
        res.status(200).json({ status: 'ready', database: 'connected' });
    }
    else {
        res.status(503).json({ status: 'unhealthy', database: 'disconnected' });
    }
});
// 3. Security Headers via Helmet with tuned CSP
exports.app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://images.unsplash.com'],
            connectSrc: ["'self'", ...env_1.env.CORS_ORIGINS.split(',')],
        },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
// 4. CORS with explicit origin allowlist + Vercel domain support
const allowedOrigins = env_1.env.CORS_ORIGINS.split(',').map((origin) => origin.trim());
const isAllowedOrigin = (origin) => {
    if (!origin)
        return true; // Direct API clients (curl, Postman, server-to-server)
    if (allowedOrigins.includes(origin))
        return true;
    // Support Vercel production and preview deployment URLs
    if (/^https:\/\/[a-zA-Z0-9_\-]+\.vercel\.app$/.test(origin))
        return true;
    return false;
};
exports.app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (isAllowedOrigin(origin)) {
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
// 5. Body Parsing with payload cap to prevent memory exhaustion
exports.app.use(express_1.default.json({ limit: '10kb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
exports.app.use((0, cookie_parser_1.default)());
// 6. NoSQL Operator Injection Sanitization (Express 5 Safe)
exports.app.use((req, _res, next) => {
    if (req.body) {
        express_mongo_sanitize_1.default.sanitize(req.body);
    }
    if (req.params) {
        express_mongo_sanitize_1.default.sanitize(req.params);
    }
    if (req.query) {
        express_mongo_sanitize_1.default.sanitize(req.query);
    }
    next();
});
// 7. HTTP Request Logging (Development Only)
if (env_1.env.NODE_ENV === 'development') {
    exports.app.use((0, morgan_1.default)('dev'));
}
// 8. Rate Limiting Tiers (instructions.md Section 4)
const isBypass = (req) => env_1.env.NODE_ENV === 'test' && req.headers['x-test-bypass'] === 'true';
const globalLimiter = (0, express_rate_limit_1.default)({
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
exports.app.use('/api', globalLimiter);
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    skip: (req) => isBypass(req),
    message: {
        success: false,
        error: { code: 'AUTH_RATE_LIMIT', message: 'Too many failed login attempts. Please wait 1 minute.' },
    },
});
exports.app.use('/api/v1/auth/login', authLimiter);
const leadLimiter = (0, express_rate_limit_1.default)({
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
exports.app.use('/api/v1/leads', leadLimiter);
// 9. API Module Mounts
exports.app.use('/api/v1/auth', auth_routes_1.authRouter);
exports.app.use('/api/v1/admins', admin_routes_1.adminRouter);
exports.app.use('/api/v1/divisions', division_routes_1.divisionRouter);
exports.app.use('/api/v1/products', product_routes_1.productRouter);
exports.app.use('/api/v1/filters', filter_routes_1.filterRouter);
exports.app.use('/api/v1/projects', project_routes_1.projectRouter);
exports.app.use('/api/v1/clients', client_routes_1.clientRouter);
exports.app.use('/api/v1/settings', setting_routes_1.settingRouter);
exports.app.use('/api/v1/leads', lead_routes_1.leadRouter);
exports.app.use('/api/v1/media', media_routes_1.mediaRouter);
// 10. 404 Catch-All Handler
exports.app.use((_req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'The requested API route does not exist.',
        },
    });
});
// 11. Central RFC 7807 Error Handler (Always last)
exports.app.use(errorHandler_1.errorHandler);
