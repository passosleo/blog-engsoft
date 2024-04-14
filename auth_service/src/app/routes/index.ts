import { AuthenticationController } from '../controllers/authentication/authentication.controller';
import { CredentialsSchema } from '../schemas/authentication/credentials.schema';
import { CreateAccountSchema } from '../schemas/account/create-account.schema';
import { AccountController } from '../controllers/account/account.controller';
import { Route } from '../types/generic';

export const routes: Route[] = [
  {
    path: '/api/v1/account',
    method: 'POST',
    schema: CreateAccountSchema,
    controller: AccountController.createAccount,
  },
  {
    path: '/api/v1/account',
    method: 'GET',
    auth: true,
    controller: AccountController.getAccount,
  },
  {
    path: '/api/v1/authenticate',
    method: 'POST',
    schema: CredentialsSchema,
    controller: AuthenticationController.authenticate,
  },
  {
    path: '/api/v1/validate-token',
    method: 'POST',
    auth: true,
    controller: AuthenticationController.validateToken,
  },
];
