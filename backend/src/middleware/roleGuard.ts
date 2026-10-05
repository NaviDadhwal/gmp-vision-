import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function roleGuard(allowedRoles: Array<'admin' | 'superadmin'>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('Authentication required.', 401, 'UNAUTHORIZED');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError('Insufficient administrative privileges.', 403, 'FORBIDDEN');
    }

    next();
  };
}
