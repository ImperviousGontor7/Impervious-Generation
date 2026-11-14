import {
  useCallback,
  useRef,
  useState,
} from "react";

import axiosClient from "../lib/http/axiosClient.js";

// ======================================================
// RESPONSE
// ======================================================

function unwrap(
  response,
) {
  return (
    response?.data?.data ??
    response?.data ??
    response ??
    null
  );
}

// ======================================================
// HOOK
// ======================================================

export default function useUpload(
  options = {},
) {
  const {
    url = "",
    method = "POST",
    fieldName = "file",
    additionalData = {},
    headers = {},
    onProgress,
    onSuccess,
    onError,
  } = options;

  const [
    uploading,
    setUploading,
  ] =
    useState(false);

  const [
    progress,
    setProgress,
  ] =
    useState(0);

  const [
    data,
    setData,
  ] =
    useState(null);

  const [
    error,
    setError,
  ] =
    useState(null);

  const abortRef =
    useRef(null);

  // ====================================================
  // UPLOAD
  // ====================================================

  const upload =
    useCallback(
      async (
        file,
        overrideOptions = {},
      ) => {
        if (!file) {
          throw new Error(
            "File wajib dipilih.",
          );
        }

        const targetUrl =
          overrideOptions.url ??
          url;

        if (!targetUrl) {
          throw new Error(
            "URL upload belum ditentukan.",
          );
        }

        // Cancel previous upload
        abortRef.current?.abort();

        const controller =
          new AbortController();

        abortRef.current =
          controller;

        const formData =
          new FormData();

        const targetField =
          overrideOptions.fieldName ??
          fieldName;

        formData.append(
          targetField,
          file,
        );

        const extraData =
          overrideOptions.additionalData ??
          additionalData;

        Object.entries(
          extraData || {},
        ).forEach(
          ([key, value]) => {
            if (
              value ===
                undefined ||
              value ===
                null
            ) {
              return;
            }

            formData.append(
              key,
              String(value),
            );
          },
        );

        setUploading(
          true,
        );

        setProgress(
          0,
        );

        setError(
          null,
        );

        try {
          const response =
            await axiosClient.request(
              {
                url:
                  targetUrl,

                method:
                  overrideOptions.method ??
                  method,

                data:
                  formData,

                headers: {
                  ...headers,
                  ...overrideOptions.headers,
                },

                signal:
                  controller.signal,

                onUploadProgress:
                  (
                    event,
                  ) => {
                    if (
                      !event.total
                    ) {
                      return;
                    }

                    const percentage =
                      Math.round(
                        (event.loaded /
                          event.total) *
                          100,
                      );

                    setProgress(
                      percentage,
                    );

                    onProgress?.(
                      percentage,
                      event,
                    );
                  },
              },
            );

          const result =
            unwrap(
              response,
            );

          setData(
            result,
          );

          setProgress(
            100,
          );

          onSuccess?.(
            result,
            response,
          );

          return result;
        } catch (
          uploadError
        ) {
          const canceled =
            uploadError?.code ===
              "ERR_CANCELED" ||
            uploadError?.name ===
              "CanceledError" ||
            uploadError?.name ===
              "AbortError";

          if (
            canceled
          ) {
            return null;
          }

          setError(
            uploadError,
          );

          onError?.(
            uploadError,
          );

          throw uploadError;
        } finally {
          if (
            abortRef.current ===
            controller
          ) {
            abortRef.current =
              null;

            setUploading(
              false,
            );
          }
        }
      },
      [
        url,
        method,
        fieldName,
        additionalData,
        headers,
        onProgress,
        onSuccess,
        onError,
      ],
    );

  // ====================================================
  // CANCEL
  // ====================================================

  const cancel =
    useCallback(
      () => {
        abortRef.current?.abort();
      },
      [],
    );

  // ====================================================
  // RESET
  // ====================================================

  const reset =
    useCallback(
      () => {
        abortRef.current?.abort();

        setUploading(
          false,
        );

        setProgress(
          0,
        );

        setData(
          null,
        );

        setError(
          null,
        );
      },
      [],
    );

  return {
    upload,

    cancel,

    reset,

    uploading,

    progress,

    data,

    error,
  };
}