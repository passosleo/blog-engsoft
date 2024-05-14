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

export type Pagination<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type RequestWithPagination = {
  page: number;
  size: number;
  sort?: ("asc" | "desc")[];
};
