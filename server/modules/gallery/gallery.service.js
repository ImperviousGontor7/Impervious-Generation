import * as galleryRepository
  from "./gallery.repository.js";

const MANAGER_ROLES =
  new Set([
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR",
  ]);

const GALLERY_STATUSES =
  new Set([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]);

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

function normalizeId(id) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "Gallery ID is required."
    );
  }

  return normalized;
}

function assertActor(
  actor
) {
  if (!actor?.id) {
    throw new Error(
      "Authenticated user is required."
    );
  }
}

function canManage(
  actor
) {
  return MANAGER_ROLES.has(
    String(
      actor?.role || ""
    ).toUpperCase()
  );
}

function assertOwnerOrManager(
  gallery,
  actor
) {
  assertActor(actor);

  const isOwner =
    gallery.uploaderId ===
    actor.id;

  if (
    !isOwner &&
    !canManage(actor)
  ) {
    throw new Error(
      "Forbidden."
    );
  }
}

function normalizeStatus(
  status
) {
  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    return undefined;
  }

  const normalized =
    String(status)
      .trim()
      .toUpperCase();

  if (
    !GALLERY_STATUSES.has(
      normalized
    )
  ) {
    throw new Error(
      "Invalid gallery status."
    );
  }

  return normalized;
}

export async function getGalleries(
  options = {}
) {
  return galleryRepository
    .findAllGalleries(
      Boolean(
        options.includeDeleted
      )
    );
}

export async function getGalleryById(
  id,
  options = {}
) {
  return galleryRepository
    .findGalleryById(
      normalizeId(id),
      Boolean(
        options.includeDeleted
      )
    );
}

export async function createGallery(
  data,
  actor
) {
  assertActor(actor);

  const image =
    normalizeString(
      data?.image
    );

  if (!image) {
    throw new Error(
      "Gallery image is required."
    );
  }

  const title =
    normalizeString(
      data?.title
    );

  const caption =
    normalizeString(
      data?.caption
    );

  const status =
    normalizeStatus(
      data?.status
    ) ??
    "PUBLISHED";

  return galleryRepository
    .createGallery({
      title,
      image,
      caption,
      status,

      uploaderId:
        actor.id,
    });
}

export async function updateGallery(
  id,
  data,
  actor
) {
  const galleryId =
    normalizeId(id);

  const existing =
    await galleryRepository
      .findGalleryById(
        galleryId,
        true
      );

  if (!existing) {
    return null;
  }

  assertOwnerOrManager(
    existing,
    actor
  );

  const payload = {};

  if (
    data?.title !==
    undefined
  ) {
    payload.title =
      normalizeString(
        data.title
      );
  }

  if (
    data?.image !==
    undefined
  ) {
    const image =
      normalizeString(
        data.image
      );

    if (!image) {
      throw new Error(
        "Gallery image cannot be empty."
      );
    }

    payload.image =
      image;
  }

  if (
    data?.caption !==
    undefined
  ) {
    payload.caption =
      normalizeString(
        data.caption
      );
  }

  if (
    data?.status !==
    undefined
  ) {
    payload.status =
      normalizeStatus(
        data.status
      );
  }

  if (
    Object.keys(payload)
      .length === 0
  ) {
    throw new Error(
      "No gallery fields to update."
    );
  }

  return galleryRepository
    .updateGallery(
      galleryId,
      payload
    );
}

export async function updateGalleryStatus(
  id,
  status,
  actor
) {
  const galleryId =
    normalizeId(id);

  const existing =
    await galleryRepository
      .findGalleryById(
        galleryId,
        true
      );

  if (!existing) {
    return null;
  }

  if (!canManage(actor)) {
    throw new Error(
      "Forbidden."
    );
  }

  return galleryRepository
    .updateGalleryStatus(
      galleryId,
      normalizeStatus(status)
    );
}

export async function deleteGallery(
  id,
  actor
) {
  const galleryId =
    normalizeId(id);

  const existing =
    await galleryRepository
      .findGalleryById(
        galleryId,
        true
      );

  if (!existing) {
    return null;
  }

  assertOwnerOrManager(
    existing,
    actor
  );

  return galleryRepository
    .softDeleteGallery(
      galleryId
    );
}

export async function restoreGallery(
  id,
  actor
) {
  if (!canManage(actor)) {
    throw new Error(
      "Forbidden."
    );
  }

  return galleryRepository
    .restoreGallery(
      normalizeId(id)
    );
}

export async function permanentlyDeleteGallery(
  id,
  actor
) {
  if (!canManage(actor)) {
    throw new Error(
      "Forbidden."
    );
  }

  return galleryRepository
    .deleteGallery(
      normalizeId(id)
    );
}

export default {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  updateGalleryStatus,
  deleteGallery,
  restoreGallery,
  permanentlyDeleteGallery,
};