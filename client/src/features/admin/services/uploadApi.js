import axiosClient from "../../../lib/http/axiosClient.js";

function unwrap(response) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

export async function uploadImage(
  file,
) {
  if (!file) {
    throw new Error(
      "File image wajib diberikan.",
    );
  }

  const formData =
    new FormData();

  formData.append(
    "image",
    file,
  );

  const response =
    await axiosClient.post(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(response);
}

export async function uploadDocument(
  file,
) {
  if (!file) {
    throw new Error(
      "File document wajib diberikan.",
    );
  }

  const formData =
    new FormData();

  formData.append(
    "document",
    file,
  );

  const response =
    await axiosClient.post(
      "/upload/document",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(response);
}

export async function uploadAvatar(
  file,
) {
  if (!file) {
    throw new Error(
      "File avatar wajib diberikan.",
    );
  }

  const formData =
    new FormData();

  formData.append(
    "avatar",
    file,
  );

  const response =
    await axiosClient.post(
      "/upload/avatar",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(response);
}

export async function uploadGallery(
  file,
) {
  if (!file) {
    throw new Error(
      "File gallery wajib diberikan.",
    );
  }

  const formData =
    new FormData();

  formData.append(
    "gallery",
    file,
  );

  const response =
    await axiosClient.post(
      "/upload/gallery",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return unwrap(response);
}

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

  return unwrap(response);
}

export async function getMediaById(
  id,
) {
  const response =
    await axiosClient.get(
      `/upload/media/${encodeURIComponent(
        id,
      )}`,
    );

  return unwrap(response);
}

export async function deleteMedia(
  id,
  hardDelete = false,
) {
  const response =
    await axiosClient.delete(
      `/upload/media/${encodeURIComponent(
        id,
      )}`,
      {
        params: {
          hard: hardDelete,
        },
      },
    );

  return unwrap(response);
}

export async function restoreMedia(
  id,
) {
  const response =
    await axiosClient.post(
      `/upload/media/${encodeURIComponent(
        id,
      )}/restore`,
    );

  return unwrap(response);
}

export async function getUploadStatus() {
  const response =
    await axiosClient.get(
      "/upload/status",
    );

  return unwrap(response);
}

const uploadApi = {
  uploadImage,
  uploadDocument,
  uploadAvatar,
  uploadGallery,
  getMedia,
  getMediaById,
  deleteMedia,
  restoreMedia,
  getUploadStatus,
};

export default uploadApi;