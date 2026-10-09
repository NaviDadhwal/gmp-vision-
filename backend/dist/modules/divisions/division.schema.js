"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDivisionSchema = exports.createDivisionSchema = void 0;
const zod_1 = require("zod");
exports.createDivisionSchema = zod_1.z.object({
    number: zod_1.z.number().int().min(1).max(7),
    title: zod_1.z.string().min(1).max(200),
    slug: zod_1.z.string().min(1).max(200).toLowerCase().trim(),
    tagline: zod_1.z.string().min(1).max(300),
    description: zod_1.z.string().default(''),
    heroImage: zod_1.z.string().default(''),
    icon: zod_1.z.string().default('Layers'),
    metaTitle: zod_1.z.string().max(100).optional(),
    metaDescription: zod_1.z.string().max(300).optional(),
    order: zod_1.z.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateDivisionSchema = exports.createDivisionSchema.partial();
