import axiosClient from "../../../lib/http/axiosClient.js";

function unwrap(response) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

export async function getHomeSections() {
  const response =
    await axiosClient.get("/home");

  return unwrap(response) ?? [];
}

export async function getHomeSectionsByPlacement(
  placement,
) {
  const response =
    await axiosClient.get(
      `/home/placement/${encodeURIComponent(
        placement,
      )}`,
    );

  return unwrap(response) ?? [];
}

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
      `/home/${encodeURIComponent(id)}`,
      payload,
    );

  return unwrap(response);
}

export async function deleteHomeSection(
  id,
) {
  const response =
    await axiosClient.delete(
      `/home/${encodeURIComponent(id)}`,
    );

  return unwrap(response);
}

const homeCmsApi = {
  getHomeSections,
  getHomeSectionsByPlacement,
  createHomeSection,
  updateHomeSection,
  deleteHomeSection,
};

export default homeCmsApi;