/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import api from "../utils/api";

export function useApi() {
  const [state, setState] = useState({
    data: [],
    error: false,
    loading: false,
  });

  const callApi = useCallback(async (args: any): Promise<any> => {
    setState((prev: any) => ({ ...prev, loading: true, error: false }));

    try {
      const response = await api.request({
        url: args.url, // relative path
        method: args.method || "GET",
        params: args.params,
        data: args.data,
        headers: args.headers,
      });
      if (response.data.error) {
        setState({ data: [], error: true, loading: false });
      } else {
        setState({ data: response.data.data, error: false, loading: false });
      }
      return response;
    } catch (error: any) {
      setState({ data: [], error: error.message, loading: false });
      return null;
    }
  }, []);

  return { ...state, callApi };
}
