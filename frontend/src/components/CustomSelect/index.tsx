import React from "react";
import { ConnectForm } from "../ConnectForm";
import { iterateObject } from "@/utils/functions/object";
import { Controller, RegisterOptions } from "react-hook-form";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { twMerge } from "tailwind-merge";

import { SelectProps } from "@radix-ui/react-select";
import { useCustomSelect } from "./hooks/useCustomSelect";
import { Option } from "@/types/generic";

export type CustomSelectProps = SelectProps & {
  options: Option[];
  placeholder?: string;
  optionsLabel?: string;
  id?: string;
  label?: string;
  error?: string;
  hidden?: boolean;
  hideError?: boolean;
  rules?: RegisterOptions;
  customRef?: React.LegacyRef<HTMLSelectElement>;
  containerClassName?: string;
  className?: string;
  optionClassName?: string;
};

import "./global.css";

export function CustomSelect({
  className,
  optionClassName,
  options,
  optionsLabel,
  placeholder,
  containerClassName,
  customRef,
  hideError,
  error,
  rules,
  label,
  ...props
}: CustomSelectProps) {
  const { selectRef } = useCustomSelect({ customRef });
  return (
    <ConnectForm>
      {({ control, formState }) => {
        const id = props.id || props.name || "input";
        const idParts = id.split(".");
        const { errors } = formState;
        const hasError = iterateObject<ErrorHookForm>(
          idParts,
          errors as ErrorsHookForm
        );
        return (
          <Controller
            defaultValue={props.defaultValue || ""}
            control={control}
            rules={rules}
            name={id}
            render={({ field: { ref, ...fields } }) => (
              <div
                className={twMerge(
                  "flex flex-col",
                  props.hidden ? "hidden" : "",
                  containerClassName
                )}
              >
                {label && (
                  <label htmlFor={id} className="text-sm">
                    {label}
                  </label>
                )}
                <select
                  id={id}
                  {...fields}
                  className={twMerge(
                    "h-10 focus:outline-none px-3 text-sm text-[#71717A] bg-black rounded-sm border border-input",
                    className
                  )}
                >
                  <option value="" key="-1">
                    Selecionar
                  </option>
                  {options.map((option, index) => (
                    <option
                      key={option.key || index || option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div data-testid="messageValidation" className="h-6">
                  {!hideError && (hasError || error) && (
                    <label className="text-red-500 text-xs">
                      {(hasError?.message || error) as string}
                    </label>
                  )}
                </div>
              </div>
            )}
          />
        );
      }}
    </ConnectForm>
  );
}
