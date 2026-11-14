import { Router } from "express";

import prisma from "../config/prisma.js";

import authMiddleware from "../auth/auth.middleware.js";

import {
  requireRole,
} from "../middlewares/requireRole.middleware.js";

import {
  ROLES,
} from "../constants/roles.js";

import * as userService
  from "../modules/user/user.service.js";

import {
  success,
  error,
} from "../utils/response.js";

const router = Router();

// ======================================================
// ROLE CONFIGURATION
// ======================================================

const ADMIN_ROLES = Object.freeze([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
]);

const USER_MANAGEMENT_ROLES =
  Object.freeze([
    ROLES.SUPER_ADMIN,
    ROLES.ADMIN,
  ]);

// ======================================================
// MIDDLEWARE
// ======================================================

router.use(
  authMiddleware
);

router.use(
  requireRole(
    ...ADMIN_ROLES
  )
);

// ======================================================
// HELPERS
// ======================================================

function normalizeId(value) {
  if (
    typeof value !==
    "string"
  ) {
    return null;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizePagination(
  value,
  fallback
) {
  const parsed =
    Number.parseInt(
      value,
      10
    );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return fallback;
  }

  return parsed;
}

function isSuperAdmin(
  user
) {
  return (
    user?.role ===
    ROLES.SUPER_ADMIN
  );
}

function canModifyTarget(
  actor,
  target
) {
  if (!actor || !target) {
    return false;
  }

  // Super admin dapat mengelola
  // semua akun.
  if (
    isSuperAdmin(actor)
  ) {
    return true;
  }

  // Admin tidak boleh mengubah
  // Super Admin.
  if (
    target.role ===
    ROLES.SUPER_ADMIN
  ) {
    return false;
  }

  return true;
}

// ======================================================
// OVERVIEW
// ======================================================

router.get(
  "/overview",
  async (
    req,
    res,
    next
  ) => {
    try {
      const [
        users,
        news,
        agendas,
        galleries,
        forums,
        contactMessages,
      ] =
        await Promise.all([
          prisma.user.count({
            where: {
              deletedAt: null,
            },
          }),

          prisma.news.count({
            where: {
              deletedAt: null,
            },
          }),

          prisma.agenda.count({
            where: {
              deletedAt: null,
            },
          }),

          prisma.gallery.count({
            where: {
              deletedAt: null,
            },
          }),

          prisma.forum.count({
            where: {
              deletedAt: null,
            },
          }),

          prisma.contactMessage.count(),
        ]);

      return success(
        res,
        {
          totals: {
            users,
            news,
            agendas,
            galleries,
            forums,
            contactMessages,
          },
        },
        "Admin overview berhasil diambil"
      );
    } catch (err) {
      return next(err);
    }
  }
);

// ======================================================
// USERS
// ======================================================

router.get(
  "/users",
  async (
    req,
    res,
    next
  ) => {
    try {
      const page =
        normalizePagination(
          req.query.page,
          1
        );

      const limit =
        Math.min(
          normalizePagination(
            req.query.limit,
            20
          ),
          100
        );

      const search =
        typeof req.query.search ===
        "string"
          ? req.query.search.trim()
          : "";

      const role =
        typeof req.query.role ===
        "string"
          ? req.query.role
              .trim()
              .toUpperCase()
          : undefined;

      const status =
        typeof req.query.status ===
        "string"
          ? req.query.status
              .trim()
              .toUpperCase()
          : undefined;

      const result =
        await userService.getUsers({
          page,
          limit,
          search,
          role,
          status,
        });

      return success(
        res,
        result.items,
        "Users berhasil diambil",
        200,
        result.pagination
      );
    } catch (err) {
      return next(err);
    }
  }
);

// ======================================================
// UPDATE ROLE
// ======================================================

router.patch(
  "/users/:id/role",
  async (
    req,
    res,
    next
  ) => {
    try {
      if (
        !USER_MANAGEMENT_ROLES.includes(
          req.user.role
        )
      ) {
        return error(
          res,
          "Anda tidak memiliki akses untuk mengubah role.",
          403
        );
      }

      const userId =
        normalizeId(
          req.params.id
        );

      if (!userId) {
        return error(
          res,
          "User ID tidak valid.",
          400
        );
      }

      const requestedRole =
        typeof req.body?.role ===
        "string"
          ? req.body.role
              .trim()
              .toUpperCase()
          : null;

      const allowedRoles =
        Object.values(
          ROLES
        );

      if (
        !requestedRole ||
        !allowedRoles.includes(
          requestedRole
        )
      ) {
        return error(
          res,
          "Role tidak valid.",
          400
        );
      }

      const target =
        await userService.getUserById(
          userId
        );

      if (!target) {
        return error(
          res,
          "User tidak ditemukan.",
          404
        );
      }

      if (
        !canModifyTarget(
          req.user,
          target
        )
      ) {
        return error(
          res,
          "Anda tidak dapat mengubah akun ini.",
          403
        );
      }

      // Hanya SUPER_ADMIN yang
      // boleh memberikan SUPER_ADMIN.
      if (
        requestedRole ===
          ROLES.SUPER_ADMIN &&
        !isSuperAdmin(
          req.user
        )
      ) {
        return error(
          res,
          "Hanya SUPER_ADMIN yang dapat memberikan role SUPER_ADMIN.",
          403
        );
      }

      // Admin tidak boleh
      // mengubah role dirinya sendiri
      // menjadi SUPER_ADMIN.
      if (
        target.id ===
          req.user.id &&
        requestedRole ===
          ROLES.SUPER_ADMIN &&
        !isSuperAdmin(
          req.user
        )
      ) {
        return error(
          res,
          "Operasi role tidak diizinkan.",
          403
        );
      }

      const updated =
        await userService.updateUser(
          userId,
          {
            role:
              requestedRole,
          }
        );

      return success(
        res,
        updated,
        "Role user berhasil diperbarui"
      );
    } catch (err) {
      return next(err);
    }
  }
);

// ======================================================
// UPDATE STATUS
// ======================================================

router.patch(
  "/users/:id/status",
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        normalizeId(
          req.params.id
        );

      if (!userId) {
        return error(
          res,
          "User ID tidak valid.",
          400
        );
      }

      const requestedStatus =
        typeof req.body?.status ===
        "string"
          ? req.body.status
              .trim()
              .toUpperCase()
          : null;

      const allowedStatuses =
        [
          "ACTIVE",
          "PENDING",
          "SUSPENDED",
          "BANNED",
        ];

      if (
        !requestedStatus ||
        !allowedStatuses.includes(
          requestedStatus
        )
      ) {
        return error(
          res,
          "Status user tidak valid.",
          400
        );
      }

      const target =
        await userService.getUserById(
          userId
        );

      if (!target) {
        return error(
          res,
          "User tidak ditemukan.",
          404
        );
      }

      if (
        !canModifyTarget(
          req.user,
          target
        )
      ) {
        return error(
          res,
          "Anda tidak dapat mengubah akun ini.",
          403
        );
      }

      // Jangan izinkan admin
      // menonaktifkan dirinya sendiri.
      if (
        target.id ===
          req.user.id &&
        requestedStatus !==
          "ACTIVE"
      ) {
        return error(
          res,
          "Anda tidak dapat menonaktifkan akun sendiri.",
          400
        );
      }

      const updated =
        await userService.updateUser(
          userId,
          {
            status:
              requestedStatus,

            isActive:
              requestedStatus ===
              "ACTIVE",
          }
        );

      return success(
        res,
        updated,
        "Status user berhasil diperbarui"
      );
    } catch (err) {
      return next(err);
    }
  }
);

export default router;