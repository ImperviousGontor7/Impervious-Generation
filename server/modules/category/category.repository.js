import prisma from "../../config/prisma.js";

// ======================================================
// SELECT
// ======================================================

export const categorySelect =
  Object.freeze({
    id: true,

    name: true,

    slug: true,

    description: true,

    createdAt: true,

    updatedAt: true,

    _count: {
      select: {
        news: true,
      },
    },
  });

// ======================================================
// WHERE
// ======================================================

function buildCategoryWhere({
  search = "",
} = {}) {
  const where = {};

  const normalizedSearch =
    String(
      search ?? "",
    ).trim();

  if (
    normalizedSearch
  ) {
    where.OR = [
      {
        name: {
          contains:
            normalizedSearch,

          mode:
            "insensitive",
        },
      },

      {
        slug: {
          contains:
            normalizedSearch,

          mode:
            "insensitive",
        },
      },

      {
        description: {
          contains:
            normalizedSearch,

          mode:
            "insensitive",
        },
      },
    ];
  }

  return where;
}

// ======================================================
// LIST
// ======================================================

export async function listCategories({
  page = 1,
  limit = 20,
  search = "",
} = {}) {
  const safePage =
    Math.max(
      Number.parseInt(
        page,
        10,
      ) || 1,
      1,
    );

  const safeLimit =
    Math.min(
      Math.max(
        Number.parseInt(
          limit,
          10,
        ) || 20,
        1,
      ),
      100,
    );

  const where =
    buildCategoryWhere({
      search,
    });

  const skip =
    (safePage - 1) *
    safeLimit;

  const [
    items,
    total,
  ] = await Promise.all([
    prisma.category.findMany({
      where,

      select:
        categorySelect,

      orderBy: {
        name: "asc",
      },

      skip,

      take:
        safeLimit,
    }),

    prisma.category.count({
      where,
    }),
  ]);

  return {
    items,

    pagination: {
      page:
        safePage,

      limit:
        safeLimit,

      total,

      totalPages:
        Math.ceil(
          total /
            safeLimit,
        ),

      hasNextPage:
        safePage <
        Math.ceil(
          total /
            safeLimit,
        ),

      hasPrevPage:
        safePage > 1,
    },
  };
}

// ======================================================
// FIND BY ID
// ======================================================

export async function findCategoryById(
  id,
) {
  if (!id) {
    return null;
  }

  return prisma.category.findUnique({
    where: {
      id,
    },

    select:
      categorySelect,
  });
}

// ======================================================
// FIND BY SLUG
// ======================================================

export async function findCategoryBySlug(
  slug,
) {
  if (!slug) {
    return null;
  }

  return prisma.category.findUnique({
    where: {
      slug,
    },

    select:
      categorySelect,
  });
}

// ======================================================
// FIND BY NAME
// ======================================================

export async function findCategoryByName(
  name,
) {
  if (!name) {
    return null;
  }

  return prisma.category.findUnique({
    where: {
      name,
    },

    select:
      categorySelect,
  });
}

// ======================================================
// CREATE
// ======================================================

export async function createCategory(
  data,
) {
  return prisma.category.create({
    data,

    select:
      categorySelect,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateCategory(
  id,
  data,
) {
  return prisma.category.update({
    where: {
      id,
    },

    data,

    select:
      categorySelect,
  });
}

// ======================================================
// DELETE
// ======================================================

export async function deleteCategory(
  id,
) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}

// ======================================================
// COUNT
// ======================================================

export async function countCategories(
  where = {},
) {
  return prisma.category.count({
    where,
  });
}

// ======================================================
// EXPORT
// ======================================================

export default {
  listCategories,

  findCategoryById,
  findCategoryBySlug,
  findCategoryByName,

  createCategory,
  updateCategory,
  deleteCategory,

  countCategories,
};