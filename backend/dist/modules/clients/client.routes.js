"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = exports.ClientController = void 0;
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const client_model_1 = require("./client.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const client_schema_1 = require("./client.schema");
const product_schema_1 = require("../products/product.schema");
class ClientController {
    static async getAll(_req, res, next) {
        try {
            const clients = await client_model_1.ClientModel.find({ isActive: true }).sort({ order: 1 });
            res.status(200).json({
                success: true,
                data: clients,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const client = await client_model_1.ClientModel.create(req.body);
            res.status(201).json({
                success: true,
                data: client,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const client = await client_model_1.ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!client) {
                throw new errorHandler_1.AppError('Client record not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: client,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            const client = await client_model_1.ClientModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
            if (!client) {
                throw new errorHandler_1.AppError('Client record not found.', 404, 'NOT_FOUND');
            }
            res.status(200).json({
                success: true,
                data: { message: 'Client logo disabled successfully.' },
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
            await client_model_1.ClientModel.bulkWrite(bulkOps);
            res.status(200).json({
                success: true,
                data: { message: 'Client logo wall display order updated.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ClientController = ClientController;
exports.clientRouter = (0, express_1.Router)();
exports.clientRouter.get('/', ClientController.getAll);
exports.clientRouter.post('/', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: client_schema_1.createClientSchema }), ClientController.create);
exports.clientRouter.patch('/reorder', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: product_schema_1.reorderSchema }), ClientController.reorder);
exports.clientRouter.patch('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: client_schema_1.updateClientSchema }), ClientController.update);
exports.clientRouter.delete('/:id', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), ClientController.delete);
