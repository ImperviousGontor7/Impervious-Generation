import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Agenda database', () => {
  it('should have the Agenda table', async () => {
    const result = await prisma.$queryRaw`
      SELECT trim(both '"' from to_regclass('public."Agenda"')::text) AS table_name
    `;

    expect(result[0].table_name).toBe('Agenda');
  });
});
