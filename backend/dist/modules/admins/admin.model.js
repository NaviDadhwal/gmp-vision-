"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.AdminSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AdminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    failedLoginAttempts: {
        type: Number,
        default: 0,
    },
    lockUntil: {
        type: Date,
        default: null,
    },
    refreshTokenHash: {
        type: String,
        default: null,
    },
    lastLoginAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
// Note: Unique index on email is automatically created by unique: true
exports.AdminModel = (0, mongoose_1.model)('Admin', exports.AdminSchema);
