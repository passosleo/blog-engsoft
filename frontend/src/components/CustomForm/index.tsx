import React from "react";
import { useCustomForm } from "./hooks/useCustomForm";
import {
  FieldValues,
  FormProvider,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { ZodSchema } from "zod";
import { twMerge } from "tailwind-merge";

type Props<T extends FieldValues> = {
  onSubmit: (data: T, hookFormMethods: UseFormReturn<T>) => void;
  useFormProps?: Omit<UseFormProps<Partial<T>>, "resolver">;
  children: React.ReactNode;
  zodSchema?: ZodSchema<Partial<T>>;
  resetOnSubmit?: boolean;
  className?: string;
};

export function CustomForm<T extends FieldValues>({
  onSubmit: onSubmitProp,
  zodSchema,
  children,
  useFormProps,
  className,
  resetOnSubmit = false,
}: Props<T>) {
  const { methods } = useCustomForm<T>({ onSubmit, useFormProps, zodSchema });

  function onSubmit(data: T, hookFormMethods: UseFormReturn<T>) {
    onSubmitProp(data, hookFormMethods);
    if (resetOnSubmit) methods.reset(undefined, { keepIsSubmitted: false });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      methods.handleSubmit((data) => onSubmit(data, methods))();
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        className={twMerge("flex w-full flex-col gap-3", className)}
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods))}
        onKeyDown={onKeyDown}
      >
        {children}
      </form>
    </FormProvider>
  );
}
