import prisma from "../../config/prisma.js";

// ======================================================
// SELECT
// ======================================================

const uploaderSelect = {
  id: true,

  username: true,

  fullName: true,

  avatar: true,
};

const mediaSelect = {
  id: true,

  originalName: true,

  filename: true,

  mimeType: true,

  size: true,

  path: true,

  url: true,

  folder: true,

  provider: true,

  uploaderId: true,

  createdAt: true,

  updatedAt: true,

  deletedAt: true,

  uploader: {
    select:
      uploaderSelect,
  },
};

// ======================================================
// HELPERS
// ======================================================

function normalizePage(
  value,
  fallback = 1
) {
  const parsed =
    Number.parseInt(
      value,
      10
    );

  return Number.isInteger(
    parsed
  ) && parsed > 0
    ? parsed
    : fallback;
}

function normalizeLimit(
  value,
  fallback = 20
) {
  const parsed =
    Number.parseInt(
      value,
      10
    );

  if (
    !Number.isInteger(
      parsed
    ) ||
    parsed < 1
  ) {
    return fallback;
  }

  return Math.min(
    parsed,
    100
  );
}

function buildWhere({
  folder,
  search,
  mimeType,
  provider,
  includeDeleted = false,
} = {}) {
  const where = {};

  if (!includeDeleted) {
    where.deletedAt =
      null;
  }

  if (folder) {
    where.folder =
      folder;
  }

  if (search) {
    where.OR = [
      {
        originalName: {
          contains:
            search,

          mode:
            "insensitive",
        },
      },

      {
        filename: {
          contains:
            search,

          mode:
            "insensitive",
        },
      },
    ];
  }

  if (mimeType) {
    where.mimeType = {
      startsWith:
        mimeType,

      mode:
        "insensitive",
    };
  }

  if (provider) {
    where.provider =
      provider;
  }

  return where;
}

// ======================================================
// LIST
// ======================================================

export async function listMedia({
  page = 1,
  limit = 20,
  folder = "",
  search = "",
  mimeType = "",
  provider = "",
  includeDeleted = false,
} = {}) {
  const safePage =
    normalizePage(
      page
    );

  const safeLimit =
    normalizeLimit(
      limit
    );

  const skip =
    (safePage - 1) *
    safeLimit;

  const where =
    buildWhere({
      folder,
      search,
      mimeType,
      provider,
      includeDeleted,
    });

  const [
    items,
    total,
  ] =
    await Promise.all([
      prisma.media.findMany({
        where,

        select:
          mediaSelect,

        orderBy: {
          createdAt:
            "desc",
        },

        skip,

        take:
          safeLimit,
      }),

      prisma.media.count({
        where,
      }),
    ]);

  const totalPages =
    Math.ceil(
      total /
        safeLimit
    );

  return {
    items,

    pagination: {
      page:
        safePage,

      limit:
        safeLimit,

      total,

      totalPages,

      hasNextPage:
        safePage <
        totalPages,

      hasPrevPage:
        safePage > 1,

      nextPage:
        safePage <
        totalPages
          ? safePage + 1
          : null,

      prevPage:
        safePage > 1
          ? safePage - 1
          : null,
    },
  };
}

// ======================================================
// FIND BY ID
// ======================================================

export async function findMediaById(
  id,
  includeDeleted = false
) {
  if (!id) {
    return null;
  }

  return prisma.media.findFirst({
    where: {
      id,

      ...(includeDeleted
        ? {}
        : {
            deletedAt:
              null,
          }),
    },

    select:
      mediaSelect,
  });
}

// ======================================================
// FIND BY PATH
// ======================================================

export async function findMediaByPath(
  path,
  provider = "local",
  includeDeleted = false
) {
  if (!path) {
    return null;
  }

  return prisma.media.findFirst({
    where: {
      path,

      provider,

      ...(includeDeleted
        ? {}
        : {
            deletedAt:
              null,
          }),
    },

    select:
      mediaSelect,
  });
}

// ======================================================
// CREATE
// ======================================================

export async function createMedia(
  data
) {
  return prisma.media.create({
    data,

    select:
      mediaSelect,
  });
}

// ======================================================
// REGISTER
// ======================================================

export async function registerMedia(
  data
) {
  return prisma.media.upsert({
    where: {
      provider_path: {
        provider:
          data.provider,

        path:
          data.path,
      },
    },

    create: data,

    update: {
      originalName:
        data.originalName,

      filename:
        data.filename,

      mimeType:
        data.mimeType,

      size:
        data.size,

      url:
        data.url,

      folder:
        data.folder,

      uploaderId:
        data.uploaderId,

      deletedAt:
        null,
    },

    select:
      mediaSelect,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateMedia(
  id,
  data
) {
  return prisma.media.update({
    where: {
      id,
    },

    data,

    select:
      mediaSelect,
  });
}

// ======================================================
// SOFT DELETE
// ======================================================

export async function softDeleteMedia(
  id
) {
  return prisma.media.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        new Date(),
    },

    select:
      mediaSelect,
  });
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreMedia(
  id
) {
  return prisma.media.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        null,
    },

    select:
      mediaSelect,
  });
}

// ======================================================
// HARD DELETE
// ======================================================

export async function deleteMedia(
  id
) {
  return prisma.media.delete({
    where: {
      id,
    },

    select:
      mediaSelect,
  });
}

export default {
  listMedia,

  findMediaById,
  findMediaByPath,

  createMedia,
  registerMedia,

  updateMedia,

  softDeleteMedia,
  restoreMedia,
  deleteMedia,
};