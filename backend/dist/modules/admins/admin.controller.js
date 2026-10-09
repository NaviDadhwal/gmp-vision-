"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("./admin.service");
class AdminController {
    static async list(_req, res, next) {
        try {
            const admins = await admin_service_1.AdminService.list();
            res.status(200).json({
                success: true,
                data: admins,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const admin = await admin_service_1.AdminService.create(req.body);
            res.status(201).json({
                success: true,
                data: admin,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const admin = await admin_service_1.AdminService.update(req.params.id, req.body, req.user.id);
            res.status(200).json({
                success: true,
                data: admin,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async delete(req, res, next) {
        try {
            await admin_service_1.AdminService.delete(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                data: { message: 'Administrator account removed successfully.' },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
