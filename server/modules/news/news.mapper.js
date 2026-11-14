// ======================================================
// NEWS MAPPER
// ======================================================
//
// Repository → Service → Mapper → Controller
//
// Mapper bertanggung jawab untuk:
// - menentukan bentuk response News
// - mengontrol field yang boleh keluar
// - memetakan relation author
// - memetakan relation category
// - menjaga response tetap konsisten
//
// Mapper TIDAK melakukan:
// - query database
// - validasi business rule
// - mutation database
// ======================================================

// ======================================================
// AUTHOR
// ======================================================

function mapAuthor(author) {
  if (!author) {
    return null;
  }

  return {
    id: author.id ?? null,

    username:
      author.username ?? null,

    fullName:
      author.fullName ?? null,

    avatar:
      author.avatar ?? null,

    role:
      author.role ?? null,
  };
}

// ======================================================
// CATEGORY
// ======================================================

function mapCategory(category) {
  if (!category) {
    return null;
  }

  return {
    id: category.id ?? null,

    name:
      category.name ?? null,

    slug:
      category.slug ?? null,
  };
}

// ======================================================
// NEWS
// ======================================================

export function mapNews(news) {
  if (
    !news ||
    typeof news !== "object"
  ) {
    return null;
  }

  return {
    // --------------------------------------------------
    // IDENTITY
    // --------------------------------------------------

    id:
      news.id ?? null,

    title:
      news.title ?? null,

    slug:
      news.slug ?? null,

    // --------------------------------------------------
    // CONTENT
    // --------------------------------------------------

    excerpt:
      news.excerpt ?? null,

    content:
      news.content ?? null,

    // --------------------------------------------------
    // MEDIA
    // --------------------------------------------------

    thumbnail:
      news.thumbnail ?? null,

    banner:
      news.banner ?? null,

    // --------------------------------------------------
    // SEO
    // --------------------------------------------------

    metaTitle:
      news.metaTitle ?? null,

    metaDescription:
      news.metaDescription ?? null,

    // --------------------------------------------------
    // METRICS
    // --------------------------------------------------

    views:
      Number.isFinite(
        Number(news.views),
      )
        ? Number(news.views)
        : 0,

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    status:
      news.status ?? null,

    // --------------------------------------------------
    // RELATION IDS
    // --------------------------------------------------

    authorId:
      news.authorId ?? null,

    categoryId:
      news.categoryId ?? null,

    // --------------------------------------------------
    // DATES
    // --------------------------------------------------

    publishedAt:
      news.publishedAt ?? null,

    createdAt:
      news.createdAt ?? null,

    updatedAt:
      news.updatedAt ?? null,

    // --------------------------------------------------
    // RELATIONS
    // --------------------------------------------------

    author:
      mapAuthor(
        news.author,
      ),

    category:
      mapCategory(
        news.category,
      ),
  };
}

// ======================================================
// NEWS LIST
// ======================================================

export function mapNewsList(
  items = [],
) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map(mapNews)
    .filter(Boolean);
}

// ======================================================
// PAGINATION
// ======================================================

export function mapNewsPagination(
  result,
) {
  const pagination =
    result?.pagination;

  return {
    page:
      pagination?.page ?? 1,

    limit:
      pagination?.limit ?? 20,

    total:
      pagination?.total ?? 0,

    totalPages:
      pagination?.totalPages ?? 0,

    hasNextPage:
      Boolean(
        pagination?.hasNextPage,
      ),

    hasPrevPage:
      Boolean(
        pagination?.hasPrevPage,
      ),

    nextPage:
      pagination?.nextPage ??
      null,

    prevPage:
      pagination?.prevPage ??
      null,
  };
}

// ======================================================
// RESULT
// ======================================================

export function mapNewsResult(
  result,
) {
  if (
    !result ||
    typeof result !== "object"
  ) {
    return {
      items: [],

      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,

        hasNextPage: false,
        hasPrevPage: false,

        nextPage: null,
        prevPage: null,
      },
    };
  }

  return {
    items:
      mapNewsList(
        result.items,
      ),

    pagination:
      mapNewsPagination(
        result,
      ),
  };
}

// ======================================================
// EXPORT
// ======================================================

export default {
  mapNews,

  mapNewsList,

  mapNewsPagination,

  mapNewsResult,
};