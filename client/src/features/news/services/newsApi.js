import axiosClient from "../../../lib/http/axiosClient.js";

// ======================================================
// HELPERS
// ======================================================

function unwrap(
  response,
) {
  return (
    response?.data?.data ??
    response?.data ??
    null
  );
}

function normalizeParams(
  params = {},
) {
  return Object.fromEntries(
    Object.entries(
      params,
    ).filter(
      ([, value]) =>
        value !==
          undefined &&
        value !==
          null &&
        value !== "",
    ),
  );
}

function encodeId(
  id,
) {
  if (!id) {
    throw new Error(
      "News ID is required.",
    );
  }

  return encodeURIComponent(
    String(id),
  );
}

// ======================================================
// PUBLIC
// ======================================================

export async function getNews(
  params = {},
) {
  const response =
    await axiosClient.get(
      "/content/news",
      {
        params:
          normalizeParams(
            params,
          ),
      },
    );

  const payload = unwrap(response);

  return {
    items: Array.isArray(payload) ? payload : payload?.items ?? [],
    pagination: payload?.pagination ?? response?.data?.meta ?? null,
  };
}

export async function getNewsById(
  id,
) {
  const response =
    await axiosClient.get(
      `/content/news/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function getNewsBySlug(
  slug,
) {
  if (!slug) {
    throw new Error(
      "News slug is required.",
    );
  }

  const response =
    await axiosClient.get(
      `/content/news/slug/${encodeURIComponent(
        slug,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function incrementViews(
  id,
) {
  const response =
    await axiosClient.post(
      `/content/news/${encodeId(
        id,
      )}/view`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// ADMIN LIST
// ======================================================

export async function getAdminNews(
  params = {},
) {
  const response =
    await axiosClient.get(
      "/content/admin/news",
      {
        params:
          normalizeParams(
            params,
          ),
      },
    );

  const payload = unwrap(response);

  return {
    items: Array.isArray(payload) ? payload : payload?.items ?? [],
    pagination: payload?.pagination ?? response?.data?.meta ?? null,
  };
}

// ======================================================
// CREATE
// ======================================================

export async function createNews(
  payload,
) {
  const response =
    await axiosClient.post(
      "/content/admin/news",
      payload,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateNews(
  id,
  payload,
) {
  const response =
    await axiosClient.patch(
      `/content/admin/news/${encodeId(
        id,
      )}`,
      payload,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// STATUS
// ======================================================

export async function publishNews(
  id,
) {
  const response =
    await axiosClient.post(
      `/content/admin/news/${encodeId(
        id,
      )}/publish`,
    );

  return unwrap(
    response,
  );
}

export async function archiveNews(
  id,
) {
  const response =
    await axiosClient.post(
      `/content/admin/news/${encodeId(
        id,
      )}/archive`,
    );

  return unwrap(
    response,
  );
}

export async function draftNews(
  id,
) {
  const response =
    await axiosClient.post(
      `/content/admin/news/${encodeId(
        id,
      )}/draft`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// DELETE / RESTORE
// ======================================================

export async function deleteNews(
  id,
) {
  const response =
    await axiosClient.delete(
      `/content/admin/news/${encodeId(
        id,
      )}`,
    );

  return unwrap(
    response,
  );
}

export async function restoreNews(
  id,
) {
  const response =
    await axiosClient.post(
      `/content/admin/news/${encodeId(
        id,
      )}/restore`,
    );

  return unwrap(
    response,
  );
}

// ======================================================
// API OBJECT
// ======================================================

const newsApi = {
  getNews,
  getNewsById,
  getNewsBySlug,
  incrementViews,

  getAdminNews,

  createNews,
  updateNews,

  publishNews,
  archiveNews,
  draftNews,

  deleteNews,
  restoreNews,
};

export default newsApi;