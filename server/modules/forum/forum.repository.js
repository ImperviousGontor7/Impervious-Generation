import prisma from "../../config/prisma.js";

const forumSelect = {
  id: true,
  title: true,
  content: true,
  views: true,
  likes: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllForums(
  includeDeleted = false
) {
  return prisma.forum.findMany({
    where: includeDeleted
      ? {}
      : {
          deletedAt: null,
        },

    select:
      forumSelect,

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findForumById(
  id,
  includeDeleted = false
) {
  return prisma.forum.findFirst({
    where: {
      id,

      ...(includeDeleted
        ? {}
        : {
            deletedAt: null,
          }),
    },

    select:
      forumSelect,
  });
}

export async function createForum(
  data
) {
  return prisma.forum.create({
    data: {
      title:
        data.title,

      content:
        data.content,

      authorId:
        data.authorId,

      views:
        data.views ??
        0,

      likes:
        data.likes ??
        0,
    },

    select:
      forumSelect,
  });
}

export async function updateForum(
  id,
  data
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      ...(data.title !==
        undefined && {
        title:
          data.title,
      }),

      ...(data.content !==
        undefined && {
        content:
          data.content,
      }),

      ...(data.views !==
        undefined && {
        views:
          data.views,
      }),

      ...(data.likes !==
        undefined && {
        likes:
          data.likes,
      }),
    },

    select:
      forumSelect,
  });
}

export async function incrementForumViews(
  id
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      views: {
        increment: 1,
      },
    },

    select:
      forumSelect,
  });
}

export async function incrementForumLikes(
  id
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      likes: {
        increment: 1,
      },
    },

    select:
      forumSelect,
  });
}

export async function decrementForumLikes(
  id
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      likes: {
        decrement: 1,
      },
    },

    select:
      forumSelect,
  });
}

export async function softDeleteForum(
  id
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        new Date(),
    },

    select:
      forumSelect,
  });
}

export async function restoreForum(
  id
) {
  return prisma.forum.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },

    select:
      forumSelect,
  });
}

export async function deleteForum(
  id
) {
  return prisma.forum.delete({
    where: {
      id,
    },
  });
}

export default {
  findAllForums,
  findForumById,
  createForum,
  updateForum,
  incrementForumViews,
  incrementForumLikes,
  decrementForumLikes,
  softDeleteForum,
  restoreForum,
  deleteForum,
};