import { NextFunction, Request, Response } from 'express';
import { RequestSchema } from '../types/generic';
import { ZodIssue, z } from 'zod';
import { HttpStatusCode } from '../http';

export function validationMiddleware<T>(schema: RequestSchema<T>) {
  function createZodSchema<T>(requestSchema: RequestSchema<T>) {
    return z.object({
      body: requestSchema.body ? z.object(requestSchema.body) : z.unknown(),
      query: requestSchema.query ? z.object(requestSchema.query) : z.unknown(),
      params: requestSchema.params
        ? z.object(requestSchema.params)
        : z.unknown(),
    });
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const data = {
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const zodSchema = createZodSchema(schema);
    const validation = zodSchema.safeParse(data);

    if (validation.success) {
      req.body = validation.data.body;
      req.query = validation.data.query as Record<string, string>;
      req.params = validation.data.params as Record<string, string>;

      next();
    } else {
      return res.sendResponse(HttpStatusCode.BAD_REQUEST, {
        success: false,
        errors: JSON.parse(validation.error.message) as ZodIssue[],
      });
    }
  };
}
