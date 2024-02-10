/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorMiddleware = (error: any, req: any, res: any, next: any) => {
  if (error) {
    res.statusCode = 500;

    res.send({
      message: 'Server error',
    });
  }

  next();
};
