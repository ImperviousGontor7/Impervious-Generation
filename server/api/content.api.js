import express from "express";

import {
  asyncHandler,
} from "../utils/async.handler.js";

import {
  requireAuth,
} from "../auth/auth.middleware.js";

import {
  requireRole,
} from "../middlewares/requireRole.middleware.js";

import {
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryList,
} from "../modules/category/category.validator.js";

import * as categoryService
  from "../modules/category/category.service.js";

import {
  validateCreateNews,
  validateUpdateNews,
  validateNewsList,
} from "../modules/news/news.validator.js";

import * as newsService
  from "../modules/news/news.service.js";

import {
  ROLES,
} from "../constants/roles.js";

const router =
  express.Router();

// ======================================================
// CATEGORY — PUBLIC READ
// ======================================================

router.get(
  "/categories",

  validateCategoryList,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const result =
        await categoryService.getCategories(
          req.validated.query,
        );

      return res.json({
        success: true,

        data: result,
      });
    },
  ),
);

router.get(
  "/categories/:id",

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const category =
        await categoryService.getCategoryById(
          req.params.id,
        );

      if (!category) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Category not found.",
          });
      }

      return res.json({
        success: true,

        data: category,
      });
    },
  ),
);

router.get(
  "/categories/slug/:slug",

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const category =
        await categoryService.getCategoryBySlug(
          req.params.slug,
        );

      if (!category) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "Category not found.",
          });
      }

      return res.json({
        success: true,

        data: category,
      });
    },
  ),
);

// ======================================================
// CATEGORY — ADMIN
// ======================================================

router.post(
  "/categories",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  validateCreateCategory,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const category =
        await categoryService.createCategory(
          req.validated.body,
        );

      return res
        .status(201)
        .json({
          success: true,

          data: category,
        });
    },
  ),
);

router.patch(
  "/categories/:id",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  validateUpdateCategory,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const category =
        await categoryService.updateCategory(
          req.params.id,

          req.validated.body,
        );

      return res.json({
        success: true,

        data: category,
      });
    },
  ),
);

router.delete(
  "/categories/:id",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const result =
        await categoryService.deleteCategory(
          req.params.id,
        );

      return res.json({
        success: true,

        data: result,
      });
    },
  ),
);

// ======================================================
// NEWS — PUBLIC
// ======================================================

router.get(
  "/news",

  validateNewsList,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const result =
        await newsService.getPublishedNews(
          {
            ...req.validated.query,

            publishedOnly:
              true,

            includeDeleted:
              false,
          },
        );

      return res.json({
        success: true,

        data: result,
      });
    },
  ),
);

router.get(
  "/news/:id",

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.getNewsById(
          req.params.id,
        );

      if (!news) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "News not found.",
          });
      }

      if (
        news.status !==
        "PUBLISHED"
      ) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "News not found.",
          });
      }

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.get(
  "/news/slug/:slug",

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.getNewsBySlug(
          req.params.slug,
        );

      if (!news) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "News not found.",
          });
      }

      if (
        news.status !==
        "PUBLISHED"
      ) {
        return res
          .status(404)
          .json({
            success: false,

            message:
              "News not found.",
          });
      }

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.post(
  "/news/:id/view",

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const result =
        await newsService.incrementNewsViews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: result,
      });
    },
  ),
);

// ======================================================
// NEWS — ADMIN
// ======================================================

router.get(
  "/admin/news",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  validateNewsList,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const result =
        await newsService.getNews(
          {
            ...req.validated.query,

            includeDeleted:
              true,
          },
        );

      return res.json({
        success: true,

        data: result,
      });
    },
  ),
);

router.post(
  "/admin/news",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  validateCreateNews,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.createNews(
          req.validated.body,

          req.user.id,
        );

      return res
        .status(201)
        .json({
          success: true,

          data: news,
        });
    },
  ),
);

router.patch(
  "/admin/news/:id",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  validateUpdateNews,

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.updateNews(
          req.params.id,

          req.validated.body,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.post(
  "/admin/news/:id/publish",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.publishNews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.post(
  "/admin/news/:id/archive",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.archiveNews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.post(
  "/admin/news/:id/draft",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.draftNews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.delete(
  "/admin/news/:id",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.deleteNews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

router.post(
  "/admin/news/:id/restore",

  requireAuth,

  requireRole(
    ROLES.ADMIN,
  ),

  asyncHandler(
    async (
      req,
      res,
    ) => {
      const news =
        await newsService.restoreNews(
          req.params.id,
        );

      return res.json({
        success: true,

        data: news,
      });
    },
  ),
);

export default router;