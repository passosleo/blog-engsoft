import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './app.config';
import { version, description } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: config.app.name,
      version,
      description,
    },
    servers: [
      {
        url: config.app.baseUrl,
      },
    ],
    consumes: ['application/json'],
    produces: ['application/json'],
    schemes: ['http'],
  },
  apis: ['src/**/*.{ts,js}'],
};

export const swaggerSpec = swaggerJsdoc(options);
