import { Request, Response, NextFunction, Router } from 'express';
import { SettingModel } from './setting.model';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { updateSettingSchema } from './setting.schema';
import { AppError } from '../../middleware/errorHandler';

const DISALLOWED_SETTING_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export class SettingController {
  static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = await SettingModel.find();
      const settingsMap: Record<string, any> = {};
      settings.forEach((s) => {
        if (!DISALLOWED_SETTING_KEYS.has(s.key)) {
          settingsMap[s.key] = s.value;
        }
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
      const rawKey = req.params.key;
      const key = (Array.isArray(rawKey) ? rawKey[0] : rawKey) || '';
      const { value, description } = req.body;

      if (!key || DISALLOWED_SETTING_KEYS.has(key.toLowerCase())) {
        throw new AppError('Setting key is reserved or invalid and cannot be modified.', 400, 'INVALID_KEY');
      }

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
