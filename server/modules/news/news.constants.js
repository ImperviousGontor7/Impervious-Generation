// ======================================================
// NEWS CONSTANTS
// ======================================================

export const NEWS_STATUS = Object.freeze({
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
});

export const NEWS_STATUSES = Object.freeze(
  Object.values(NEWS_STATUS),
);

// ======================================================
// LIMITS
// ======================================================

export const NEWS_LIMITS = Object.freeze({
  TITLE_MIN: 3,
  TITLE_MAX: 255,

  SLUG_MIN: 1,
  SLUG_MAX: 255,

  EXCERPT_MAX: 1000,

  CONTENT_MIN: 1,

  META_TITLE_MAX: 255,

  META_DESCRIPTION_MAX: 500,

  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});

// ======================================================
// DEFAULTS
// ======================================================

export const NEWS_DEFAULTS = Object.freeze({
  STATUS: NEWS_STATUS.DRAFT,

  VIEWS: 0,

  PUBLISHED_AT: null,
});

// ======================================================
// SORT
// ======================================================

export const NEWS_SORT_FIELDS = Object.freeze([
  "createdAt",
  "updatedAt",
  "publishedAt",
  "title",
  "views",
]);

export const NEWS_SORT_ORDERS = Object.freeze([
  "asc",
  "desc",
]);

// ======================================================
// PUBLICATION
// ======================================================

export const NEWS_PUBLICATION = Object.freeze({
  PUBLISHED: NEWS_STATUS.PUBLISHED,

  DEFAULT_SORT_BY: "createdAt",

  DEFAULT_SORT_ORDER: "desc",
});

// ======================================================
// EXPORT
// ======================================================

export default {
  NEWS_STATUS,
  NEWS_STATUSES,

  NEWS_LIMITS,

  NEWS_DEFAULTS,

  NEWS_SORT_FIELDS,
  NEWS_SORT_ORDERS,

  NEWS_PUBLICATION,
};