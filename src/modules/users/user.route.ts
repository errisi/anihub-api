import express from 'express';
import * as userController from './user.controller';

const userRouter = express.Router();

userRouter.get('/', userController.get);
userRouter.get('/:id', userController.getOne);
userRouter.post('/register', userController.create);
userRouter.get('/activate/:activationToken', userController.activate);
userRouter.patch('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export { userRouter };
