import type { AxiosError } from "axios";
import { routes } from "./router";

export type RoutesName = keyof typeof routes;

export type DefaultResponse = {
  status: number;
  message: string;
};

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;
