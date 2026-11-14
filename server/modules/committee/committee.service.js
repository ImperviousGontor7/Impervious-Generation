import * as committeeRepository
  from "./committee.repository.js";

const COMMITTEE_STATUSES =
  new Set([
    "ACTIVE",
    "INACTIVE",
  ]);

const MANAGER_ROLES =
  new Set([
    "SUPER_ADMIN",
    "ADMIN",
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
      "Committee ID is required."
    );
  }

  return normalized;
}

function normalizeStatus(
  status
) {
  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    return undefined;
  }

  const normalized =
    String(status)
      .trim()
      .toUpperCase();

  if (
    !COMMITTEE_STATUSES.has(
      normalized
    )
  ) {
    throw new Error(
      "Invalid committee status."
    );
  }

  return normalized;
}

function normalizeOrder(
  value
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return undefined;
  }

  const parsed =
    Number(value);

  if (
    !Number.isInteger(
      parsed
    ) ||
    parsed < 0
  ) {
    throw new Error(
      "Committee order must be a non-negative integer."
    );
  }

  return parsed;
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

function assertManager(
  actor
) {
  if (!canManage(actor)) {
    throw new Error(
      "Forbidden."
    );
  }
}

function normalizeEmail(
  email
) {
  if (
    email === undefined ||
    email === null ||
    email === ""
  ) {
    return null;
  }

  const normalized =
    String(email)
      .trim()
      .toLowerCase();

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      normalized
    )
  ) {
    throw new Error(
      "Invalid committee email."
    );
  }

  return normalized;
}

export async function getCommittees(
  options = {}
) {
  return committeeRepository
    .findAllCommittees(
      Boolean(
        options.includeDeleted
      )
    );
}

export async function getCommitteeById(
  id,
  options = {}
) {
  return committeeRepository
    .findCommitteeById(
      normalizeId(id),
      Boolean(
        options.includeDeleted
      )
    );
}

export async function createCommittee(
  data,
  actor
) {
  assertManager(actor);

  const name =
    normalizeString(
      data?.name
    );

  const position =
    normalizeString(
      data?.position
    );

  if (!name) {
    throw new Error(
      "Committee name is required."
    );
  }

  if (!position) {
    throw new Error(
      "Committee position is required."
    );
  }

  return committeeRepository
    .createCommittee({
      name,
      position,

      bio:
        normalizeString(
          data?.bio
        ),

      photo:
        normalizeString(
          data?.photo
        ),

      email:
        normalizeEmail(
          data?.email
        ),

      phone:
        normalizeString(
          data?.phone
        ),

      order:
        normalizeOrder(
          data?.order
        ) ?? 0,

      status:
        normalizeStatus(
          data?.status
        ) ??
        "ACTIVE",
    });
}

export async function updateCommittee(
  id,
  data,
  actor
) {
  assertManager(actor);

  const committeeId =
    normalizeId(id);

  const existing =
    await committeeRepository
      .findCommitteeById(
        committeeId,
        true
      );

  if (!existing) {
    return null;
  }

  const payload = {};

  if (
    data?.name !==
    undefined
  ) {
    const name =
      normalizeString(
        data.name
      );

    if (!name) {
      throw new Error(
        "Committee name cannot be empty."
      );
    }

    payload.name =
      name;
  }

  if (
    data?.position !==
    undefined
  ) {
    const position =
      normalizeString(
        data.position
      );

    if (!position) {
      throw new Error(
        "Committee position cannot be empty."
      );
    }

    payload.position =
      position;
  }

  if (
    data?.bio !==
    undefined
  ) {
    payload.bio =
      normalizeString(
        data.bio
      );
  }

  if (
    data?.photo !==
    undefined
  ) {
    payload.photo =
      normalizeString(
        data.photo
      );
  }

  if (
    data?.email !==
    undefined
  ) {
    payload.email =
      normalizeEmail(
        data.email
      );
  }

  if (
    data?.phone !==
    undefined
  ) {
    payload.phone =
      normalizeString(
        data.phone
      );
  }

  if (
    data?.order !==
    undefined
  ) {
    payload.order =
      normalizeOrder(
        data.order
      );
  }

  if (
    data?.status !==
    undefined
  ) {
    payload.status =
      normalizeStatus(
        data.status
      );
  }

  if (
    Object.keys(payload)
      .length === 0
  ) {
    throw new Error(
      "No committee fields to update."
    );
  }

  return committeeRepository
    .updateCommittee(
      committeeId,
      payload
    );
}

export async function deleteCommittee(
  id,
  actor
) {
  assertManager(actor);

  return committeeRepository
    .softDeleteCommittee(
      normalizeId(id)
    );
}

export async function restoreCommittee(
  id,
  actor
) {
  assertManager(actor);

  return committeeRepository
    .restoreCommittee(
      normalizeId(id)
    );
}

export async function permanentlyDeleteCommittee(
  id,
  actor
) {
  assertManager(actor);

  return committeeRepository
    .deleteCommittee(
      normalizeId(id)
    );
}

export default {
  getCommittees,
  getCommitteeById,
  createCommittee,
  updateCommittee,
  deleteCommittee,
  restoreCommittee,
  permanentlyDeleteCommittee,
};