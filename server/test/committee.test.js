import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Committee database', () => {
  it('should have the Committee table', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."Committee"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('Committee');
  });
});
