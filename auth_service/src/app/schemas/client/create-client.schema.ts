import { z } from 'zod';
import { RequestSchema } from '../../types/generic';

export const CreateClientSchema: RequestSchema<any> = {
  body: {
    name: z
      .string()
      .min(3)
      .max(255)
      .transform((v) => v.trim().toLowerCase().replace(/\s/g, '-')),
    description: z.string().max(255).optional(),
    isEnabled: z.boolean().optional(),
  },
};
