import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IAdminPayload } from '../types/express';

export function signAccessToken(payload: IAdminPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
  });
}

export function signRefreshToken(payload: IAdminPayload): string {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });
}

export function verifyAccessToken(token: string): IAdminPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as IAdminPayload;
}

export function verifyRefreshToken(token: string): IAdminPayload {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as IAdminPayload;
}
