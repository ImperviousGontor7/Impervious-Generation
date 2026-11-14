import { Router } from "express";
import prisma from "../config/prisma.js";
import { success } from "../utils/response.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return success(
      res,
      {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      "Health check OK"
    );
  } catch (error) {
    return next(error);
  }
});

export default router;