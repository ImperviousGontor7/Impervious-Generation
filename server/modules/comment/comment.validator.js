import { z } from "zod";

// ======================================================
// SLUG
// ======================================================

const slugSchema = z
  .string()
  .trim()
  .min(
    1,
    "Slug is required"
  )
  .max(
    200,
    "Slug must not exceed 200 characters"
  )
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug may only contain lowercase letters, numbers, and hyphens"
  );

// ======================================================
// MEDIA URL
// ======================================================
//
// Mendukung:
//
// 1. Absolute URL
//    https://example.com/image.webp
//
// 2. Local upload path
//    /uploads/images/image.webp
//
// Hal ini penting karena storage lokal backend
// menghasilkan relative URL.
// ======================================================

const mediaUrlSchema = z
  .string()
  .trim()
  .max(
    2048,
    "Media URL must not exceed 2048 characters"
  )
  .refine(
    (value) => {
      // Local absolute path.
      if (
        value.startsWith("/")
      ) {
        return true;
      }

      try {
        const url =
          new URL(value);

        return [
          "http:",
          "https:",
        ].includes(
          url.protocol
        );
      } catch {
        return false;
      }
    },
    "Media URL must be an absolute HTTP(S) URL or a local absolute path"
  )
  .optional()
  .nullable();

// ======================================================
// STATUS
// ======================================================

const statusSchema =
  z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]);

// ======================================================
// BASE NEWS FIELDS
// ======================================================

const baseNewsFields = {
  title: z
    .string()
    .trim()
    .min(
      3,
      "Title must be at least 3 characters"
    )
    .max(
      255,
      "Title must not exceed 255 characters"
    ),

  slug:
    slugSchema,

  excerpt: z
    .string()
    .trim()
    .max(
      500,
      "Excerpt must not exceed 500 characters"
    )
    .optional()
    .nullable(),

  content: z
    .string()
    .trim()
    .min(
      1,
      "Content is required"
    ),

  thumbnail:
    mediaUrlSchema,

  banner:
    mediaUrlSchema,

  metaTitle: z
    .string()
    .trim()
    .max(
      255,
      "Meta title must not exceed 255 characters"
    )
    .optional()
    .nullable(),

  metaDescription: z
    .string()
    .trim()
    .max(
      500,
      "Meta description must not exceed 500 characters"
    )
    .optional()
    .nullable(),

  status:
    statusSchema.optional(),

  categoryId: z
    .string()
    .trim()
    .min(
      1,
      "Category ID must not be empty"
    )
    .optional()
    .nullable(),

  publishedAt: z
    .coerce
    .date()
    .optional()
    .nullable(),
};

// ======================================================
// CREATE
// ======================================================

export const createNewsSchema =
  z.object(
    baseNewsFields
  );

// ======================================================
// UPDATE
// ======================================================
//
// Semua field optional untuk PATCH.
// ======================================================

export const updateNewsSchema =
  z
    .object(
      baseNewsFields
    )
    .partial();

// ======================================================
// EXPORT SHARED SCHEMAS
// ======================================================

export {
  slugSchema,
  mediaUrlSchema,
  statusSchema,
};