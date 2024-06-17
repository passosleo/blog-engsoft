import { config } from "../config";
import { z } from "zod";

const { isRequired } = config.messages.validations;
const { validations } = config.messages;

function validarConteudo(value: string) {
  const regex = /<[^>]*>([^<]+)<\/[^>]*>/g;

  let match;
  let valido = true;

  while ((match = regex.exec(value)) !== null) {
    if (match[1].trim().length <= 3) {
      valido = false;
      break;
    }
  }

  return valido;
}

export const updatePostSchema = z.object({
  title: z
    .string({ required_error: isRequired })
    .min(3, validations.string.isMinThenThree)
    .max(50, validations.string.isMoreThenFifty),
  content: z
    .string({ required_error: isRequired })
    .min(3, validations.string.isMinThenThree)
    .refine(
      (value) => {
        if (
          value === "<p><br></p>" ||
          value === "<h1><br></h1>" ||
          value === "<h2><br></h2>" ||
          value === "<h3><br></h3>"
        ) {
          return false;
        }
        return true;
      },
      { message: isRequired }
    )
    .refine((value) => validarConteudo(value), {
      message: "O conteúdo deve ter mais que 3 caracteres",
    }),
  categoryId: z
    .string({ required_error: isRequired })
    .uuid({ message: isRequired }),
  isPublic: z.boolean({ required_error: isRequired }),
});
