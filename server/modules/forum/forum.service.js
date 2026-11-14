import * as forumRepository
  from "./forum.repository.js";

const MANAGER_ROLES =
  new Set([
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR",
  ]);

function normalizeString(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizeId(id) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "Forum ID is required."
    );
  }

  return normalized;
}

function assertActor(
  actor
) {
  if (!actor?.id) {
    throw new Error(
      "Authenticated user is required."
    );
  }
}

function canManage(
  actor
) {
  return MANAGER_ROLES.has(
    String(
      actor?.role || ""
    ).toUpperCase()
  );
}

function assertOwnerOrManager(
  forum,
  actor
) {
  assertActor(actor);

  const isOwner =
    forum.authorId ===
    actor.id;

  if (
    !isOwner &&
    !canManage(actor)
  ) {
    throw new Error(
      "Forbidden."
    );
  }
}

export async function createForum(
  data,
  actor
) {
  assertActor(actor);

  const title =
    normalizeString(
      data?.title
    );

  const content =
    normalizeString(
      data?.content
    );

  if (!title) {
    throw new Error(
      "Forum title is required."
    );
  }

  if (!content) {
    throw new Error(
      "Forum content is required."
    );
  }

  return forumRepository
    .createForum({
      title,
      content,
      authorId:
        actor.id,

      views: 0,
      likes: 0,
    });
}

export async function getForums(
  options = {}
) {
  return forumRepository
    .findAllForums(
      Boolean(
        options.includeDeleted
      )
    );
}

export async function getForumById(
  id,
  options = {}
) {
  return forumRepository
    .findForumById(
      normalizeId(id),
      Boolean(
        options.includeDeleted
      )
    );
}

export async function updateForum(
  id,
  data,
  actor
) {
  const forumId =
    normalizeId(id);

  const existing =
    await forumRepository
      .findForumById(
        forumId,
        true
      );

  if (!existing) {
    return null;
  }

  assertOwnerOrManager(
    existing,
    actor
  );

  const payload = {};

  if (
    data?.title !==
    undefined
  ) {
    const title =
      normalizeString(
        data.title
      );

    if (!title) {
      throw new Error(
        "Forum title cannot be empty."
      );
    }

    payload.title =
      title;
  }

  if (
    data?.content !==
    undefined
  ) {
    const content =
      normalizeString(
        data.content
      );

    if (!content) {
      throw new Error(
        "Forum content cannot be empty."
      );
    }

    payload.content =
      content;
  }

  if (
    Object.keys(payload)
      .length === 0
  ) {
    throw new Error(
      "No forum fields to update."
    );
  }

  return forumRepository
    .updateForum(
      forumId,
      payload
    );
}

export async function incrementViews(
  id
) {
  return forumRepository
    .incrementForumViews(
      normalizeId(id)
    );
}

export async function likeForum(
  id
) {
  return forumRepository
    .incrementForumLikes(
      normalizeId(id)
    );
}

export async function unlikeForum(
  id
) {
  return forumRepository
    .decrementForumLikes(
      normalizeId(id)
    );
}

export async function deleteForum(
  id,
  actor
) {
  const forumId =
    normalizeId(id);

  const existing =
    await forumRepository
      .findForumById(
        forumId,
        true
      );

  if (!existing) {
    return null;
  }

  assertOwnerOrManager(
    existing,
    actor
  );

  return forumRepository
    .softDeleteForum(
      forumId
    );
}

export async function restoreForum(
  id
) {
  return forumRepository
    .restoreForum(
      normalizeId(id)
    );
}

export async function permanentlyDeleteForum(
  id
) {
  return forumRepository
    .deleteForum(
      normalizeId(id)
    );
}

export default {
  createForum,
  getForums,
  getForumById,
  updateForum,
  incrementViews,
  likeForum,
  unlikeForum,
  deleteForum,
  restoreForum,
  permanentlyDeleteForum,
};