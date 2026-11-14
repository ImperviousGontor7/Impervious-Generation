import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Forum database', () => {
  it('should have the Forum table', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."Forum"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('Forum');
  });
});
