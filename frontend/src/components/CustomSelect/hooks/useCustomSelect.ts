import React, { MutableRefObject, useRef } from "react";

type Props = {
  customRef?: React.LegacyRef<HTMLSelectElement>;
};

export function useCustomSelect({ customRef }: Props) {
  const defaultRef = useRef<any | null>(null);

  const selectRef = (customRef || defaultRef) as MutableRefObject<any | null>;

  return { selectRef };
}
