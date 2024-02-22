import express from 'express';
import * as commentsController from '../controllers/comments.controller';
import { catchError } from '../utils/catchError';

const commentsRouter = express.Router();

commentsRouter.post('/:animeId', catchError(commentsController.create));
commentsRouter.get('/:animeId', catchError(commentsController.getAllByAnimeId));
commentsRouter.patch('/:id', catchError(commentsController.update));
commentsRouter.delete('/:id', catchError(commentsController.remove));

export { commentsRouter };
