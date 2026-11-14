// ======================================================
// CATEGORY MAPPER
// ======================================================

function mapCategoryCount(
  count,
) {
  if (!count) {
    return {
      news: 0,
    };
  }

  return {
    news:
      Number(
        count.news ?? 0,
      ),
  };
}

export function mapCategory(
  category,
) {
  if (!category) {
    return null;
  }

  return {
    id:
      category.id,

    name:
      category.name,

    slug:
      category.slug,

    description:
      category.description ??
      null,

    newsCount:
      mapCategoryCount(
        category._count,
      ).news,

    createdAt:
      category.createdAt ??
      null,

    updatedAt:
      category.updatedAt ??
      null,
  };
}

export function mapCategories(
  categories = [],
) {
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories.map(
    mapCategory,
  );
}

export function mapCategoryList(
  result,
) {
  if (
    !result ||
    typeof result !==
      "object"
  ) {
    return {
      items: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  return {
    items:
      mapCategories(
        result.items,
      ),

    pagination: {
      page:
        result.pagination
          ?.page ?? 1,

      limit:
        result.pagination
          ?.limit ?? 20,

      total:
        result.pagination
          ?.total ?? 0,

      totalPages:
        result.pagination
          ?.totalPages ?? 0,

      hasNextPage:
        Boolean(
          result.pagination
            ?.hasNextPage,
        ),

      hasPrevPage:
        Boolean(
          result.pagination
            ?.hasPrevPage,
        ),
    },
  };
}

export default {
  mapCategory,
  mapCategories,
  mapCategoryList,
};