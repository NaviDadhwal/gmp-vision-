"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    divisionId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Division ID format'),
    category: zod_1.z.string().min(1).max(100),
    subcategory: zod_1.z.string().max(100).optional(),
    name: zod_1.z.string().min(1).max(200),
    slug: zod_1.z.string().min(1).max(200).toLowerCase().trim(),
    description: zod_1.z.string().default(''),
    specifications: zod_1.z
        .array(zod_1.z.object({
        key: zod_1.z.string().min(1),
        value: zod_1.z.string().min(1),
    }))
        .default([]),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    isFeatured: zod_1.z.boolean().default(false),
    brochureUrl: zod_1.z.string().optional(),
    order: zod_1.z.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateProductSchema = exports.createProductSchema.partial();
exports.reorderSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid resource ID'),
        order: zod_1.z.number().int(),
    })),
});
