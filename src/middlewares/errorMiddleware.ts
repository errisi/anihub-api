/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '../exeptions/api.error';

export const errorMiddleware = (error: any, req: any, res: any, next: any) => {
  if (error instanceof ApiError) {
    res.status(error.status).send({
      message: error.message,
      errors: error.errors,
    });
  } else {
    res.status(500).send({
      message: `Server error: ${error}`,
    });
  }

  next();
};
