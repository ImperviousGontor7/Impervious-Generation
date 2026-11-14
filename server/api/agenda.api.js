import {
  Router,
} from "express";

import authMiddleware from "../auth/auth.middleware.js";

import {
  requireRole,
} from "../middlewares/requireRole.middleware.js";

import {
  ROLES,
} from "../constants/roles.js";

import {
  success,
  error,
} from "../utils/response.js";

import {
  findAllAgendas,
  findAgendaById,
  findAgendaBySlug,
  createAgenda,
  updateAgenda,
  softDeleteAgenda,
  restoreAgenda,
} from "../modules/agenda/agenda.repository.js";

const router =
  Router();

const CMS_ROLES = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.EDITOR,
];

// ======================================================
// HELPERS
// ======================================================

function normalizeText(
  value,
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function normalizeSlug(
  value,
) {
  return normalizeText(
    value,
  )
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /(^-|-$)/g,
      "");
}

function parseDate(
  value,
) {
  const date =
    new Date(
      value,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null;
  }

  return date;
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
      const agendas =
        await findAllAgendas(
          false,
        );

      return success(
        res,
        agendas,
        "Agenda berhasil diambil",
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

router.get(
  "/slug/:slug",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const agenda =
        await findAgendaBySlug(
          normalizeText(
            req.params.slug,
          ),
          false,
        );

      if (!agenda) {
        return error(
          res,
          "Agenda tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        agenda,
        "Agenda berhasil diambil",
      );
    } catch (
      err
    ) {
      return next(
        err,
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
      const agenda =
        await findAgendaById(
          req.params.id,
          false,
        );

      if (!agenda) {
        return error(
          res,
          "Agenda tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        agenda,
        "Agenda berhasil diambil",
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

// ======================================================
// PROTECTED
// ======================================================

router.use(
  authMiddleware,
);

router.use(
  requireRole(
    ...CMS_ROLES,
  ),
);

// ======================================================
// CREATE
// ======================================================

router.post(
  "/",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const title =
        normalizeText(
          req.body.title,
        );

      const slug =
        normalizeSlug(
          req.body.slug ||
            title,
        );

      const startDate =
        parseDate(
          req.body.startDate,
        );

      const endDate =
        parseDate(
          req.body.endDate,
        );

      if (
        !title ||
        !slug ||
        !startDate ||
        !endDate
      ) {
        return error(
          res,
          "title, startDate, dan endDate wajib diisi",
          400,
        );
      }

      const agenda =
        await createAgenda({
          title,

          slug,

          description:
            normalizeText(
              req.body
                .description,
            ) ||
            null,

          banner:
            req.body.banner ||
            null,

          location:
            normalizeText(
              req.body
                .location,
            ) ||
            null,

          startDate,

          endDate,

          status:
            normalizeText(
              req.body.status,
            ) ||
            "UPCOMING",

          authorId:
            req.user.id,
        });

      return success(
        res,
        agenda,
        "Agenda berhasil dibuat",
        201,
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

// ======================================================
// UPDATE
// ======================================================

router.patch(
  "/:id",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const existing =
        await findAgendaById(
          req.params.id,
          true,
        );

      if (!existing) {
        return error(
          res,
          "Agenda tidak ditemukan",
          404,
        );
      }

      const data = {};

      if (
        req.body.title !==
        undefined
      ) {
        data.title =
          normalizeText(
            req.body.title,
          );
      }

      if (
        req.body.slug !==
        undefined
      ) {
        data.slug =
          normalizeSlug(
            req.body.slug,
          );
      }

      if (
        req.body.description !==
        undefined
      ) {
        data.description =
          normalizeText(
            req.body
              .description,
          ) ||
          null;
      }

      if (
        req.body.banner !==
        undefined
      ) {
        data.banner =
          req.body.banner ||
          null;
      }

      if (
        req.body.location !==
        undefined
      ) {
        data.location =
          normalizeText(
            req.body
              .location,
          ) ||
          null;
      }

      if (
        req.body.startDate !==
        undefined
      ) {
        data.startDate =
          parseDate(
            req.body
              .startDate,
          );
      }

      if (
        req.body.endDate !==
        undefined
      ) {
        data.endDate =
          parseDate(
            req.body.endDate,
          );
      }

      if (
        req.body.status !==
        undefined
      ) {
        data.status =
          normalizeText(
            req.body.status,
          );
      }

      const agenda =
        await updateAgenda(
          req.params.id,
          data,
        );

      return success(
        res,
        agenda,
        "Agenda berhasil diperbarui",
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

// ======================================================
// DELETE
// ======================================================

router.delete(
  "/:id",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const existing =
        await findAgendaById(
          req.params.id,
          true,
        );

      if (!existing) {
        return error(
          res,
          "Agenda tidak ditemukan",
          404,
        );
      }

      const deleted =
        await softDeleteAgenda(
          req.params.id,
        );

      return success(
        res,
        deleted,
        "Agenda berhasil dihapus",
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

// ======================================================
// RESTORE
// ======================================================

router.patch(
  "/:id/restore",
  async (
    req,
    res,
    next,
  ) => {
    try {
      const restored =
        await restoreAgenda(
          req.params.id,
        );

      return success(
        res,
        restored,
        "Agenda berhasil dipulihkan",
      );
    } catch (
      err
    ) {
      return next(
        err,
      );
    }
  },
);

export default router;