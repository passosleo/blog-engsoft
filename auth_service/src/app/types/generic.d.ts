import { RequestHandler } from 'express';
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

export type ApplicationConfig = {
  port?: number | string;
  host?: string;
  name?: string;
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
