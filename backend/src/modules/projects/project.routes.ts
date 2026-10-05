import { Request, Response, NextFunction, Router } from 'express';
import { Types } from 'mongoose';
import { ProjectModel } from './project.model';
import { AppError } from '../../middleware/errorHandler';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createProjectSchema, updateProjectSchema } from './project.schema';
import { reorderSchema } from '../products/product.schema';
import { paginateOffset, paginateCursor } from '../../utils/pagination';

export class ProjectController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        division,
        featured,
        mode = 'cursor',
        page = '1',
        limit = '9',
        cursor,
      } = req.query as Record<string, string>;

      const filter: Record<string, any> = { isActive: true };

      if (division && division !== 'All') {
        filter.division = division;
      }
      if (featured === 'true') {
        filter.isFeatured = true;
      }

      if (mode === 'offset') {
        const query = ProjectModel.find(filter).sort({ order: 1, createdAt: -1 });
        const countQuery = ProjectModel.countDocuments(filter);
        const result = await paginateOffset(query, countQuery, parseInt(page, 10), parseInt(limit, 10));
        res.status(200).json(result);
        return;
      }

      const result = await paginateCursor(
        { model: ProjectModel, ...filter },
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

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectModel.findOne({ _id: req.params.id, isActive: true });
      if (!project) {
        throw new AppError('Project case study not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectModel.create(req.body);
      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!project) {
        throw new AppError('Project case study not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const project = await ProjectModel.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!project) {
        throw new AppError('Project case study not found.', 404, 'NOT_FOUND');
      }
      res.status(200).json({
        success: true,
        data: { message: 'Project reference disabled successfully.' },
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

      await ProjectModel.bulkWrite(bulkOps);

      res.status(200).json({
        success: true,
        data: { message: 'Project display orders updated successfully.' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const projectRouter = Router();

projectRouter.get('/', ProjectController.getAll);
projectRouter.get('/:id', ProjectController.getById);
projectRouter.post('/', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: createProjectSchema }), ProjectController.create);
projectRouter.patch('/reorder', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: reorderSchema }), ProjectController.reorder);
projectRouter.patch('/:id', requireAuth, roleGuard(['admin', 'superadmin']), validate({ body: updateProjectSchema }), ProjectController.update);
projectRouter.delete('/:id', requireAuth, roleGuard(['admin', 'superadmin']), ProjectController.delete);
