import { useEffect, useRef, useState } from "react";
import { hosts, routes } from "../router";
import { DefaultResponse } from "../types";
import { useCookies } from "@/hooks/useCookies";
import { toast } from "@/components/ui/use-toast";

type UrlParam = Record<string, string | string[] | number | number[]>;

type Options<Payload, Response> = {
  host: keyof typeof hosts;
  routeName: keyof typeof routes;
  enabled?: boolean;
  payload?: {
    params?: UrlParam;
    query?: UrlParam;
    body?: Payload;
  };
  dependencies?: unknown[];
  onSuccess?: (res: DefaultResponse<Response>) => void;
  onError?: (error: { status: number; message: string }) => void;
  headers?: Record<string, string>;
  notHandleError?: boolean;
};

export function useRequest<Payload, Response>({
  host,
  routeName,
  enabled = true,
  notHandleError,
  dependencies = [],
  headers: headersDefault,
  payload: payloadDefault,
  onSuccess: onSuccessDefault,
  onError: onErrorDefault,
}: Options<Payload, Response>) {
  const { getCookie } = useCookies();
  const [requestState, setRequestState] = useState<{
    isLoading: boolean;
    data: Response | null;
    error: { status: number; message: string } | null;
  }>({
    isLoading: false,
    data: null,
    error: null,
  });

  const {
    method,
    uri,
    listenHeaders,
    headers: definedHeaders,
  } = routes[routeName] as unknown as {
    listenHeaders?: string[];
    headers?: Record<string, string>;
    method: string;
    uri: string;
  };

  function useFirstRender() {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
  }

  function replaceParams(url: string, params: UrlParam) {
    const urlWithParams = Object.entries(params).reduce((acc, [key, value]) => {
      return acc.split(`:${key}`).join(value.toString());
    }, url);
    return urlWithParams;
  }

  function mountUrl(
    url: string,
    baseUrl: string,
    params?: UrlParam,
    query?: UrlParam
  ) {
    const urlApi = baseUrl;
    const urlWithParams = params ? replaceParams(url, params) : url;
    const queryString = query
      ? "?" + new URLSearchParams(query as Record<string, string>).toString()
      : "";

    const completedUrl = urlApi + urlWithParams + queryString;

    return completedUrl;
  }

  async function request({
    payload,
    onSuccess,
    onError,
    headers,
  }: Omit<Options<Payload, Response>, "host" | "routeName" | "enabled"> = {}) {
    setRequestState((prev) => ({ ...prev, isLoading: true }));

    try {
      const urlWithParams = mountUrl(
        uri,
        hosts[host],
        payload?.params || payloadDefault?.params,
        payload?.query || payloadDefault?.query
      );

      const needAuthorization =
        !!listenHeaders && listenHeaders.includes("Authorization");
      const presetHeaders = {
        ...definedHeaders,
        ...headersDefault,
        ...headers,
        "Content-Type": "application/json",
      };

      const response = await fetch(urlWithParams, {
        method,
        body: JSON.stringify(payload?.body || payloadDefault?.body),
        headers: needAuthorization
          ? {
              ...presetHeaders,
              Authorization: `Bearer ${getCookie("token") || ""}`,
            }
          : presetHeaders,
      });
      if (response.ok) {
        const res = (await response.json()) as DefaultResponse<Response>;
        setRequestState({ isLoading: false, data: res.data, error: null });
        if (onSuccessDefault) {
          onSuccessDefault(res);
        }
        if (onSuccess) {
          onSuccess(res);
        }
      } else {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }
    } catch (error: Error | unknown) {
      const defaultErrorMessage =
        "Ops! Algo deu errado. Tente novamente mais tarde.";
      const errorObject = {
        status: (error as { status: number }).status || 500,
        message: (error as { message: string }).message || defaultErrorMessage,
      };
      setRequestState({ data: null, isLoading: false, error: errorObject });
      if (onErrorDefault) onErrorDefault(errorObject);
      if (onError) onError(errorObject);
      if (!notHandleError) {
        toast({
          title: defaultErrorMessage,
          className: "bg-red-600 text-white",
        });
      }
    }
  }

  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (enabled) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  useEffect(() => {
    if (!isFirstRender) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify({ ...payloadDefault, ...dependencies })]);

  return [
    request,
    requestState.isLoading,
    requestState.data,
    requestState.error,
  ] as const;
}
