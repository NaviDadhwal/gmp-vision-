"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(200),
    logoUrl: zod_1.z.string().url('Valid logo image URL required'),
    sector: zod_1.z.enum([
        'Pharmaceutical',
        'Biotechnology',
        'Healthcare',
        'Chemical',
        'Advanced Manufacturing',
    ]),
    website: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    isFeatured: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateClientSchema = exports.createClientSchema.partial();
