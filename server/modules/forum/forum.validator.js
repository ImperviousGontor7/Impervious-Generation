import { z } from "zod";

export const createForumSchema =
  z.object({
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

    content: z
      .string()
      .trim()
      .min(
        1,
        "Content is required"
      )
      .max(
        50000,
        "Content must not exceed 50000 characters"
      ),
  });

export const updateForumSchema =
  z
    .object({
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
        )
        .optional(),

      content: z
        .string()
        .trim()
        .min(
          1,
          "Content is required"
        )
        .max(
          50000,
          "Content must not exceed 50000 characters"
        )
        .optional(),
    })
    .refine(
      (data) =>
        Object.keys(data)
          .length > 0,
      {
        message:
          "At least one field must be provided.",
      }
    );

export const forumIdSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(
        1,
        "Forum ID is required"
      ),
  });