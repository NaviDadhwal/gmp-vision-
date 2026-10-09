"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    divisionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Division',
        required: true,
        index: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    subcategory: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    specifications: [
        {
            key: { type: String, required: true },
            value: { type: String, required: true },
        },
    ],
    images: {
        type: [String],
        default: [],
    },
    tags: {
        type: [String],
        default: [],
    },
    isFeatured: {
        type: Boolean,
        default: false,
        index: true,
    },
    brochureUrl: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
}, { timestamps: true });
exports.ProductSchema.index({ divisionId: 1, isActive: 1, order: 1 });
exports.ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
exports.ProductModel = (0, mongoose_1.model)('Product', exports.ProductSchema);
