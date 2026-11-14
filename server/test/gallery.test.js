import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Gallery database', () => {
  it('should have the Gallery table', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."Gallery"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('Gallery');
  });
});
