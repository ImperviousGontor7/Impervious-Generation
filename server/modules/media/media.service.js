import * as mediaRepository
  from "./media.repository.js";

import {
  mapMedia,
  mapMediaList,
  mapMediaPagination,
} from "./media.mapper.js";

import {
  normalizeMediaProvider,
} from "./media.constants.js";

import {
  removeStoredFile,
} from "../../storage/storage.service.js";

// ======================================================
// HELPERS
// ======================================================

function normalizeString(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizePath(
  value
) {
  const normalized =
    String(
      value || ""
    )
      .trim()
      .replace(
        /\\/g,
        "/"
      )
      .replace(
        /^\/+/,
        ""
      );

  if (
    !normalized ||
    normalized.includes(
      ".."
    )
  ) {
    throw new Error(
      "Invalid media path."
    );
  }

  return normalized;
}

function normalizeId(
  value
) {
  const normalized =
    normalizeString(
      value
    );

  if (!normalized) {
    throw new Error(
      "Media ID is required."
    );
  }

  return normalized;
}

function normalizeSize(
  value
) {
  const size =
    Number(value);

  if (
    !Number.isInteger(
      size
    ) ||
    size < 0
  ) {
    throw new Error(
      "Invalid media size."
    );
  }

  return size;
}

// ======================================================
// LIST
// ======================================================

export async function getMedia(
  options = {}
) {
  const result =
    await mediaRepository.listMedia({
      page:
        options.page ??
        1,

      limit:
        options.limit ??
        20,

      search:
        normalizeString(
          options.search
        ) ?? "",

      folder:
        normalizeString(
          options.folder
        ) ?? "",

      mimeType:
        normalizeString(
          options.mimeType
        ) ?? "",

      provider:
        options.provider
          ? normalizeMediaProvider(
              options.provider
            )
          : "",

      includeDeleted:
        Boolean(
          options.includeDeleted
        ),
    });

  return {
    items:
      mapMediaList(
        result.items
      ),

    pagination:
      mapMediaPagination(
        result.pagination
      ),
  };
}

// ======================================================
// FIND
// ======================================================

export async function getMediaById(
  id,
  options = {}
) {
  const media =
    await mediaRepository.findMediaById(
      normalizeId(id),
      Boolean(
        options.includeDeleted
      )
    );

  return mapMedia(
    media
  );
}

export async function getMediaByPath(
  relativePath,
  provider = "local"
) {
  const media =
    await mediaRepository.findMediaByPath(
      normalizePath(
        relativePath
      ),

      normalizeMediaProvider(
        provider
      )
    );

  return mapMedia(
    media
  );
}

// ======================================================
// REGISTER
// ======================================================

export async function registerMedia(
  data
) {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    throw new Error(
      "Media data is required."
    );
  }

  const payload = {
    originalName:
      normalizeString(
        data.originalName
      ),

    filename:
      normalizeString(
        data.filename
      ),

    mimeType:
      normalizeString(
        data.mimeType
      ),

    size:
      normalizeSize(
        data.size
      ),

    path:
      normalizePath(
        data.path ||
          data.relativePath
      ),

    url:
      normalizeString(
        data.url
      ),

    folder:
      normalizeString(
        data.folder
      ),

    provider:
      normalizeMediaProvider(
        data.provider
      ),

    uploaderId:
      normalizeString(
        data.uploaderId
      ),
  };

  if (
    !payload.originalName ||
    !payload.filename ||
    !payload.mimeType ||
    !payload.url ||
    !payload.folder
  ) {
    throw new Error(
      "Incomplete media metadata."
    );
  }

  const media =
    await mediaRepository.registerMedia(
      payload
    );

  return mapMedia(
    media
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateMedia(
  id,
  data = {}
) {
  const mediaId =
    normalizeId(id);

  const payload = {};

  if (
    data.originalName !==
    undefined
  ) {
    payload.originalName =
      normalizeString(
        data.originalName
      );
  }

  if (
    data.filename !==
    undefined
  ) {
    payload.filename =
      normalizeString(
        data.filename
      );
  }

  if (
    data.url !==
    undefined
  ) {
    payload.url =
      normalizeString(
        data.url
      );
  }

  if (
    data.folder !==
    undefined
  ) {
    payload.folder =
      normalizeString(
        data.folder
      );
  }

  if (
    Object.keys(
      payload
    ).length === 0
  ) {
    throw new Error(
      "No media fields to update."
    );
  }

  const media =
    await mediaRepository.updateMedia(
      mediaId,
      payload
    );

  return mapMedia(
    media
  );
}

// ======================================================
// DELETE
// ======================================================

export async function deleteMedia(
  id,
  options = {}
) {
  const mediaId =
    normalizeId(id);

  const existing =
    await mediaRepository.findMediaById(
      mediaId,
      true
    );

  if (!existing) {
    throw new Error(
      "Media not found."
    );
  }

  if (
    options.hardDelete
  ) {
    await removeStoredFile({
      relativePath:
        existing.path,

      provider:
        existing.provider,
    });

    const deleted =
      await mediaRepository.deleteMedia(
        mediaId
      );

    return mapMedia(
      deleted
    );
  }

  const deleted =
    await mediaRepository.softDeleteMedia(
      mediaId
    );

  return mapMedia(
    deleted
  );
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreMedia(
  id
) {
  const mediaId =
    normalizeId(id);

  const restored =
    await mediaRepository.restoreMedia(
      mediaId
    );

  return mapMedia(
    restored
  );
}

export default {
  getMedia,

  getMediaById,
  getMediaByPath,

  registerMedia,
  updateMedia,

  deleteMedia,
  restoreMedia,
};