import prisma from "../../config/prisma.js";

const commentSelect = {
  id: true,
  content: true,
  forumId: true,
  authorId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllComments(
  forumId,
  includeDeleted = false
) {
  return prisma.comment.findMany({
    where: {
      ...(forumId ? { forumId } : {}),
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
    select: commentSelect,
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function findCommentById(
  id,
  includeDeleted = false
) {
  return prisma.comment.findFirst({
    where: {
      id,
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
    select: commentSelect,
  });
}

export async function createComment(data) {
  return prisma.comment.create({
    data: {
      content: data.content,
      forumId: data.forumId,
      authorId: data.authorId,
    },
    select: commentSelect,
  });
}

export async function updateComment(id, data) {
  return prisma.comment.update({
    where: { id },
    data: {
      ...(data.content !== undefined && {
        content: data.content,
      }),
    },
    select: commentSelect,
  });
}

export async function softDeleteComment(id) {
  return prisma.comment.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
    select: commentSelect,
  });
}

export async function restoreComment(id) {
  return prisma.comment.update({
    where: { id },
    data: {
      deletedAt: null,
    },
    select: commentSelect,
  });
}

export async function deleteComment(id) {
  return prisma.comment.delete({
    where: { id },
  });
}
