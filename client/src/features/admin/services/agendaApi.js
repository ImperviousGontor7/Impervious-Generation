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
      "Agenda ID wajib diberikan.",
    );
  }

  return encodeURIComponent(
    String(id),
  );
}

// ======================================================
// PUBLIC
// ======================================================

export async function getAgendas() {
  const response =
    await axiosClient.get(
      "/agenda",
    );

  return unwrap(
    response,
  ) ?? [];
}

export async function getAgendaById(
  id,
) {
  const response =
    await axiosClient.get(
      `/agenda/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function getAgendaBySlug(
  slug,
) {
  if (!slug) {
    throw new Error(
      "Agenda slug wajib diberikan.",
    );
  }

  const response =
    await axiosClient.get(
      `/agenda/slug/${encodeURIComponent(
        slug,
      )}`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// ADMIN / CMS
// ======================================================

export async function createAgenda(
  payload,
) {
  const response =
    await axiosClient.post(
      "/agenda",
      payload,
    );

  return unwrap(
    response,
  );
}

export async function updateAgenda(
  id,
  payload,
) {
  const response =
    await axiosClient.patch(
      `/agenda/${encodeId(
        id,
      )}`,
      payload,
    );

  return unwrap(
    response,
  );
}

export async function deleteAgenda(
  id,
) {
  const response =
    await axiosClient.delete(
      `/agenda/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function restoreAgenda(
  id,
) {
  const response =
    await axiosClient.patch(
      `/agenda/${encodeId(
        id,
      )}/restore`,
    );

  return unwrap(
    response,
  );
}

const agendaApi = {
  getAgendas,

  getAgendaById,

  getAgendaBySlug,

  createAgenda,

  updateAgenda,

  deleteAgenda,

  restoreAgenda,
};

export default agendaApi;