/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import api from "../utils/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

interface ApiArgs extends AxiosRequestConfig {
  url: string; // relative path only
  method?: HttpMethod;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, string>;
}

export function useApi<T = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const callApi = useCallback(async (args: ApiArgs): Promise<AxiosResponse<T> | null> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await api.request<T>({
        url: args.url, // relative path
        method: args.method || "GET",
        params: args.params,
        data: args.data,
        headers: args.headers,
      });

      setState({ data: response.data, error: null, loading: false });
      return response;
    } catch (error: any) {
      setState({ data: null, error: error.message, loading: false });
      return null;
    }
  }, []);

  return { ...state, callApi };
}
