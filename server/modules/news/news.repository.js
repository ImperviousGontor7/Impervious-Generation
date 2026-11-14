import prisma from "../../config/prisma.js";

import {
  NEWS_LIMITS,
  NEWS_SORT_FIELDS,
  NEWS_SORT_ORDERS,
} from "./news.constants.js";

// ======================================================
// SELECT
// ======================================================

const authorSelect = {
  id: true,
  username: true,
  fullName: true,
  avatar: true,
  role: true,
};

const categorySelect = {
  id: true,
  name: true,
  slug: true,
};

const newsSelect = {
  id: true,

  title: true,
  slug: true,

  excerpt: true,
  content: true,

  thumbnail: true,
  banner: true,

  metaTitle: true,
  metaDescription: true,

  views: true,

  status: true,

  authorId: true,
  categoryId: true,

  publishedAt: true,

  createdAt: true,
  updatedAt: true,

  // ----------------------------------------------------
  // INTERNAL
  // ----------------------------------------------------
  //
  // Dipakai service untuk mengetahui soft-delete state.
  // Mapper tidak akan mengeluarkan field ini ke client.
  //
  deletedAt: true,

  // ----------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------

  author: {
    select: authorSelect,
  },

  category: {
    select: categorySelect,
  },
};

// ======================================================
// NORMALIZERS
// ======================================================

function normalizePage(value) {
  const parsed = Number.parseInt(value, 10);

  if (
    !Number.isFinite(parsed) ||
    parsed < 1
  ) {
    return NEWS_LIMITS.DEFAULT_PAGE_SIZE > 0
      ? 1
      : 1;
  }

  return parsed;
}

function normalizeLimit(value) {
  const parsed = Number.parseInt(value, 10);

  if (
    !Number.isFinite(parsed) ||
    parsed < 1
  ) {
    return NEWS_LIMITS.DEFAULT_PAGE_SIZE;
  }

  return Math.min(
    parsed,
    NEWS_LIMITS.MAX_PAGE_SIZE,
  );
}

