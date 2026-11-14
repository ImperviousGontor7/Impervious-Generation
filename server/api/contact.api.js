import { Router } from "express";
import authMiddleware from "../auth/auth.middleware.js";
import { success, error } from "../utils/response.js";
import { ROLES } from "../constants/roles.js";
import {
  createContactMessage,
  findAllContactMessages,
  findContactMessageById,
  updateContactMessage,
  updateContactMessageStatus,
  softDeleteContactMessage,
  restoreContactMessage,
} from "../repositories/contact.repository.js";

const router = Router();

const CMS_ROLES = new Set([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
]);

function canManage(req, res) {
  if (!req.user) {
    error(res, "Unauthorized", 401);
    return false;
  }

  if (!CMS_ROLES.has(req.user.role)) {
    error(res, "Forbidden", 403);
    return false;
  }

  return true;
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const messages = await findAllContactMessages(false);

    return success(res, messages, "Pesan kontak berhasil diambil");
  } catch (error_) {
    return next(error_);
  }
});

router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const message = await findContactMessageById(
      req.params.id,
      true
    );

    if (!message) {
      return error(res, "Pesan kontak tidak ditemukan", 404);
    }

    return success(res, message, "Pesan kontak berhasil diambil");
  } catch (error_) {
    return next(error_);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const name = normalizeText(req.body?.name);
    const email = normalizeText(req.body?.email).toLowerCase();
    const subject =
      normalizeText(req.body?.subject) || null;
    const message = normalizeText(req.body?.message);

    if (!name || !email || !message) {
      return error(
        res,
        "name, email, dan message wajib diisi",
        400
      );
    }

    const created = await createContactMessage({
      name,
      email,
      subject,
      message,
      userId: req.user?.id ?? null,
      status: "UNREAD",
    });

    return success(
      res,
      created,
      "Pesan kontak berhasil dikirim",
      201
    );
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await findContactMessageById(
      req.params.id,
      true
    );

    if (!existing) {
      return error(res, "Pesan kontak tidak ditemukan", 404);
    }

    const updated = await updateContactMessage(
      req.params.id,
      {
        ...(req.body.name !== undefined && {
          name: normalizeText(req.body.name),
        }),
        ...(req.body.email !== undefined && {
          email: normalizeText(req.body.email).toLowerCase(),
        }),
        ...(req.body.subject !== undefined && {
          subject: normalizeText(req.body.subject) || null,
        }),
        ...(req.body.message !== undefined && {
          message: normalizeText(req.body.message),
        }),
        ...(req.body.status !== undefined && {
          status: req.body.status,
        }),
        ...(req.body.userId !== undefined && {
          userId: req.body.userId || null,
        }),
      }
    );

    return success(res, updated, "Pesan kontak berhasil diperbarui");
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id/status", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await findContactMessageById(
      req.params.id,
      true
    );

    if (!existing) {
      return error(res, "Pesan kontak tidak ditemukan", 404);
    }

    const status = normalizeText(req.body.status);

    if (!status) {
      return error(res, "status wajib diisi", 400);
    }

    const updated = await updateContactMessageStatus(
      req.params.id,
      status
    );

    return success(res, updated, "Status pesan berhasil diperbarui");
  } catch (error_) {
    return next(error_);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await findContactMessageById(
      req.params.id,
      true
    );

    if (!existing) {
      return error(res, "Pesan kontak tidak ditemukan", 404);
    }

    const deleted = await softDeleteContactMessage(req.params.id);

    return success(res, deleted, "Pesan kontak berhasil dihapus");
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id/restore", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const restored = await restoreContactMessage(req.params.id);

    return success(res, restored, "Pesan kontak berhasil dipulihkan");
  } catch (error_) {
    return next(error_);
  }
});

export default router;