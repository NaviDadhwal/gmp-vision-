"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModel = exports.ClientSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ClientSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    logoUrl: { type: String, required: true },
    sector: {
        type: String,
        required: true,
        enum: [
            'Pharmaceutical',
            'Biotechnology',
            'Healthcare',
            'Chemical',
            'Advanced Manufacturing',
        ],
        default: 'Pharmaceutical',
    },
    website: { type: String, default: '' },
    isFeatured: { type: Boolean, default: true, index: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true });
exports.ClientSchema.index({ isActive: 1, order: 1 });
exports.ClientModel = (0, mongoose_1.model)('Client', exports.ClientSchema);
