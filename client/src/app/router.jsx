import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// =========================
// LAYOUTS
// =========================

const MainLayout = lazy(() =>
  import("../layouts/MainLayout")
);

const AuthLayout = lazy(() =>
  import("../layouts/AuthLayout")
);

const AdminLayout = lazy(() =>
  import("../layouts/AdminLayout")
);

// =========================
// ROUTES
// =========================

const AdminRoute = lazy(() =>
  import("../routes/AdminRoute")
);

// =========================
// PUBLIC PAGES
// =========================

const HomePage = lazy(() =>
  import("../features/news/pages/HomePage")
);

const HistoryPage = lazy(() =>
  import("../features/profile/pages/HistoryPage")
);

const LegacyDetail = lazy(() =>
  import("../features/profile/pages/LegacyDetail")
);

const OurGenerationPage = lazy(() =>
  import(
    "../features/profile/pages/OurGenerationPage"
  )
);

const CommitteePage = lazy(() =>
  import(
    "../features/profile/pages/CommitteePage"
  )
);

const AgendaPage = lazy(() =>
  import("../features/profile/pages/AgendaPage")
);

const MemoriesPage = lazy(() =>
  import(
    "../features/profile/pages/MemoriesPage"
  )
);

const ContactPage = lazy(() =>
  import(
    "../features/profile/pages/ContactPage"
  )
);

const ForumPage = lazy(() =>
  import("../features/forum/pages/Forum")
);

// =========================
// AUTH PAGES
// =========================

const LoginPage = lazy(() =>
  import("../features/auth/pages/LoginPage")
);

const RegisterPage = lazy(() =>
  import("../features/auth/pages/RegisterPage")
);

// =========================
// ADMIN PAGES
// =========================

const AdminDashboardPage = lazy(() =>
  import(
    "../features/admin/pages/AdminDashboardPage"
  )
);

const AdminUsersPage = lazy(() =>
  import(
    "../features/admin/pages/AdminUsersPage"
  )
);

const AdminUploadPage = lazy(() =>
  import(
    "../features/admin/pages/AdminUploadPage"
  )
);

const AdminMediaPage = lazy(() =>
  import(
    "../features/admin/pages/AdminMediaPage"
  )
);

const AdminNewsPage = lazy(() =>
  import(
    "../features/admin/pages/AdminNewsPage"
  )
);

// =========================
// LOADING FALLBACK
// =========================

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-neutral-500">
        Loading...
      </p>
    </div>
  );
}

// =========================
// ROUTER
// =========================

function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* =========================
            PUBLIC WEBSITE
        ========================== */}

        <Route element={<MainLayout />}>
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="history"
            element={<HistoryPage />}
          />

          <Route
            path="legacy/:id"
            element={<LegacyDetail />}
          />

          <Route
            path="our-generation"
            element={
              <OurGenerationPage />
            }
          />

          <Route
            path="committee"
            element={
              <CommitteePage />
            }
          />

          <Route
            path="agenda"
            element={<AgendaPage />}
          />

          <Route
            path="memories"
            element={
              <MemoriesPage />
            }
          />

          <Route
            path="forum"
            element={<ForumPage />}
          />

          <Route
            path="contact"
            element={<ContactPage />}
          />
        </Route>

        {/* =========================
            AUTHENTICATION
        ========================== */}

        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={<LoginPage />}
          />

          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>

        {/* =========================
            ADMIN
        ========================== */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="admin">
              <Route
                index
                element={
                  <AdminDashboardPage />
                }
              />

              <Route
                path="users"
                element={
                  <AdminUsersPage />
                }
              />

              <Route
                path="news"
                element={
                  <AdminNewsPage />
                }
              />

              <Route
                path="media"
                element={
                  <AdminMediaPage />
                }
              />

              <Route
                path="upload"
                element={
                  <AdminUploadPage />
                }
              />
            </Route>
          </Route>
        </Route>

        {/* =========================
            FALLBACK
        ========================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;