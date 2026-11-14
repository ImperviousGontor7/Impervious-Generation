import axiosClient from "../../../lib/http/axiosClient.js";

function unwrap(
  response,
) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

function encodeId(
  id,
) {
  if (!id) {
    throw new Error(
      "Committee ID wajib diberikan.",
    );
  }

  return encodeURIComponent(
    String(id),
  );
}

// ======================================================
// PUBLIC
// ======================================================

export async function getCommittees(
  params = {},
) {
  const response =
    await axiosClient.get(
      "/committee",
      {
        params,
      },
    );

  return {
    items:
      unwrap(
        response,
      ) ?? [],

    pagination:
      response?.data
        ?.meta ??
      null,
  };
}

export async function getCommitteeById(
  id,
) {
  const response =
    await axiosClient.get(
      `/committee/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function getCommitteeBySlug(
  slug,
) {
  if (!slug) {
    throw new Error(
      "Committee slug wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/committee/slug/${encodeURIComponent(
        slug,
      )}`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// CMS
// ======================================================

export async function createCommittee(
  payload,
) {
  const response =
    await axiosClient.post(
      "/committee",
      payload,
    );

  return unwrap(
    response,
  );
}

export async function updateCommittee(
  id,
  payload,
) {
  const response =
    await axiosClient.patch(
      `/committee/${encodeId(
        id,
      )}`,
      payload,
    );

  return unwrap(
    response,
  );
}

export async function deleteCommittee(
  id,
) {
  const response =
    await axiosClient.delete(
      `/committee/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function restoreCommittee(
  id,
) {
  const response =
    await axiosClient.patch(
      `/committee/${encodeId(
        id,
      )}/restore`,
    );

  return unwrap(
    response,
  );
}

const committeeApi = {
  getCommittees,

  getCommitteeById,

  getCommitteeBySlug,

  createCommittee,

  updateCommittee,

  deleteCommittee,

  restoreCommittee,
};

export default committeeApi;