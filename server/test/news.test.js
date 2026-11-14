import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('News database', () => {
  it('should have the News table', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."News"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('News');
  });
});
