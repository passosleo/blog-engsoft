import { SVGProps } from "react";
import { colors } from "@/frontend/theme/colors";

export type NextContext<T = any> = {
  params: T;
};

export type Routes = {
  [key: string]: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    uri: string;
    listenHeaders?: string[];
    headers?: { [key: string]: string };
  };
};

export type ColorNotation =
  | `${keyof typeof colors}.${keyof (typeof colors)[keyof typeof colors]}`
  | keyof typeof colors;

export type Option = {
  key?: string | number;
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
};
