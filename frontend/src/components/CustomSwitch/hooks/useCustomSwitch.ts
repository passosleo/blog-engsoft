import React, { MutableRefObject, useRef } from "react";

type Props = {
  customRef?: React.LegacyRef<HTMLInputElement>;
};

export function useCustomSwitch({ customRef }: Props) {
  const defaultRef = useRef<any | null>(null);

  const inputRef = (customRef || defaultRef) as MutableRefObject<any | null>;

  return { inputRef };
}
