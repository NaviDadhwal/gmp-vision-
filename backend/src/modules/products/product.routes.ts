import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import { ProductModel } from './product.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createProductSchema, updateProductSchema, reorderSchema } from './product.schema';
import { paginateOffset, paginateCursor } from '../../utils/pagination';

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        divisionId,
        category,
        featured,
        search,
        mode = 'cursor',
        page = '1',
        limit = '12',
        cursor,
      } = req.query as Record<string, string>;

      const filter: Record<string, any> = { isActive: true };

      if (divisionId && Types.ObjectId.isValid(divisionId)) {
        filter.divisionId = new Types.ObjectId(divisionId);
      }
      if (category) {
        filter.category = category;
      }
      if (featured === 'true') {
        filter.isFeatured = true;
      }
      if (search) {
        filter.$text = { $search: search };
      }

      if (mode === 'offset') {
        const query = ProductModel.find(filter).sort({ order: 1, createdAt: -1 });
        const countQuery = ProductModel.countDocuments(filter);
        const result = await paginateOffset(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
        res.status(200).json(result);
        return;
      }

      // Default: Cursor-based pagination for public feeds
      const result = await paginateCursor(
        { model: ProductModel, ...filter },
        cursor,
        parseInt(limit, 10),
        '_id',
        -1
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductModel.findOne({ slug: req.params.slug, isActive: true }).populate('divisionId');
      if (!product) {
        throw new AppError('Product not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) {
        throw new AppError('Product not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await ProductModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!product) {
        throw new AppError('Product not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: { message: 'Product disabled successfully.' },
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

      await ProductModel.bulkWrite(bulkOps);

      res.status(200).json({
        success: true,
        data: { message: 'Product display orders updated successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productRouter = Router();

productRouter.get('/', ProductController.getAll);
productRouter.get('/:slug', ProductController.getBySlug);
productRouter.post('/', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: createProductSchema }), ProductController.create);
productRouter.patch('/reorder', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: reorderSchema }), ProductController.reorder);
productRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateProductSchema }), ProductController.update);
productRouter.delete('/:id', requireAuth, roleGuard(['admin', 'superadmin']), ProductController.delete);
