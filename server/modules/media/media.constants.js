// ======================================================
// MEDIA CONSTANTS
// ======================================================

export const MEDIA_PROVIDERS =
  Object.freeze({
    LOCAL: "local",
    CLOUD: "cloud",
  });

// ======================================================
// FOLDERS
// ======================================================

export const MEDIA_FOLDERS =
  Object.freeze({
    TEMP: "temp",

    IMAGES: "images",

    DOCUMENTS: "documents",

    AVATARS: "avatars",

    GALLERIES: "galleries",
  });

// ======================================================
// MIME GROUPS
// ======================================================

export const MEDIA_TYPES =
  Object.freeze({
    IMAGE: "image",

    DOCUMENT: "document",

    OTHER: "other",
  });

// ======================================================
// HELPERS
// ======================================================

export function normalizeMediaProvider(
  provider
) {
  const normalized =
    String(
      provider || ""
    )
      .trim()
      .toLowerCase();

  if (
    normalized ===
    MEDIA_PROVIDERS.CLOUD
  ) {
    return MEDIA_PROVIDERS.CLOUD;
  }

  return MEDIA_PROVIDERS.LOCAL;
}

export function getMediaType(
  mimeType
) {
  const normalized =
    String(
      mimeType || ""
    )
      .trim()
      .toLowerCase();

  if (
    normalized.startsWith(
      "image/"
    )
  ) {
    return MEDIA_TYPES.IMAGE;
  }

  if (
    normalized ===
      "application/pdf" ||
    normalized.includes(
      "document"
    ) ||
    normalized.includes(
      "spreadsheet"
    ) ||
    normalized.includes(
      "text/"
    )
  ) {
    return MEDIA_TYPES.DOCUMENT;
  }

  return MEDIA_TYPES.OTHER;
}

export default {
  MEDIA_PROVIDERS,

  MEDIA_FOLDERS,

  MEDIA_TYPES,

  normalizeMediaProvider,

  getMediaType,
};