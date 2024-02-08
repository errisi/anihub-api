import express from 'express';
import * as userController from './user.controller';

const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getOne);

export { userRouter };
