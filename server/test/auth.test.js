import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Auth database', () => {
  it('should have the User table required for authentication', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."User"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('User');
  });
});
