import { config } from "../config";
import { z } from "zod";

const { isRequired } = config.messages.validations;
const { validations } = config.messages;

function isEmptyString(value: string) {
  return value.trim() === "";
}

export const postSchema = z.object({
  title: z
    .string({ required_error: isRequired })
    .min(3, validations.string.isMinThenThree)
    .max(50, validations.string.isMoreThenFifty),
  content: z.string({ required_error: isRequired }).min(3, validations.string.isMinThenThree),
  category: z.string().refine((value) => !isEmptyString(value), {
    message: isRequired, 
  }),
  isPublic: z.boolean({ required_error: isRequired }),
});