function normalizeSearch(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeSortBy(value) {
  if (
    typeof value !== "string" ||
    !NEWS_SORT_FIELDS.includes(value)
  ) {
    return "createdAt";
  }

  return value;
}

function normalizeSortOrder(value) {
  if (
    typeof value !== "string"
  ) {
    return "desc";
  }

  const normalized =
    value.toLowerCase();

  if (
    !NEWS_SORT_ORDERS.includes(
      normalized,
    )
  ) {
    return "desc";
  }

  return normalized;
}

// ======================================================
// WHERE BUILDER
// ======================================================

function buildWhere({
  search = "",
  status,
  categoryId,
  authorId,
  publishedOnly = false,
  includeDeleted = false,
} = {}) {
  const where = {};

  // ----------------------------------------------------
  // SOFT DELETE
  // ----------------------------------------------------

  if (!includeDeleted) {
    where.deletedAt = null;
  }

  // ----------------------------------------------------
  // SEARCH
  // ----------------------------------------------------

  const normalizedSearch =
    normalizeSearch(search);

  if (normalizedSearch) {
    where.OR = [
      {
        title: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },

      {
        excerpt: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },

      {
        content: {
          contains: normalizedSearch,
          mode: "insensitive",
        },
      },
    ];
  }

  // ----------------------------------------------------
  // STATUS
  // ----------------------------------------------------

  if (status) {
    where.status = status;
  }

  // ----------------------------------------------------
  // CATEGORY
  // ----------------------------------------------------

  if (categoryId) {
    where.categoryId = categoryId;
  }

  // ----------------------------------------------------
  // AUTHOR
  // ----------------------------------------------------

  if (authorId) {
    where.authorId = authorId;
  }

  // ----------------------------------------------------
  // PUBLISHED ONLY
  // ----------------------------------------------------

  if (publishedOnly) {
    where.status = "PUBLISHED";

    where.publishedAt = {
      not: null,
      lte: new Date(),
    };
  }

  return where;
}

// ======================================================
// ORDER BUILDER
// ======================================================

function buildOrderBy(
  sortBy = "createdAt",
  sortOrder = "desc",
) {
  const field =
    normalizeSortBy(sortBy);

  const order =
    normalizeSortOrder(sortOrder);

  return [
    {
      [field]: order,
    },

    // --------------------------------------------------
    // STABLE ORDER
    // --------------------------------------------------
    //
    // Jika dua news memiliki nilai sorting sama,
    // ID menjadi tie-breaker.
    //
    {
      id: "desc",
    },
  ];
}

// ======================================================
// LIST NEWS
// ======================================================

export async function listNews({
  page = 1,
  limit =
    NEWS_LIMITS.DEFAULT_PAGE_SIZE,

  search = "",

  status,

  categoryId,

  authorId,

  publishedOnly = false,

  includeDeleted = false,

  sortBy = "createdAt",

  sortOrder = "desc",
} = {}) {
  const safePage =
    normalizePage(page);

  const safeLimit =
    normalizeLimit(limit);

  const where =
    buildWhere({
      search,
      status,
      categoryId,
      authorId,
      publishedOnly,
      includeDeleted,
    });

  const skip =
    (safePage - 1) *
    safeLimit;

  const [
    items,
    total,
  ] = await Promise.all([
    prisma.news.findMany({
      where,

      select: newsSelect,

      orderBy:
        buildOrderBy(
          sortBy,
          sortOrder,
        ),

      skip,

      take: safeLimit,
    }),

    prisma.news.count({
      where,
    }),
  ]);

  const totalPages =
    total === 0
      ? 0
      : Math.ceil(
          total / safeLimit,
        );

  return {
    items,

    pagination: {
      page: safePage,

      limit: safeLimit,

      total,

      totalPages,

      hasNextPage:
        safePage <
        totalPages,

      hasPrevPage:
        safePage > 1 &&
        totalPages > 0,

      nextPage:
        safePage < totalPages
          ? safePage + 1
          : null,

      prevPage:
        safePage > 1 &&
        totalPages > 0
          ? safePage - 1
          : null,
    },
  };
}

// ======================================================
// FIND BY ID
// ======================================================

export async function findNewsById(
  id,
  includeDeleted = false,
) {
  if (
    typeof id !== "string" ||
    !id.trim()
  ) {
    return null;
  }

  const where = {
    id: id.trim(),
  };

  if (!includeDeleted) {
    where.deletedAt = null;
  }

  return prisma.news.findFirst({
    where,

    select: newsSelect,
  });
}

// ======================================================
// FIND BY SLUG
// ======================================================

export async function findNewsBySlug(
  slug,
  includeDeleted = false,
) {
  if (
    typeof slug !== "string" ||
    !slug.trim()
  ) {
    return null;
  }

  const where = {
    slug: slug.trim(),
  };

  if (!includeDeleted) {
    where.deletedAt = null;
  }

  return prisma.news.findFirst({
    where,

    select: newsSelect,
  });
}

// ======================================================
// CREATE
// ======================================================

export async function createNews(
  data,
) {
  if (
    !data ||
    typeof data !== "object"
  ) {
    throw new TypeError(
      "News data is required.",
    );
  }

  return prisma.news.create({
    data,

    select: newsSelect,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateNews(
  id,
  data,
) {
  if (
    typeof id !== "string" ||
    !id.trim()
  ) {
    throw new TypeError(
      "News ID is required.",
    );
  }

  if (
    !data ||
    typeof data !== "object"
  ) {
    throw new TypeError(
      "News update data is required.",
    );
  }

  return prisma.news.update({
    where: {
      id: id.trim(),
    },

    data,

    select: newsSelect,
  });
}

// ======================================================
// SOFT DELETE
// ======================================================

export async function softDeleteNews(
  id,
) {
  if (
    typeof id !== "string" ||
    !id.trim()
  ) {
    throw new TypeError(
      "News ID is required.",
    );
  }

  return prisma.news.update({
    where: {
      id: id.trim(),
    },

    data: {
      deletedAt: new Date(),
    },

    select: newsSelect,
  });
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreNews(
  id,
) {
  if (
    typeof id !== "string" ||
    !id.trim()
  ) {
    throw new TypeError(
      "News ID is required.",
    );
  }

  return prisma.news.update({
    where: {
      id: id.trim(),
    },

    data: {
      deletedAt: null,
    },

    select: newsSelect,
  });
}

// ======================================================
// INCREMENT VIEWS
// ======================================================

export async function incrementNewsViews(
  id,
) {
  if (
    typeof id !== "string" ||
    !id.trim()
  ) {
    throw new TypeError(
      "News ID is required.",
    );
  }

  return prisma.news.update({
    where: {
      id: id.trim(),
    },

    data: {
      views: {
        increment: 1,
      },
    },

    select: {
      id: true,
      views: true,
    },
  });
}

// ======================================================
// EXPORT
// ======================================================

export default {
  listNews,

  findNewsById,
  findNewsBySlug,

  createNews,
  updateNews,

  softDeleteNews,
  restoreNews,

  incrementNewsViews,
};