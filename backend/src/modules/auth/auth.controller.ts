import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { env } from '../../config/env';

const REFRESH_COOKIE_NAME = 'refreshToken';
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: (env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/api/v1/auth',
};

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { admin, accessToken, refreshToken } = await AuthService.login(req.body);

      res.cookie(REFRESH_COOKIE_NAME, refreshToken, REFRESH_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          admin,
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
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

      const { accessToken, newRefreshToken } = await AuthService.refresh(oldRefreshToken);

      res.cookie(REFRESH_COOKIE_NAME, newRefreshToken, REFRESH_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.user?.id) {
        await AuthService.logout(req.user.id);
      }

      res.clearCookie(REFRESH_COOKIE_NAME, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/api/v1/auth',
      });

      res.status(200).json({
        success: true,
        data: {
          message: 'Session closed successfully.',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = await AuthService.getMe(req.user!.id);
      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  }
}
