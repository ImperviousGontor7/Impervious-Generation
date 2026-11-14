import { Router } from "express";

import prisma from "../config/prisma.js";
import authMiddleware from "../auth/auth.middleware.js";
import { success, error } from "../utils/response.js";
import { ROLES } from "../constants/roles.js";

const router = Router();

const CMS_ROLES = new Set([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
]);

const aboutSelect = {
  id: true,
  key: true,
  title: true,
  content: true,
  image: true,
  order: true,
  isActive: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  author: {
    select: {
      id: true,
      username: true,
      fullName: true,
      avatar: true,
      role: true,
    },
  },
};

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

function normalizeBoolean(value, fallback = true) {
  if (value === undefined) return fallback;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return Boolean(value);
}

function normalizeNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function buildCreatePayload(body, authorId) {
  return {
    key: normalizeText(body?.key),
    title: normalizeText(body?.title),
    content: normalizeText(body?.content),
    image:
      body?.image === undefined
        ? undefined
        : normalizeText(body?.image) || null,
    order:
      body?.order === undefined
        ? undefined
        : normalizeNumber(body?.order, 0),
    isActive:
      body?.isActive === undefined
        ? undefined
        : normalizeBoolean(body?.isActive, true),
    authorId,
  };
}

function buildUpdatePayload(body) {
  const data = {};

  if (body?.key !== undefined) {
    data.key = normalizeText(body.key);
  }

  if (body?.title !== undefined) {
    data.title = normalizeText(body.title);
  }

  if (body?.content !== undefined) {
    data.content = normalizeText(body.content);
  }

  if (body?.image !== undefined) {
    data.image = normalizeText(body.image) || null;
  }

  if (body?.order !== undefined) {
    data.order = normalizeNumber(body.order, 0);
  }

  if (body?.isActive !== undefined) {
    data.isActive = normalizeBoolean(body.isActive, true);
  }

  return data;
}

// ======================================================
// PUBLIC ROUTES
// ======================================================

router.get("/", async (req, res, next) => {
  try {
    const sections = await prisma.about.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      select: aboutSelect,
      orderBy: [
        { order: "asc" },
        { createdAt: "asc" },
      ],
    });

    return success(
      res,
      sections,
      "About section berhasil diambil"
    );
  } catch (error_) {
    return next(error_);
  }
});

router.get("/key/:key", async (req, res, next) => {
  try {
    const section = await prisma.about.findFirst({
      where: {
        key: req.params.key,
        deletedAt: null,
      },
      select: aboutSelect,
    });

    if (!section) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    return success(
      res,
      section,
      "About section berhasil diambil"
    );
  } catch (error_) {
    return next(error_);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const section = await prisma.about.findFirst({
      where: {
        id: req.params.id,
        deletedAt: null,
      },
      select: aboutSelect,
    });

    if (!section) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    return success(
      res,
      section,
      "About section berhasil diambil"
    );
  } catch (error_) {
    return next(error_);
  }
});

// ======================================================
// PROTECTED ROUTES
// ======================================================

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const payload = buildCreatePayload(
      req.body,
      req.user.id
    );

    if (
      !payload.key ||
      !payload.title ||
      !payload.content
    ) {
      return error(
        res,
        "key, title, dan content wajib diisi",
        400
      );
    }

    const created = await prisma.about.create({
      data: payload,
      select: aboutSelect,
    });

    return success(
      res,
      created,
      "About section berhasil dibuat",
      201
    );
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await prisma.about.findFirst({
      where: {
        id: req.params.id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    const data = buildUpdatePayload(req.body);

    if (
      data.key !== undefined &&
      !data.key
    ) {
      return error(res, "key tidak boleh kosong", 400);
    }

    if (
      data.title !== undefined &&
      !data.title
    ) {
      return error(res, "title tidak boleh kosong", 400);
    }

    if (
      data.content !== undefined &&
      !data.content
    ) {
      return error(
        res,
        "content tidak boleh kosong",
        400
      );
    }

    const updated = await prisma.about.update({
      where: {
        id: req.params.id,
      },
      data,
      select: aboutSelect,
    });

    return success(
      res,
      updated,
      "About section berhasil diperbarui"
    );
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id/status", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await prisma.about.findFirst({
      where: {
        id: req.params.id,
        deletedAt: null,
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    if (!existing) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    if (req.body?.isActive === undefined) {
      return error(
        res,
        "isActive wajib diisi",
        400
      );
    }

    const updated = await prisma.about.update({
      where: {
        id: req.params.id,
      },
      data: {
        isActive: normalizeBoolean(
          req.body.isActive,
          existing.isActive
        ),
      },
      select: aboutSelect,
    });

    return success(
      res,
      updated,
      "Status about section berhasil diperbarui"
    );
  } catch (error_) {
    return next(error_);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await prisma.about.findFirst({
      where: {
        id: req.params.id,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    const deleted = await prisma.about.update({
      where: {
        id: req.params.id,
      },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
      select: aboutSelect,
    });

    return success(
      res,
      deleted,
      "About section berhasil dihapus"
    );
  } catch (error_) {
    return next(error_);
  }
});

router.patch("/:id/restore", authMiddleware, async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const existing = await prisma.about.findFirst({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return error(
        res,
        "About section tidak ditemukan",
        404
      );
    }

    const restored = await prisma.about.update({
      where: {
        id: req.params.id,
      },
      data: {
        deletedAt: null,
        isActive: true,
      },
      select: aboutSelect,
    });

    return success(
      res,
      restored,
      "About section berhasil dipulihkan"
    );
  } catch (error_) {
    return next(error_);
  }
});

export default router;