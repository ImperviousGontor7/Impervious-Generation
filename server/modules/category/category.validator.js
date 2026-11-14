import {
  categoryCreateSchema,
  categoryUpdateSchema,
  categoryListSchema,
  categoryIdSchema,
} from "./category.schema.js";

import {
  mapCategory,
  mapCategoryList,
} from "./category.mapper.js";

import * as categoryRepository from "./category.repository.js";

import {
  createSlug,
} from "../../utils/slug.js";

// ======================================================
// HELPERS
// ======================================================

function normalizeName(value) {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim();

  return normalized || null;
}

function normalizeSlug(value) {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value
    .trim()
    .toLowerCase();

  return normalized || null;
}

// ======================================================
// VALIDATION HELPERS
// ======================================================

function createValidator(schema, source, invalidMessage) {
  return (req, res, next) => {
    const input = req[source] ?? {};

    const result = schema.safeParse(input);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: invalidMessage,
        details: result.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
          code: issue.code,
        })),
      });
    }

    req.validated = req.validated || {};
    req.validated[source] = result.data;

    if (source === "body") {
      req.body = result.data;
    } else if (source === "query") {
      req.query = result.data;
    } else if (source === "params") {
      req.params = result.data;
    }

    return next();
  };
}

export const validateCreateCategory = createValidator(
  categoryCreateSchema,
  "body",
  "Validation error.",
);

export const validateUpdateCategory = createValidator(
  categoryUpdateSchema,
  "body",
  "Validation error.",
);

export const validateCategoryList = createValidator(
  categoryListSchema,
  "query",
  "Invalid category query.",
);

// ======================================================
// CREATE
// ======================================================

export async function createCategory(data) {
  const input = {
    ...data,
    name: normalizeName(data?.name),
    slug: normalizeSlug(data?.slug) || createSlug(data?.name),
    description: data?.description ?? null,
  };

  const parsed = categoryCreateSchema.parse(input);

  const existingName = await categoryRepository.findCategoryByName(parsed.name);

  if (existingName) {
    throw new Error("Category name is already in use.");
  }

  const existingSlug = await categoryRepository.findCategoryBySlug(parsed.slug);

  if (existingSlug) {
    throw new Error("Category slug is already in use.");
  }

  const category = await categoryRepository.createCategory(parsed);

  return mapCategory(category);
}

// ======================================================
// LIST
// ======================================================

export async function getCategories(options = {}) {
  const parsed = categoryListSchema.parse(options);

  const result = await categoryRepository.listCategories(parsed);

  return mapCategoryList(result);
}

// ======================================================
// FIND BY ID
// ======================================================

export async function getCategoryById(id) {
  const parsed = categoryIdSchema.parse(id);

  const category = await categoryRepository.findCategoryById(parsed);

  return mapCategory(category);
}

// ======================================================
// FIND BY SLUG
// ======================================================

export async function getCategoryBySlug(slug) {
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    throw new Error("Category slug is required.");
  }

  const category = await categoryRepository.findCategoryBySlug(normalizedSlug);

  return mapCategory(category);
}

// ======================================================
// FIND BY NAME
// ======================================================

export async function getCategoryByName(name) {
  const normalizedName = normalizeName(name);

  if (!normalizedName) {
    throw new Error("Category name is required.");
  }

  const category = await categoryRepository.findCategoryByName(normalizedName);

  return mapCategory(category);
}

// ======================================================
// UPDATE
// ======================================================

export async function updateCategory(id, data) {
  const categoryId = categoryIdSchema.parse(id);

  const existing = await categoryRepository.findCategoryById(categoryId);

  if (!existing) {
    throw new Error("Category not found.");
  }

  const input = {
    ...data,
  };

  if (input.name !== undefined) {
    input.name = normalizeName(input.name);
  }

  if (input.slug !== undefined) {
    input.slug = normalizeSlug(input.slug);
  }

  const parsed = categoryUpdateSchema.parse(input);

  if (
    parsed.name !== undefined &&
    parsed.name !== existing.name
  ) {
    const duplicate = await categoryRepository.findCategoryByName(parsed.name);

    if (duplicate && duplicate.id !== categoryId) {
      throw new Error("Category name is already in use.");
    }
  }

  if (
    parsed.slug !== undefined &&
    parsed.slug !== existing.slug
  ) {
    const duplicate = await categoryRepository.findCategoryBySlug(parsed.slug);

    if (duplicate && duplicate.id !== categoryId) {
      throw new Error("Category slug is already in use.");
    }
  }

  const updated = await categoryRepository.updateCategory(categoryId, parsed);

  return mapCategory(updated);
}

// ======================================================
// DELETE
// ======================================================

export async function deleteCategory(id) {
  const categoryId = categoryIdSchema.parse(id);

  const existing = await categoryRepository.findCategoryById(categoryId);

  if (!existing) {
    throw new Error("Category not found.");
  }

  /*
   * Category memiliki relasi News.
   *
   * Kita tidak melakukan cascade/hard-delete
   * secara buta dari service.
   *
   * Jika category masih digunakan oleh News,
   * Prisma/database akan menolak operasi
   * sesuai konfigurasi relation.
   */

  await categoryRepository.deleteCategory(categoryId);

  return {
    id: categoryId,
    deleted: true,
  };
}

export default {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  getCategoryByName,
  updateCategory,
  deleteCategory,
};