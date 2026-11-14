// ======================================================
// NEWS CONTROLLER
// ======================================================
//
// Controller bertanggung jawab untuk:
// - menerima HTTP request
// - mengambil data dari req
// - memanggil news.service
// - mengirim HTTP response
//
// Controller TIDAK:
// - query Prisma secara langsung
// - menjalankan business logic
// - melakukan validasi database
// ======================================================

import * as newsService from "./news.service.js";

// ======================================================
// RESPONSE HELPERS
// ======================================================

function success(
  res,
  data,
  message = "Success.",
  statusCode = 200,
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

// ======================================================
// CREATE
// ======================================================

export async function createNews(
  req,
  res,
  next,
) {
  try {
    const data =
      req.validated?.body ??
      req.body;

    const authorId =
      req.user?.id;

    const news =
      await newsService.createNews(
        data,
        authorId,
      );

    return success(
      res,
      news,
      "News created successfully.",
      201,
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// LIST
// ======================================================

export async function getNews(
  req,
  res,
  next,
) {
  try {
    const options =
      req.validated?.query ??
      req.query;

    const result =
      await newsService.getNews(
        options,
      );

    return success(
      res,
      result,
      "News retrieved successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// PUBLIC NEWS
// ======================================================

export async function getPublishedNews(
  req,
  res,
  next,
) {
  try {
    const options =
      req.validated?.query ??
      req.query;

    const result =
      await newsService.getPublishedNews(
        options,
      );

    return success(
      res,
      result,
      "Published news retrieved successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// FIND BY ID
// ======================================================

export async function getNewsById(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.getNewsById(
        id,
      );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
        data: null,
      });
    }

    return success(
      res,
      news,
      "News retrieved successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// FIND BY SLUG
// ======================================================

export async function getNewsBySlug(
  req,
  res,
  next,
) {
  try {
    const slug =
      req.validated?.params?.slug ??
      req.params.slug;

    const news =
      await newsService.getNewsBySlug(
        slug,
      );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
        data: null,
      });
    }

    return success(
      res,
      news,
      "News retrieved successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// UPDATE
// ======================================================

export async function updateNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const data =
      req.validated?.body ??
      req.body;

    const news =
      await newsService.updateNews(
        id,
        data,
      );

    return success(
      res,
      news,
      "News updated successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// PUBLISH
// ======================================================

export async function publishNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.publishNews(
        id,
      );

    return success(
      res,
      news,
      "News published successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// ARCHIVE
// ======================================================

export async function archiveNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.archiveNews(
        id,
      );

    return success(
      res,
      news,
      "News archived successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// DRAFT
// ======================================================

export async function draftNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.draftNews(
        id,
      );

    return success(
      res,
      news,
      "News changed to draft successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// DELETE
// ======================================================

export async function deleteNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.deleteNews(
        id,
      );

    return success(
      res,
      news,
      "News deleted successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreNews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.restoreNews(
        id,
      );

    return success(
      res,
      news,
      "News restored successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// INCREMENT VIEWS
// ======================================================

export async function incrementNewsViews(
  req,
  res,
  next,
) {
  try {
    const id =
      req.validated?.params?.id ??
      req.params.id;

    const news =
      await newsService.incrementNewsViews(
        id,
      );

    return success(
      res,
      news,
      "News view recorded successfully.",
    );
  } catch (error) {
    return next(error);
  }
}

// ======================================================
// EXPORT
// ======================================================

export default {
  createNews,

  getNews,
  getPublishedNews,

  getNewsById,
  getNewsBySlug,

  updateNews,

  publishNews,
  archiveNews,
  draftNews,

  deleteNews,
  restoreNews,

  incrementNewsViews,
};