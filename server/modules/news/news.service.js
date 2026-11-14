import {
  newsCreateSchema,
  newsUpdateSchema,
  newsListSchema,
  newsIdSchema,
} from "./news.schema.js";

import {
  NEWS_STATUS,
} from "./news.constants.js";

import {
  mapNews,
  mapNewsResult,
} from "./news.mapper.js";

import * as newsRepository
  from "./news.repository.js";

import {
  findCategoryById,
} from "../category/category.repository.js";

import {
  createSlug,
} from "../../utils/slug.js";

// ======================================================
// HELPERS
// ======================================================

function normalizeString(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return value;
  }

  if (
    typeof value !== "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizeSlug(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return value;
  }

  if (
    typeof value !== "string"
  ) {
    return value;
  }

  const normalized =
    value
      .trim()
      .toLowerCase();

  return normalized || null;
}

function getPublicationDate(
  status,
  publishedAt,
) {
  if (
    status !==
    NEWS_STATUS.PUBLISHED
  ) {
    return publishedAt ?? null;
  }

  return (
    publishedAt ??
    new Date()
  );
}

// ======================================================
// CATEGORY VALIDATION
// ======================================================

async function ensureCategoryExists(
  categoryId,
) {
  if (!categoryId) {
    return;
  }

  const category =
    await findCategoryById(
      categoryId,
    );

  if (!category) {
    throw new Error(
      "Category not found.",
    );
  }
}

// ======================================================
// CREATE
// ======================================================

export async function createNews(
  data,
  authorId,
) {
  if (!authorId) {
    throw new Error(
      "Author is required.",
    );
  }

  const input = {
    ...data,

    title:
      normalizeString(
        data?.title,
      ),

    slug:
      normalizeSlug(
        data?.slug,
      ) ||
      createSlug(
        data?.title,
      ),

    excerpt:
      normalizeString(
        data?.excerpt,
      ),

    content:
      normalizeString(
        data?.content,
      ),

    thumbnail:
      normalizeString(
        data?.thumbnail,
      ),

    banner:
      normalizeString(
        data?.banner,
      ),

    metaTitle:
      normalizeString(
        data?.metaTitle,
      ),

    metaDescription:
      normalizeString(
        data?.metaDescription,
      ),

    categoryId:
      data?.categoryId ??
      null,

    status:
      data?.status ??
      NEWS_STATUS.DRAFT,
  };

  const parsed =
    newsCreateSchema.parse(
      input,
    );

  await ensureCategoryExists(
    parsed.categoryId,
  );

  const existing =
    await newsRepository.findNewsBySlug(
      parsed.slug,
      true,
    );

  if (existing) {
    throw new Error(
      "News slug is already in use.",
    );
  }

  const publishedAt =
    getPublicationDate(
      parsed.status,
      parsed.publishedAt,
    );

  const news =
    await newsRepository.createNews({
      title:
        parsed.title,

      slug:
        parsed.slug,

      excerpt:
        parsed.excerpt ??
        null,

      content:
        parsed.content,

      thumbnail:
        parsed.thumbnail ??
        null,

      banner:
        parsed.banner ??
        null,

      metaTitle:
        parsed.metaTitle ??
        null,

      metaDescription:
        parsed.metaDescription ??
        null,

      status:
        parsed.status,

      authorId,

      categoryId:
        parsed.categoryId ??
        null,

      publishedAt,
    });

  return mapNews(news);
}

// ======================================================
// LIST
// ======================================================

export async function getNews(
  options = {},
) {
  const parsed =
    newsListSchema.parse(
      options,
    );

  const result =
    await newsRepository.listNews(
      parsed,
    );

  return mapNewsResult(
    result,
  );
}

// ======================================================
// PUBLIC NEWS
// ======================================================

export async function getPublishedNews(
  options = {},
) {
  const parsed =
    newsListSchema.parse({
      ...options,

      publishedOnly: true,

      includeDeleted: false,
    });

  const result =
    await newsRepository.listNews(
      parsed,
    );

  return mapNewsResult(
    result,
  );
}

// ======================================================
// FIND BY ID
// ======================================================

export async function getNewsById(
  id,
  options = {},
) {
  const parsedId =
    newsIdSchema.parse(id);

  const news =
    await newsRepository.findNewsById(
      parsedId,
      Boolean(
        options.includeDeleted,
      ),
    );

  return mapNews(news);
}

// ======================================================
// FIND BY SLUG
// ======================================================

export async function getNewsBySlug(
  slug,
  options = {},
) {
  const normalizedSlug =
    normalizeSlug(slug);

  if (!normalizedSlug) {
    throw new Error(
      "News slug is required.",
    );
  }

  const news =
    await newsRepository.findNewsBySlug(
      normalizedSlug,
      Boolean(
        options.includeDeleted,
      ),
    );

  return mapNews(news);
}

// ======================================================
// UPDATE
// ======================================================

