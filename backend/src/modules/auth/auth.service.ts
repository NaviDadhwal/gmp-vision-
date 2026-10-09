import bcrypt from 'bcryptjs';
import { AdminModel, IAdmin } from '../admins/admin.model';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt';
import { AppError } from '../../middleware/errorHandler';
import { LoginInput } from './auth.schema';

const BCRYPT_ROUNDS = 12;
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes per instructions.md
// Precomputed 12-round dummy hash to prevent timing-based user enumeration (CWE-208)
const DUMMY_HASH = '$2a$12$K1rOaVlRjVpI5Pj5Kx4PkeO0c7F9G2ZkGgKq3L2QpZtWbY3XoM0bK';

export class AuthService {
  static async login({ email, password }: LoginInput): Promise<{
    admin: { id: string; email: string; role: 'admin' | 'superadmin' };
    accessToken: string;
    refreshToken: string;
  }> {
    const admin = await AdminModel.findOne({ email });

    if (!admin) {
      // Execute constant-time comparison to prevent timing side-channel attacks
      await bcrypt.compare(password, DUMMY_HASH).catch(() => false);
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    if (!admin.isActive) {
      throw new AppError('Administrative account has been disabled. Contact superadmin.', 403, 'ACCOUNT_DISABLED');
    }

    // Check account lockout
    if (admin.lockUntil && admin.lockUntil > new Date()) {
      const remainingMin = Math.ceil((admin.lockUntil.getTime() - Date.now()) / (60 * 1000));
      throw new AppError(
        `Account locked due to consecutive failed attempts. Try again in ${remainingMin} minute(s).`,
        429,
        'ACCOUNT_LOCKED'
      );
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);

    if (!isMatch) {
      admin.failedLoginAttempts += 1;
      if (admin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        admin.lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
      }
      await admin.save();
      throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
    }

    // Reset login tracking on success
    admin.failedLoginAttempts = 0;
    admin.lockUntil = null;
    admin.lastLoginAt = new Date();

    const payload = { id: admin._id.toString(), email: admin.email, role: admin.role };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    // Hash refresh token in DB
    admin.refreshTokenHash = await bcrypt.hash(refreshToken, BCRYPT_ROUNDS);
    await admin.save();

    return {
      admin: payload,
      accessToken,
      refreshToken,
    };
  }

  static async refresh(oldRefreshToken: string): Promise<{
    accessToken: string;
    newRefreshToken: string;
  }> {
    let payload;
    try {
      payload = verifyRefreshToken(oldRefreshToken);
    } catch {
      throw new AppError('Refresh token is invalid or expired. Please log in again.', 401, 'REFRESH_TOKEN_INVALID');
    }

    const admin = await AdminModel.findById(payload.id);

    if (!admin || !admin.isActive || !admin.refreshTokenHash) {
      throw new AppError('Refresh token invalid or session revoked.', 401, 'REFRESH_TOKEN_INVALID');
    }

    // Verify token against DB hash
    const isTokenValid = await bcrypt.compare(oldRefreshToken, admin.refreshTokenHash);

    if (!isTokenValid) {
      // BREACH SIGNAL: Reused refresh token detected. Revoke session completely!
      admin.refreshTokenHash = null;
      await admin.save();
      throw new AppError('Compromised session token detected. Access revoked for security.', 401, 'REFRESH_TOKEN_REUSED');
    }

    // Token rotation
    const newPayload = { id: admin._id.toString(), email: admin.email, role: admin.role };
    const newAccessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);

    admin.refreshTokenHash = await bcrypt.hash(newRefreshToken, BCRYPT_ROUNDS);
    await admin.save();

    return {
      accessToken: newAccessToken,
      newRefreshToken,
    };
  }

  static async logout(adminId: string): Promise<void> {
    await AdminModel.findByIdAndUpdate(adminId, { refreshTokenHash: null });
  }

  static async getMe(adminId: string): Promise<IAdmin> {
    const admin = await AdminModel.findById(adminId).select('-passwordHash -refreshTokenHash');
    if (!admin) {
      throw new AppError('Admin profile not found.', 404, 'NOT_FOUND');
    }
    return admin;
  }
}
