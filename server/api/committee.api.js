import {
  Router,
} from "express";

import prisma from "../config/prisma.js";

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

function text(
  value,
) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function slugify(
  value,
) {
  return text(
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

function nullableDate(
  value,
) {
  if (
    value ===
      undefined ||
    value ===
      null ||
    value ===
      ""
  ) {
    return null;
  }

  const date =
    new Date(
      value,
    );

  return Number.isNaN(
    date.getTime(),
  )
    ? null
    : date;
}

function normalizeMembers(
  members,
) {
  if (
    !Array.isArray(
      members,
    )
  ) {
    return [];
  }

  return members
    .map(
      (
        member,
        index,
      ) => ({
        name:
          text(
            member?.name,
          ),

        position:
          text(
            member?.position,
          ) ||
          null,

        photo:
          text(
            member?.photo,
          ) ||
          null,

        bio:
          text(
            member?.bio,
          ) ||
          null,

        order:
          Number.isFinite(
            Number(
              member?.order,
            ),
          )
            ? Number(
                member.order,
              )
            : index + 1,
      }),
    )
    .filter(
      (
        member,
      ) =>
        member.name,
    );
}

// ======================================================
// SELECT
// ======================================================

const committeeInclude = {
  author: {
    select: {
      id: true,

      username: true,

      fullName: true,

      avatar: true,

      role: true,
    },
  },

  members: {
    where: {
      deletedAt:
        null,
    },

    orderBy: {
      order:
        "asc",
    },
  },
};

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
      const page =
        Math.max(
          Number(
            req.query.page ||
              1,
          ),
          1,
        );

      const limit =
        Math.min(
          Math.max(
            Number(
              req.query
                .limit ||
                10,
            ),
            1,
          ),
          100,
        );

      const where = {
        deletedAt:
          null,

        ...(req.query.status
          ? {
              status:
                req.query
                  .status,
            }
          : {}),
      };

      const [
        items,
        total,
      ] =
        await prisma.$transaction(
          [
            prisma.committee.findMany(
              {
                where,

                include:
                  committeeInclude,

                orderBy: {
                  createdAt:
                    "desc",
                },

                skip:
                  (page -
                    1) *
                  limit,

                take:
                  limit,
              },
            ),

            prisma.committee.count({
              where,
            }),
          ],
        );

      return success(
        res,
        items,
        "Committee berhasil diambil",
        200,
        {
          page,

          limit,

          total,

          totalPages:
            Math.ceil(
              total /
                limit,
            ),
        },
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
      const committee =
        await prisma.committee.findFirst(
          {
            where: {
              slug:
                text(
                  req.params
                    .slug,
                ),

              deletedAt:
                null,
            },

            include:
              committeeInclude,
          },
        );

      if (!committee) {
        return error(
          res,
          "Committee tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        committee,
        "Committee berhasil diambil",
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
      const committee =
        await prisma.committee.findFirst(
          {
            where: {
              id:
                req.params.id,

              deletedAt:
                null,
            },

            include:
              committeeInclude,
          },
        );

      if (!committee) {
        return error(
          res,
          "Committee tidak ditemukan",
          404,
        );
      }

      return success(
        res,
        committee,
        "Committee berhasil diambil",
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
        text(
          req.body.title,
        );

      const slug =
        slugify(
          req.body.slug ||
            title,
        );

      if (
        !title ||
        !slug
      ) {
        return error(
          res,
          "title wajib diisi",
          400,
        );
      }

      const members =
        normalizeMembers(
          req.body.members,
        );

      const committee =
        await prisma.committee.create(
          {
            data: {
              title,

              slug,

              description:
                text(
                  req.body
                    .description,
                ) ||
                null,

              banner:
                text(
                  req.body
                    .banner,
                ) ||
                null,

              logo:
                text(
                  req.body
                    .logo,
                ) ||
                null,

              startDate:
                nullableDate(
                  req.body
                    .startDate,
                ),

              endDate:
                nullableDate(
                  req.body
                    .endDate,
                ),

              status:
                req.body
                  .status ||
                "DRAFT",

              authorId:
                req.user.id,

              members:
                members.length
                  ? {
                      create:
                        members,
                    }
                  : undefined,
            },

            include:
              committeeInclude,
          },
        );

      return success(
        res,
        committee,
        "Committee berhasil dibuat",
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
        await prisma.committee.findFirst(
          {
            where: {
              id:
                req.params.id,

              deletedAt:
                null,
            },
          },
        );

      if (!existing) {
        return error(
          res,
          "Committee tidak ditemukan",
          404,
        );
      }

      const data = {};

      if (
        req.body.title !==
        undefined
      ) {
        data.title =
          text(
            req.body.title,
          );
      }

      if (
        req.body.slug !==
        undefined
      ) {
        data.slug =
          slugify(
            req.body.slug,
          );
      }

      if (
        req.body.description !==
        undefined
      ) {
        data.description =
          text(
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
          text(
            req.body.banner,
          ) ||
          null;
      }

      if (
        req.body.logo !==
        undefined
      ) {
        data.logo =
          text(
            req.body.logo,
          ) ||
          null;
      }

      if (
        req.body.startDate !==
        undefined
      ) {
        data.startDate =
          nullableDate(
            req.body
              .startDate,
          );
      }

      if (
        req.body.endDate !==
        undefined
      ) {
        data.endDate =
          nullableDate(
            req.body.endDate,
          );
      }

      if (
        req.body.status !==
        undefined
      ) {
        data.status =
          req.body.status;
      }

      await prisma.$transaction(
        async (
          tx,
        ) => {
          await tx.committee.update(
            {
              where: {
                id:
                  req.params
                    .id,
              },

              data,
            },
          );

          if (
            Array.isArray(
              req.body
                .members,
            )
          ) {
            await tx.committeeMember.updateMany(
              {
                where: {
                  committeeId:
                    req.params
                      .id,
                },

                data: {
                  deletedAt:
                    new Date(),
                },
              },
            );

            const members =
              normalizeMembers(
                req.body
                  .members,
              );

            if (
              members.length
            ) {
              await tx.committeeMember.createMany(
                {
                  data:
                    members.map(
                      (
                        member,
                      ) => ({
                        ...member,

                        committeeId:
                          req.params
                            .id,
                      }),
                    ),
                },
              );
            }
          }
        },
      );

      const updated =
        await prisma.committee.findUnique(
          {
            where: {
              id:
                req.params.id,
            },

            include:
              committeeInclude,
          },
        );

      return success(
        res,
        updated,
        "Committee berhasil diperbarui",
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
        await prisma.committee.findFirst(
          {
            where: {
              id:
                req.params.id,

              deletedAt:
                null,
            },
          },
        );

      if (!existing) {
        return error(
          res,
          "Committee tidak ditemukan",
          404,
        );
      }

      const deleted =
        await prisma.committee.update(
          {
            where: {
              id:
                req.params.id,
            },

            data: {
              deletedAt:
                new Date(),
            },

            include:
              committeeInclude,
          },
        );

      return success(
        res,
        deleted,
        "Committee berhasil dihapus",
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
        await prisma.committee.update(
          {
            where: {
              id:
                req.params.id,
            },

            data: {
              deletedAt:
                null,
            },

            include:
              committeeInclude,
          },
        );

      return success(
        res,
        restored,
        "Committee berhasil dipulihkan",
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