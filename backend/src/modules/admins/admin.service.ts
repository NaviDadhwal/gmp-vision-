import bcrypt from 'bcryptjs';
import { AdminModel, IAdmin } from './admin.model';
import { AppError } from '../../middleware/errorHandler';

const BCRYPT_ROUNDS = 12;

export class AdminService {
  static async list(): Promise<IAdmin[]> {
    return AdminModel.find().select('-passwordHash -refreshTokenHash').sort({ createdAt: -1 });
  }

  static async create(data: { email: string; password: string; role?: 'admin' | 'superadmin' }): Promise<IAdmin> {
    const existing = await AdminModel.findOne({ email: data.email });
    if (existing) {
      throw new AppError('An administrator account with this email already exists.', 409, 'CONFLICT');
    }

    const passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    const admin = await AdminModel.create({
      email: data.email,
      passwordHash,
      role: data.role || 'admin',
    });

    return AdminModel.findById(admin._id).select('-passwordHash -refreshTokenHash') as unknown as IAdmin;
  }

  static async update(
    adminId: string,
    data: { role?: 'admin' | 'superadmin'; isActive?: boolean; password?: string },
    currentUserId: string
  ): Promise<IAdmin> {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      throw new AppError('Admin account not found.', 404, 'NOT_FOUND');
    }

    if (adminId === currentUserId && data.role && data.role !== 'superadmin') {
      throw new AppError('Superadmins cannot demote their own account.', 403, 'CANNOT_SELF_DEMOTE');
    }

    if (adminId === currentUserId && data.isActive === false) {
      throw new AppError('Superadmins cannot deactivate their own account.', 403, 'CANNOT_SELF_DEACTIVATE');
    }

    if (data.role) admin.role = data.role;
    if (typeof data.isActive === 'boolean') admin.isActive = data.isActive;
    if (data.password) {
      admin.passwordHash = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    }

    await admin.save();
    return AdminModel.findById(admin._id).select('-passwordHash -refreshTokenHash') as unknown as IAdmin;
  }

  static async delete(adminId: string, currentUserId: string): Promise<void> {
    if (adminId === currentUserId) {
      throw new AppError('Superadmins cannot delete their own account.', 403, 'CANNOT_SELF_DELETE');
    }

    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      throw new AppError('Admin account not found.', 404, 'NOT_FOUND');
    }

    if (admin.role === 'superadmin') {
      const superadminCount = await AdminModel.countDocuments({ role: 'superadmin', isActive: true });
      if (superadminCount <= 1) {
        throw new AppError('Cannot delete the last remaining active superadmin account.', 403, 'LAST_SUPERADMIN_PROTECTED');
      }
    }

    await AdminModel.findByIdAndDelete(adminId);
  }
}
