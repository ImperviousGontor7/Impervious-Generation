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
      "Gallery ID wajib diberikan.",
    );
  }

  return encodeURIComponent(
    String(id),
  );
}

// ======================================================
// PUBLIC
// ======================================================

export async function getGalleries() {
  const response =
    await axiosClient.get(
      "/gallery",
    );

  return unwrap(
    response,
  ) ?? [];
}

export async function getGalleryById(
  id,
) {
  const response =
    await axiosClient.get(
      `/gallery/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// CMS
// ======================================================

export async function createGallery(
  formData,
) {
  const response =
    await axiosClient.post(
      "/gallery",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(
    response,
  );
}

export async function updateGallery(
  id,
  formData,
) {
  const response =
    await axiosClient.patch(
      `/gallery/${encodeId(
        id,
      )}`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(
    response,
  );
}

export async function updateGalleryStatus(
  id,
  status,
) {
  const response =
    await axiosClient.patch(
      `/gallery/${encodeId(
        id,
      )}/status`,
      {
        status,
      },
    );

  return unwrap(
    response,
  );
}

export async function deleteGallery(
  id,
) {
  const response =
    await axiosClient.delete(
      `/gallery/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function restoreGallery(
  id,
) {
  const response =
    await axiosClient.patch(
      `/gallery/${encodeId(
        id,
      )}/restore`,
    );

  return unwrap(
    response,
  );
}

export async function permanentlyDeleteGallery(
  id,
) {
  const response =
    await axiosClient.delete(
      `/gallery/${encodeId(
        id,
      )}/permanent`,
    );

  return unwrap(
    response,
  );
}

const galleryApi = {
  getGalleries,

  getGalleryById,

  createGallery,

  updateGallery,

  updateGalleryStatus,

  deleteGallery,

  restoreGallery,

  permanentlyDeleteGallery,
};

export default galleryApi;