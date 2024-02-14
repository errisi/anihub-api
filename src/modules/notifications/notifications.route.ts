import express from 'express';
import * as userController from './notifications.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { catchError } from '../../utils/catchError';

const notificationsRouter = express.Router();

notificationsRouter.get(
  '/:id',
  authMiddleware,
  catchError(userController.getByUserId),
);

export { notificationsRouter };
