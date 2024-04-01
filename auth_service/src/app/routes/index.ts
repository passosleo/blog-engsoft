import { CreateClientController } from '../controllers/create-client.controller';
import { CreateClientSchema } from '../schemas/client/create-client.schema';
import { Route } from '../types/generic';

export const routes: Route[] = [
  {
    path: '/api/v1/clients',
    method: 'POST',
    schema: CreateClientSchema,
    controller: CreateClientController.execute,
  },
];
