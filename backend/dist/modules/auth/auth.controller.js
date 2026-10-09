"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const env_1 = require("../../config/env");
const REFRESH_COOKIE_NAME = 'refreshToken';
const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env_1.env.NODE_ENV === 'production',
    sameSite: (env_1.env.NODE_ENV === 'production' ? 'none' : 'lax'),
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/api/v1/auth',
};
class AuthController {
    static async login(req, res, next) {
        try {
            const { admin, accessToken, refreshToken } = await auth_service_1.AuthService.login(req.body);
            res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);
            res.status(200).json({
                success: true,
                data: {
                    admin,
                    accessToken,
                    refreshToken,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async refresh(req, res, next) {
        try {
            const oldRefreshToken = req.cookies[REFRESH_COOKIE_NAME] || req.body?.refreshToken;
            if (!oldRefreshToken) {
                res.status(401).json({
                    success: false,
                    error: {
                        code: 'REFRESH_TOKEN_REQUIRED',
                        message: 'Refresh token cookie or body payload is required.',
                    },
                });
                return;
            }
            const { accessToken, newRefreshToken } = await auth_service_1.AuthService.refresh(oldRefreshToken);
            res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, REFRESH_COOKIE_OPTIONS);
            res.status(200).json({
                success: true,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            if (req.user?.id) {
                await auth_service_1.AuthService.logout(req.user.id);
            }
            res.clearCookie(REFRESH_COOKIE_NAME, {
                httpOnly: true,
                secure: env_1.env.NODE_ENV === 'production',
                sameSite: env_1.env.NODE_ENV === 'production' ? 'none' : 'lax',
                path: '/api/v1/auth',
            });
            res.status(200).json({
                success: true,
                data: {
                    message: 'Session closed successfully.',
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMe(req, res, next) {
        try {
            const admin = await auth_service_1.AuthService.getMe(req.user.id);
            res.status(200).json({
                success: true,
                data: admin,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
