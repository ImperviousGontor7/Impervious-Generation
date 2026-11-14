import {
  useCallback,
  useEffect,
  useState,
} from "react";

import mediaApi from "../services/mediaApi.js";

// ======================================================
// HOOK
// ======================================================

export default function useMedia(
  initialParams = {},
) {
  const [
    items,
    setItems,
  ] = useState([]);

  const [
    pagination,
    setPagination,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  const [
    params,
    setParams,
  ] = useState({
    page: 1,

    limit: 24,

    search: "",

    folder: "",

    mimeType: "",

    ...initialParams,
  });

  // ====================================================
  // LOAD
  // ====================================================

  const load =
    useCallback(
      async (
        nextParams = {},
      ) => {
        setLoading(
          true,
        );

        setError(
          null,
        );

        const mergedParams = {
          ...params,
          ...nextParams,
        };

        try {
          const result =
            await mediaApi.getMedia(
              mergedParams,
            );

          setItems(
            result.items ||
              [],
          );

          setPagination(
            result.pagination ||
              null,
          );

          setParams(
            mergedParams,
          );

          return result;
        } catch (
          requestError
        ) {
          setError(
            requestError,
          );

          throw requestError;
        } finally {
          setLoading(
            false,
          );
        }
      },
      [
        params,
      ],
    );

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    let active =
      true;

    async function initialize() {
      try {
        const result =
          await mediaApi.getMedia(
            params,
          );

        if (!active) {
          return;
        }

        setItems(
          result.items ||
            [],
        );

        setPagination(
          result.pagination ||
            null,
        );
      } catch (
        requestError
      ) {
        if (active) {
          setError(
            requestError,
          );
        }
      } finally {
        if (active) {
          setLoading(
            false,
          );
        }
      }
    }

    initialize();

    return () => {
      active =
        false;
    };

    // Initial request only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====================================================
  // SEARCH
  // ====================================================

  const search =
    useCallback(
      async (
        value,
      ) => {
        return load({
          page: 1,

          search:
            value || "",
        });
      },
      [load],
    );

  // ====================================================
  // FILTER
  // ====================================================

  const filter =
    useCallback(
      async (
        values = {},
      ) => {
        return load({
          page: 1,

          ...values,
        });
      },
      [load],
    );

  // ====================================================
  // PAGE
  // ====================================================

  const goToPage =
    useCallback(
      async (
        page,
      ) => {
        return load({
          page,
        });
      },
      [load],
    );

  // ====================================================
  // DELETE
  // ====================================================

  const remove =
    useCallback(
      async (
        id,
        options = {},
      ) => {
        const deleted =
          await mediaApi.deleteMedia(
            id,
            options,
          );

        setItems(
          (current) =>
            current.filter(
              (
                item,
              ) =>
                item.id !==
                id,
            ),
        );

        return deleted;
      },
      [],
    );

  // ====================================================
  // RESTORE
  // ====================================================

  const restore =
    useCallback(
      async (
        id,
      ) => {
        const restored =
          await mediaApi.restoreMedia(
            id,
          );

        await load();

        return restored;
      },
      [load],
    );

  return {
    items,

    pagination,

    loading,

    error,

    params,

    load,

    search,

    filter,

    goToPage,

    remove,

    restore,
  };
}