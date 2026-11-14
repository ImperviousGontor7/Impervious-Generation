import prisma from "../../config/prisma.js";

const contactSelect = {
  id: true,
  name: true,
  email: true,
  subject: true,
  message: true,
  status: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
};

export async function findAllContactMessages(
  includeDeleted = false
) {
  return prisma.contactMessage.findMany({
    where: includeDeleted ? {} : { deletedAt: null },
    select: contactSelect,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findContactMessageById(
  id,
  includeDeleted = false
) {
  return prisma.contactMessage.findFirst({
    where: {
      id,
      ...(includeDeleted ? {} : { deletedAt: null }),
    },
    select: contactSelect,
  });
}

export async function createContactMessage(data) {
  return prisma.contactMessage.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject ?? null,
      message: data.message,
      status: data.status ?? "UNREAD",
      userId: data.userId ?? null,
    },
    select: contactSelect,
  });
}

export async function updateContactMessage(id, data) {
  return prisma.contactMessage.update({
    where: { id },
    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),
      ...(data.email !== undefined && {
        email: data.email,
      }),
      ...(data.subject !== undefined && {
        subject: data.subject,
      }),
      ...(data.message !== undefined && {
        message: data.message,
      }),
      ...(data.status !== undefined && {
        status: data.status,
      }),
      ...(data.userId !== undefined && {
        userId: data.userId,
      }),
    },
    select: contactSelect,
  });
}

export async function updateContactMessageStatus(
  id,
  status
) {
  return prisma.contactMessage.update({
    where: { id },
    data: {
      status,
    },
    select: contactSelect,
  });
}

export async function softDeleteContactMessage(id) {
  return prisma.contactMessage.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
    select: contactSelect,
  });
}

export async function restoreContactMessage(id) {
  return prisma.contactMessage.update({
    where: { id },
    data: {
      deletedAt: null,
    },
    select: contactSelect,
  });
}

export async function deleteContactMessage(id) {
  return prisma.contactMessage.delete({
    where: { id },
  });
}
