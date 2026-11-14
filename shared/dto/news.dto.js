// ======================================================
// NEWS DTO
// ======================================================

export function toNewsDto(
  news,
) {
  if (!news) {
    return null;
  }

  return {
    id:
      news.id,

    title:
      news.title,

    slug:
      news.slug,

    excerpt:
      news.excerpt ??
      null,

    content:
      news.content,

    thumbnail:
      news.thumbnail ??
      null,

    banner:
      news.banner ??
      null,

    metaTitle:
      news.metaTitle ??
      null,

    metaDescription:
      news.metaDescription ??
      null,

    views:
      Number(
        news.views ?? 0,
      ),

    status:
      news.status,

    publishedAt:
      news.publishedAt ??
      null,

    createdAt:
      news.createdAt ??
      null,

    updatedAt:
      news.updatedAt ??
      null,

    author:
      news.author
        ? {
            id:
              news.author.id,

            username:
              news.author
                .username,

            fullName:
              news.author
                .fullName ??
              null,

            avatar:
              news.author
                .avatar ??
              null,
          }
        : null,

    category:
      news.category
        ? {
            id:
              news.category.id,

            name:
              news.category
                .name,

            slug:
              news.category
                .slug,
          }
        : null,
  };
}

export function toNewsListDto(
  items = [],
) {
  return items.map(
    toNewsDto,
  );
}

export function toNewsPaginationDto(
  result,
) {
  return {
    items:
      toNewsListDto(
        result?.items ??
          [],
      ),

    pagination:
      result?.pagination ?? {
        page: 1,

        limit: 20,

        total: 0,

        totalPages: 0,

        hasNextPage:
          false,

        hasPrevPage:
          false,
      },
  };
}

export default {
  toNewsDto,

  toNewsListDto,

  toNewsPaginationDto,
};