import {
  useEffect,
  useMemo,
  useState,
} from "react";

import adminApi from "../services/adminApi.js";

// ======================================================
// OPTIONS
// ======================================================

const ROLE_OPTIONS = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "USER",
];

const STATUS_OPTIONS = [
  "ACTIVE",
  "PENDING",
  "SUSPENDED",
  "BANNED",
];

// ======================================================
// COMPONENT
// ======================================================

export default function AdminUsersPage() {
  const [
    users,
    setUsers,
  ] = useState([]);

  const [
    meta,
    setMeta,
  ] = useState({
    page: 1,

    limit: 20,

    total: 0,

    totalPages: 0,

    hasNextPage:
      false,

    hasPrevPage:
      false,
  });

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    savingId,
    setSavingId,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    messageType,
    setMessageType,
  ] = useState(
    "error"
  );

  const hasUsers =
    useMemo(
      () =>
        users.length >
        0,
      [users]
    );

  // ====================================================
  // LOAD USERS
  // ====================================================

  async function loadUsers(
    nextPage = page,
    nextSearch = search
  ) {
    setLoading(
      true
    );

    setMessage("");

    try {
      const result =
        await adminApi.getUsers(
          {
            page:
              nextPage,

            limit:
              20,

            search:
              nextSearch,
          }
        );

      setUsers(
        result.items ||
          []
      );

      setMeta({
        page:
          result.page ||
          nextPage,

        limit:
          result.limit ||
          20,

        total:
          result.total ||
          0,

        totalPages:
          result.totalPages ||
          0,

        hasNextPage:
          Boolean(
            result.hasNextPage
          ),

        hasPrevPage:
          Boolean(
            result.hasPrevPage
          ),
      });
    } catch (
      error
    ) {
      setMessage(
        error?.response
          ?.data
          ?.message ||
          error?.message ||
          "Gagal mengambil daftar user."
      );

      setMessageType(
        "error"
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  // ====================================================
  // INITIAL LOAD
  // ====================================================

  useEffect(() => {
    loadUsers(
      1,
      ""
    );

    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ====================================================
  // SEARCH
  // ====================================================

  async function handleSearchSubmit(
    event
  ) {
    event.preventDefault();

    setPage(
      1
    );

    await loadUsers(
      1,
      search
    );
  }

  // ====================================================
  // ROLE
  // ====================================================

  async function handleUpdateRole(
    id,
    role
  ) {
    setSavingId(
      id
    );

    setMessage("");

    try {
      const updated =
        await adminApi.updateUserRole(
          id,
          role
        );

      setUsers(
        (current) =>
          current.map(
            (user) =>
              user.id === id
                ? updated
                : user
          )
      );

      setMessage(
        "Role berhasil diperbarui."
      );

      setMessageType(
        "success"
      );
    } catch (
      error
    ) {
      setMessage(
        error?.response
          ?.data
          ?.message ||
          error?.message ||
          "Gagal memperbarui role."
      );

      setMessageType(
        "error"
      );
    } finally {
      setSavingId(
        ""
      );
    }
  }

  // ====================================================
  // STATUS
  // ====================================================

  async function handleUpdateStatus(
    id,
    status
  ) {
    setSavingId(
      id
    );

    setMessage("");

    try {
      const updated =
        await adminApi.updateUserStatus(
          id,
          status
        );

      setUsers(
        (current) =>
          current.map(
            (user) =>
              user.id === id
                ? updated
                : user
          )
      );

      setMessage(
        "Status berhasil diperbarui."
      );

      setMessageType(
        "success"
      );
    } catch (
      error
    ) {
      setMessage(
        error?.response
          ?.data
          ?.message ||
          error?.message ||
          "Gagal memperbarui status."
      );

      setMessageType(
        "error"
      );
    } finally {
      setSavingId(
        ""
      );
    }
  }

  // ====================================================
  // PAGINATION
  // ====================================================

  async function goToPage(
    nextPage
  ) {
    if (
      nextPage < 1 ||
      (
        meta.totalPages >
          0 &&
        nextPage >
          meta.totalPages
      )
    ) {
      return;
    }

    setPage(
      nextPage
    );

    await loadUsers(
      nextPage,
      search
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            Admin Users
          </p>

          <h1 className="mt-2 text-3xl font-semibold">
            Manajemen user
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Kelola role dan status
            akun melalui API
            terproteksi.
          </p>
        </div>

        <form
          onSubmit={
            handleSearchSubmit
          }
          className="flex gap-2"
        >
          <input
            value={
              search
            }
            onChange={(
              event
            ) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Cari username / email / nama"
            className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
          />

          <button
            type="submit"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Cari
          </button>
        </form>
      </header>

      {message && (
        <div
          className={
            messageType ===
            "success"
              ? "rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
              : "rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          }
        >
          {
            message
          }
        </div>
      )}

      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-white/55">
          <span>
            Total:{" "}
            {
              meta.total
            }
          </span>

          <span>
            Halaman{" "}
            {
              meta.page
            }{" "}
            /{" "}
            {
              meta.totalPages ||
              1
            }
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center text-white/60">
            Memuat user...
          </div>
        ) : !hasUsers ? (
          <div className="py-12 text-center text-white/60">
            Belum ada data user.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.25em] text-white/40">
                    <th className="px-4">
                      User
                    </th>

                    <th className="px-4">
                      Role
                    </th>

                    <th className="px-4">
                      Status
                    </th>

                    <th className="px-4">
                      State
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map(
                    (
                      user
                    ) => (
                      <tr
                        key={
                          user.id
                        }
                        className="bg-black/20"
                      >
                        <td className="rounded-l-2xl px-4 py-4">
                          <div className="font-semibold">
                            {
                              user.fullName ||
                              user.username
                            }
                          </div>

                          <div className="mt-1 text-sm text-white/45">
                            {
                              user.email
                            }
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={
                              user.role
                            }
                            onChange={(
                              event
                            ) =>
                              handleUpdateRole(
                                user.id,
                                event
                                  .target
                                  .value
                              )
                            }
                            disabled={
                              savingId ===
                              user.id
                            }
                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none disabled:opacity-50"
                          >
                            {ROLE_OPTIONS.map(
                              (
                                role
                              ) => (
                                <option
                                  key={
                                    role
                                  }
                                  value={
                                    role
                                  }
                                >
                                  {
                                    role
                                  }
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td className="px-4 py-4">
                          <select
                            value={
                              user.status
                            }
                            onChange={(
                              event
                            ) =>
                              handleUpdateStatus(
                                user.id,
                                event
                                  .target
                                  .value
                              )
                            }
                            disabled={
                              savingId ===
                              user.id
                            }
                            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none disabled:opacity-50"
                          >
                            {STATUS_OPTIONS.map(
                              (
                                status
                              ) => (
                                <option
                                  key={
                                    status
                                  }
                                  value={
                                    status
                                  }
                                >
                                  {
                                    status
                                  }
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td className="rounded-r-2xl px-4 py-4 text-sm text-white/50">
                          {savingId ===
                          user.id
                            ? "Menyimpan..."
                            : "Ready"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
              <button
                type="button"
                disabled={
                  !meta.hasPrevPage
                }
                onClick={() =>
                  goToPage(
                    meta.page -
                      1
                  )
                }
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Sebelumnya
              </button>

              <span className="text-sm text-white/45">
                {meta.page}
              </span>

              <button
                type="button"
                disabled={
                  !meta.hasNextPage
                }
                onClick={() =>
                  goToPage(
                    meta.page +
                      1
                  )
                }
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Berikutnya →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}