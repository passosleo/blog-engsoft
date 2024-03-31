import * as log4js from 'log4js';
import { LoggerOptions } from '../types/generic';

export interface ILogger {
  debug(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  trace(message: any, ...args: any[]): void;
}

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
      },
    },
    file: {
      type: 'fileSync',
      filename: './logs/app.log',
      layout: {
        type: 'pattern',
        pattern: '[%d{dd-MM-yyyy - hh:mm:ss.SSS}] [%p] %c - %m',
      },
      maxLogSize: 10485760, // 10MB
      backups: 3,
    },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'debug' },
  },
});

export class Logger implements ILogger {
  private readonly logger: log4js.Logger;

  constructor({ context = 'default', level = 'debug' }: LoggerOptions) {
    this.logger = log4js.getLogger(context);
    this.logger.level = level;
  }

  debug(message: any, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  info(message: any, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  warn(message: any, ...args: any[]) {
    this.logger.warn(message, ...args);
  }

  error(message: any, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  trace(message: any, ...args: any[]) {
    this.logger.trace(message, ...args);
  }
}
