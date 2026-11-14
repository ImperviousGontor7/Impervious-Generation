// ======================================================
// CATEGORY CONSTANTS
// ======================================================

export const CATEGORY_LIMITS =
  Object.freeze({
    NAME_MIN: 2,
    NAME_MAX: 100,

    SLUG_MIN: 1,
    SLUG_MAX: 200,

    DESCRIPTION_MAX: 500,

    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
  });

export const CATEGORY_DEFAULTS =
  Object.freeze({
    DESCRIPTION: null,
  });

export const CATEGORY_ORDER =
  Object.freeze({
    NAME_ASC: "name_asc",
    NAME_DESC: "name_desc",
    CREATED_ASC: "created_asc",
    CREATED_DESC: "created_desc",
    UPDATED_ASC: "updated_asc",
    UPDATED_DESC: "updated_desc",
  });

export const CATEGORY_SORT_FIELDS =
  Object.freeze([
    "name",
    "createdAt",
    "updatedAt",
  ]);

export default {
  CATEGORY_LIMITS,
  CATEGORY_DEFAULTS,
  CATEGORY_ORDER,
  CATEGORY_SORT_FIELDS,
};