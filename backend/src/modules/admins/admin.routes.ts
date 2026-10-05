import { Router } from 'express';
import { AdminController } from './admin.controller';
import { requireAuth } from '../../middleware/requireAuth';
import { roleGuard } from '../../middleware/roleGuard';
import { validate } from '../../middleware/validate';
import { createAdminSchema, updateAdminSchema } from './admin.schema';

export const adminRouter = Router();

// Strictly restricted to superadmin role
adminRouter.use(requireAuth, roleGuard(['superadmin']));

adminRouter.get('/', AdminController.list);
adminRouter.post('/', validate({ body: createAdminSchema }), AdminController.create);
adminRouter.patch('/:id', validate({ body: updateAdminSchema }), AdminController.update);
adminRouter.delete('/:id', AdminController.delete);
