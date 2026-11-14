import axiosClient from "../../../lib/http/axiosClient.js";

// ======================================================
// RESPONSE
// ======================================================

function unwrap(
  response,
) {
  return (
    response?.data?.data ??
    response?.data ??
    response ??
    null
  );
}

// ======================================================
// LIST
// ======================================================

export async function getMedia(
  params = {},
) {
  const response =
    await axiosClient.get(
      "/upload/media",
      {
        params,
      },
    );

  const payload =
    response?.data;

  const data =
    payload?.data ??
    [];

  return {
    items:
      Array.isArray(
        data,
      )
        ? data
        : [],

    pagination:
      payload?.pagination ??
      payload?.meta ??
      null,
  };
}

// ======================================================
// DETAIL
// ======================================================

export async function getMediaById(
  id,
) {
  if (!id) {
    throw new Error(
      "Media ID wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/upload/media/${id}`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// DELETE
// ======================================================

export async function deleteMedia(
  id,
  {
    hard = false,
  } = {},
) {
  if (!id) {
    throw new Error(
      "Media ID wajib diberikan.",
    );
  }

  const response =
    await axiosClient.delete(
      `/upload/media/${id}`,
      {
        params: {
          hard,
        },
      },
    );

  return unwrap(
    response,
  );
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreMedia(
  id,
) {
  if (!id) {
    throw new Error(
      "Media ID wajib diberikan.",
    );
  }

  const response =
    await axiosClient.post(
      `/upload/media/${id}/restore`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// STATUS
// ======================================================

export async function getStorageStatus() {
  const response =
    await axiosClient.get(
      "/upload/status",
    );

  return unwrap(
    response,
  );
}

const mediaApi = {
  getMedia,

  getMediaById,

  deleteMedia,

  restoreMedia,

  getStorageStatus,
};

export default mediaApi;