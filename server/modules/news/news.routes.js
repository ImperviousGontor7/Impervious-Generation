// ======================================================
// NEWS ROUTES
// ======================================================

import { Router } from "express";

import {
  createNews,
  getNews,
  getPublishedNews,
  getNewsById,
  getNewsBySlug,
  updateNews,
  publishNews,
  archiveNews,
  draftNews,
  deleteNews,
  restoreNews,
  incrementNewsViews,
} from "./news.controller.js";

import {
  newsCreateSchema,
  newsUpdateSchema,
  newsListSchema,
  newsIdSchema,
  newsSlugSchema,
} from "./news.schema.js";

import {
  validateBody,
  validateQuery,
  validateParams,
} from "../../middlewares/validate.middleware.js";

import {
  requireAuth,
} from "../../auth/auth.middleware.js";

import {
  requireRole,
} from "../../middlewares/requireRole.middleware.js";

import {
  CMS_ROLES,
} from "../../constants/roles.js";

// ======================================================
// ROUTER
// ======================================================

const router = Router();

// ======================================================
// PUBLIC
// ======================================================

// GET /api/news
router.get(
  "/",
  validateQuery(
    newsListSchema,
  ),
  getNews,
);

// GET /api/news/published
router.get(
  "/published",
  validateQuery(
    newsListSchema,
  ),
  getPublishedNews,
);

// GET /api/news/slug/:slug
router.get(
  "/slug/:slug",
  validateParams(
    newsSlugSchema,
  ),
  getNewsBySlug,
);

// GET /api/news/:id
router.get(
  "/:id",
  validateParams(
    newsIdSchema,
  ),
  getNewsById,
);

// POST /api/news/:id/view
router.post(
  "/:id/view",
  validateParams(
    newsIdSchema,
  ),
  incrementNewsViews,
);

// ======================================================
// CMS
// ======================================================

// POST /api/news
router.post(
  "/",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateBody(
    newsCreateSchema,
  ),
  createNews,
);

// PATCH /api/news/:id
router.patch(
  "/:id",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  validateBody(
    newsUpdateSchema,
  ),
  updateNews,
);

// PATCH /api/news/:id/publish
router.patch(
  "/:id/publish",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  publishNews,
);

// PATCH /api/news/:id/archive
router.patch(
  "/:id/archive",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  archiveNews,
);

// PATCH /api/news/:id/draft
router.patch(
  "/:id/draft",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  draftNews,
);

// DELETE /api/news/:id
router.delete(
  "/:id",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  deleteNews,
);

// PATCH /api/news/:id/restore
router.patch(
  "/:id/restore",
  requireAuth,
  requireRole(
    ...CMS_ROLES,
  ),
  validateParams(
    newsIdSchema,
  ),
  restoreNews,
);

// ======================================================
// EXPORT
// ======================================================

export default router;