import express from 'express';
import * as notificationController from '../controllers/notifications.controller';
// import { authMiddleware } from '../../middlewares/authMiddleware';
import { catchError } from '../utils/catchError';

const notificationsRouter = express.Router();

notificationsRouter.post('/', catchError(notificationController.postForAll));

notificationsRouter.patch('/:id', catchError(notificationController.update));

notificationsRouter.post(
  '/:id',
  catchError(notificationController.postByUserId),
);

notificationsRouter.get('/:id', catchError(notificationController.getByUserId));

export { notificationsRouter };
