"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divisionRouter = exports.DivisionController = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const division_model_1 = require("./division.model");
const product_model_1 = require("../products/product.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const division_schema_1 = require("./division.schema");
class DivisionController {
    static async getAll(_req, res, next) {
        try {
            const divisions = await division_model_1.DivisionModel.find({ isActive: true }).sort({ number: 1 });
            res.status(200).json({
                success: true,
                data: divisions,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getBySlug(req, res, next) {
        try {
            const division = await division_model_1.DivisionModel.findOne({ slug: req.params.slug, isActive: true });
            if (!division) {
                throw new errorHandler_1.AppError('Division not found.', 404, 'NOT_FOUND');
            }
            // Fetch associated equipment/products under this division
            const products = await product_model_1.ProductModel.find({ divisionId: division._id, isActive: true }).sort({ order: 1 });
            res.status(200).json({
                success: true,
                data: {
                    division,
                    products,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const division = await division_model_1.DivisionModel.create(req.body);
            res.status(201).json({
                success: true,
                data: division,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const idOrSlug = req.params.id;
            const query = mongoose_1.Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
            const division = await division_model_1.DivisionModel.findOneAndUpdate(query, req.body, { returnDocument: 'after' });
            if (!division) {
                throw new errorHandler_1.AppError('Division not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: division,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const idOrSlug = req.params.id;
            const query = mongoose_1.Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
            const division = await division_model_1.DivisionModel.findOneAndUpdate(query, { isActive: false }, { returnDocument: 'after' });
            if (!division) {
                throw new errorHandler_1.AppError('Division not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: { message: 'Division disabled successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DivisionController = DivisionController;
exports.divisionRouter = (0, express_1.Router)();
exports.divisionRouter.get('/', DivisionController.getAll);
exports.divisionRouter.get('/:slug', DivisionController.getBySlug);
exports.divisionRouter.post('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['superadmin']), (0, validate_1.validate)({ body: division_schema_1.createDivisionSchema }), DivisionController.create);
exports.divisionRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: division_schema_1.updateDivisionSchema }), DivisionController.update);
exports.divisionRouter.delete('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['superadmin']), DivisionController.delete);
