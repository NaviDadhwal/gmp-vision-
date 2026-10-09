"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DivisionModel = exports.DivisionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DivisionSchema = new mongoose_1.Schema({
    number: { type: Number, required: true, min: 1, max: 7 },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    tagline: { type: String, required: true },
    description: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    icon: { type: String, default: 'Layers' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.DivisionSchema.index({ isActive: 1, order: 1 });
exports.DivisionModel = (0, mongoose_1.model)('Division', exports.DivisionSchema);
