import { Request, Response, NextFunction } from 'express';
import { Logger } from '../plugins/logger.plugin';
import { Exception, HttpStatusCode, ResponseMessages } from '../http';
import { DefaultError } from '../types/generic';

export async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger({ context: 'error-handler' });
  const { method, path, params, query, body } = req;

  const ctx = {
    method,
    path,
    params,
    query,
    body,
    error: JSON.stringify(error.stack),
  };

  if (error instanceof Exception) {
    if (error.statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR) {
      logger.error(ctx);
    }

    return res.sendResponse(error.statusCode, {
      success: false,
      errors: [
        {
          message: error.message,
        },
      ],
    });
  } else {
    logger.error(ctx);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      message: ResponseMessages[HttpStatusCode.INTERNAL_SERVER_ERROR],
      errors: [
        {
          message: 'Something went wrong',
        },
        {
          message: 'An unexpected error occurred. Please try again later.',
        },
      ] as DefaultError[],
    });
  }
}
