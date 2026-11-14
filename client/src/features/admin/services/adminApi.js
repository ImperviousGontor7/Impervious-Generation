import axiosClient from "../../../lib/http/axiosClient.js";

// ======================================================
// HELPERS
// ======================================================

function unwrap(
  response
) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

function getMeta(
  response
) {
  return (
    response?.data?.meta ??
    null
  );
}

function normalizeParams(
  params = {}
) {
  return Object.fromEntries(
    Object.entries(
      params
    ).filter(
      ([, value]) =>
        value !==
          undefined &&
        value !== null &&
        value !== ""
    )
  );
}

function encodeId(
  id
) {
  if (!id) {
    throw new Error(
      "User ID tidak valid."
    );
  }

  return encodeURIComponent(
    String(id)
  );
}

// ======================================================
// OVERVIEW
// ======================================================

export async function getOverview() {
  const response =
    await axiosClient.get(
      "/admin/overview"
    );

  return unwrap(
    response
  );
}

// ======================================================
// USERS
// ======================================================

export async function getUsers(
  params = {}
) {
  const response =
    await axiosClient.get(
      "/admin/users",
      {
        params:
          normalizeParams(
            params
          ),
      }
    );

  return {
    items:
      unwrap(
        response
      ) ?? [],

    ...(getMeta(
      response
    ) || {
      page: 1,

      limit: 20,

      total: 0,

      totalPages: 0,

      hasNextPage:
        false,

      hasPrevPage:
        false,
    }),
  };
}

// ======================================================
// UPDATE ROLE
// ======================================================

export async function updateUserRole(
  id,
  role
) {
  const response =
    await axiosClient.patch(
      `/admin/users/${encodeId(
        id
      )}/role`,
      {
        role,
      }
    );

  return unwrap(
    response
  );
}

// ======================================================
// UPDATE STATUS
// ======================================================

export async function updateUserStatus(
  id,
  status
) {
  const response =
    await axiosClient.patch(
      `/admin/users/${encodeId(
        id
      )}/status`,
      {
        status,
      }
    );

  return unwrap(
    response
  );
}

// ======================================================
// EXPORT
// ======================================================

const adminApi = {
  getOverview,

  getUsers,

  updateUserRole,

  updateUserStatus,
};

export default adminApi;