import { z } from "zod";

// ======================================================
// ENUMS
// ======================================================

export const newsStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

// ======================================================
// ID
// ======================================================

export const newsIdSchema = z
  .string()
  .trim()
  .min(1, "News ID is required.");

// ======================================================
// SLUG
// ======================================================

export const newsSlugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required.")
  .max(255, "Slug is too long.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug format is invalid.",
  );

// ======================================================
// CATEGORY ID
// ======================================================

const categoryIdSchema = z
  .string()
  .trim()
  .min(1, "Category ID is invalid.")
  .nullable()
  .optional();

// ======================================================
// PUBLISHED AT
// ======================================================

const publishedAtSchema = z
  .coerce
  .date()
  .nullable()
  .optional();

// ======================================================
// CREATE
// ======================================================

export const newsCreateSchema = z.object({
  // ----------------------------------------------------
  // BASIC
  // ----------------------------------------------------

  title: z
    .string()
    .trim()
    .min(
      3,
      "Title must contain at least 3 characters.",
    )
    .max(
      255,
      "Title is too long.",
    ),

  slug: newsSlugSchema,

  excerpt: z
    .string()
    .trim()
    .max(
      1000,
      "Excerpt is too long.",
    )
    .nullable()
    .optional(),

  content: z
    .string()
    .trim()
    .min(
      1,
      "Content is required.",
    ),

  // ----------------------------------------------------
  // MEDIA
  // ----------------------------------------------------

  thumbnail: z
    .string()
    .trim()
    .min(
      1,
      "Thumbnail cannot be empty.",
    )
    .nullable()
    .optional(),

  banner: z
    .string()
    .trim()
    .min(
      1,
      "Banner cannot be empty.",
    )
    .nullable()
    .optional(),

  // ----------------------------------------------------
  // SEO
  // ----------------------------------------------------

  metaTitle: z
    .string()
    .trim()
    .max(
      255,
      "Meta title is too long.",
    )
    .nullable()
    .optional(),

  metaDescription: z
    .string()
    .trim()
    .max(
      500,
      "Meta description is too long.",
    )
    .nullable()
    .optional(),

  // ----------------------------------------------------
  // STATUS
  // ----------------------------------------------------

  status:
    newsStatusSchema.default(
      "DRAFT",
    ),

  // ----------------------------------------------------
  // RELATIONS
  // ----------------------------------------------------

  categoryId:
    categoryIdSchema,

  // ----------------------------------------------------
  // PUBLICATION
  // ----------------------------------------------------

  publishedAt:
    publishedAtSchema,
});

// ======================================================
// UPDATE
// ======================================================

export const newsUpdateSchema =
  newsCreateSchema
    .partial()
    .refine(
      (data) =>
        Object.keys(data).length > 0,
      {
        message:
          "At least one field is required.",
      },
    );

// ======================================================
// LIST
// ======================================================

export const newsListSchema = z.object({
  // ----------------------------------------------------
  // PAGINATION
  // ----------------------------------------------------

  page: z.coerce
    .number()
    .int(
      "Page must be an integer.",
    )
    .min(
      1,
      "Page must be at least 1.",
    )
    .default(1),

  limit: z.coerce
    .number()
    .int(
      "Limit must be an integer.",
    )
    .min(
      1,
      "Limit must be at least 1.",
    )
    .max(
      100,
      "Limit cannot exceed 100.",
    )
    .default(20),

  // ----------------------------------------------------
  // SEARCH
  // ----------------------------------------------------

  search: z
    .string()
    .trim()
    .max(
      255,
      "Search query is too long.",
    )
    .default(""),

  // ----------------------------------------------------
  // FILTER
  // ----------------------------------------------------

  status:
    newsStatusSchema.optional(),

  categoryId: z
    .string()
    .trim()
    .min(
      1,
      "Category ID is invalid.",
    )
    .optional(),

  authorId: z
    .string()
    .trim()
    .min(
      1,
      "Author ID is invalid.",
    )
    .optional(),

  // ----------------------------------------------------
  // SORTING
  // ----------------------------------------------------

  sortBy: z
    .enum([
      "createdAt",
      "updatedAt",
      "publishedAt",
      "title",
      "views",
    ])
    .default("createdAt"),

  sortOrder: z
    .enum([
      "asc",
      "desc",
    ])
    .default("desc"),

  // ----------------------------------------------------
  // INTERNAL FILTERS
  // ----------------------------------------------------

  publishedOnly: z
    .coerce
    .boolean()
    .default(false),

  includeDeleted: z
    .coerce
    .boolean()
    .default(false),
});

// ======================================================
// EXPORT
// ======================================================

export default {
  newsIdSchema,
  newsStatusSchema,
  newsSlugSchema,

  newsCreateSchema,
  newsUpdateSchema,

  newsListSchema,
};