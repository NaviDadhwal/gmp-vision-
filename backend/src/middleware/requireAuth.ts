import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from './errorHandler';
import { AdminModel } from '../modules/admins/admin.model';

export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Authentication required. Missing Bearer token.', 401, 'UNAUTHORIZED');
  }

  const token = authHeader.split(' ')[1];

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Access token expired. Please refresh your session.', 401, 'TOKEN_EXPIRED');
    }
    throw new AppError('Invalid or corrupted session token.', 401, 'TOKEN_INVALID');
  }

  // Active account verification (CWE-613): Revoke access immediately if disabled/deleted
  const admin = await AdminModel.findById(payload.id).select('isActive role');
  if (!admin || !admin.isActive) {
    throw new AppError('Account has been deactivated or removed. Access revoked.', 401, 'ACCOUNT_DISABLED');
  }

  // Ensure role in request context reflects current database state
  req.user = {
    ...payload,
    role: admin.role,
  };

  next();
}
