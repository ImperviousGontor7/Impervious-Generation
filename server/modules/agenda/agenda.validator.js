import { z } from "zod";

const slugSchema =
  z
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

const statusSchema =
  z.enum([
    "UPCOMING",
    "ONGOING",
    "FINISHED",
    "CANCELLED",
  ]);

const dateSchema =
  z.coerce.date();

const optionalUrlSchema =
  z
    .string()
    .trim()
    .url(
      "Invalid URL"
    )
    .max(
      2048,
      "URL must not exceed 2048 characters"
    )
    .optional()
    .nullable();

export const createAgendaSchema =
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
        ),

      slug:
        slugSchema,

      description: z
        .string()
        .trim()
        .max(
          2000,
          "Description must not exceed 2000 characters"
        )
        .optional()
        .nullable(),

      banner:
        optionalUrlSchema,

      location: z
        .string()
        .trim()
        .max(
          255,
          "Location must not exceed 255 characters"
        )
        .optional()
        .nullable(),

      startDate:
        dateSchema,

      endDate:
        dateSchema,

      status:
        statusSchema
          .optional(),
    })

    .refine(
      (data) =>
        data.endDate >=
        data.startDate,
      {
        message:
          "End date must be greater than or equal to start date",

        path: [
          "endDate",
        ],
      }
    );

export const updateAgendaSchema =
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

      slug:
        slugSchema
          .optional(),

      description: z
        .string()
        .trim()
        .max(
          2000,
          "Description must not exceed 2000 characters"
        )
        .optional()
        .nullable(),

      banner:
        optionalUrlSchema,

      location: z
        .string()
        .trim()
        .max(
          255,
          "Location must not exceed 255 characters"
        )
        .optional()
        .nullable(),

      startDate:
        dateSchema.optional(),

      endDate:
        dateSchema.optional(),

      status:
        statusSchema
          .optional(),
    })

    .refine(
      (data) => {
        if (
          data.startDate &&
          data.endDate
        ) {
          return (
            data.endDate >=
            data.startDate
          );
        }

        return true;
      },
      {
        message:
          "End date must be greater than or equal to start date",

        path: [
          "endDate",
        ],
      }
    );

export const agendaIdSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(
        1,
        "Agenda ID is required"
      ),
  });

export const agendaSlugSchema =
  z.object({
    slug:
      slugSchema,
  });