/* eslint-disable @typescript-eslint/no-explicit-any */

export const catchError = (action: any) => {
  return async function (req: any, res: any, next: any) {
    try {
      await action(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
