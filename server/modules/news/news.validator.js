import {
  newsCreateSchema,
  newsUpdateSchema,
  newsListSchema,
} from "./news.schema.js";

// ======================================================
// GENERIC BODY VALIDATOR
// ======================================================

function validateBody(
  schema,
) {
  return (
    req,
    res,
    next,
  ) => {
    const result =
      schema.safeParse(
        req.body ?? {},
      );

    if (
      !result.success
    ) {
      return res
        .status(400)
        .json({
          success: false,

          message:
            "Validation error.",

          details:
            result.error.issues.map(
              (issue) => ({
                path:
                  issue.path,

                message:
                  issue.message,

                code:
                  issue.code,
              }),
            ),
        });
    }

    req.validated =
      req.validated || {};

    req.validated.body =
      result.data;

    req.body =
      result.data;

    return next();
  };
}

// ======================================================
// QUERY
// ======================================================

export function validateNewsList(
  req,
  res,
  next,
) {
  const result =
    newsListSchema.safeParse(
      req.query ?? {},
    );

  if (
    !result.success
  ) {
    return res
      .status(400)
      .json({
        success: false,

        message:
          "Invalid news query.",

        details:
          result.error.issues.map(
            (issue) => ({
              path:
                issue.path,

              message:
                issue.message,

              code:
                issue.code,
            }),
          ),
      });
  }

  req.validated =
    req.validated || {};

  req.validated.query =
    result.data;

  req.query =
    result.data;

  return next();
}

// ======================================================
// CREATE
// ======================================================

export const validateCreateNews =
  validateBody(
    newsCreateSchema,
  );

// ======================================================
// UPDATE
// ======================================================

export const validateUpdateNews =
  validateBody(
    newsUpdateSchema,
  );

export default {
  validateNewsList,

  validateCreateNews,
  validateUpdateNews,
};