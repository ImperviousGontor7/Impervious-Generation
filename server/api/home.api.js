import {
  Router,
} from "express";

import {
  HomePlacementType,
  HomeSectionStatus,
  HomeSectionType,
} from "@prisma/client";

import prisma from "../config/prisma.js";

import authMiddleware
  from "../auth/auth.middleware.js";

import {
  success,
  error,
} from "../utils/response.js";

import {
  CMS_ROLES,
} from "../constants/roles.js";

const router =
  Router();

const homeSelect = {
  id: true,

  key: true,

  sectionType: true,

  placement: true,

  status: true,

  title: true,

  subtitle: true,

  description: true,

  image: true,

  mobileImage: true,

  badge: true,

  ctaLabel: true,

  ctaUrl: true,

  secondaryLabel: true,

  secondaryUrl: true,

  metaTitle: true,

  metaDescription: true,

  payload: true,

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

function canManage(
  req,
  res,
) {
  if (!req.user) {
    error(
      res,
      "Unauthorized",
      401,
    );

    return false;
  }

  if (
    !CMS_ROLES.includes(
      req.user.role,
    )
  ) {
    error(
      res,
      "Forbidden",
      403,
    );

    return false;
  }

  return true;
}

function normalizeText(
  value,
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function normalizeBoolean(
  value,
  fallback = true,
) {
  if (
    value === undefined
  ) {
    return fallback;
  }

  if (
    typeof value ===
    "boolean"
  ) {
    return value;
  }

  if (
    typeof value ===
    "string"
  ) {
    return value ===
      "true";
  }

  return Boolean(
    value,
  );
}

function normalizeNumber(
  value,
  fallback = 0,
) {
  const parsed =
    Number.parseInt(
      value,
      10,
    );

  return Number.isNaN(
    parsed,
  )
    ? fallback
    : parsed;
}

function normalizeJson(
  value,
) {
  if (
    value === undefined ||
    value === null
  ) {
    return value ?? null;
  }

  if (
    typeof value ===
    "object"
  ) {
    return value;
  }

  if (
    typeof value ===
    "string"
  ) {
    try {
      return JSON.parse(
        value,
      );
    } catch {
      return null;
    }
  }

  return null;
}

function normalizeEnum(
  value,
  allowed,
  fallback,
) {
  const normalized =
    normalizeText(
      value,
    );

  return allowed.includes(
    normalized,
  )
    ? normalized
    : fallback;
}

function buildHomePayload(
  body,
  authorId,
  partial = false,
) {
  const payload = {
    key:
      body.key === undefined &&
      partial
        ? undefined
        : normalizeText(
            body.key,
          ),

    sectionType:
      body.sectionType ===
        undefined &&
      partial
        ? undefined
        : normalizeEnum(
            body.sectionType,
            Object.values(
              HomeSectionType,
            ),
            "SLIDER",
          ),

    placement:
      body.placement ===
        undefined &&
      partial
        ? undefined
        : normalizeEnum(
            body.placement,
            Object.values(
              HomePlacementType,
            ),
            "HOME_HERO",
          ),

    status:
      body.status ===
        undefined &&
      partial
        ? undefined
        : normalizeEnum(
            body.status,
            Object.values(
              HomeSectionStatus,
            ),
            "ACTIVE",
          ),

    title:
      body.title === undefined &&
      partial
        ? undefined
        : normalizeText(
            body.title,
          ),

    subtitle:
      body.subtitle ===
        undefined
        ? undefined
        : normalizeText(
            body.subtitle,
          ) || null,

    description:
      body.description ===
        undefined
        ? undefined
        : normalizeText(
            body.description,
          ) || null,

    image:
      body.image ===
        undefined
        ? undefined
        : normalizeText(
            body.image,
          ) || null,

    mobileImage:
      body.mobileImage ===
        undefined
        ? undefined
        : normalizeText(
            body.mobileImage,
          ) || null,

    badge:
      body.badge ===
        undefined
        ? undefined
        : normalizeText(
            body.badge,
          ) || null,

    ctaLabel:
      body.ctaLabel ===
        undefined
        ? undefined
        : normalizeText(
            body.ctaLabel,
          ) || null,

    ctaUrl:
      body.ctaUrl ===
        undefined
        ? undefined
        : normalizeText(
            body.ctaUrl,
          ) || null,

    secondaryLabel:
      body.secondaryLabel ===
        undefined
        ? undefined
        : normalizeText(
            body.secondaryLabel,
          ) || null,

    secondaryUrl:
      body.secondaryUrl ===
        undefined
        ? undefined
        : normalizeText(
            body.secondaryUrl,
          ) || null,

    metaTitle:
      body.metaTitle ===
        undefined
        ? undefined
        : normalizeText(
            body.metaTitle,
          ) || null,

    metaDescription:
      body.metaDescription ===
        undefined
        ? undefined
        : normalizeText(
            body.metaDescription,
          ) || null,

    payload:
      body.payload ===
        undefined
        ? undefined
        : normalizeJson(
            body.payload,
          ),

    order:
      body.order === undefined
        ? undefined
        : normalizeNumber(
            body.order,
            0,
          ),

    isActive:
      body.isActive ===
        undefined
        ? undefined
        : normalizeBoolean(
            body.isActive,
            true,
          ),

    authorId,
  };

  if (partial) {
    return payload;
  }

  if (
    !payload.key ||
    !payload.title
  ) {
    throw new Error(
      "key dan title wajib diisi.",
    );
  }

  return payload;
}

function listWhere(
  extra = {},
) {
  return {
    deletedAt: null,

    isActive: true,

    ...extra,
  };
}

// ======================================================
// PUBLIC
// ======================================================

router.get(
  "/",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const sections =
        await prisma.home.findMany({
          where:
            listWhere(),

          select:
            homeSelect,

          orderBy: [
            {
              placement:
                "asc",
            },

            {
              order:
                "asc",
            },

            {
              createdAt:
                "asc",
            },
          ],
        });

      return success(
        res,
        sections,
        "Home section berhasil diambil",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.get(
  "/placement/:placement",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const placement =
        normalizeEnum(
          req.params.placement,
          Object.values(
            HomePlacementType,
          ),
          "",
        );

      if (!placement) {
        return error(
          res,
          "Placement tidak valid",
          400,
        );
      }

      const sections =
        await prisma.home.findMany({
          where:
            listWhere({
              placement,
            }),

          select:
            homeSelect,

          orderBy: [
            {
              order:
                "asc",
            },

            {
              createdAt:
                "asc",
            },
          ],
        });

      return success(
        res,
        sections,
        "Home placement berhasil diambil",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.get(
  "/key/:key",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const section =
        await prisma.home.findFirst({
          where: {
            key:
              req.params.key,

            deletedAt:
              null,
          },

          select:
            homeSelect,
        });

      if (!section) {
        return error(
          res,
          "Home section tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        section,
        "Home section berhasil diambil",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.get(
  "/section/:sectionType",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const sectionType =
        normalizeEnum(
          req.params.sectionType,
          Object.values(
            HomeSectionType,
          ),
          "",
        );

      if (!sectionType) {
        return error(
          res,
          "Section type tidak valid",
          400,
        );
      }

      const sections =
        await prisma.home.findMany({
          where:
            listWhere({
              sectionType,
            }),

          select:
            homeSelect,

          orderBy: [
            {
              placement:
                "asc",
            },

            {
              order:
                "asc",
            },

            {
              createdAt:
                "asc",
            },
          ],
        });

      return success(
        res,
        sections,
        "Home section berhasil diambil",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.get(
  "/:id",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const section =
        await prisma.home.findFirst({
          where: {
            id:
              req.params.id,

            deletedAt:
              null,
          },

          select:
            homeSelect,
        });

      if (!section) {
        return error(
          res,
          "Home section tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        section,
        "Home section berhasil diambil",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

// ======================================================
// CMS
// ======================================================

router.post(
  "/",
  authMiddleware,
  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !canManage(
          req,
          res,
        )
      ) {
        return;
      }

      const payload =
        buildHomePayload(
          req.body,
          req.user.id,
        );

      const created =
        await prisma.home.create({
          data: {
            key:
              payload.key,

            sectionType:
              payload.sectionType,

            placement:
              payload.placement,

            status:
              payload.status,

            title:
              payload.title,

            subtitle:
              payload.subtitle ??
              null,

            description:
              payload.description ??
              null,

            image:
              payload.image ??
              null,

            mobileImage:
              payload.mobileImage ??
              null,

            badge:
              payload.badge ??
              null,

            ctaLabel:
              payload.ctaLabel ??
              null,

            ctaUrl:
              payload.ctaUrl ??
              null,

            secondaryLabel:
              payload.secondaryLabel ??
              null,

            secondaryUrl:
              payload.secondaryUrl ??
              null,

            metaTitle:
              payload.metaTitle ??
              null,

            metaDescription:
              payload.metaDescription ??
              null,

            payload:
              payload.payload ??
              null,

            order:
              payload.order ??
              0,

            isActive:
              payload.isActive ??
              true,

            authorId:
              payload.authorId,
          },

          select:
            homeSelect,
        });

      return success(
        res,
        created,
        "Home section berhasil dibuat",
        201,
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.patch(
  "/:id",
  authMiddleware,
  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !canManage(
          req,
          res,
        )
      ) {
        return;
      }

      const existing =
        await prisma.home.findFirst({
          where: {
            id:
              req.params.id,

            deletedAt:
              null,
          },

          select: {
            id:
              true,
          },
        });

      if (!existing) {
        return error(
          res,
          "Home section tidak ditemukan",
          404,
        );
      }

      const payload =
        buildHomePayload(
          req.body,
          req.user.id,
          true,
        );

      const data =
        Object.fromEntries(
          Object.entries(
            payload,
          ).filter(
            ([
              ,
              value,
            ]) =>
              value !==
              undefined,
          ),
        );

      const updated =
        await prisma.home.update({
          where: {
            id:
              req.params.id,
          },

          data,

          select:
            homeSelect,
        });

      return success(
        res,
        updated,
        "Home section berhasil diperbarui",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.delete(
  "/:id",
  authMiddleware,
  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !canManage(
          req,
          res,
        )
      ) {
        return;
      }

      const deleted =
        await prisma.home.update({
          where: {
            id:
              req.params.id,
          },

          data: {
            deletedAt:
              new Date(),

            isActive:
              false,
          },

          select:
            homeSelect,
        });

      return success(
        res,
        deleted,
        "Home section berhasil dihapus",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

router.patch(
  "/:id/restore",
  authMiddleware,
  async (
    req,
    res,
    next,
  ) => {
    try {
      if (
        !canManage(
          req,
          res,
        )
      ) {
        return;
      }

      const restored =
        await prisma.home.update({
          where: {
            id:
              req.params.id,
          },

          data: {
            deletedAt:
              null,

            isActive:
              true,
          },

          select:
            homeSelect,
        });

      return success(
        res,
        restored,
        "Home section berhasil dipulihkan",
      );
    } catch (
      error_
    ) {
      return next(
        error_,
      );
    }
  },
);

export default router;