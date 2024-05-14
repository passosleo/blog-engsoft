import { config } from "../config";
import { z } from "zod";
import { validateEmail } from "@/utils/utils";

const { isRequired } = config.messages.validations;

export const loginSchema = z.object({
  email: z
    .string({ required_error: isRequired })
    .refine((value) => validateEmail(value), "Insira um e-mail válido")
    .transform((value) => value.toLowerCase()),
  password: z
    .string({ required_error: isRequired })
    .nonempty("Insira uma senha"),
});
