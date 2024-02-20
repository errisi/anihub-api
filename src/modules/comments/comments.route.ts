import express from 'express';
import * as commentsController from './comments.controller';
import { catchError } from '../../utils/catchError';

const commentsRouter = express.Router();

commentsRouter.post('/', catchError(commentsController.create));
commentsRouter.post('/:id', catchError(commentsController.getAllByAnimeId));
commentsRouter.patch('/:id', catchError(commentsController.update));
commentsRouter.delete('/:id', catchError(commentsController.remove));

export { commentsRouter };
