"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = require("../admins/admin.model");
const jwt_1 = require("../../utils/jwt");
const errorHandler_1 = require("../../middleware/errorHandler");
const BCRYPT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes per instructions.md
// Precomputed 12-round dummy hash to prevent timing-based user enumeration (CWE-208)
const DUMMY_HASH = '$2a$12$K1rOaVlRjVpI5Pj5Kx4PkeO0c7F9G2ZkGgKq3L2QpZtWbY3XoM0bK';
class AuthService {
    static async login({ email, password }) {
        const admin = await admin_model_1.AdminModel.findOne({ email });
        if (!admin) {
            // Execute constant-time comparison to prevent timing side-channel attacks
            await bcryptjs_1.default.compare(password, DUMMY_HASH).catch(() => false);
            throw new errorHandler_1.AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
        }
        if (!admin.isActive) {
            throw new errorHandler_1.AppError('Administrative account has been disabled. Contact superadmin.', 403, 'ACCOUNT_DISABLED');
        }
        // Check account lockout
        if (admin.lockUntil && admin.lockUntil > new Date()) {
            const remainingMin = Math.ceil((admin.lockUntil.getTime() - Date.now()) / (60 * 1000));
            throw new errorHandler_1.AppError(`Account locked due to consecutive failed attempts. Try again in ${remainingMin} minute(s).`, 429, 'ACCOUNT_LOCKED');
        }
        const isMatch = await bcryptjs_1.default.compare(password, admin.passwordHash);
        if (!isMatch) {
            admin.failedLoginAttempts += 1;
            if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
                admin.lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
            }
            await admin.save();
            throw new errorHandler_1.AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
        }
        // Reset login tracking on success
        admin.failedLoginAttempts = 0;
        admin.lockUntil = null;
        admin.lastLoginAt = new Date();
        const payload = { id: admin._id.toString(), email: admin.email, role: admin.role };
        const accessToken = (0, jwt_1.signAccessToken)(payload);
        const refreshToken = (0, jwt_1.signRefreshToken)(payload);
        // Hash refresh token in DB
        admin.refreshTokenHash = await bcryptjs_1.default.hash(refreshToken, BCRYPT_ROUNDS);
        await admin.save();
        return {
            admin: payload,
            accessToken,
            refreshToken,
        };
    }
    static async refresh(oldRefreshToken) {
        let payload;
        try {
            payload = (0, jwt_1.verifyRefreshToken)(oldRefreshToken);
        }
        catch {
            throw new errorHandler_1.AppError('Refresh token is invalid or expired. Please log in again.', 401, 'REFRESH_TOKEN_INVALID');
        }
        const admin = await admin_model_1.AdminModel.findById(payload.id);
        if (!admin || !admin.isActive || !admin.refreshTokenHash) {
            throw new errorHandler_1.AppError('Refresh token invalid or session revoked.', 401, 'REFRESH_TOKEN_INVALID');
        }
        // Verify token against DB hash
        const isTokenValid = await bcryptjs_1.default.compare(oldRefreshToken, admin.refreshTokenHash);
        if (!isTokenValid) {
            // BREACH SIGNAL: Reused refresh token detected. Revoke session completely!
            admin.refreshTokenHash = null;
            await admin.save();
            throw new errorHandler_1.AppError('Compromised session token detected. Access revoked for security.', 401, 'REFRESH_TOKEN_REUSED');
        }
        // Token rotation
        const newPayload = { id: admin._id.toString(), email: admin.email, role: admin.role };
        const newAccessToken = (0, jwt_1.signAccessToken)(newPayload);
        const newRefreshToken = (0, jwt_1.signRefreshToken)(newPayload);
        admin.refreshTokenHash = await bcryptjs_1.default.hash(newRefreshToken, BCRYPT_ROUNDS);
        await admin.save();
        return {
            accessToken: newAccessToken,
            newRefreshToken,
        };
    }
    static async logout(adminId) {
        await admin_model_1.AdminModel.findByIdAndUpdate(adminId, { refreshTokenHash: null });
    }
    static async getMe(adminId) {
        const admin = await admin_model_1.AdminModel.findById(adminId).select('-passwordHash -refreshTokenHash');
        if (!admin) {
            throw new errorHandler_1.AppError('Admin profile not found.', 404, 'NOT_FOUND');
        }
        return admin;
    }
}
exports.AuthService = AuthService;
