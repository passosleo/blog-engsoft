import { authenticationMiddleware } from './middlewares/authentication.middleware';
import { validationMiddleware } from './middlewares/validate.middleware';
import { responseMiddleware } from './middlewares/response.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { swaggerSpec } from '../config/swagger.config';
import { Application } from './app';
import { routes } from './routes';
import morgan from 'morgan';
import cors from 'cors';

const server = new Application({
  routes,
  swagger: {
    enabled: true,
    path: '/api/v1/docs',
    config: swaggerSpec,
  },
  middlewares: {
    global: [cors(), morgan('dev')],
    authentication: authenticationMiddleware,
    validation: validationMiddleware,
    response: responseMiddleware,
    error: errorMiddleware,
  },
});

server.start();
