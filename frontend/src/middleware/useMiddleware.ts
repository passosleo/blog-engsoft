import Axios, { AxiosRequestConfig } from "axios";
import { Params, RoutesName } from "../services/types";
import { HOST, routes } from "../services/router";
import { setRequestAuth } from "@/src/utils/functions/request";
import { mountUrl } from "@/src/utils/functions/url";

type RequestAxiosProps<PayloadType> = {
  config?: AxiosRequestConfig;
  routeName: RoutesName;
  payload?: PayloadType;
  withAuth?: boolean;
  params?: Params;
  query?: Params;
};

export function useMiddleware() {
  async function requestAxios<ResponseType, PayloadType>({
    config = {},
    routeName,
    payload,
    params,
    query,
  }: RequestAxiosProps<PayloadType>) {
    const { method, uri, listenHeaders } = routes[routeName] as unknown as {
      listenHeaders?: string[];
      method: string;
      uri: string;
    };

    const request = Axios.create({
      ...config,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        ...((config?.headers ?? {}) as Record<string, string>),
      },
    });
    const urlWithParams = mountUrl(uri, HOST, params, query);

    if (!!listenHeaders && listenHeaders.includes("Authorization"))
      await setRequestAuth(request);

    switch (method) {
      case "GET":
        return request.get<ResponseType>(urlWithParams);
      case "POST":
        return request.post<ResponseType>(urlWithParams, payload);
      case "PUT":
        return request.put<ResponseType>(urlWithParams, payload);
      case "PATCH":
        return request.patch<ResponseType>(urlWithParams, payload);
      case "DELETE":
        return request.delete<ResponseType>(urlWithParams);
      default:
        return request.get<ResponseType>(urlWithParams);
    }
  }

  return { requestAxios };
}
