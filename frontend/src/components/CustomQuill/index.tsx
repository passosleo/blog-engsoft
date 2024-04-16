import React, { ReactElement } from "react";

import dynamic from "next/dynamic";

import "./styles.css";
import { ConnectForm } from "../ConnectForm";
import { ErrorHookForm, ErrorsHookForm } from "@/types/react-hook-form";
import { Controller, RegisterOptions } from "react-hook-form";
import { iterateObject } from "@/utils/functions/object";
import { InputProps } from "../ui/input";
import { useCustomQuill } from "./hooks/useCustomQuill";
import {ReactQuillProps} from 'react-quill'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export type Props = ReactQuillProps & {
  label?: string;
  error?: string;
  hidden?: boolean;
  hideError?: boolean;
  rules?: RegisterOptions;
  preventEnterSubmit?: boolean;
  onLeftElementClick?: () => void;
  onRightElementClick?: () => void;
  customRef?: React.LegacyRef<ReactQuillProps>;
  containerClassName?: string;
};

export function CustomQuill({
  preventEnterSubmit = true,
  onKeyDown: onKeyDownProp,
  containerClassName,
  customRef,
  hideError,
  error,
  rules,
  label,
  onLeftElementClick,
  onRightElementClick,
  ...props
}: Props) {
  return (
    <ConnectForm>
      {({ control, formState }) => {
        const id = props.id /* || props.name  */|| "quill";
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
              <div>
                {label && (
                  <label htmlFor={id} className="text-sm select-none">
                    {label}
                  </label>
                )}
                <ReactQuill
                  id={id}
                  /* ref={(e) => {
                    ref(e);
                    quillRef.current = e as React.LegacyRef<HTMLInputElement>;
                  }} */
                  {...fields}
                  {...props}
                />
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
