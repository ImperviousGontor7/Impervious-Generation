import {
  beforeAll,
  afterAll,
  describe,
  expect,
  it,
} from "vitest";

import prisma from "../config/prisma.js";

import {
  hashPassword,
  comparePassword,
} from "../utils/password.js";

import {
  ROLES,
} from "../constants/roles.js";

describe("User module", () => {
  const testEmail =
    `test-${Date.now()}@impervious.local`;

  const testUsername =
    `test_${Date.now()}`;

  let userId;

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    if (userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      }).catch(() => {});
    }

    await prisma.$disconnect();
  });

  // ====================================================
  // DATABASE
  // ====================================================

  it("should have the User table", async () => {
    const result =
      await prisma.$queryRaw`
        SELECT
          trim(
            both '"'
            from
              to_regclass(
                'public."User"'
              )::text
          ) AS table_name
      `;

    expect(
      result[0].table_name,
    ).toBe("User");
  });

  // ====================================================
  // PASSWORD
  // ====================================================

  it("should hash and verify password", async () => {
    const password =
      "TestPassword123!";

    const hash =
      await hashPassword(
        password,
      );

    expect(hash).not.toBe(
      password,
    );

    await expect(
      comparePassword(
        password,
        hash,
      ),
    ).resolves.toBe(
      true,
    );

    await expect(
      comparePassword(
        "wrong-password",
        hash,
      ),
    ).resolves.toBe(
      false,
    );
  });

  // ====================================================
  // CREATE
  // ====================================================

  it("should create a user", async () => {
    const passwordHash =
      await hashPassword(
        "TestPassword123!",
      );

    const user =
      await prisma.user.create({
        data: {
          username:
            testUsername,

          email:
            testEmail,

          password:
            passwordHash,

          fullName:
            "Impervious Test User",

          role:
            ROLES.USER,

          status:
            "ACTIVE",

          isActive:
            true,
        },

        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          status: true,
          isActive: true,
        },
      });

    userId =
      user.id;

    expect(user.id).toBeTruthy();
    expect(user.username).toBe(
      testUsername,
    );
    expect(user.email).toBe(
      testEmail,
    );
    expect(user.role).toBe(
      ROLES.USER,
    );
    expect(user.status).toBe(
      "ACTIVE",
    );
    expect(user.isActive).toBe(
      true,
    );
  });

  // ====================================================
  // UNIQUE
  // ====================================================

  it("should enforce unique email", async () => {
    await expect(
      prisma.user.create({
        data: {
          username:
            `${testUsername}_duplicate`,

          email:
            testEmail,

          password:
            "hashed-password",

          role:
            ROLES.USER,

          status:
            "ACTIVE",
        },
      }),
    ).rejects.toMatchObject({
      code: "P2002",
    });
  });

  // ====================================================
  // ROLE
  // ====================================================

  it("should store valid role", async () => {
    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },

        select: {
          role: true,
        },
      });

    expect(
      Object.values(
        ROLES,
      ),
    ).toContain(
      user.role,
    );
  });

  // ====================================================
  // SOFT DELETE
  // ====================================================

  it("should support soft delete fields", async () => {
    const updated =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          deletedAt:
            new Date(),

          isActive:
            false,

          status:
            "BANNED",
        },

        select: {
          deletedAt:
            true,

          isActive:
            true,

          status:
            true,
        },
      });

    expect(
      updated.deletedAt,
    ).toBeTruthy();

    expect(
      updated.isActive,
    ).toBe(false);

    expect(
      updated.status,
    ).toBe("BANNED");
  });
});