import { config } from "../config";
import { z } from "zod"; 

const { isRequired } = config.messages.validations;

export const postSchema = z.object({
  title: z.string({ required_error: isRequired }),
  content: z.string({ required_error: isRequired }),
  category: z.string({ required_error: isRequired }),
  isPublic: z.boolean({ required_error: isRequired }),
});
