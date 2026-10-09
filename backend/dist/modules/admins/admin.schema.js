"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminSchema = exports.createAdminSchema = void 0;
const zod_1 = require("zod");
exports.createAdminSchema = zod_1.z.object({
    email: zod_1.z.string().email('Valid email required').toLowerCase().trim(),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long'),
    role: zod_1.z.enum(['admin', 'superadmin']).default('admin'),
});
exports.updateAdminSchema = zod_1.z.object({
    role: zod_1.z.enum(['admin', 'superadmin']).optional(),
    isActive: zod_1.z.boolean().optional(),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters long').optional(),
});
