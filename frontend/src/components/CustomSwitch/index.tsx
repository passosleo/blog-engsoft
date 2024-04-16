import React, { ReactElement } from "react";
import { ConnectForm } from "../ConnectForm";
import { iterateObject } from "@/utils/functions/object";
import { Controller, RegisterOptions } from "react-hook-form";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { twMerge } from "tailwind-merge";
import { SwitchProps } from "@radix-ui/react-switch";
import { useCustomSwitch } from "./hooks/useCustomSwitch";
import { Switch } from "../ui/switch";

export type CustomSwitchProps = SwitchProps & {
  label?: string;
  error?: string;
  hidden?: boolean;
  hideError?: boolean;
  rules?: RegisterOptions;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
  onLeftElementClick?: () => void;
  onRightElementClick?: () => void;
  customRef?: React.LegacyRef<HTMLInputElement>;
  containerClassName?: string;
};

export function CustomSwitch({
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
}: CustomSwitchProps) {
  const { inputRef } = useCustomSwitch({
    customRef,
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
            defaultValue={props.defaultChecked || false}
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
                  <label htmlFor={id} className="text-sm">
                    {label}
                  </label>
                )}
                {leftElement ? (
                  <span
                    onClick={onLeftElementClick || (() => {})}
                    className={onLeftElementClick ? "cursor-pointer" : ""}
                  >
                    {leftElement}
                  </span>
                ) : (
                  <></>
                )}
                <Switch
                  id={id}
                  ref={(e) => {
                    ref(e);
                    inputRef.current = e as React.LegacyRef<HTMLInputElement>;
                  }}
                  checked={fields.value}
                  onCheckedChange={fields.onChange}
                  {...fields}
                  {...props}
                />
                {rightElement ? (
                  <span
                    onClick={onRightElementClick || (() => {})}
                    className={onRightElementClick ? "cursor-pointer" : ""}
                  >
                    {rightElement}
                  </span>
                ) : (
                  <></>
                )}
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
