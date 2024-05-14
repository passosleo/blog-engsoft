import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  UseFormProps,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type Props<T extends FieldValues> = {
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  onSubmit: (data: T, hookFormMethods: UseFormReturn<T>) => void;
  zodSchema?: z.ZodSchema<any>;
};

export function useCustomForm<T extends FieldValues>({
  useFormProps,
  zodSchema,
}: Props<T>) {
  const methods = useForm<z.infer<typeof zodSchema | any>>({
    reValidateMode: "onChange",
    ...useFormProps,
    resolver: zodResolver(zodSchema || z.object({})),
  });

  return { methods };
}
