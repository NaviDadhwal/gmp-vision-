"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadModel = exports.LeadSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LeadSchema = new mongoose_1.Schema({
    companyName: { type: String, required: true, trim: true },
    contactName: { type: String, required: true, trim: true },
    designation: { type: String, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    location: { type: String, default: '' },
    projectType: { type: [String], default: ['General Turnkey Inquiry'] },
    message: { type: String, required: true },
    divisions: { type: [String], default: [] },
    roomDimensions: { type: String, default: '' },
    cfm: { type: Number, default: null },
    targetDate: { type: String, default: '' },
    source: {
        type: String,
        enum: ['rfq_form', 'contact_form', 'whatsapp'],
        default: 'rfq_form',
        index: true,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
        default: 'new',
        index: true,
    },
    referrerUrl: { type: String, default: '' },
    notes: { type: String, default: '' },
}, { timestamps: true });
exports.LeadSchema.index({ status: 1, createdAt: -1 });
exports.LeadSchema.index({ createdAt: -1 });
exports.LeadModel = (0, mongoose_1.model)('Lead', exports.LeadSchema);
