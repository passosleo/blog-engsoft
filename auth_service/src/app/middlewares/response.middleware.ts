import { Response, NextFunction, Request } from 'express';
import { HttpStatusCode, ResponseMessages } from '../http';
import { ServiceResult } from '../types/generic';

export async function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.sendResponse = (
    status: HttpStatusCode,
    { data, errors }: ServiceResult,
  ) => {
    res.status(status).json({
      status,
      message: ResponseMessages[status],
      data,
      errors,
    });
  };

  next();
}
