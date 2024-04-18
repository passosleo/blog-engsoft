import { useEffect, useRef, useState } from "react";
import { HOST, routes } from "../router";

type UrlParam = Record<string, string | string[] | number | number[]>;

type Options<Payload, Response> = {
  routeName: keyof typeof routes;
  enabled?: boolean;
  payload?: {
    params?: UrlParam;
    query?: UrlParam;
    body?: Payload;
  };
  onSuccess?: (data: Response) => void;
  onError?: (error: { status: number; message: string }) => void;
  headers?: Record<string, string>;
};

export function useRequest<Payload, Response>({
  enabled = true,
  routeName,
  headers: headersDefault,
  payload: payloadDefault,
  onSuccess: onSuccessDefault,
  onError: onErrorDefault,
}: Options<Payload, Response>) {
  const [requestState, setRequestState] = useState<{
    isLoading: boolean;
    data: Response | null;
    error: { status: number; message: string } | null;
  }>({
    isLoading: false,
    data: null,
    error: null,
  });

  const { method, uri, listenHeaders, headers } = routes[
    routeName
  ] as unknown as {
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
  }: Omit<Options<Payload, Response>, "routeName" | "enabled"> = {}) {
    setRequestState((prev) => ({ ...prev, isLoading: true }));

    try {
      const urlWithParams = mountUrl(
        uri,
        HOST,
        payload?.params || payloadDefault?.params,
        payload?.query || payloadDefault?.query
      );

      const needAuthorization =
        !!listenHeaders && listenHeaders.includes("Authorization");
      const presetHeaders = {
        ...headers,
        ...headersDefault,
        "Content-Type": "application/json",
      };

      const response = await fetch(urlWithParams, {
        method,
        body: JSON.stringify(payload?.body || payloadDefault?.body),
        headers: needAuthorization
          ? {
              ...presetHeaders,
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            }
          : presetHeaders,
      });
      if (response.ok) {
        const data = (await response.json()) as Response;
        setRequestState({ isLoading: false, data, error: null });
        if (onSuccessDefault) {
          onSuccessDefault(data);
        }
        if (onSuccess) {
          onSuccess(data);
        }
      } else {
        throw {
          status: response.status,
          message: response.statusText,
        };
      }
    } catch (error: Error | unknown) {
      const errorObject = {
        status: (error as { status: number }).status || 500,
        message:
          (error as { message: string }).message || "Something went wrong",
      };
      setRequestState({ data: null, isLoading: false, error: errorObject });
      if (onErrorDefault) {
        onErrorDefault(errorObject);
      }
      if (onError) {
        onError(errorObject);
      }
    }
  }

  const isFirstRender = useFirstRender();

  const dependencies = [
    ...Object.values(payloadDefault?.params || {}),
    ...Object.values(payloadDefault?.query || {}),
    ...Object.values(payloadDefault?.body || {}),
  ];

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
  }, dependencies);

  return [
    request,
    requestState.isLoading,
    requestState.data,
    requestState.error,
  ] as const;
}