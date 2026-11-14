import {
  useCallback,
  useMemo,
  useState,
} from "react";

export default function usePagination(
  options = {}
) {
  const {
    initialPage = 1,
    initialLimit = 10,
    total = 0,
  } = options;

  const [page, setPageState] =
    useState(initialPage);

  const [limit, setLimitState] =
    useState(initialLimit);

  const totalPages = useMemo(() => {
    if (!total || total <= 0) {
      return 1;
    }

    return Math.max(
      1,
      Math.ceil(total / limit)
    );
  }, [total, limit]);

  const hasPreviousPage =
    page > 1;

  const hasNextPage =
    page < totalPages;

  const setPage = useCallback(
    (nextPage) => {
      const resolvedPage =
        typeof nextPage ===
        "function"
          ? nextPage(page)
          : nextPage;

      const safePage = Math.min(
        Math.max(
          1,
          Number(resolvedPage) ||
            1
        ),
        totalPages
      );

      setPageState(safePage);
    },
    [page, totalPages]
  );

  const setLimit = useCallback(
    (nextLimit) => {
      const safeLimit = Math.max(
        1,
        Number(nextLimit) ||
          initialLimit
      );

      setLimitState(safeLimit);
      setPageState(1);
    },
    [initialLimit]
  );

  const nextPage = useCallback(() => {
    setPageState((currentPage) =>
      Math.min(
        currentPage + 1,
        totalPages
      )
    );
  }, [totalPages]);

  const previousPage =
    useCallback(() => {
      setPageState((currentPage) =>
        Math.max(
          currentPage - 1,
          1
        )
      );
    }, []);

  const firstPage = useCallback(() => {
    setPageState(1);
  }, []);

  const lastPage = useCallback(() => {
    setPageState(totalPages);
  }, [totalPages]);

  const reset = useCallback(() => {
    setPageState(initialPage);
    setLimitState(initialLimit);
  }, [
    initialPage,
    initialLimit,
  ]);

  const offset =
    (page - 1) * limit;

  return {
    page,
    limit,
    offset,
    total,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    setPage,
    setLimit,
    nextPage,
    previousPage,
    firstPage,
    lastPage,
    reset,
  };
}