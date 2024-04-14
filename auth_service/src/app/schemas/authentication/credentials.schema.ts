import { CredentialsDTO } from '../../../domain/dtos/authentication/credentials.dto';
import { RequestSchema } from '../../types/generic';
import { z } from 'zod';

export const CredentialsSchema: RequestSchema<CredentialsDTO> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
    password: z.string().min(8),
  },
};
