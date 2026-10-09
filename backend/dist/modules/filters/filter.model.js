"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterModel = exports.FilterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FilterSchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: true,
        enum: [
            'pre-filter',
            'fine-filter',
            'pocket-bag',
            'gel-seal-hepa',
            'standard-hepa',
            'high-flow-hepa',
            'semi-hepa',
            'wire-mesh',
        ],
    },
    name: { type: String, required: true, trim: true },
    micronRating: { type: String, required: true },
    mediaConstruction: { type: String, default: '' },
    frame: { type: String, default: '' },
    applications: { type: [String], default: [] },
    keyFeature: { type: String, default: '' },
    images: { type: [String], default: [] },
    specSheetUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
exports.FilterSchema.index({ category: 1, isActive: 1, order: 1 });
exports.FilterModel = (0, mongoose_1.model)('Filter', exports.FilterSchema);
