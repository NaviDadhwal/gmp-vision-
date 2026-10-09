"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLeadStatusSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1).max(200).default('Direct WhatsApp Visitor'),
    contactName: zod_1.z.string().min(1).max(100).default('WhatsApp Lead'),
    designation: zod_1.z.string().max(100).optional().default(''),
    email: zod_1.z.string().email('Valid email required').or(zod_1.z.literal('')).default('inquiry@placeholder.gmpvision.com'),
    phone: zod_1.z.string().min(8).max(25),
    location: zod_1.z.string().max(200).optional().default(''),
    projectType: zod_1.z.array(zod_1.z.string()).default(['General Turnkey Inquiry']),
    message: zod_1.z.string().min(1).max(3000),
    divisions: zod_1.z.array(zod_1.z.string()).optional().default([]),
    roomDimensions: zod_1.z.string().max(100).optional().default(''),
    cfm: zod_1.z.number().positive().optional().nullable(),
    targetDate: zod_1.z.string().max(50).optional().default(''),
    source: zod_1.z.enum(['rfq_form', 'contact_form', 'whatsapp']),
    referrerUrl: zod_1.z.string().optional().default(''),
});
exports.updateLeadStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['new', 'contacted', 'quoted', 'converted', 'closed']),
    notes: zod_1.z.string().optional(),
});
