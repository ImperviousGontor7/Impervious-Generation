import { z } from "zod";

const statusSchema =
  z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]);

const urlSchema =
  z
    .string()
    .trim()
    .url(
      "Invalid image URL"
    )
    .max(
      2048,
      "Image URL is too long"
    );

export const createGallerySchema =
  z.object({
    title: z
      .string()
      .trim()
      .max(
        255,
        "Title must not exceed 255 characters"
      )
      .optional()
      .nullable(),

    image:
      urlSchema,

    caption: z
      .string()
      .trim()
      .max(
        1000,
        "Caption must not exceed 1000 characters"
      )
      .optional()
      .nullable(),

    status:
      statusSchema.optional(),
  });

export const updateGallerySchema =
  z.object({
    title: z
      .string()
      .trim()
      .max(
        255,
        "Title must not exceed 255 characters"
      )
      .optional()
      .nullable(),

    image:
      urlSchema.optional(),

    caption: z
      .string()
      .trim()
      .max(
        1000,
        "Caption must not exceed 1000 characters"
      )
      .optional()
      .nullable(),

    status:
      statusSchema.optional(),
  });

export const updateGalleryStatusSchema =
  z.object({
    status:
      statusSchema,
  });

export const galleryIdSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(
        1,
        "Gallery ID is required"
      ),
  });