export async function updateNews(
  id,
  data,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  const input = {
    ...data,
  };

  // ----------------------------------------------------
  // NORMALIZE
  // ----------------------------------------------------

  if (
    input.title !== undefined
  ) {
    input.title =
      normalizeString(
        input.title,
      );
  }

  if (
    input.slug !== undefined
  ) {
    input.slug =
      normalizeSlug(
        input.slug,
      );
  }

  if (
    input.excerpt !== undefined
  ) {
    input.excerpt =
      normalizeString(
        input.excerpt,
      );
  }

  if (
    input.content !== undefined
  ) {
    input.content =
      normalizeString(
        input.content,
      );
  }

  if (
    input.thumbnail !== undefined
  ) {
    input.thumbnail =
      normalizeString(
        input.thumbnail,
      );
  }

  if (
    input.banner !== undefined
  ) {
    input.banner =
      normalizeString(
        input.banner,
      );
  }

  if (
    input.metaTitle !== undefined
  ) {
    input.metaTitle =
      normalizeString(
        input.metaTitle,
      );
  }

  if (
    input.metaDescription !==
    undefined
  ) {
    input.metaDescription =
      normalizeString(
        input.metaDescription,
      );
  }

  if (
    input.categoryId !==
    undefined
  ) {
    input.categoryId =
      input.categoryId ??
      null;
  }

  // ----------------------------------------------------
  // VALIDATION
  // ----------------------------------------------------

  const parsed =
    newsUpdateSchema.parse(
      input,
    );

  // ----------------------------------------------------
  // CATEGORY
  // ----------------------------------------------------

  if (
    parsed.categoryId !==
    undefined
  ) {
    await ensureCategoryExists(
      parsed.categoryId,
    );
  }

  // ----------------------------------------------------
  // SLUG DUPLICATE CHECK
  // ----------------------------------------------------

  if (
    parsed.slug !== undefined &&
    parsed.slug !== existing.slug
  ) {
    const duplicate =
      await newsRepository.findNewsBySlug(
        parsed.slug,
        true,
      );

    if (
      duplicate &&
      duplicate.id !== newsId
    ) {
      throw new Error(
        "News slug is already in use.",
      );
    }
  }

  // ----------------------------------------------------
  // UPDATE DATA
  // ----------------------------------------------------

  const updateData = {
    ...parsed,
  };

  // ----------------------------------------------------
  // PUBLISH
  // ----------------------------------------------------

  if (
    parsed.status ===
    NEWS_STATUS.PUBLISHED
  ) {
    updateData.publishedAt =
      parsed.publishedAt ??
      existing.publishedAt ??
      new Date();
  }

  // ----------------------------------------------------
  // DRAFT
  // ----------------------------------------------------

  if (
    parsed.status ===
    NEWS_STATUS.DRAFT
  ) {
    updateData.publishedAt =
      null;
  }

  // ----------------------------------------------------
  // IMPORTANT
  // ----------------------------------------------------
  //
  // Jika status tidak dikirim:
  //
  // update title
  // update content
  // update thumbnail
  //
  // tidak akan mengubah publishedAt.
  //

  const updated =
    await newsRepository.updateNews(
      newsId,
      updateData,
    );

  return mapNews(
    updated,
  );
}

// ======================================================
// PUBLISH
// ======================================================

export async function publishNews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  if (existing.deletedAt) {
    throw new Error(
      "Deleted news cannot be published.",
    );
  }

  if (
    existing.status ===
    NEWS_STATUS.PUBLISHED
  ) {
    return mapNews(
      existing,
    );
  }

  const updated =
    await newsRepository.updateNews(
      newsId,
      {
        status:
          NEWS_STATUS.PUBLISHED,

        publishedAt:
          existing.publishedAt ??
          new Date(),
      },
    );

  return mapNews(
    updated,
  );
}

// ======================================================
// ARCHIVE
// ======================================================

export async function archiveNews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  if (existing.deletedAt) {
    throw new Error(
      "Deleted news cannot be archived.",
    );
  }

  if (
    existing.status ===
    NEWS_STATUS.ARCHIVED
  ) {
    return mapNews(
      existing,
    );
  }

  const updated =
    await newsRepository.updateNews(
      newsId,
      {
        status:
          NEWS_STATUS.ARCHIVED,
      },
    );

  return mapNews(
    updated,
  );
}

// ======================================================
// DRAFT
// ======================================================

export async function draftNews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  if (existing.deletedAt) {
    throw new Error(
      "Deleted news cannot be changed to draft.",
    );
  }

  if (
    existing.status ===
    NEWS_STATUS.DRAFT
  ) {
    return mapNews(
      existing,
    );
  }

  const updated =
    await newsRepository.updateNews(
      newsId,
      {
        status:
          NEWS_STATUS.DRAFT,

        publishedAt: null,
      },
    );

  return mapNews(
    updated,
  );
}

// ======================================================
// DELETE
// ======================================================

export async function deleteNews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  if (existing.deletedAt) {
    return mapNews(
      existing,
    );
  }

  const deleted =
    await newsRepository.softDeleteNews(
      newsId,
    );

  return mapNews(
    deleted,
  );
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreNews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const existing =
    await newsRepository.findNewsById(
      newsId,
      true,
    );

  if (!existing) {
    throw new Error(
      "News not found.",
    );
  }

  if (!existing.deletedAt) {
    return mapNews(
      existing,
    );
  }

  const restored =
    await newsRepository.restoreNews(
      newsId,
    );

  return mapNews(
    restored,
  );
}

// ======================================================
// INCREMENT VIEWS
// ======================================================

export async function incrementNewsViews(
  id,
) {
  const newsId =
    newsIdSchema.parse(id);

  const news =
    await newsRepository.findNewsById(
      newsId,
      false,
    );

  if (!news) {
    throw new Error(
      "News not found.",
    );
  }

  if (
    news.status !==
    NEWS_STATUS.PUBLISHED
  ) {
    throw new Error(
      "Only published news can receive views.",
    );
  }

  if (news.deletedAt) {
    throw new Error(
      "Deleted news cannot receive views.",
    );
  }

  const updated =
    await newsRepository.incrementNewsViews(
      newsId,
    );

  return mapNews(
    updated,
  );
}

// ======================================================
// EXPORT
// ======================================================

export default {
  createNews,

  getNews,
  getPublishedNews,

  getNewsById,
  getNewsBySlug,

  updateNews,

  publishNews,
  archiveNews,
  draftNews,

  deleteNews,
  restoreNews,

  incrementNewsViews,
};