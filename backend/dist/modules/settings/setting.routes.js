"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingRouter = exports.SettingController = void 0;
const express_1 = require("express");
const setting_model_1 = require("./setting.model");
const requireAuth_1 = require("../../middleware/requireAuth");
const roleGuard_1 = require("../../middleware/roleGuard");
const validate_1 = require("../../middleware/validate");
const setting_schema_1 = require("./setting.schema");
const errorHandler_1 = require("../../middleware/errorHandler");
const DISALLOWED_SETTING_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
class SettingController {
    static async getAll(_req, res, next) {
        try {
            const settings = await setting_model_1.SettingModel.find();
            const settingsMap = {};
            settings.forEach((s) => {
                if (!DISALLOWED_SETTING_KEYS.has(s.key)) {
                    settingsMap[s.key] = s.value;
                }
            });
            res.status(200).json({
                success: true,
                data: settingsMap,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async update(req, res, next) {
        try {
            const rawKey = req.params.key;
            const key = (Array.isArray(rawKey) ? rawKey[0] : rawKey) || '';
            const { value, description } = req.body;
            if (!key || DISALLOWED_SETTING_KEYS.has(key.toLowerCase())) {
                throw new errorHandler_1.AppError('Setting key is reserved or invalid and cannot be modified.', 400, 'INVALID_KEY');
            }
            const setting = await setting_model_1.SettingModel.findOneAndUpdate({ key }, { value, ...(description ? { description } : {}) }, { new: true, upsert: true });
            res.status(200).json({
                success: true,
                data: setting,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SettingController = SettingController;
exports.settingRouter = (0, express_1.Router)();
exports.settingRouter.get('/', SettingController.getAll);
exports.settingRouter.patch('/:key', requireAuth_1.requireAuth, (0, roleGuard_1.roleGuard)(['admin', 'superadmin']), (0, validate_1.validate)({ body: setting_schema_1.updateSettingSchema }), SettingController.update);
