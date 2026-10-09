"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwt_1 = require("../utils/jwt");
const errorHandler_1 = require("./errorHandler");
const admin_model_1 = require("../modules/admins/admin.model");
async function requireAuth(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new errorHandler_1.AppError('Authentication required. Missing Bearer token.', 401, 'UNAUTHORIZED');
    }
    const token = authHeader.split(' ')[1];
    let payload;
    try {
        payload = (0, jwt_1.verifyAccessToken)(token);
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new errorHandler_1.AppError('Access token expired. Please refresh your session.', 401, 'TOKEN_EXPIRED');
        }
        throw new errorHandler_1.AppError('Invalid or corrupted session token.', 401, 'TOKEN_INVALID');
    }
    // Active account verification (CWE-613): Revoke access immediately if disabled/deleted
    const admin = await admin_model_1.AdminModel.findById(payload.id).select('isActive role');
    if (!admin || !admin.isActive) {
        throw new errorHandler_1.AppError('Account has been deactivated or removed. Access revoked.', 401, 'ACCOUNT_DISABLED');
    }
    // Ensure role in request context reflects current database state
    req.user = {
        ...payload,
        role: admin.role,
    };
    next();
}
