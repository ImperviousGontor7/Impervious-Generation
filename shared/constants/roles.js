export const ROLES = Object.freeze({
  SUPER_ADMIN:
    "SUPER_ADMIN",

  ADMIN:
    "ADMIN",

  EDITOR:
    "EDITOR",

  USER:
    "USER",
});

export const USER_STATUSES =
  Object.freeze({
    ACTIVE:
      "ACTIVE",

    PENDING:
      "PENDING",

    SUSPENDED:
      "SUSPENDED",

    BANNED:
      "BANNED",
  });

export const ROLE_LEVELS =
  Object.freeze({
    USER: 10,
    EDITOR: 20,
    ADMIN: 30,
    SUPER_ADMIN: 40,
  });

export function isRole(
  value,
) {
  return Object.values(
    ROLES,
  ).includes(
    String(value || "")
      .trim()
      .toUpperCase(),
  );
}

export function isUserStatus(
  value,
) {
  return Object.values(
    USER_STATUSES,
  ).includes(
    String(value || "")
      .trim()
      .toUpperCase(),
  );
}

export default ROLES;