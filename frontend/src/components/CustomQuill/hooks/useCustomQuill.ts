import React, { MutableRefObject, useRef } from "react";

type Props = {
  onKeyDownProp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  customRef?: React.LegacyRef<HTMLInputElement>;
  preventEnterSubmit: boolean;
};

export function useCustomQuill({
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

  const quillRef = (customRef || defaultRef) as MutableRefObject<any | null>;

  return { quillRef, onKeyDown };
}
