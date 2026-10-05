import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import { FilterModel } from './filter.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createFilterSchema, updateFilterSchema } from './filter.schema';
import { reorderSchema } from '../products/product.schema';

export class FilterController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category } = req.query as { category?: string };
      const filter: Record<string, any> = { isActive: true };

      if (category) {
        filter.category = category;
      }

      const filters = await FilterModel.find(filter).sort({ category: 1, order: 1 });

      res.status(200).json({
        success: true,
        data: filters,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter = await FilterModel.findOne({ _id: req.params.id, isActive: true });
      if (!filter) {
        throw new AppError('Filter item not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: filter,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter = await FilterModel.create(req.body);
      res.status(201).json({
        success: true,
        data: filter,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter = await FilterModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!filter) {
        throw new AppError('Filter item not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: filter,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filter = await FilterModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!filter) {
        throw new AppError('Filter item not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: { message: 'Filter catalog item disabled successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }

  static async reorder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { items } = req.body as { items: Array<{ id: string; order: number }> };

      const bulkOps = items.map((item) => ({
        updateOne: {
          filter: { _id: new Types.ObjectId(item.id) },
          update: { $set: { order: item.order } },
        },
      }));

      await FilterModel.bulkWrite(bulkOps);

      res.status(200).json({
        success: true,
        data: { message: 'Filter display orders updated successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const filterRouter = Router();

filterRouter.get('/', FilterController.getAll);
filterRouter.get('/:id', FilterController.getById);
filterRouter.post('/', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: createFilterSchema }), FilterController.create);
filterRouter.patch('/reorder', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: reorderSchema }), FilterController.reorder);
filterRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateFilterSchema }), FilterController.update);
filterRouter.delete('/:id', requireAuth, roleGuard(['admin', 'superadmin']), FilterController.delete);
