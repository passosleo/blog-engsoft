import { useEffect, useState, useMemo } from "react";

type Props = {
  reloadMode?: "never" | "always" | "onChange";
  initialParams?: Record<string, string | boolean | number>;
};

export function useQueryParams<
  T extends Record<string, string | boolean | number> | undefined
>({ reloadMode = "onChange", initialParams }: Props = {}) {
  const currentParams = useMemo(() => {
    return Object.fromEntries(
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams("")
    ) as T;
  }, []);

  function isStringConvertible(str: string, outputType: "number" | "boolean") {
    switch (outputType) {
      case "boolean":
        return str === "true" || str === "false";
      case "number":
        return /^-?\d*\.?\d+$/.test(str);
      default:
        return false;
    }
  }

  const normalizedParams = useMemo(() => {
    function normalizeParamsType(params: T) {
      if (params && Object.keys(params).length === 0) return {};

      return (
        params &&
        (Object.fromEntries(
          Object.entries(params).map(([key, value]) => {
            if (isStringConvertible(value as string, "number")) {
              return [key, Number(value)];
            }
            if (isStringConvertible(value as string, "boolean")) {
              return [key, value === "true"];
            }
            return [key, value];
          })
        ) as T)
      );
    }
    return normalizeParamsType(currentParams);
  }, [currentParams]);

  function handleCurrentParams() {
    if (initialParams && normalizedParams) {
      const params = {
        ...normalizedParams,
        ...initialParams,
      };

      if (Object.keys(params).length === 0) return undefined;

      return params as T;
    } else {
      if (normalizedParams && Object.keys(normalizedParams).length === 0)
        return undefined;

      return normalizedParams as T;
    }
  }

  const [state, setState] = useState<{
    queryParams: T | undefined;
    reloadRequired: boolean;
  }>({
    queryParams: handleCurrentParams(),
    reloadRequired: false,
  });

  const handleQueryParamsChange = useMemo(() => {
    return () => {
      const searchParams = new URLSearchParams();

      for (const key in state.queryParams) {
        if (state.queryParams.hasOwnProperty(key)) {
          searchParams.set(key, String(state.queryParams[key]));
        }
      }

      const queryString = searchParams.toString();
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname;

      window.history.replaceState({}, "", newUrl);

      if (state.reloadRequired) window.location.reload();
    };
  }, [state]);

  const handleReloadMode = useMemo(() => {
    function stringifyParams(params: T) {
      return JSON.stringify(params, (_, value) =>
        typeof value === "number" || typeof value === "boolean"
          ? value.toString()
          : value
      );
    }
    return (params: T) => {
      switch (reloadMode) {
        case "never":
          return;
        case "always":
          setState((prevState) => ({
            ...prevState,
            reloadRequired: true,
          }));
          return;
        case "onChange":
          const stringifiedNewParams = stringifyParams(params);
          const stringifiedCurrentParams = stringifyParams(
            state.queryParams as T
          );
          const hasChanges = stringifiedNewParams !== stringifiedCurrentParams;
          if (hasChanges) {
            setState((prevState) => ({
              ...prevState,
              reloadRequired: true,
            }));
          }
          break;
      }
    };
  }, [reloadMode, state]);

  const setQueryParams = useMemo(() => {
    return (params: T | ((prevParams: T) => T) | undefined) => {
      const newParams =
        typeof params === "function" ? params(state.queryParams as T) : params;

      if (newParams) handleReloadMode(newParams);
      setState((prevState) => ({
        ...prevState,
        queryParams: newParams,
      }));
    };
  }, [handleReloadMode, state]);

  function clearQueryParams() {
    setTimeout(() => setQueryParams(undefined), 100);
  }

  useEffect(() => {
    handleQueryParamsChange();
  }, [state, handleQueryParamsChange]);

  return [state.queryParams, setQueryParams, clearQueryParams] as const;
}
