// ======================================================
// MEDIA MAPPER
// ======================================================

import {
  getMediaType,
  normalizeMediaProvider,
} from "./media.constants.js";

// ======================================================
// DATE
// ======================================================

function serializeDate(
  value
) {
  if (!value) {
    return null;
  }

  if (
    value instanceof Date
  ) {
    return value.toISOString();
  }

  return value;
}

// ======================================================
// MAP MEDIA
// ======================================================

export function mapMedia(
  media
) {
  if (!media) {
    return null;
  }

  return {
    id:
      media.id,

    originalName:
      media.originalName,

    filename:
      media.filename,

    mimeType:
      media.mimeType,

    type:
      getMediaType(
        media.mimeType
      ),

    size:
      media.size,

    path:
      media.path,

    url:
      media.url,

    folder:
      media.folder,

    provider:
      normalizeMediaProvider(
        media.provider
      ),

    uploaderId:
      media.uploaderId ??
      null,

    uploader:
      media.uploader
        ? {
            id:
              media.uploader.id,

            username:
              media.uploader
                .username,

            fullName:
              media.uploader
                .fullName,

            avatar:
              media.uploader
                .avatar,
          }
        : null,

    createdAt:
      serializeDate(
        media.createdAt
      ),

    updatedAt:
      serializeDate(
        media.updatedAt
      ),

    deletedAt:
      serializeDate(
        media.deletedAt
      ),
  };
}

// ======================================================
// MAP COLLECTION
// ======================================================

export function mapMediaList(
  items
) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map(mapMedia)
    .filter(Boolean);
}

// ======================================================
// PAGINATION
// ======================================================

export function mapMediaPagination(
  pagination
) {
  if (!pagination) {
    return null;
  }

  return {
    page:
      pagination.page,

    limit:
      pagination.limit,

    total:
      pagination.total,

    totalPages:
      pagination.totalPages,

    hasNextPage:
      Boolean(
        pagination.hasNextPage
      ),

    hasPrevPage:
      Boolean(
        pagination.hasPrevPage
      ),

    nextPage:
      pagination.nextPage ??
      null,

    prevPage:
      pagination.prevPage ??
      null,
  };
}

export default {
  mapMedia,

  mapMediaList,

  mapMediaPagination,
};