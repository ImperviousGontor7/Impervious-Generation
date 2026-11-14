import { z } from "zod";

import {
  CATEGORY_LIMITS,
} from "./category.constants.js";

// ======================================================
// SLUG
// ======================================================

export const categorySlugSchema =
  z
    .string()
    .trim()

    .min(
      CATEGORY_LIMITS.SLUG_MIN,
      "Category slug is required.",
    )

    .max(
      CATEGORY_LIMITS.SLUG_MAX,
      `Category slug must not exceed ${CATEGORY_LIMITS.SLUG_MAX} characters.`,
    )

    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Category slug may only contain lowercase letters, numbers, and hyphens.",
    );

// ======================================================
// NAME
// ======================================================

export const categoryNameSchema =
  z
    .string()
    .trim()

    .min(
      CATEGORY_LIMITS.NAME_MIN,
      `Category name must be at least ${CATEGORY_LIMITS.NAME_MIN} characters.`,
    )

    .max(
      CATEGORY_LIMITS.NAME_MAX,
      `Category name must not exceed ${CATEGORY_LIMITS.NAME_MAX} characters.`,
    );

// ======================================================
// DESCRIPTION
// ======================================================

export const categoryDescriptionSchema =
  z
    .string()
    .trim()

    .max(
      CATEGORY_LIMITS.DESCRIPTION_MAX,
      `Category description must not exceed ${CATEGORY_LIMITS.DESCRIPTION_MAX} characters.`,
    )

    .nullable()
    .optional();

// ======================================================
// CREATE
// ======================================================

export const categoryCreateSchema =
  z.object({
    name:
      categoryNameSchema,

    slug:
      categorySlugSchema,

    description:
      categoryDescriptionSchema,
  });

// ======================================================
// UPDATE
// ======================================================

export const categoryUpdateSchema =
  z
    .object({
      name:
        categoryNameSchema.optional(),

      slug:
        categorySlugSchema.optional(),

      description:
        categoryDescriptionSchema,
    })

    .refine(
      (data) =>
        Object.keys(
          data,
        ).length > 0,
      {
        message:
          "At least one category field must be provided.",
      },
    );

// ======================================================
// LIST
// ======================================================

export const categoryListSchema =
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
        .max(
          100,
        )
        .default(20),

    search:
      z
        .string()
        .trim()
        .max(100)
        .optional()
        .default(""),
  });

// ======================================================
// ID
// ======================================================

export const categoryIdSchema =
  z
    .string()
    .trim()
    .min(
      1,
      "Category ID is required.",
    );

export default {
  categorySlugSchema,
  categoryNameSchema,
  categoryDescriptionSchema,

  categoryCreateSchema,
  categoryUpdateSchema,
  categoryListSchema,

  categoryIdSchema,
};