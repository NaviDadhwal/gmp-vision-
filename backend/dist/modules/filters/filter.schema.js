"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFilterSchema = exports.createFilterSchema = void 0;
const zod_1 = require("zod");
exports.createFilterSchema = zod_1.z.object({
    category: zod_1.z.enum([
        'pre-filter',
        'fine-filter',
        'pocket-bag',
        'gel-seal-hepa',
        'standard-hepa',
        'high-flow-hepa',
        'semi-hepa',
        'wire-mesh',
    ]),
    name: zod_1.z.string().min(1).max(200),
    micronRating: zod_1.z.string().min(1).max(100),
    mediaConstruction: zod_1.z.string().default(''),
    frame: zod_1.z.string().default(''),
    applications: zod_1.z.array(zod_1.z.string()).default([]),
    keyFeature: zod_1.z.string().default(''),
    images: zod_1.z.array(zod_1.z.string().url()).default([]),
    specSheetUrl: zod_1.z.string().optional(),
    order: zod_1.z.number().int().default(0),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateFilterSchema = exports.createFilterSchema.partial();
