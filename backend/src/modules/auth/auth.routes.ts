import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate';
import { loginSchema } from './auth.schema';
import { requireAuth } from '../../middleware/requireAuth';

export const authRouter = Router();

authRouter.post('/login', validate({ body: loginSchema }), AuthController.login);
authRouter.post('/refresh', AuthController.refresh);
authRouter.post('/logout', requireAuth, AuthController.logout);
authRouter.get('/me', requireAuth, AuthController.getMe);
