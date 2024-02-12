import express from 'express';
import * as userController from './user.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { catchError } from '../../utils/catchError';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, catchError(userController.get));
userRouter.get('/refresh', catchError(userController.refresh));
userRouter.post('/register', catchError(userController.create));
userRouter.post('/login', catchError(userController.login));
userRouter.get(
  '/activate/:activationToken',
  catchError(userController.activate),
);
userRouter.get('/:id', catchError(userController.getOne));
userRouter.patch('/:id', catchError(userController.update));
userRouter.delete('/:id', catchError(userController.remove));

export { userRouter };
