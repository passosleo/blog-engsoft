import { ErrorRequestHandler, RequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Schema } from 'zod';

export interface RequestSchema<T = any> {
  body?: { [K in keyof Partial<T>]: Schema<T[K]> };
  query?: { [K in keyof Partial<T>]: Schema<T[K]> };
  params?: { [K in keyof Partial<T>]: Schema<T[K]> };
}

export type Route = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  auth?: boolean;
  schema?: RequestSchema;
  middlewares?: RequestHandler[];
  controller: RequestHandler;
};

export type SwaggerConfig =
  | {
      enabled?: true;
      path: string;
      config: swaggerUi.JsonObject;
    }
  | {
      enabled?: false;
      path?: string;
      config?: swaggerUi.JsonObject;
    };

export type ApplicationConfig = {
  port?: number;
  host?: string;
  name?: string;
  baseUrl?: string;
  swagger?: SwaggerConfig;
};

export type ApplicationMiddlewares = {
  global?: RequestHandler[];
  authentication?: RequestHandler;
  error?: ErrorRequestHandler;
  validation?: (schema: RequestSchema) => RequestHandler;
  response?: RequestHandler;
};

export type ApplicationOptions = ApplicationConfig & {
  routes: Route[];
  middlewares?: ApplicationMiddlewares;
};

export type LoggerOptions = {
  level?: string;
  context?: string;
};

export interface DefaultError {
  message: string;
  [key: string]: any;
}

export interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  errors?: DefaultError[];
}
