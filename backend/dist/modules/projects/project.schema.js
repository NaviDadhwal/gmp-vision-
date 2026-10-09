"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    clientName: zod_1.z.string().min(1).max(200),
    scope: zod_1.z.string().min(1).max(500),
    location: zod_1.z.string().min(1).max(200),
    division: zod_1.z.array(zod_1.z.string()).default([]),
    completionYear: zod_1.z.number().int().min(2000).max(2100),
    description: zod_1.z.string().default(''),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    isFeatured: zod_1.z.boolean().default(false),
    testimonial: zod_1.z
        .object({
        quote: zod_1.z.string().default(''),
        author: zod_1.z.string().default(''),
        designation: zod_1.z.string().default(''),
    })
        .optional(),
    order: zod_1.z.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateProjectSchema = exports.createProjectSchema.partial();
