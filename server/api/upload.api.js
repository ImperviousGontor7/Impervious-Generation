import {
  Router,
} from "express";

import path from "node:path";

import authMiddleware
  from "../auth/auth.middleware.js";

import {
  requireRole,
} from "../middlewares/requireRole.middleware.js";

import {
  imageUpload,
  documentUpload,
  avatarUpload,
  galleryUpload,
  processImage,
  processDocument,
  processAvatar,
  processGallery,
} from "../middlewares/upload.middleware.js";

import {
  success,
  error,
} from "../utils/response.js";

import {
  HTTP_STATUS,
} from "../constants/httpStatus.js";

import {
  ROLES,
} from "../constants/roles.js";

import STORAGE
  from "../config/storage.js";

import * as mediaService
  from "../modules/media/media.service.js";

const router =
  Router();

const ADMIN_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
];

router.use(
  authMiddleware,
);

router.use(
  requireRole(
    ...ADMIN_ROLES,
  ),
);

function getRelativePath(
  file,
) {
  if (
    !file?.path
  ) {
    return null;
  }

  return path
    .relative(
      STORAGE.folders.root,
      file.path,
    )
    .split(
      path.sep,
    )
    .join("/");
}

function getFolderFromPath(
  relativePath,
) {
  if (
    !relativePath
  ) {
    return null;
  }

  return String(
    relativePath,
  )
    .split(
      "/",
    )
    .filter(Boolean)[0]
    || null;
}

function buildMediaData(
  file,
  userId,
) {
  const relativePath =
    getRelativePath(
      file,
    );

  if (
    !relativePath
  ) {
    throw new Error(
      "Uploaded file path is invalid.",
    );
  }

  const folder =
    getFolderFromPath(
      relativePath,
    );

  return {
    originalName:
      file.originalname,

    filename:
      file.filename,

    mimeType:
      file.mimetype,

    size:
      file.size,

    path:
      relativePath,

    url:
      file.url,

    folder,

    provider:
      STORAGE.provider,

    uploaderId:
      userId,
  };
}

// ======================================================
// IMAGE
// ======================================================

router.post(
  "/image",

  imageUpload.single(
    "image",
  ),

  processImage,

  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !req.file
      ) {
        return error(
          res,
          "Image wajib diunggah.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const media =
        await mediaService.registerMedia(
          buildMediaData(
            req.file,
            req.user.id,
          ),
        );

      return success(
        res,
        media,
        "Upload image berhasil",
        HTTP_STATUS.CREATED,
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// DOCUMENT
// ======================================================

router.post(
  "/document",

  documentUpload.single(
    "document",
  ),

  processDocument,

  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !req.file
      ) {
        return error(
          res,
          "Document wajib diunggah.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const media =
        await mediaService.registerMedia(
          buildMediaData(
            req.file,
            req.user.id,
          ),
        );

      return success(
        res,
        media,
        "Upload dokumen berhasil",
        HTTP_STATUS.CREATED,
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// AVATAR
// ======================================================

router.post(
  "/avatar",

  avatarUpload.single(
    "avatar",
  ),

  processAvatar,

  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !req.file
      ) {
        return error(
          res,
          "Avatar wajib diunggah.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const media =
        await mediaService.registerMedia(
          buildMediaData(
            req.file,
            req.user.id,
          ),
        );

      return success(
        res,
        media,
        "Upload avatar berhasil",
        HTTP_STATUS.CREATED,
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// GALLERY
// ======================================================

router.post(
  "/gallery",

  galleryUpload.single(
    "gallery",
  ),

  processGallery,

  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !req.file
      ) {
        return error(
          res,
          "Gallery image wajib diunggah.",
          HTTP_STATUS.BAD_REQUEST,
        );
      }

      const media =
        await mediaService.registerMedia(
          buildMediaData(
            req.file,
            req.user.id,
          ),
        );

      return success(
        res,
        media,
        "Upload gallery berhasil",
        HTTP_STATUS.CREATED,
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// MEDIA LIBRARY
// ======================================================

router.get(
  "/media",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const result =
        await mediaService.getMedia({
          page:
            req.query.page,

          limit:
            req.query.limit,

          folder:
            req.query.folder,

          search:
            req.query.search,

          mimeType:
            req.query.mimeType,

          provider:
            req.query.provider,
        });

      return success(
        res,
        result.items,
        "Media berhasil diambil",
        HTTP_STATUS.OK,
        result.pagination,
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// MEDIA DETAIL
// ======================================================

router.get(
  "/media/:id",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const media =
        await mediaService.getMediaById(
          req.params.id,
        );

      if (!media) {
        return error(
          res,
          "Media tidak ditemukan.",
          HTTP_STATUS.NOT_FOUND,
        );
      }

      return success(
        res,
        media,
        "Media berhasil diambil",
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// DELETE MEDIA
// ======================================================

router.delete(
  "/media/:id",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const media =
        await mediaService.deleteMedia(
          req.params.id,
          {
            hardDelete:
              req.query.hard ===
              "true",
          },
        );

      return success(
        res,
        media,
        "Media berhasil dihapus",
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// RESTORE MEDIA
// ======================================================

router.post(
  "/media/:id/restore",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const media =
        await mediaService.restoreMedia(
          req.params.id,
        );

      return success(
        res,
        media,
        "Media berhasil dipulihkan",
      );
    } catch (
      err
    ) {
      return next(err);
    }
  },
);

// ======================================================
// STATUS
// ======================================================

router.get(
  "/status",
  async (
    req,
    res,
  ) => {
    return success(
      res,
      {
        provider:
          STORAGE.provider,

        allowedRoles:
          ADMIN_ROLES,

        uploadsRoot:
          STORAGE.root,

        folders:
          STORAGE.folderPaths,

        supported: {
          image: true,

          document: true,

          avatar: true,

          gallery: true,
        },
      },
      "Upload service aktif",
    );
  },
);

export default router;