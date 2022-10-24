import HttpException from '../common/http-exceptions';
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  res.status(status).send({ status, message });
};
