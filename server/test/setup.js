import { afterAll } from "vitest";
import prisma from "../config/prisma.js";

afterAll(async () => {
  await prisma.$disconnect();
});