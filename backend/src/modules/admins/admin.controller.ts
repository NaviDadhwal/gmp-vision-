import { Request, Response, NextFunction } from 'express';
import { AdminService } from './admin.service';

export class AdminController {
  static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admins = await AdminService.list();
      res.status(200).json({
        success: true,
        data: admins,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = await AdminService.create(req.body);
      res.status(201).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const admin = await AdminService.update(req.params.id as string, req.body, req.user!.id);
      res.status(200).json({
        success: true,
        data: admin,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await AdminService.delete(req.params.id as string, req.user!.id);
      res.status(200).json({
        success: true,
        data: { message: 'Administrator account removed successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }
}
