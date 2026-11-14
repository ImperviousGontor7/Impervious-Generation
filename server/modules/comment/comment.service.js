import * as commentRepository
  from "../../repositories/comment.repository.js";

function normalizeString(value) {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim();

  return normalized || null;
}

function normalizeId(id) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "ID is required."
    );
  }

  return normalized;
}

// ======================================================
// LIST
// ======================================================

export async function getComments(
  forumId,
  options = {}
) {
  return commentRepository.findAllComments(
    forumId
      ? normalizeId(forumId)
      : undefined,

    Boolean(options.includeDeleted)
  );
}

export async function getCommentById(
  id,
  options = {}
) {
  return commentRepository.findCommentById(
    normalizeId(id),
    Boolean(options.includeDeleted)
  );
}

// ======================================================
// CREATE
// ======================================================

export async function createComment(
  data,
  actor
) {
  if (!actor?.id) {
    throw new Error(
      "Authenticated user is required."
    );
  }

  const forumId =
    normalizeId(data?.forumId);

  const content =
    normalizeString(data?.content);

  if (!content) {
    throw new Error(
      "Comment content is required."
    );
  }

  return commentRepository.createComment({
    content,
    forumId,
    authorId: actor.id,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateComment(
  id,
  data,
  actor
) {
  const commentId =
    normalizeId(id);

  const existing =
    await commentRepository.findCommentById(
      commentId,
      true
    );

  if (!existing) {
    return null;
  }

  const isOwner =
    existing.authorId === actor?.id;

  const isManager =
    [
      "SUPER_ADMIN",
      "ADMIN",
      "EDITOR",
    ].includes(actor?.role);

  if (!isOwner && !isManager) {
    throw new Error(
      "Forbidden."
    );
  }

  const content =
    normalizeString(data?.content);

  if (!content) {
    throw new Error(
      "Comment content cannot be empty."
    );
  }

  return commentRepository.updateComment(
    commentId,
    {
      content,
    }
  );
}

// ======================================================
// DELETE / RESTORE
// ======================================================

export async function deleteComment(
  id,
  actor
) {
  const commentId =
    normalizeId(id);

  const existing =
    await commentRepository.findCommentById(
      commentId,
      true
    );

  if (!existing) {
    return null;
  }

  const isOwner =
    existing.authorId === actor?.id;

  const isManager =
    [
      "SUPER_ADMIN",
      "ADMIN",
      "EDITOR",
    ].includes(actor?.role);

  if (!isOwner && !isManager) {
    throw new Error(
      "Forbidden."
    );
  }

  return commentRepository.softDeleteComment(
    commentId
  );
}

export async function restoreComment(id) {
  return commentRepository.restoreComment(
    normalizeId(id)
  );
}

export async function permanentlyDeleteComment(
  id
) {
  return commentRepository.deleteComment(
    normalizeId(id)
  );
}

export default {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  restoreComment,
  permanentlyDeleteComment,
};