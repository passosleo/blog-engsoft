import express, { Express, RequestHandler } from 'express';
import { ILogger, Logger } from './plugins/logger.plugin';
import {
  ApplicationConfig,
  ApplicationMiddlewares,
  ApplicationOptions,
  Route,
} from './types/generic';
import { config } from '../config/app.config';
import { DbContext } from './data/db-context';
import swaggerUi from 'swagger-ui-express';

export class Application {
  private readonly app: Express;
  private readonly config: ApplicationConfig;
  private readonly routes: Route[];
  private readonly middlewares: ApplicationMiddlewares;
  private readonly logger: ILogger;

  constructor({
    name = config.app.name,
    host = config.app.host,
    port = config.app.port,
    baseUrl = config.app.baseUrl,
    swagger,
    routes = [],
    middlewares = {},
  }: ApplicationOptions) {
    this.app = express();
    this.config = {
      name,
      host,
      port,
      baseUrl,
      swagger,
    };
    this.logger = new Logger({ context: 'bootstrap' });
    this.routes = routes;
    this.middlewares = middlewares;

    this.initialize();
  }

  private initialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    if (this.config.swagger?.enabled) {
      this.app.use(
        this.config.swagger.path,
        swaggerUi.serve,
        swaggerUi.setup(this.config.swagger.config),
      );
    }

    if (this.middlewares.global) {
      this.app.use(this.middlewares.global);
    }

    if (this.middlewares.response) {
      this.app.use(this.middlewares.response);
    }

    this.setupRoutes();

    if (this.middlewares.error) {
      this.app.use(this.middlewares.error);
    }
  }

  private setupRoutes() {
    this.routes.forEach((route) => {
      const routeMiddlewaresList = new Array<RequestHandler>();

      if (route.auth) {
        if (this.middlewares.authentication) {
          routeMiddlewaresList.push(this.middlewares.authentication);
        } else {
          this.logger.warn(
            `Route "${route.path}" requires authentication but no auth middleware is provided`,
          );
        }
      }

      if (route.schema) {
        if (this.middlewares.validation) {
          routeMiddlewaresList.push(this.middlewares.validation(route.schema));
        } else {
          this.logger.warn(
            `Route "${route.path}" requires validation but no validation middleware is provided`,
          );
        }
      }

      if (route.middlewares) {
        routeMiddlewaresList.push(...route.middlewares);
      }

      this.app[route.method.toLowerCase() as keyof Express](
        route.path,
        routeMiddlewaresList,
        route.controller,
      );

      this.logger.info(
        `Route ${route.method} ${route.path} successfully registered`,
      );
    });
  }

  start({ port = this.config.port } = {}) {
    DbContext.checkConnection().then(() => {
      this.logger.info('Application is ready to start');

      this.app.listen(port, () => {
        this.logger.info(
          `Application ${this.config.name ?? ''} successfully started on ${
            this.config.baseUrl
          }`,
        );

        if (this.config.swagger?.enabled) {
          this.logger.info(
            `Swagger is available under ${this.config.baseUrl}${this.config.swagger.path}`,
          );
        }
      });
    });
  }

  stop() {
    this.logger.info('Shutting down application...');
    process.exit(0);
  }
}
