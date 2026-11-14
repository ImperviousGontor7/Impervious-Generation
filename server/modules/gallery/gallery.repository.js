import prisma from "../../config/prisma.js";

const gallerySelect = {
  id: true,
  title: true,
  image: true,
  caption: true,
  status: true,
  uploaderId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllGalleries(
  includeDeleted = false
) {
  return prisma.gallery.findMany({
    where: includeDeleted
      ? {}
      : {
          deletedAt: null,
        },

    select:
      gallerySelect,

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findGalleryById(
  id,
  includeDeleted = false
) {
  return prisma.gallery.findFirst({
    where: {
      id,

      ...(includeDeleted
        ? {}
        : {
            deletedAt: null,
          }),
    },

    select:
      gallerySelect,
  });
}

export async function createGallery(
  data
) {
  return prisma.gallery.create({
    data: {
      title:
        data.title ??
        null,

      image:
        data.image,

      caption:
        data.caption ??
        null,

      status:
        data.status ??
        "PUBLISHED",

      uploaderId:
        data.uploaderId,
    },

    select:
      gallerySelect,
  });
}

export async function updateGallery(
  id,
  data
) {
  return prisma.gallery.update({
    where: {
      id,
    },

    data: {
      ...(data.title !==
        undefined && {
        title:
          data.title,
      }),

      ...(data.image !==
        undefined && {
        image:
          data.image,
      }),

      ...(data.caption !==
        undefined && {
        caption:
          data.caption,
      }),

      ...(data.status !==
        undefined && {
        status:
          data.status,
      }),
    },

    select:
      gallerySelect,
  });
}

export async function updateGalleryStatus(
  id,
  status
) {
  return prisma.gallery.update({
    where: {
      id,
    },

    data: {
      status,
    },

    select:
      gallerySelect,
  });
}

export async function softDeleteGallery(
  id
) {
  return prisma.gallery.update({
    where: {
      id,
    },

    data: {
      deletedAt:
        new Date(),
    },

    select:
      gallerySelect,
  });
}

export async function restoreGallery(
  id
) {
  return prisma.gallery.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
    },

    select:
      gallerySelect,
  });
}

export async function deleteGallery(
  id
) {
  return prisma.gallery.delete({
    where: {
      id,
    },
  });
}

export default {
  findAllGalleries,
  findGalleryById,
  createGallery,
  updateGallery,
  updateGalleryStatus,
  softDeleteGallery,
  restoreGallery,
  deleteGallery,
};