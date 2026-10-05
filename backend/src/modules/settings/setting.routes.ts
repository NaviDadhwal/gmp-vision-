import { Request, Response, NextFunction, Router } from 'express';
import { SettingModel } from './setting.model';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { updateSettingSchema } from './setting.schema';

export class SettingController {
  static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await SettingModel.find();
      const settingsMap: Record<string, any> = {};
      settings.forEach((s) => {
        settingsMap[s.key] = s.value;
      });

      res.status(200).json({
        success: true,
        data: settingsMap,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { key } = req.params;
      const { value, description } = req.body;

      const setting = await SettingModel.findOneAndUpdate(
        { key },
        { value, ...(description ? { description } : {}) },
        { new: true, upsert: true }
      );

      res.status(200).json({
        success: true,
        data: setting,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const settingRouter = Router();

settingRouter.get('/', SettingController.getAll);
settingRouter.patch('/:key', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateSettingSchema }), SettingController.update);
