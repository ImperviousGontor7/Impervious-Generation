import {
  useEffect,
  useState,
} from "react";

import useMedia from "../hooks/useMedia.js";

export default function MediaPicker({
  folder = "",
  value = "",
  onSelect,
  onClose,
}) {
  const {
    items,
    loading,
    error,
    search,
    filter,
  } = useMedia({
    folder,
    limit: 30,
  });

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  const [
    selected,
    setSelected,
  ] = useState(
    null,
  );

  useEffect(() => {
    const current =
      items.find(
        (item) =>
          item.url ===
          value,
      );

    if (current) {
      setSelected(
        current,
      );
    }
  }, [
    items,
    value,
  ]);

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
    await filter({
      folder:
        event.target
          .value,
    });
  }

  function handleSelect() {
    if (
      !selected
    ) {
      return;
    }

    onSelect(
      selected,
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#160d08] shadow-2xl">
        <header className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Media Picker
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Pilih Media
            </h2>
          </div>

          <div className="flex gap-2">
            <form
              onSubmit={
                handleSearch
              }
              className="flex gap-2"
            >
              <input
                value={
                  searchValue
                }
                onChange={(event) =>
                  setSearchValue(
                    event.target
                      .value,
                  )
                }
                placeholder="Cari..."
                className="w-40 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none sm:w-56"
              />

              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
              >
                Cari
              </button>
            </form>

            <button
              type="button"
              onClick={
                onClose
              }
              className="rounded-xl border border-white/10 px-4 py-2 text-sm"
            >
              Tutup
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              {error?.response
                ?.data
                ?.message ||
                error?.message ||
                "Gagal mengambil media."}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-sm text-white/40">
              Memuat media...
            </div>
          ) : items.length ===
            0 ? (
            <div className="flex min-h-64 items-center justify-center text-sm text-white/40">
              Belum ada media.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {items.map(
                (
                  media,
                ) => {
                  const active =
                    selected?.id ===
                    media.id;

                  return (
                    <button
                      key={
                        media.id
                      }
                      type="button"
                      onClick={() =>
                        setSelected(
                          media,
                        )
                      }
                      className={[
                        "overflow-hidden rounded-2xl border text-left transition",
                        active
                          ? "border-white bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/10",
                      ].join(
                        " ",
                      )}
                    >
                      <div className="aspect-square overflow-hidden bg-black/30">
                        <img
                          src={
                            media.url
                          }
                          alt={
                            media.originalName ||
                            media.filename ||
                            "Media"
                          }
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="p-2">
                        <p className="truncate text-xs text-white/70">
                          {media.originalName ||
                            media.filename}
                        </p>
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>

        <footer className="flex items-center justify-between gap-4 border-t border-white/10 p-5">
          <div className="min-w-0 text-sm text-white/45">
            {selected ? (
              <span className="truncate">
                Dipilih:{" "}
                <span className="text-white/80">
                  {
                    selected.originalName
                  }
                </span>
              </span>
            ) : (
              "Belum memilih media"
            )}
          </div>

          <button
            type="button"
            onClick={
              handleSelect
            }
            disabled={
              !selected
            }
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            Gunakan Media
          </button>
        </footer>
      </div>
    </div>
  );
}