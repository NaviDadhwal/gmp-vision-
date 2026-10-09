"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = require("./admin.model");
const errorHandler_1 = require("../../middleware/errorHandler");
const BCRYPT_ROUNDS = 12;
class AdminService {
    static async list() {
        return admin_model_1.AdminModel.find().select('-passwordHash -refreshTokenHash').sort({ createdAt: -1 });
    }
    static async create(data) {
        const existing = await admin_model_1.AdminModel.findOne({ email: data.email });
        if (existing) {
            throw new errorHandler_1.AppError('An administrator account with this email already exists.', 409, 'CONFLICT');
        }
        const passwordHash = await bcryptjs_1.default.hash(data.password, BCRYPT_ROUNDS);
        const admin = await admin_model_1.AdminModel.create({
            email: data.email,
            passwordHash,
            role: data.role || 'admin',
        });
        return admin_model_1.AdminModel.findById(admin._id).select('-passwordHash -refreshTokenHash');
    }
    static async update(adminId, data, currentUserId) {
        const admin = await admin_model_1.AdminModel.findById(adminId);
        if (!admin) {
            throw new errorHandler_1.AppError('Admin account not found.', 404, 'NOT_FOUND');
        }
        if (adminId === currentUserId && data.role && data.role !== 'superadmin') {
            throw new errorHandler_1.AppError('Superadmins cannot demote their own account.', 403, 'CANNOT_SELF_DEMOTE');
        }
        if (adminId === currentUserId && data.isActive === false) {
            throw new errorHandler_1.AppError('Superadmins cannot deactivate their own account.', 403, 'CANNOT_SELF_DEACTIVATE');
        }
        if (data.role)
            admin.role = data.role;
        if (typeof data.isActive === 'boolean')
            admin.isActive = data.isActive;
        if (data.password) {
            admin.passwordHash = await bcryptjs_1.default.hash(data.password, BCRYPT_ROUNDS);
        }
        await admin.save();
        return admin_model_1.AdminModel.findById(admin._id).select('-passwordHash -refreshTokenHash');
    }
    static async delete(adminId, currentUserId) {
        if (adminId === currentUserId) {
            throw new errorHandler_1.AppError('Superadmins cannot delete their own account.', 403, 'CANNOT_SELF_DELETE');
        }
        const admin = await admin_model_1.AdminModel.findById(adminId);
        if (!admin) {
            throw new errorHandler_1.AppError('Admin account not found.', 404, 'NOT_FOUND');
        }
        if (admin.role === 'superadmin') {
            const superadminCount = await admin_model_1.AdminModel.countDocuments({ role: 'superadmin', isActive: true });
            if (superadminCount <= 1) {
                throw new errorHandler_1.AppError('Cannot delete the last remaining active superadmin account.', 403, 'LAST_SUPERADMIN_PROTECTED');
            }
        }
        await admin_model_1.AdminModel.findByIdAndDelete(adminId);
    }
}
exports.AdminService = AdminService;
