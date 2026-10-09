"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRouter = exports.FilterController = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const filter_model_1 = require("./filter.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const filter_schema_1 = require("./filter.schema");
const product_schema_1 = require("../products/product.schema");
class FilterController {
    static async getAll(req, res, next) {
        try {
            const { category } = req.query;
            const filter = { isActive: true };
            if (category) {
                filter.category = category;
            }
            const filters = await filter_model_1.FilterModel.find(filter).sort({ category: 1, order: 1 });
            res.status(200).json({
                success: true,
                data: filters,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const filter = await filter_model_1.FilterModel.findOne({ _id: req.params.id, isActive: true });
            if (!filter) {
                throw new errorHandler_1.AppError('Filter item not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: filter,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const filter = await filter_model_1.FilterModel.create(req.body);
            res.status(201).json({
                success: true,
                data: filter,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const filter = await filter_model_1.FilterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!filter) {
                throw new errorHandler_1.AppError('Filter item not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: filter,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const filter = await filter_model_1.FilterModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!filter) {
                throw new errorHandler_1.AppError('Filter item not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: { message: 'Filter catalog item disabled successfully.' },
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
            await filter_model_1.FilterModel.bulkWrite(bulkOps);
            res.status(200).json({
                success: true,
                data: { message: 'Filter display orders updated successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.FilterController = FilterController;
exports.filterRouter = (0, express_1.Router)();
exports.filterRouter.get('/', FilterController.getAll);
exports.filterRouter.get('/:id', FilterController.getById);
exports.filterRouter.post('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: filter_schema_1.createFilterSchema }), FilterController.create);
exports.filterRouter.patch('/reorder', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.reorderSchema }), FilterController.reorder);
exports.filterRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: filter_schema_1.updateFilterSchema }), FilterController.update);
exports.filterRouter.delete('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), FilterController.delete);
