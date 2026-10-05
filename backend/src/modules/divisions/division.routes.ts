import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import { DivisionModel } from './division.model';
import { ProductModel } from '../products/product.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createDivisionSchema, updateDivisionSchema } from './division.schema';

export class DivisionController {
  static async getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const divisions = await DivisionModel.find({ isActive: true }).sort({ number: 1 });
      res.status(200).json({
        success: true,
        data: divisions,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const division = await DivisionModel.findOne({ slug: req.params.slug, isActive: true });
      if (!division) {
        throw new AppError('Division not found.', 404, 'NOT_FOUND');
      }

      // Fetch associated equipment/products under this division
      const products = await ProductModel.find({ divisionId: division._id, isActive: true }).sort({ order: 1 });

      res.status(200).json({
        success: true,
        data: {
          division,
          products,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const division = await DivisionModel.create(req.body);
      res.status(201).json({
        success: true,
        data: division,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idOrSlug = req.params.id as string;
      const query = Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
      const division = await DivisionModel.findOneAndUpdate(query, req.body, { returnDocument: 'after' });
      if (!division) {
        throw new AppError('Division not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: division,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const idOrSlug = req.params.id as string;
      const query = Types.ObjectId.isValid(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
      const division = await DivisionModel.findOneAndUpdate(query, { isActive: false }, { returnDocument: 'after' });
      if (!division) {
        throw new AppError('Division not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: { message: 'Division disabled successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const divisionRouter = Router();

divisionRouter.get('/', DivisionController.getAll);
divisionRouter.get('/:slug', DivisionController.getBySlug);
divisionRouter.post('/', requireAuth, roleGuard(['superadmin']), validate({ body: createDivisionSchema }), DivisionController.create);
divisionRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateDivisionSchema }), DivisionController.update);
divisionRouter.delete('/:id', requireAuth, roleGuard(['superadmin']), DivisionController.delete);
