import { Request, Response, NextFunction } from 'express';
import multer, { MulterError } from 'multer';
import { ApiError } from '../exeptions/api.error';

export const errorMiddleware = (
  error: Error | ApiError | MulterError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    });
  }

  if (error instanceof multer.MulterError) {
    res.status(400).json({
      message: error.message,
    });
  }

  res.status(500).send({
    message: `Server error: ${error}`,
  });

  next();
};
