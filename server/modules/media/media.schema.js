import {
  z,
} from "zod";

// ======================================================
// ID
// ======================================================

export const mediaIdSchema =
  z
    .string()
    .trim()
    .min(
      1,
      "Media ID is required."
    );

// ======================================================
// PROVIDER
// ======================================================

export const mediaProviderSchema =
  z.enum([
    "local",
    "cloud",
  ]);

// ======================================================
// MIME TYPE
// ======================================================

export const mediaMimeTypeSchema =
  z
    .string()
    .trim()
    .min(
      1,
      "MIME type is required."
    )
    .max(
      150,
      "MIME type is too long."
    );

// ======================================================
// FOLDER
// ======================================================

export const mediaFolderSchema =
  z
    .string()
    .trim()
    .min(
      1,
      "Media folder is required."
    )
    .max(
      100,
      "Media folder is too long."
    )
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Invalid media folder."
    );

// ======================================================
// PATH
// ======================================================

export const mediaPathSchema =
  z
    .string()
    .trim()
    .min(
      1,
      "Media path is required."
    )
    .max(
      2048,
      "Media path is too long."
    )
    .refine(
      (value) =>
        !value.includes(
          ".."
        ),
      "Invalid media path."
    );

// ======================================================
// URL
// ======================================================

export const mediaUrlSchema =
  z
    .string()
    .trim()
    .min(
      1
    )
    .max(
      2048
    );

// ======================================================
// LIST
// ======================================================

export const mediaListSchema =
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

    folder:
      mediaFolderSchema
        .optional(),

    mimeType:
      z
        .string()
        .trim()
        .optional(),

    provider:
      mediaProviderSchema
        .optional(),

    includeDeleted:
      z.coerce
        .boolean()
        .default(false),
  });

// ======================================================
// REGISTER
// ======================================================

export const mediaRegisterSchema =
  z.object({
    originalName:
      z
        .string()
        .trim()
        .min(1)
        .max(255),

    filename:
      z
        .string()
        .trim()
        .min(1)
        .max(255),

    mimeType:
      mediaMimeTypeSchema,

    size:
      z
        .number()
        .int()
        .nonnegative(),

    path:
      mediaPathSchema,

    url:
      mediaUrlSchema,

    folder:
      mediaFolderSchema,

    provider:
      mediaProviderSchema,

    uploaderId:
      z
        .string()
        .trim()
        .min(1)
        .nullable()
        .optional(),
  });

// ======================================================
// EXPORT
// ======================================================

export default {
  mediaIdSchema,

  mediaProviderSchema,

  mediaMimeTypeSchema,

  mediaFolderSchema,

  mediaPathSchema,

  mediaUrlSchema,

  mediaListSchema,

  mediaRegisterSchema,
};