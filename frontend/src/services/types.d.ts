import type { AxiosError } from "axios";
import { routes } from "./router";

export type RoutesName = keyof typeof routes;

export type DefaultResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;
