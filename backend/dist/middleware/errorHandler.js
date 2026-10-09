"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
class AppError extends Error {
    statusCode;
    code;
    fields;
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR', fields) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.fields = fields;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
function errorHandler(err, _req, res, _next) {
    // 1. Zod Validation Errors
    if (err instanceof zod_1.ZodError) {
        const formattedFields = {};
        err.errors.forEach((issue) => {
            const fieldPath = issue.path.join('.') || 'root';
            if (!formattedFields[fieldPath]) {
                formattedFields[fieldPath] = [];
            }
            formattedFields[fieldPath].push(issue.message);
        });
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid request data. Please check submitted fields.',
                fields: formattedFields,
            },
        });
        return;
    }
    // 2. Custom AppError instances
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                ...(err.fields ? { fields: err.fields } : {}),
            },
        });
        return;
    }
    // 3. Mongoose CastError (e.g. invalid ObjectId)
    if (err.name === 'CastError') {
        res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_ID',
                message: `Resource identifier '${err.value}' is not a valid format.`,
            },
        });
        return;
    }
    // 4. Mongoose Duplicate Key Error (11000)
    if (err.code === 11000) {
        const duplicateKey = Object.keys(err.keyValue || {})[0] || 'field';
        res.status(409).json({
            success: false,
            error: {
                code: 'CONFLICT',
                message: `An entity with this ${duplicateKey} already exists.`,
            },
        });
        return;
    }
    // 5. JWT Errors
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            error: {
                code: 'TOKEN_EXPIRED',
                message: 'Access token has expired. Please refresh your session.',
            },
        });
        return;
    }
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            error: {
                code: 'TOKEN_INVALID',
                message: 'Session token is invalid or malformed.',
            },
        });
        return;
    }
    // 6. Generic/Unhandled 500 Server Errors
    const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
    const message = statusCode === 500 && process.env.NODE_ENV === 'production'
        ? 'An unexpected internal server error occurred.'
        : err.message || 'Internal server error';
    console.error('💥 [Server Exception]:', err);
    res.status(statusCode).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message,
        },
    });
}
