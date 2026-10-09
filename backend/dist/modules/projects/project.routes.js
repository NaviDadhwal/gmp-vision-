"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = exports.ProjectController = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const project_model_1 = require("./project.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const project_schema_1 = require("./project.schema");
const product_schema_1 = require("../products/product.schema");
const pagination_1 = require("../../utils/pagination");
class ProjectController {
    static async getAll(req, res, next) {
        try {
            const { division, featured, mode = 'cursor', page = '1', limit = '9', cursor, } = req.query;
            const filter = { isActive: true };
            if (division && division !== 'All') {
                filter.division = division;
            }
            if (featured === 'true') {
                filter.isFeatured = true;
            }
            if (mode === 'offset') {
                const query = project_model_1.ProjectModel.find(filter).sort({ order: 1, createdAt: -1 });
                const countQuery = project_model_1.ProjectModel.countDocuments(filter);
                const result = await (0, pagination_1.paginateOffset)(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
                res.status(200).json(result);
                return;
            }
            const result = await (0, pagination_1.paginateCursor)({ model: project_model_1.ProjectModel, ...filter }, cursor, parseInt(limit, 10), '_id', -1);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const project = await project_model_1.ProjectModel.findOne({ _id: req.params.id, isActive: true });
            if (!project) {
                throw new errorHandler_1.AppError('Project case study not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const project = await project_model_1.ProjectModel.create(req.body);
            res.status(201).json({
                success: true,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const project = await project_model_1.ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!project) {
                throw new errorHandler_1.AppError('Project case study not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: project,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const project = await project_model_1.ProjectModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!project) {
                throw new errorHandler_1.AppError('Project case study not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: { message: 'Project reference disabled successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async reorder(req, res, next) {
        try {
            const { items } = req.body;
            const bulkOps = items.map((item) => ({
                updateOne: {
                    filter: { _id: new mongoose_1.Types.ObjectId(item.id) },
                    update: { $set: { order: item.order } },
                },
            }));
            await project_model_1.ProjectModel.bulkWrite(bulkOps);
            res.status(200).json({
                success: true,
                data: { message: 'Project display orders updated successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProjectController = ProjectController;
exports.projectRouter = (0, express_1.Router)();
exports.projectRouter.get('/', ProjectController.getAll);
exports.projectRouter.get('/:id', ProjectController.getById);
exports.projectRouter.post('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: project_schema_1.createProjectSchema }), ProjectController.create);
exports.projectRouter.patch('/reorder', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.reorderSchema }), ProjectController.reorder);
exports.projectRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: project_schema_1.updateProjectSchema }), ProjectController.update);
exports.projectRouter.delete('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), ProjectController.delete);
