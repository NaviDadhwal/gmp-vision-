"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = exports.ProjectSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProjectSchema = new mongoose_1.Schema({
    clientName: { type: String, required: true, trim: true },
    scope: { type: String, required: true },
    location: { type: String, required: true },
    division: { type: [String], default: [] },
    completionYear: { type: Number, required: true },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false, index: true },
    testimonial: {
        quote: { type: String, default: '' },
        author: { type: String, default: '' },
        designation: { type: String, default: '' },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
}, { timestamps: true });
exports.ProjectSchema.index({ isActive: 1, order: 1 });
exports.ProjectSchema.index({ division: 1 });
exports.ProjectModel = (0, mongoose_1.model)('Project', exports.ProjectSchema);
