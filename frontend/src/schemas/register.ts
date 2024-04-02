import { config } from "../config";
import { z } from "zod";
import { validateEmail } from "@/utils/utils";

const { validations } = config.messages;

export const RegisterSchema = z
  .object({
    username: z
    .string({ required_error: validations.isRequired })
    .min(3, validations.string.isMinThenThree)
    .max(50, validations.string.isMoreThenFifty)
    .transform((value) => value.trim()),
    name: z
      .string()
      .min(3, validations.string.isMinThenThree)
      .max(50, validations.string.isMoreThenFifty)
      .optional(),
    email: z
      .string({ required_error: validations.isRequired })
      .refine(
        (value) => validateEmail(value),
        validations.string.isNotValidEmail
      )
      .transform((value) => value.toLowerCase())
      .transform((value) => value.trim()),
    password: z
      .string({ required_error: validations.isRequired })
      .refine(
        (value) => value.length >= 8,
        validations.string.isMinThanExpectedLength
      )
      .refine(
        (value) => value.length <= 20,
        validations.string.isNotMoreThanExpectedLength
      )
      .refine(
        (value) => /[A-Z]/.test(value),
        validations.passwordValidation.minimumOneLetterUpperCase
      )
      .refine(
        (value) => /[a-z]/.test(value),
        validations.passwordValidation.minimumOneLetterLowerCase
      )
      .refine(
        (value) => /\d/.test(value),
        validations.passwordValidation.minimumOneDigit
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        validations.passwordValidation.minimumOneSymbol
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialCharacterUpperCase
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialCharacterLowerCase
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialDigits
      )
      .transform((value) => value.trim()),
    confirmPassword: z
      .string({ required_error: validations.isRequired })
      .refine(
        (value) => value.length >= 8,
        validations.string.isMinThanExpectedLength
      )
      .refine(
        (value) => value.length <= 20,
        validations.string.isNotMoreThanExpectedLength
      )
      .refine(
        (value) => /[A-Z]/.test(value),
        validations.passwordValidation.minimumOneLetterUpperCase
      )
      .refine(
        (value) => /[a-z]/.test(value),
        validations.passwordValidation.minimumOneLetterLowerCase
      )
      .refine(
        (value) => /\d/.test(value),
        validations.passwordValidation.minimumOneDigit
      )
      .refine(
        (value) => /[^A-Za-z0-9]/.test(value),
        validations.passwordValidation.minimumOneSymbol
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialCharacterUpperCase
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialCharacterLowerCase
      )
      .refine(
        (value) => !/(.)\1\1/.test(value),
        validations.passwordValidation.lessThanTreeSequentialDigits
      )
      .transform((value) => value.trim()),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: validations.passwordValidation.isEqualPassword,
        path: ["confirmPassword"],
      });
    }
  });
