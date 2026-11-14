import { z } from "zod";

const statusSchema =
  z.enum([
    "ACTIVE",
    "INACTIVE",
  ]);

const emailSchema =
  z
    .string()
    .trim()
    .email(
      "Invalid email address"
    )
    .max(
      255,
      "Email must not exceed 255 characters"
    );

const urlSchema =
  z
    .string()
    .trim()
    .url(
      "Invalid photo URL"
    )
    .max(
      2048,
      "Photo URL is too long"
    );

const orderSchema =
  z
    .coerce
    .number()
    .int()
    .min(
      0,
      "Order cannot be negative"
    );

export const createCommitteeSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        "Name is required"
      )
      .max(
        255,
        "Name must not exceed 255 characters"
      ),

    position: z
      .string()
      .trim()
      .min(
        1,
        "Position is required"
      )
      .max(
        255,
        "Position must not exceed 255 characters"
      ),

    bio: z
      .string()
      .trim()
      .max(
        5000,
        "Bio must not exceed 5000 characters"
      )
      .optional()
      .nullable(),

    photo:
      urlSchema
        .optional()
        .nullable(),

    email:
      emailSchema
        .optional()
        .nullable(),

    phone: z
      .string()
      .trim()
      .max(
        50,
        "Phone must not exceed 50 characters"
      )
      .optional()
      .nullable(),

    order:
      orderSchema
        .optional(),

    status:
      statusSchema
        .optional(),
  });

export const updateCommitteeSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        "Name cannot be empty"
      )
      .max(
        255,
        "Name must not exceed 255 characters"
      )
      .optional(),

    position: z
      .string()
      .trim()
      .min(
        1,
        "Position cannot be empty"
      )
      .max(
        255,
        "Position must not exceed 255 characters"
      )
      .optional(),

    bio: z
      .string()
      .trim()
      .max(
        5000,
        "Bio must not exceed 5000 characters"
      )
      .optional()
      .nullable(),

    photo:
      urlSchema
        .optional()
        .nullable(),

    email:
      emailSchema
        .optional()
        .nullable(),

    phone: z
      .string()
      .trim()
      .max(
        50,
        "Phone must not exceed 50 characters"
      )
      .optional()
      .nullable(),

    order:
      orderSchema
        .optional(),

    status:
      statusSchema
        .optional(),
  });

export const committeeIdSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(
        1,
        "Committee ID is required"
      ),
  });