import { NextFunction, Request, Response } from 'express';
import { Controller } from '../typedefs';

export const catchError = (action: Controller) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
