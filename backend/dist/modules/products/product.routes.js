"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = exports.ProductController = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const product_model_1 = require("./product.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const product_schema_1 = require("./product.schema");
const pagination_1 = require("../../utils/pagination");
class ProductController {
    static async getAll(req, res, next) {
        try {
            const { divisionId, category, featured, search, mode = 'cursor', page = '1', limit = '12', cursor, } = req.query;
            const filter = { isActive: true };
            if (divisionId && mongoose_1.Types.ObjectId.isValid(divisionId)) {
                filter.divisionId = new mongoose_1.Types.ObjectId(divisionId);
            }
            if (category) {
                filter.category = category;
            }
            if (featured === 'true') {
                filter.isFeatured = true;
            }
            if (search) {
                filter.$text = { $search: search };
            }
            if (mode === 'offset') {
                const query = product_model_1.ProductModel.find(filter).sort({ order: 1, createdAt: -1 });
                const countQuery = product_model_1.ProductModel.countDocuments(filter);
                const result = await (0, pagination_1.paginateOffset)(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
                res.status(200).json(result);
                return;
            }
            // Default: Cursor-based pagination for public feeds
            const result = await (0, pagination_1.paginateCursor)({ model: product_model_1.ProductModel, ...filter }, cursor, parseInt(limit, 10), '_id', -1);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    static async getBySlug(req, res, next) {
        try {
            const product = await product_model_1.ProductModel.findOne({ slug: req.params.slug, isActive: true }).populate('divisionId');
            if (!product) {
                throw new errorHandler_1.AppError('Product not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const product = await product_model_1.ProductModel.create(req.body);
            res.status(201).json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const product = await product_model_1.ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                throw new errorHandler_1.AppError('Product not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: product,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const product = await product_model_1.ProductModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!product) {
                throw new errorHandler_1.AppError('Product not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: { message: 'Product disabled successfully.' },
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
            await product_model_1.ProductModel.bulkWrite(bulkOps);
            res.status(200).json({
                success: true,
                data: { message: 'Product display orders updated successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ProductController = ProductController;
exports.productRouter = (0, express_1.Router)();
exports.productRouter.get('/', ProductController.getAll);
exports.productRouter.get('/:slug', ProductController.getBySlug);
exports.productRouter.post('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.createProductSchema }), ProductController.create);
exports.productRouter.patch('/reorder', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.reorderSchema }), ProductController.reorder);
exports.productRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.updateProductSchema }), ProductController.update);
exports.productRouter.delete('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), ProductController.delete);
