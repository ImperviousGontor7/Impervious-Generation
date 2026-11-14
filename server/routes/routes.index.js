import express from "express";

import authRoutes from "../auth/auth.routes.js";

import contentRoutes from "../api/content.api.js";
import adminRoutes from "../api/admin.api.js";
import uploadRoutes from "../api/upload.api.js";
import agendaRoutes from "../api/agenda.api.js";
import committeeRoutes from "../api/committee.api.js";
import galleryRoutes from "../api/gallery.api.js";
import homeRoutes from "../api/home.api.js";

const router = express.Router();

// ======================================================
// AUTHENTICATION
// ======================================================

router.use(
  "/auth",
  authRoutes,
);

// ======================================================
// CORE CONTENT
// ======================================================

router.use(
  "/content",
  contentRoutes,
);

// ======================================================
// ADMIN
// ======================================================

router.use(
  "/admin",
  adminRoutes,
);

// ======================================================
// MEDIA / UPLOAD
// ======================================================

router.use(
  "/upload",
  uploadRoutes,
);

// ======================================================
// AGENDA
// ======================================================

router.use(
  "/agenda",
  agendaRoutes,
);

// ======================================================
// COMMITTEE
// ======================================================

router.use(
  "/committee",
  committeeRoutes,
);

// ======================================================
// GALLERY
// ======================================================

router.use(
  "/gallery",
  galleryRoutes,
);

// ======================================================
// HOME CMS
// ======================================================

router.use(
  "/home",
  homeRoutes,
);

export default router;