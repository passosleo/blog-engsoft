import { z } from 'zod';
import { RequestSchema } from '../../types/generic';

export const CreateAccountSchema: RequestSchema<any> = {
  body: {
    name: z.string().min(3).max(50).trim().toUpperCase(),
    email: z.string().email().max(255).trim().toLowerCase(),
    password: z.string().min(8).max(255),
  },
};
