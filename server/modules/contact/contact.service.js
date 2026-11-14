import * as contactRepository
  from "../../repositories/contact.repository.js";

// ======================================================
// CONSTANTS
// ======================================================

const CONTACT_STATUSES = new Set([
  "UNREAD",
  "READ",
  "REPLIED",
  "ARCHIVED",
]);

// ======================================================
// HELPERS
// ======================================================

function normalizeString(value) {
  if (typeof value !== "string") {
    return value;
  }

  const normalized = value.trim();

  return normalized || null;
}

function normalizeId(id) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "Contact message ID is required."
    );
  }

  return normalized;
}

function normalizeEmail(email) {
  const normalized =
    normalizeString(email);

  if (!normalized) {
    return null;
  }

  return normalized.toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

function normalizeStatus(status) {
  if (
    status === undefined ||
    status === null ||
    status === ""
  ) {
    return undefined;
  }

  const normalized =
    String(status)
      .trim()
      .toUpperCase();

  if (!CONTACT_STATUSES.has(normalized)) {
    throw new Error(
      "Invalid contact message status."
    );
  }

  return normalized;
}

// ======================================================
// CREATE
// ======================================================

export async function createContactMessage(
  data,
  actor = null
) {
  const name =
    normalizeString(data?.name);

  const email =
    normalizeEmail(data?.email);

  const message =
    normalizeString(data?.message);

  if (!name) {
    throw new Error(
      "Contact name is required."
    );
  }

  if (!email || !isValidEmail(email)) {
    throw new Error(
      "Valid contact email is required."
    );
  }

  if (!message) {
    throw new Error(
      "Contact message is required."
    );
  }

  return contactRepository.createContactMessage({
    name,
    email,

    subject:
      normalizeString(
        data?.subject
      ),

    message,

    status:
      normalizeStatus(
        data?.status
      ) ?? "UNREAD",

    userId:
      actor?.id ??
      data?.userId ??
      null,
  });
}

// ======================================================
// FIND
// ======================================================

export async function getContactMessages(
  options = {}
) {
  return contactRepository.findAllContactMessages(
    Boolean(options.includeDeleted)
  );
}

export async function getContactMessageById(
  id,
  options = {}
) {
  return contactRepository.findContactMessageById(
    normalizeId(id),
    Boolean(options.includeDeleted)
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateContactMessage(
  id,
  data
) {
  const messageId =
    normalizeId(id);

  const payload = {};

  if (data.name !== undefined) {
    const name =
      normalizeString(data.name);

    if (!name) {
      throw new Error(
        "Name cannot be empty."
      );
    }

    payload.name = name;
  }

  if (data.email !== undefined) {
    const email =
      normalizeEmail(data.email);

    if (!email || !isValidEmail(email)) {
      throw new Error(
        "Valid email is required."
      );
    }

    payload.email = email;
  }

  if (data.subject !== undefined) {
    payload.subject =
      normalizeString(
        data.subject
      );
  }

  if (data.message !== undefined) {
    const message =
      normalizeString(data.message);

    if (!message) {
      throw new Error(
        "Message cannot be empty."
      );
    }

    payload.message = message;
  }

  if (data.status !== undefined) {
    payload.status =
      normalizeStatus(
        data.status
      );
  }

  if (data.userId !== undefined) {
    payload.userId =
      normalizeString(
        data.userId
      );
  }

  if (
    Object.keys(payload).length === 0
  ) {
    throw new Error(
      "No contact message fields to update."
    );
  }

  return contactRepository.updateContactMessage(
    messageId,
    payload
  );
}

// ======================================================
// STATUS
// ======================================================

export async function updateContactMessageStatus(
  id,
  status
) {
  const normalizedStatus =
    normalizeStatus(status);

  if (!normalizedStatus) {
    throw new Error(
      "Contact message status is required."
    );
  }

  return contactRepository.updateContactMessageStatus(
    normalizeId(id),
    normalizedStatus
  );
}

// ======================================================
// DELETE / RESTORE
// ======================================================

export async function deleteContactMessage(id) {
  return contactRepository.softDeleteContactMessage(
    normalizeId(id)
  );
}

export async function restoreContactMessage(id) {
  return contactRepository.restoreContactMessage(
    normalizeId(id)
  );
}

export async function permanentlyDeleteContactMessage(
  id
) {
  return contactRepository.deleteContactMessage(
    normalizeId(id)
  );
}

export default {
  createContactMessage,

  getContactMessages,
  getContactMessageById,

  updateContactMessage,
  updateContactMessageStatus,

  deleteContactMessage,
  restoreContactMessage,
  permanentlyDeleteContactMessage,
};