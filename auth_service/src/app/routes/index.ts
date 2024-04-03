import { AccountController } from '../controllers/account/account.controller';
import { CreateAccountSchema } from '../schemas/account/create-account.schema';
import { Route } from '../types/generic';

export const routes: Route[] = [
  {
    path: '/api/v1/account',
    method: 'POST',
    schema: CreateAccountSchema,
    controller: AccountController.createAccount,
  },
];
