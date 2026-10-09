"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuard = roleGuard;
const errorHandler_1 = require("./errorHandler");
function roleGuard(allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            throw new errorHandler_1.AppError('Authentication required.', 401, 'UNAUTHORIZED');
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new errorHandler_1.AppError('Insufficient administrative privileges.', 403, 'FORBIDDEN');
        }
        next();
    };
}
