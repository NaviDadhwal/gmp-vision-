import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import { ClientModel } from './client.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createClientSchema, updateClientSchema } from './client.schema';
import { reorderSchema } from '../products/product.schema';

export class ClientController {
  static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clients = await ClientModel.find({ isActive: true }).sort({ order: 1 });
      res.status(200).json({
        success: true,
        data: clients,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await ClientModel.create(req.body);
      res.status(201).json({
        success: true,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!client) {
        throw new AppError('Client record not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: client,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const client = await ClientModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!client) {
        throw new AppError('Client record not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: { message: 'Client logo disabled successfully.' },
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

      await ClientModel.bulkWrite(bulkOps);

      res.status(200).json({
        success: true,
        data: { message: 'Client logo wall display order updated.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const clientRouter = Router();

clientRouter.get('/', ClientController.getAll);
clientRouter.post('/', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: createClientSchema }), ClientController.create);
clientRouter.patch('/reorder', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: reorderSchema }), ClientController.reorder);
clientRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateClientSchema }), ClientController.update);
clientRouter.delete('/:id', requireAuth, roleGuard(['admin', 'superadmin']), ClientController.delete);
