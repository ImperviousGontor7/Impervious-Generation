import { describe, expect, it } from 'vitest';
import prisma from '../config/prisma.js';

describe('Health', () => {
  it('should connect to PostgreSQL', async () => {
    const result = await prisma.$queryRaw`
      SELECT current_database() AS db, current_user AS usr
    `;

    expect(result).toHaveLength(1);
    expect(result[0].db).toBe('impervious_db');
    expect(result[0].usr).toBe('zaid_101');
  });
});
