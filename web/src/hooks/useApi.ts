/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import api from "../utils/api";

export function useApi() {
  const [state, setState] = useState<any>({
    data: [],
    loading: true,
  });

  const callApi = useCallback(async (args: any): Promise<any> => {
    setState((prev: any) => ({ ...prev, loading: true }));

    try {
      const response = await api.request({
        url: args.url, // relative path
        method: args.method || "GET",
        params: args.params,
        data: args.data,
        headers: args.headers,
      });
      if (response.data.error) {
        setState({ data: [] });
      } else {
        setState({ data: response.data.data, loading: false });
      }
      return response;
    } catch (error: any) {
      console.log(error.message)
      setState({ data: [], loading: false });
      return null;
    }
  }, []);

  return { ...state, callApi };
}
