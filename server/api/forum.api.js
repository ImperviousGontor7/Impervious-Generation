import { Router } from "express";

import authMiddleware from "../auth/auth.middleware.js";
import { success, error } from "../utils/response.js";
import { ROLES } from "../constants/roles.js";
import {
  findAllForums,
  findForumById,
  createForum,
  updateForum,
  incrementForumViews,
  incrementForumLikes,
  decrementForumLikes,
  softDeleteForum,
  restoreForum,
} from "../repositories/forum.repository.js";

const router = Router();

const CMS_ROLES = new Set([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
]);

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function canManage(req, res) {
  if (!req.user) {
    return error(res, "Unauthorized", 401);
  }

  if (!CMS_ROLES.has(req.user.role)) {
    return error(res, "Forbidden", 403);
  }

  return true;
}

function canOwnOrManage(req, res, forum) {
  if (!req.user) {
    return error(res, "Unauthorized", 401);
  }

  if (CMS_ROLES.has(req.user.role)) return true;

  if (forum?.authorId && forum.authorId === req.user.id) return true;

  return error(res, "Forbidden", 403);
}

// PUBLIC READ ROUTES
router.get("/", async (req, res, next) => {
  try {
    const forums = await findAllForums(false);
    return success(res, forums, "Forum berhasil diambil");
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const forum = await findForumById(req.params.id, true);

    if (!forum) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    return success(res, forum, "Forum berhasil diambil");
  } catch (err) {
    return next(err);
  }
});

router.get("/:id/views", async (req, res, next) => {
  try {
    const forum = await findForumById(req.params.id);

    if (!forum) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    const updated = await incrementForumViews(req.params.id);

    return success(res, updated, "Views berhasil ditambahkan");
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/like", async (req, res, next) => {
  try {
    const forum = await findForumById(req.params.id);

    if (!forum) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    const updated = await incrementForumLikes(req.params.id);

    return success(res, updated, "Like berhasil ditambahkan");
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/unlike", async (req, res, next) => {
  try {
    const forum = await findForumById(req.params.id);

    if (!forum) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    const updated = await decrementForumLikes(req.params.id);

    return success(res, updated, "Like berhasil dikurangi");
  } catch (err) {
    return next(err);
  }
});

// PROTECTED WRITE ROUTES
router.use(authMiddleware);

router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return error(res, "Unauthorized", 401);
    }

    const title = normalizeText(req.body?.title);
    const content = normalizeText(req.body?.content);

    if (!title || !content) {
      return error(res, "title dan content wajib diisi", 400);
    }

    const forum = await createForum({
      title,
      content,
      authorId: req.user.id,
      views: parseNumber(req.body?.views, 0),
      likes: parseNumber(req.body?.likes, 0),
    });

    return success(res, forum, "Forum berhasil dibuat", 201);
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const existing = await findForumById(req.params.id, true);

    if (!existing) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    if (!canOwnOrManage(req, res, existing)) return;

    const forum = await updateForum(req.params.id, {
      ...(req.body.title !== undefined && {
        title: normalizeText(req.body.title),
      }),
      ...(req.body.content !== undefined && {
        content: normalizeText(req.body.content),
      }),
      ...(req.body.views !== undefined && {
        views: parseNumber(req.body.views, existing.views),
      }),
      ...(req.body.likes !== undefined && {
        likes: parseNumber(req.body.likes, existing.likes),
      }),
    });

    return success(res, forum, "Forum berhasil diperbarui");
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const existing = await findForumById(req.params.id, true);

    if (!existing) {
      return error(res, "Forum tidak ditemukan", 404);
    }

    if (!canOwnOrManage(req, res, existing)) return;

    const forum = await softDeleteForum(req.params.id);

    return success(res, forum, "Forum berhasil dihapus");
  } catch (err) {
    return next(err);
  }
});

router.patch("/:id/restore", async (req, res, next) => {
  try {
    if (!canManage(req, res)) return;

    const forum = await restoreForum(req.params.id);

    return success(res, forum, "Forum berhasil dipulihkan");
  } catch (err) {
    return next(err);
  }
});

export default router;