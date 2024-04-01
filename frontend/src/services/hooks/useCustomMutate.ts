import { useAxiosUtils } from "@/frontend/hooks/useAxiosUtils";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useMiddleware } from "../middleware/useMiddleware";
import { DefaultResponse, Params, RoutesName } from "../types";
import { useQueryClient, useMutation, QueryKey } from "@tanstack/react-query";

export type CustomMutationProps<T = any> = {
  routeName: RoutesName;
  notHandleError?: boolean;
  setQueriesKeys?: string[];
  onError?: (error: any, res?: DefaultResponse<T>) => void;
  invalidateQueriesKeys?: QueryKey;
  axiosConfig?: AxiosRequestConfig<any>;
  onSuccess?: (data?: DefaultResponse<T>) => void;
};

export function useCustomMutate<ReturnData, Payload = any>({
  routeName,
  notHandleError,
  setQueriesKeys,
  axiosConfig = {},
  invalidateQueriesKeys,
  ...statusFunctions
}: CustomMutationProps<ReturnData>) {
  const queryClient = useQueryClient();
  const { requestAxios } = useMiddleware();
  const { handleAxiosError } = useAxiosUtils();

  function onError(error: AxiosError<any>) {
    if (!notHandleError) handleAxiosError(error);
    if (statusFunctions.onError)
      statusFunctions.onError?.(error, error.response?.data);
  }

  function onSuccess(data: DefaultResponse<ReturnData>) {
    queryClient.invalidateQueries(invalidateQueriesKeys);
    if (setQueriesKeys) queryClient.setQueryData(setQueriesKeys, data);
    statusFunctions.onSuccess?.(data);
  }

  function handleMutate({
    payload,
    params,
    query,
  }: {
    payload?: Payload;
    params?: Params;
    query?: Params;
  }) {
    return requestAxios({
      config: axiosConfig,
      routeName,
      payload,
      params,
      query,
    }).then((res) => res.data) as Promise<DefaultResponse<ReturnData>>;
  }

  return useMutation(handleMutate, {
    onSuccess: (data: DefaultResponse<ReturnData>) =>
      onSuccess(data as DefaultResponse<ReturnData>),
    onError,
  });
}
