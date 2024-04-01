import { DefaultResponse, Params, RoutesName } from "../types";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useMiddleware } from "../middleware/useMiddleware";
import { useAxiosUtils } from "@/frontend/hooks/useAxiosUtils";

export type CustomQueryProps<T> = {
  onError?: (error: any, res?: DefaultResponse<T>) => void;
  onSuccess?: (data: DefaultResponse<T>) => void;
  queryOptions?: UseQueryOptions<DefaultResponse<T>>;
  notHandleError?: boolean;
  queriesKeys: QueryKey;
  routeName: RoutesName;
  enabled?: boolean;
  params?: Params;
  query?: Params;
};

export function useCustomQuery<ReturnData>({
  queriesKeys,
  enabled = true,
  notHandleError,
  queryOptions,
  routeName,
  params,
  query: queryParam,
  ...statusFunctions
}: CustomQueryProps<ReturnData>) {
  const { requestAxios } = useMiddleware();
  const { handleAxiosError } = useAxiosUtils();

  function onError(error: any) {
    if (!notHandleError) handleAxiosError(error);
    if (statusFunctions.onError)
      statusFunctions.onError(error, error.response?.data);
  }

  function onSuccess(data: DefaultResponse<ReturnData>) {
    if (statusFunctions.onSuccess) statusFunctions.onSuccess(data);
  }

  function handleQuery() {
    return requestAxios({
      routeName,
      params,
      query: queryParam,
    }).then((res) => res.data);
  }

  const query = useQuery(
    queriesKeys,
    handleQuery as QueryFunction<DefaultResponse<ReturnData>, QueryKey>,
    {
      onSuccess,
      onError,
      enabled,
      ...queryOptions,
    }
  );

  return query;
}
