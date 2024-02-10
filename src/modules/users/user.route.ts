import express from 'express';
import * as userController from './user.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { catchError } from '../../utils/catchError';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, catchError(userController.get));
userRouter.get('/:id', catchError(userController.getOne));
userRouter.post('/register', catchError(userController.create));
userRouter.get(
  '/activate/:activationToken',
  catchError(userController.activate),
);
userRouter.post('/login', catchError(userController.login));
userRouter.patch('/:id', catchError(userController.update));
userRouter.delete('/:id', catchError(userController.remove));

export { userRouter };
