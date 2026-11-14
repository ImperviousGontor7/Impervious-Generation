import prisma from "../../config/prisma.js";

const committeeSelect = {
  id: true,
  name: true,
  position: true,
  bio: true,
  photo: true,
  email: true,
  phone: true,
  order: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllCommittees(
  includeDeleted = false
) {
  return prisma.committee.findMany({
    where: includeDeleted
      ? {}
      : {
          deletedAt: null,
        },

    select:
      committeeSelect,

    orderBy: [
      {
        order: "asc",
      },
      {
        createdAt:
          "asc",
      },
    ],
  });
}

export async function findCommitteeById(
  id,
  includeDeleted = false
) {
  return prisma.committee.findFirst({
    where: {
      id,

      ...(includeDeleted
        ? {}
        : {
            deletedAt: null,
          }),
    },

    select:
      committeeSelect,
  });
}

export async function createCommittee(
  data
) {
  return prisma.committee.create({
    data: {
      name:
        data.name,

      position:
        data.position,

      bio:
        data.bio ??
        null,

      photo:
        data.photo ??
        null,

      email:
        data.email ??
        null,

      phone:
        data.phone ??
        null,

      order:
        data.order ??
        0,

      status:
        data.status ??
        "ACTIVE",
    },

    select:
      committeeSelect,
  });
}

export async function updateCommittee(
  id,
  data
) {
  return prisma.committee.update({
    where: {
      id,
    },

    data: {
      ...(data.name !==
        undefined && {
        name:
          data.name,
      }),

      ...(data.position !==
        undefined && {
        position:
          data.position,
      }),

      ...(data.bio !==
        undefined && {
        bio:
          data.bio,
      }),

      ...(data.photo !==
        undefined && {
        photo:
          data.photo,
      }),

      ...(data.email !==
        undefined && {
        email:
          data.email,
      }),

      ...(data.phone !==
        undefined && {
        phone:
          data.phone,
      }),

      ...(data.order !==
        undefined && {
        order:
          data.order,
      }),

      ...(data.status !==
        undefined && {
        status:
          data.status,
      }),
    },

    select:
      committeeSelect,
  });
}

export async function softDeleteCommittee(
  id
) {
  return prisma.committee.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        new Date(),
    },

    select:
      committeeSelect,
  });
}

export async function restoreCommittee(
  id
) {
  return prisma.committee.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },

    select:
      committeeSelect,
  });
}

export async function deleteCommittee(
  id
) {
  return prisma.committee.delete({
    where: {
      id,
    },
  });
}

export default {
  findAllCommittees,
  findCommitteeById,
  createCommittee,
  updateCommittee,
  softDeleteCommittee,
  restoreCommittee,
  deleteCommittee,
};