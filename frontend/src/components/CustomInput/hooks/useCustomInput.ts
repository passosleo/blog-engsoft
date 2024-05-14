import React, { MutableRefObject, useRef } from "react";

type Props = {
  onKeyDownProp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  customRef?: React.LegacyRef<HTMLInputElement>;
  preventEnterSubmit: boolean;
};

export function useCustomInput({
  customRef,
  preventEnterSubmit,
  onKeyDownProp,
}: Props) {
  const defaultRef = useRef<any | null>(null);

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (preventEnterSubmit && event.key === "Enter") {
      event.preventDefault();
      if (onKeyDownProp) onKeyDownProp(event);
    }
  }

  const inputRef = (customRef || defaultRef) as MutableRefObject<any | null>;

  return { inputRef, onKeyDown };
}
