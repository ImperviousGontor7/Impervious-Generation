import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import axiosClient from "../lib/http/axiosClient.js";

/**
 * Generic data fetching hook.
 *
 * @param {string} url
 * @param {object} options
 * @returns {{
 *   data: any,
 *   error: any,
 *   loading: boolean,
 *   refetch: Function,
 *   cancel: Function
 * }}
 */
export default function useFetch(
  url,
  options = {}
) {
  const {
    method = "GET",
    params,
    data: requestData,
    enabled = true,
    immediate = true,
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(
    enabled && immediate
  );

  const abortControllerRef = useRef(null);

  const fetchData = useCallback(
    async (overrideConfig = {}) => {
      if (!url) {
        return null;
      }

      if (
        abortControllerRef.current
      ) {
        abortControllerRef.current.abort();
      }

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      setLoading(true);
      setError(null);

      try {
        const response =
          await axiosClient.request({
            url,
            method,
            params,
            data: requestData,
            signal: controller.signal,
            ...overrideConfig,
          });

        const payload =
          response?.data;

        const result =
          payload?.data ??
          payload ??
          null;

        setData(result);

        if (onSuccess) {
          onSuccess(result, response);
        }

        return result;
      } catch (requestError) {
        if (
          requestError?.code ===
            "ERR_CANCELED" ||
          requestError?.name ===
            "CanceledError" ||
          requestError?.name ===
            "AbortError"
        ) {
          return null;
        }

        setError(requestError);

        if (onError) {
          onError(requestError);
        }

        throw requestError;
      } finally {
        if (
          abortControllerRef.current ===
          controller
        ) {
          abortControllerRef.current =
            null;

          setLoading(false);
        }
      }
    },
    [
      url,
      method,
      params,
      requestData,
      onSuccess,
      onError,
    ]
  );

  useEffect(() => {
    if (!enabled || !immediate) {
      setLoading(false);
      return undefined;
    }

    fetchData().catch(() => {
      // Error sudah disimpan ke state `error`.
    });

    return () => {
      if (
        abortControllerRef.current
      ) {
        abortControllerRef.current.abort();
      }
    };
  }, [
    enabled,
    immediate,
    fetchData,
  ]);

  const cancel = useCallback(() => {
    if (
      abortControllerRef.current
    ) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
    cancel,
  };
}