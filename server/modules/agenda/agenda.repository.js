import prisma from "../../config/prisma.js";

const agendaSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  banner: true,
  location: true,
  startDate: true,
  endDate: true,
  status: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllAgendas(
  includeDeleted = false
) {
  return prisma.agenda.findMany({
    where: includeDeleted
      ? {}
      : {
          deletedAt: null,
        },

    select:
      agendaSelect,

    orderBy: {
      startDate: "asc",
    },
  });
}

export async function findAgendaById(
  id,
  includeDeleted = false
) {
  return prisma.agenda.findFirst({
    where: {
      id,

      ...(includeDeleted
        ? {}
        : {
            deletedAt: null,
          }),
    },

    select:
      agendaSelect,
  });
}

export async function findAgendaBySlug(
  slug,
  includeDeleted = false
) {
  return prisma.agenda.findFirst({
    where: {
      slug,

      ...(includeDeleted
        ? {}
        : {
            deletedAt: null,
          }),
    },

    select:
      agendaSelect,
  });
}

export async function createAgenda(
  data
) {
  return prisma.agenda.create({
    data: {
      title: data.title,
      slug: data.slug,

      description:
        data.description ??
        null,

      banner:
        data.banner ??
        null,

      location:
        data.location ??
        null,

      startDate:
        data.startDate,

      endDate:
        data.endDate,

      status:
        data.status ??
        "UPCOMING",

      authorId:
        data.authorId,
    },

    select:
      agendaSelect,
  });
}

export async function updateAgenda(
  id,
  data
) {
  return prisma.agenda.update({
    where: {
      id,
    },

    data: {
      ...(data.title !==
        undefined && {
        title:
          data.title,
      }),

      ...(data.slug !==
        undefined && {
        slug:
          data.slug,
      }),

      ...(data.description !==
        undefined && {
        description:
          data.description,
      }),

      ...(data.banner !==
        undefined && {
        banner:
          data.banner,
      }),

      ...(data.location !==
        undefined && {
        location:
          data.location,
      }),

      ...(data.startDate !==
        undefined && {
        startDate:
          data.startDate,
      }),

      ...(data.endDate !==
        undefined && {
        endDate:
          data.endDate,
      }),

      ...(data.status !==
        undefined && {
        status:
          data.status,
      }),
    },

    select:
      agendaSelect,
  });
}

export async function softDeleteAgenda(
  id
) {
  return prisma.agenda.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        new Date(),
    },

    select:
      agendaSelect,
  });
}

export async function restoreAgenda(
  id
) {
  return prisma.agenda.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },

    select:
      agendaSelect,
  });
}

export async function deleteAgenda(
  id
) {
  return prisma.agenda.delete({
    where: {
      id,
    },
  });
}

export default {
  findAllAgendas,
  findAgendaById,
  findAgendaBySlug,
  createAgenda,
  updateAgenda,
  softDeleteAgenda,
  restoreAgenda,
  deleteAgenda,
};