import React, { ReactElement } from "react";
import { useCustomInput } from "./hooks/useCustomInput";
import { iterateObject } from "@/utils/functions/object";
import { Controller, RegisterOptions } from "react-hook-form";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { twMerge } from "tailwind-merge";
import { Input, InputProps } from "../ui/input";
import { ConnectForm } from "../ConnectForm";

export type Props = InputProps & {
  label?: string;
  error?: string;
  hidden?: boolean;
  hideError?: boolean;
  rules?: RegisterOptions;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  preventEnterSubmit?: boolean;
  onLeftElementClick?: () => void;
  onRightElementClick?: () => void;
  customRef?: React.LegacyRef<HTMLInputElement>;
  containerClassName?: string;
};

export function CustomInput({
  preventEnterSubmit = true,
  onKeyDown: onKeyDownProp,
  containerClassName,
  customRef,
  hideError,
  error,
  rules,
  label,
  rightElement,
  leftElement,
  onLeftElementClick,
  onRightElementClick,
  ...props
}: Props) {
  const { inputRef, onKeyDown } = useCustomInput({
    customRef,
    preventEnterSubmit,
    onKeyDownProp,
  });
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
                  "flex flex-col gap-1",
                  props.hidden ? "hidden" : "",
                  containerClassName
                )}
              >
                {label && (
                  <label htmlFor={id} className="text-sm select-none">
                    {label}
                  </label>
                )}
                <div className="flex items-center gap-1">
                  {leftElement ? (
                    <span
                      onClick={onLeftElementClick || (() => {})}
                      className={twMerge(
                        "p-2 bg-primary rounded-sm border border-primary text-white hover:bg-primary/90 transition-all",
                        onLeftElementClick ? "cursor-pointer" : ""
                      )}
                    >
                      {leftElement}
                    </span>
                  ) : (
                    <></>
                  )}
                  <Input
                    id={id}
                    ref={(e) => {
                      ref(e);
                      inputRef.current = e as React.LegacyRef<HTMLInputElement>;
                    }}
                    onKeyDown={onKeyDown}
                    {...fields}
                    {...props}
                  />
                  {rightElement ? (
                    <span
                      onClick={onRightElementClick || (() => {})}
                      className={twMerge(
                        "p-2 bg-primary rounded-sm ml-1 border border-primary text-white hover:bg-primary/90 transition-all",
                        onRightElementClick ? "cursor-pointer" : ""
                      )}
                    >
                      {rightElement}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                {!hideError && (hasError || error) && (
                  <div data-testid="messageValidation">
                    <label className="text-red-500 text-xs">
                      {(hasError?.message || error) as string}
                    </label>
                  </div>
                )}
              </div>
            )}
          />
        );
      }}
    </ConnectForm>
  );
}
