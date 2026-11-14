import { z } from "zod";

// ======================================================
// STATUS
// ======================================================

export const newsStatusSchema =
  z.enum([
    "DRAFT",

    "PUBLISHED",

    "ARCHIVED",
  ]);

// ======================================================
// ID
// ======================================================

export const newsIdSchema =
  z
    .string()
    .trim()
    .min(1);

// ======================================================
// TITLE
// ======================================================

export const newsTitleSchema =
  z
    .string()
    .trim()
    .min(3)
    .max(255);

// ======================================================
// SLUG
// ======================================================

export const newsSlugSchema =
  z
    .string()
    .trim()
    .min(1)
    .max(255)

    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    );

// ======================================================
// CONTENT
// ======================================================

export const newsContentSchema =
  z
    .string()
    .trim()
    .min(1);

// ======================================================
// CREATE
// ======================================================

export const newsCreateSchema =
  z.object({
    title:
      newsTitleSchema,

    slug:
      newsSlugSchema,

    excerpt:
      z
        .string()
        .trim()
        .max(1000)
        .nullable()
        .optional(),

    content:
      newsContentSchema,

    thumbnail:
      z
        .string()
        .trim()
        .nullable()
        .optional(),

    banner:
      z
        .string()
        .trim()
        .nullable()
        .optional(),

    metaTitle:
      z
        .string()
        .trim()
        .max(255)
        .nullable()
        .optional(),

    metaDescription:
      z
        .string()
        .trim()
        .max(500)
        .nullable()
        .optional(),

    status:
      newsStatusSchema
        .default(
          "DRAFT",
        ),

    categoryId:
      z
        .string()
        .trim()
        .min(1)
        .nullable()
        .optional(),

    publishedAt:
      z
        .coerce
        .date()
        .nullable()
        .optional(),
  });

// ======================================================
// UPDATE
// ======================================================

export const newsUpdateSchema =
  newsCreateSchema
    .partial()
    .refine(
      (data) =>
        Object.keys(
          data,
        ).length > 0,
      {
        message:
          "At least one field is required.",
      },
    );

// ======================================================
// LIST
// ======================================================

export const newsListSchema =
  z.object({
    page:
      z.coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit:
      z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20),

    search:
      z
        .string()
        .trim()
        .optional(),

    status:
      newsStatusSchema
        .optional(),

    categoryId:
      z
        .string()
        .trim()
        .optional(),
  });

export default {
  newsIdSchema,

  newsStatusSchema,

  newsTitleSchema,

  newsSlugSchema,

  newsContentSchema,

  newsCreateSchema,

  newsUpdateSchema,

  newsListSchema,
};