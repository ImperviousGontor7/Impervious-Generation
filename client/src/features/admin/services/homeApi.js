import axiosClient from "../../../lib/http/axiosClient.js";

function unwrap(response) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

function encodeId(id) {
  if (!id) {
    throw new Error(
      "Home section ID wajib diberikan.",
    );
  }

  return encodeURIComponent(
    String(id),
  );
}

// ======================================================
// PUBLIC
// ======================================================

export async function getHomeSections() {
  const response =
    await axiosClient.get(
      "/home",
    );

  return (
    unwrap(response) ?? []
  );
}

export async function getHomeSectionById(
  id,
) {
  const response =
    await axiosClient.get(
      `/home/${encodeId(id)}`,
    );

  return unwrap(response);
}

export async function getHomeSectionByKey(
  key,
) {
  if (!key) {
    throw new Error(
      "Home section key wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/home/key/${encodeURIComponent(
        key,
      )}`,
    );

  return unwrap(response);
}

export async function getHomeSectionsByPlacement(
  placement,
) {
  if (!placement) {
    throw new Error(
      "placement wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/home/placement/${encodeURIComponent(
        placement,
      )}`,
    );

  return (
    unwrap(response) ?? []
  );
}

export async function getHomeSectionsByType(
  sectionType,
) {
  if (!sectionType) {
    throw new Error(
      "sectionType wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/home/section/${encodeURIComponent(
        sectionType,
      )}`,
    );

  return (
    unwrap(response) ?? []
  );
}

// ======================================================
// CMS
// ======================================================

export async function createHomeSection(
  payload,
) {
  const response =
    await axiosClient.post(
      "/home",
      payload,
    );

  return unwrap(response);
}

export async function updateHomeSection(
  id,
  payload,
) {
  const response =
    await axiosClient.patch(
      `/home/${encodeId(id)}`,
      payload,
    );

  return unwrap(response);
}

export async function deleteHomeSection(
  id,
) {
  const response =
    await axiosClient.delete(
      `/home/${encodeId(id)}`,
    );

  return unwrap(response);
}

export async function restoreHomeSection(
  id,
) {
  const response =
    await axiosClient.patch(
      `/home/${encodeId(
        id,
      )}/restore`,
    );

  return unwrap(response);
}

const homeApi = {
  getHomeSections,

  getHomeSectionById,

  getHomeSectionByKey,

  getHomeSectionsByType,

  getHomeSectionsByPlacement,

  createHomeSection,

  updateHomeSection,

  deleteHomeSection,

  restoreHomeSection,
};

export default homeApi;