"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadRouter = exports.LeadController = void 0;
const express_1 = require("express");
const lead_model_1 = require("./lead.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const lead_schema_1 = require("./lead.schema");
const pagination_1 = require("../../utils/pagination");
const email_service_1 = require("../../services/email.service");
class LeadController {
    static async create(req, res, next) {
        try {
            const lead = await lead_model_1.LeadModel.create(req.body);
            // Async email alert without blocking response
            email_service_1.EmailService.sendNewLeadAlert(lead).catch((e) => console.error(e));
            res.status(201).json({
                success: true,
                data: {
                    id: lead._id,
                    message: 'Inquiry received. A GMP VISION engineering consultant will review your specifications.',
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getAll(req, res, next) {
        try {
            const { status, source, division, startDate, endDate, page = '1', limit = '20', } = req.query;
            const filter = {};
            if (status)
                filter.status = status;
            if (source)
                filter.source = source;
            if (division)
                filter.divisions = division;
            if (startDate || endDate) {
                filter.createdAt = {};
                if (startDate)
                    filter.createdAt.$gte = new Date(startDate);
                if (endDate)
                    filter.createdAt.$lte = new Date(endDate);
            }
            const query = lead_model_1.LeadModel.find(filter).sort({ createdAt: -1 });
            const countQuery = lead_model_1.LeadModel.countDocuments(filter);
            const result = await (0, pagination_1.paginateOffset)(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const lead = await lead_model_1.LeadModel.findById(req.params.id);
            if (!lead) {
                throw new errorHandler_1.AppError('Lead not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: lead,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { status, notes } = req.body;
            const updateData = { status };
            if (typeof notes === 'string')
                updateData.notes = notes;
            const lead = await lead_model_1.LeadModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!lead) {
                throw new errorHandler_1.AppError('Lead not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: lead,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async exportCSV(_req, res, next) {
        try {
            const leads = await lead_model_1.LeadModel.find().sort({ createdAt: -1 });
            const headers = [
                'ID',
                'Date',
                'Company',
                'Contact Name',
                'Phone',
                'Email',
                'Source',
                'Status',
                'Divisions',
                'Dimensions',
                'CFM',
                'Message',
            ];
            const escapeCSV = (val) => {
                let str = String(val ?? '');
                // Prevent CSV Formula Injection (CWE-1236)
                if (/^[=+\-@\t\r]/.test(str)) {
                    str = `'${str}`;
                }
                return `"${str.replace(/"/g, '""')}"`;
            };
            const rows = leads.map((l) => [
                escapeCSV(l._id),
                escapeCSV(l.createdAt.toISOString()),
                escapeCSV(l.companyName),
                escapeCSV(l.contactName),
                escapeCSV(l.phone),
                escapeCSV(l.email),
                escapeCSV(l.source),
                escapeCSV(l.status),
                escapeCSV(l.divisions.join('; ')),
                escapeCSV(l.roomDimensions),
                escapeCSV(l.cfm),
                escapeCSV(l.message),
            ]);
            const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="gmp_vision_leads_${Date.now()}.csv"`);
            res.status(200).send(csvContent);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LeadController = LeadController;
exports.leadRouter = (0, express_1.Router)();
exports.leadRouter.post('/', (0, validate_1.validate)({ body: lead_schema_1.createLeadSchema }), LeadController.create);
exports.leadRouter.get('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), LeadController.getAll);
exports.leadRouter.get('/export', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), LeadController.exportCSV);
exports.leadRouter.get('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), LeadController.getById);
exports.leadRouter.patch('/:id/status', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: lead_schema_1.updateLeadStatusSchema }), LeadController.updateStatus);
exports.leadRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: lead_schema_1.updateLeadStatusSchema }), LeadController.updateStatus);
