import { z } from 'zod';
import { RequestSchema } from '../../types/generic';

export const CreateAccountSchema: RequestSchema<any> = {
  body: {
    email: z.string().email().max(255).trim().toLowerCase(),
    password: z.string().min(8).max(255),
    username: z.string().min(3).max(50).trim().toLowerCase(),
    name: z.string().min(3).max(50).trim().toUpperCase(),
  },
};
