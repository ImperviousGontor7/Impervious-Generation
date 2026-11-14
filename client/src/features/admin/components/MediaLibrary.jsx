import {
  useMemo,
  useState,
} from "react";

import useMedia from "../hooks/useMedia.js";

import MediaGrid from "./MetaGrid.jsx";
import MediaPreview from "./MediaPreview.jsx";

const FOLDER_OPTIONS = [
  {
    value: "",
    label: "Semua folder",
  },
  {
    value: "images",
    label: "Images",
  },
  {
    value: "documents",
    label: "Documents",
  },
  {
    value: "avatars",
    label: "Avatars",
  },
  {
    value: "galleries",
    label: "Galleries",
  },
];

export default function MediaLibrary({
  selectable = false,
  onSelect,
}) {
  const {
    items,
    pagination,
    loading,
    error,
    search,
    filter,
    goToPage,
    remove,
    restore,
  } = useMedia();

  const [searchValue, setSearchValue] =
    useState("");

  const [folder, setFolder] =
    useState("");

  const [selected, setSelected] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const totalPages =
    pagination?.totalPages || 1;

  const currentPage =
    pagination?.page || 1;

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "";

  const canPrevious =
    currentPage > 1;

  const canNext =
    currentPage < totalPages;

  const total =
    pagination?.total ||
    items.length;

  const pageLabel = useMemo(
    () =>
      `${currentPage} / ${totalPages}`,
    [
      currentPage,
      totalPages,
    ],
  );

  async function handleSearch(
    event,
  ) {
    event.preventDefault();

    await search(
      searchValue,
    );
  }

  async function handleFolder(
    event,
  ) {
    const value =
      event.target.value;

    setFolder(
      value,
    );

    await filter({
      folder: value,
    });
  }

  function handleSelect(
    media,
  ) {
    setSelected(
      media,
    );
  }

  function handleUseSelected() {
    if (
      !selected ||
      !onSelect
    ) {
      return;
    }

    onSelect(
      selected,
    );
  }

  async function handleDelete(
    media,
  ) {
    const confirmed =
      window.confirm(
        `Hapus "${media.originalName ||
        media.filename
        }"?`,
      );

    if (!confirmed) {
      return;
    }

    setDeleting(
      true,
    );

    try {
      await remove(
        media.id,
      );

      if (
        selected?.id ===
        media.id
      ) {
        setSelected(
          null,
        );
      }
    } finally {
      setDeleting(
        false,
      );
    }
  }

  async function handleRestore(
    media,
  ) {
    setDeleting(
      true,
    );

    try {
      const restored =
        await restore(
          media.id,
        );

      setSelected(
        restored,
      );
    } finally {
      setDeleting(
        false,
      );
    }
  }

  return (
    <section className="space-y-6">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/40">
            Media Library
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Semua media
          </h2>

          <p className="mt-1 text-sm text-white/50">
            {total} media tersimpan.
          </p>
        </div>

        <form
          onSubmit={
            handleSearch
          }
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            value={
              searchValue
            }
            onChange={(event) =>
              setSearchValue(
                event.target.value,
              )
            }
            placeholder="Cari nama file..."
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/20"
          />

          <select
            value={
              folder
            }
            onChange={
              handleFolder
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/20"
          >
            {FOLDER_OPTIONS.map(
              (option) => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {
                    option.label
                  }
                </option>
              ),
            )}
          </select>

          <button
            type="submit"
            disabled={
              loading
            }
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cari
          </button>
        </form>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {errorMessage && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-white/50">
              Memuat media...
            </div>
          ) : items.length ===
            0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/2 p-12 text-center">
              <p className="text-sm text-white/50">
                Tidak ada media yang
                ditemukan.
              </p>
            </div>
          ) : (
            <MediaGrid
              items={
                items
              }
              selectedId={
                selected?.id
              }
              onSelect={
                handleSelect
              }
            />
          )}

          {/* =================================================
              PAGINATION
          ================================================== */}

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <button
              type="button"
              disabled={
                !canPrevious ||
                loading
              }
              onClick={() =>
                goToPage(
                  currentPage -
                  1,
                )
              }
              className="rounded-xl border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ←
            </button>

            <span className="text-sm text-white/50">
              {pageLabel}
            </span>

            <button
              type="button"
              disabled={
                !canNext ||
                loading
              }
              onClick={() =>
                goToPage(
                  currentPage +
                  1,
                )
              }
              className="rounded-xl border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>

        {/* ===================================================
            PREVIEW
        ==================================================== */}

        <div className="min-w-0">
          <MediaPreview
            media={
              selected
            }
            onDelete={
              handleDelete
            }
            onRestore={
              handleRestore
            }
            deleting={
              deleting
            }
          />

          {/* ================================================
              SELECT MEDIA
          ================================================= */}

          {selectable && (
            <div className="mt-4">
              <button
                type="button"
                disabled={
                  !selected
                }
                onClick={
                  handleUseSelected
                }
                className="w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Gunakan Media
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}