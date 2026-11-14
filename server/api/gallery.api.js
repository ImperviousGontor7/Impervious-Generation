import { Router } from "express";

import authMiddleware from "../auth/auth.middleware.js";

import { requireRole } from "../middlewares/requireRole.middleware.js";

import { ROLES } from "../constants/roles.js";

import {
  galleryUpload,
  processGallery,
} from "../middlewares/upload.middleware.js";

import {
  success,
  error,
} from "../utils/response.js";

import {
  findAllGalleries,
  findGalleryById,
  createGallery,
  updateGallery,
  updateGalleryStatus,
  softDeleteGallery,
  restoreGallery,
  deleteGallery,
} from "../modules/gallery/gallery.repository.js";

const router = Router();

const CMS_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
];

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

// ======================================================
// PUBLIC
// ======================================================

router.get("/", async (req, res, next) => {
  try {
    const galleries = await findAllGalleries(false);

    return success(
      res,
      galleries,
      "Gallery berhasil diambil",
    );
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const gallery = await findGalleryById(
      req.params.id,
      false,
    );

    if (!gallery) {
      return error(
        res,
        "Gallery tidak ditemukan",
        404,
      );
    }

    return success(
      res,
      gallery,
      "Gallery berhasil diambil",
    );
  } catch (err) {
    return next(err);
  }
});

// ======================================================
// PROTECTED
// ======================================================

router.use(authMiddleware);
router.use(requireRole(...CMS_ROLES));

// ======================================================
// CREATE
// ======================================================

router.post(
  "/",
  galleryUpload.single("image"),
  processGallery,
  async (req, res, next) => {
    try {
      if (!req.file?.path) {
        return error(
          res,
          "image wajib diunggah",
          400,
        );
      }

      const gallery = await createGallery({
        title: text(req.body.title) || null,
        image: req.file.path,
        caption: text(req.body.caption) || null,
        status: text(req.body.status) || "PUBLISHED",
        uploaderId: req.user.id,
      });

      return success(
        res,
        gallery,
        "Gallery berhasil dibuat",
        201,
      );
    } catch (err) {
      return next(err);
    }
  },
);

// ======================================================
// UPDATE
// ======================================================

router.patch(
  "/:id",
  galleryUpload.single("image"),
  processGallery,
  async (req, res, next) => {
    try {
      const existing = await findGalleryById(
        req.params.id,
        true,
      );

      if (!existing) {
        return error(
          res,
          "Gallery tidak ditemukan",
          404,
        );
      }

      const data = {};

      if (req.body.title !== undefined) {
        data.title = text(req.body.title) || null;
      }

      if (req.body.caption !== undefined) {
        data.caption = text(req.body.caption) || null;
      }

      if (req.body.status !== undefined) {
        data.status = text(req.body.status);
      }

      if (req.file?.path) {
        data.image = req.file.path;
      }

      const gallery = await updateGallery(
        req.params.id,
        data,
      );

      return success(
        res,
        gallery,
        "Gallery berhasil diperbarui",
      );
    } catch (err) {
      return next(err);
    }
  },
);

// ======================================================
// STATUS
// ======================================================

router.patch("/:id/status", async (req, res, next) => {
  try {
    const status = text(req.body.status);

    if (!status) {
      return error(
        res,
        "status wajib diisi",
        400,
      );
    }

    const existing = await findGalleryById(
      req.params.id,
      true,
    );

    if (!existing) {
      return error(
        res,
        "Gallery tidak ditemukan",
        404,
      );
    }

    const gallery = await updateGalleryStatus(
      req.params.id,
      status,
    );

    return success(
      res,
      gallery,
      "Status gallery berhasil diperbarui",
    );
  } catch (err) {
    return next(err);
  }
});

// ======================================================
// DELETE
// ======================================================

router.delete("/:id", async (req, res, next) => {
  try {
    const existing = await findGalleryById(
      req.params.id,
      true,
    );

    if (!existing) {
      return error(
        res,
        "Gallery tidak ditemukan",
        404,
      );
    }

    const deleted = await softDeleteGallery(
      req.params.id,
    );

    return success(
      res,
      deleted,
      "Gallery berhasil dihapus",
    );
  } catch (err) {
    return next(err);
  }
});

// ======================================================
// RESTORE
// ======================================================

router.patch("/:id/restore", async (req, res, next) => {
  try {
    const existing = await findGalleryById(
      req.params.id,
      true,
    );

    if (!existing) {
      return error(
        res,
        "Gallery tidak ditemukan",
        404,
      );
    }

    const restored = await restoreGallery(
      req.params.id,
    );

    return success(
      res,
      restored,
      "Gallery berhasil dipulihkan",
    );
  } catch (err) {
    return next(err);
  }
});

// ======================================================
// PERMANENT DELETE
// ======================================================

router.delete("/:id/permanent", async (req, res, next) => {
  try {
    const existing = await findGalleryById(
      req.params.id,
      true,
    );

    if (!existing) {
      return error(
        res,
        "Gallery tidak ditemukan",
        404,
      );
    }

    const removed = await deleteGallery(
      req.params.id,
    );

    return success(
      res,
      removed,
      "Gallery berhasil dihapus permanen",
    );
  } catch (err) {
    return next(err);
  }
});

export default router;