"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingModel = exports.SettingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SettingSchema = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true, trim: true },
    value: { type: mongoose_1.Schema.Types.Mixed, required: true },
    description: { type: String, default: '' },
}, { timestamps: true });
// Note: Unique index on key is automatically created by unique: true
exports.SettingModel = (0, mongoose_1.model)('Setting', exports.SettingSchema);
