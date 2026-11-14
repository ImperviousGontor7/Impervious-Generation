import * as agendaRepository
  from "./agenda.repository.js";

const AGENDA_STATUSES =
  new Set([
    "UPCOMING",
    "ONGOING",
    "FINISHED",
    "CANCELLED",
  ]);

function normalizeString(
  value
) {
  if (
    typeof value !==
    "string"
  ) {
    return value;
  }

  const normalized =
    value.trim();

  return normalized || null;
}

function normalizeId(id) {
  const normalized =
    normalizeString(id);

  if (!normalized) {
    throw new Error(
      "Agenda ID is required."
    );
  }

  return normalized;
}

function normalizeStatus(
  status
) {
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

  if (
    !AGENDA_STATUSES.has(
      normalized
    )
  ) {
    throw new Error(
      "Invalid agenda status."
    );
  }

  return normalized;
}

function normalizeDate(
  value,
  fieldName
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const date =
    value instanceof Date
      ? value
      : new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    throw new Error(
      `${fieldName} is invalid.`
    );
  }

  return date;
}

function validateDateRange(
  startDate,
  endDate
) {
  if (
    startDate &&
    endDate &&
    startDate > endDate
  ) {
    throw new Error(
      "Agenda startDate cannot be later than endDate."
    );
  }
}

function buildCreateData(
  data = {},
  actor
) {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    throw new Error(
      "Agenda data is required."
    );
  }

  if (!actor?.id) {
    throw new Error(
      "Authenticated user is required."
    );
  }

  const title =
    normalizeString(
      data.title
    );

  const slug =
    normalizeString(
      data.slug
    );

  if (!title) {
    throw new Error(
      "Agenda title is required."
    );
  }

  if (!slug) {
    throw new Error(
      "Agenda slug is required."
    );
  }

  const startDate =
    normalizeDate(
      data.startDate,
      "startDate"
    );

  const endDate =
    normalizeDate(
      data.endDate,
      "endDate"
    );

  if (!startDate) {
    throw new Error(
      "Agenda startDate is required."
    );
  }

  if (!endDate) {
    throw new Error(
      "Agenda endDate is required."
    );
  }

  validateDateRange(
    startDate,
    endDate
  );

  return {
    title,
    slug,

    description:
      normalizeString(
        data.description
      ),

    banner:
      normalizeString(
        data.banner
      ),

    location:
      normalizeString(
        data.location
      ),

    startDate,
    endDate,

    status:
      normalizeStatus(
        data.status
      ) ??
      "UPCOMING",

    authorId:
      actor.id,
  };
}

function buildUpdateData(
  data = {}
) {
  if (
    !data ||
    typeof data !==
      "object"
  ) {
    throw new Error(
      "Agenda update data is required."
    );
  }

  const payload = {};

  if (
    data.title !==
    undefined
  ) {
    const title =
      normalizeString(
        data.title
      );

    if (!title) {
      throw new Error(
        "Agenda title cannot be empty."
      );
    }

    payload.title =
      title;
  }

  if (
    data.slug !==
    undefined
  ) {
    const slug =
      normalizeString(
        data.slug
      );

    if (!slug) {
      throw new Error(
        "Agenda slug cannot be empty."
      );
    }

    payload.slug =
      slug;
  }

  if (
    data.description !==
    undefined
  ) {
    payload.description =
      normalizeString(
        data.description
      );
  }

  if (
    data.banner !==
    undefined
  ) {
    payload.banner =
      normalizeString(
        data.banner
      );
  }

  if (
    data.location !==
    undefined
  ) {
    payload.location =
      normalizeString(
        data.location
      );
  }

  if (
    data.startDate !==
    undefined
  ) {
    payload.startDate =
      normalizeDate(
        data.startDate,
        "startDate"
      );
  }

  if (
    data.endDate !==
    undefined
  ) {
    payload.endDate =
      normalizeDate(
        data.endDate,
        "endDate"
      );
  }

  if (
    data.status !==
    undefined
  ) {
    payload.status =
      normalizeStatus(
        data.status
      );
  }

  validateDateRange(
    payload.startDate,
    payload.endDate
  );

  return payload;
}

export async function getAgendas(
  options = {}
) {
  return agendaRepository
    .findAllAgendas(
      Boolean(
        options.includeDeleted
      )
    );
}

export async function getAgendaById(
  id,
  options = {}
) {
  return agendaRepository
    .findAgendaById(
      normalizeId(id),
      Boolean(
        options.includeDeleted
      )
    );
}

export async function getAgendaBySlug(
  slug,
  options = {}
) {
  const normalizedSlug =
    normalizeString(slug);

  if (!normalizedSlug) {
    throw new Error(
      "Agenda slug is required."
    );
  }

  return agendaRepository
    .findAgendaBySlug(
      normalizedSlug,
      Boolean(
        options.includeDeleted
      )
    );
}

export async function createAgenda(
  data,
  actor
) {
  const payload =
    buildCreateData(
      data,
      actor
    );

  return agendaRepository
    .createAgenda(
      payload
    );
}

export async function updateAgenda(
  id,
  data
) {
  const normalizedId =
    normalizeId(id);

  const payload =
    buildUpdateData(
      data
    );

  if (
    Object.keys(payload)
      .length === 0
  ) {
    throw new Error(
      "No agenda fields to update."
    );
  }

  return agendaRepository
    .updateAgenda(
      normalizedId,
      payload
    );
}

export async function deleteAgenda(
  id
) {
  return agendaRepository
    .softDeleteAgenda(
      normalizeId(id)
    );
}

export async function restoreAgenda(
  id
) {
  return agendaRepository
    .restoreAgenda(
      normalizeId(id)
    );
}

export async function permanentlyDeleteAgenda(
  id
) {
  return agendaRepository
    .deleteAgenda(
      normalizeId(id)
    );
}

export default {
  getAgendas,
  getAgendaById,
  getAgendaBySlug,
  createAgenda,
  updateAgenda,
  deleteAgenda,
  restoreAgenda,
  permanentlyDeleteAgenda,
};