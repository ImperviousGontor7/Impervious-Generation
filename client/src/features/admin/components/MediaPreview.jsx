function isImage(
  media,
) {
  return String(
    media?.mimeType ||
      "",
  ).startsWith(
    "image/",
  );
}

function formatSize(
  bytes,
) {
  if (
    !Number.isFinite(
      Number(bytes),
    )
  ) {
    return "-";
  }

  const value =
    Number(bytes);

  if (
    value <
    1024
  ) {
    return `${value} B`;
  }

  if (
    value <
    1024 * 1024
  ) {
    return `${(
      value /
      1024
    ).toFixed(1)} KB`;
  }

  return `${(
    value /
    1024 /
    1024
  ).toFixed(2)} MB`;
}

export default function MediaPreview({
  media,

  onDelete,

  onRestore,

  deleting = false,
}) {
  if (!media) {
    return (
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/40">
          Pilih media untuk melihat detail.
        </p>
      </aside>
    );
  }

  const image =
    isImage(
      media,
    );

  return (
    <aside className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="overflow-hidden rounded-2xl bg-black/30">
        {image ? (
          <img
            src={
              media.url
            }
            alt={
              media.originalName ||
              "Media preview"
            }
            className="max-h-112 w-full object-contain"
          />
        ) : (
          <div className="flex min-h-60 items-center justify-center">
            <span className="text-6xl">
              📄
            </span>
          </div>
        )}
      </div>

      <div>
        <p className="wrap-break-word text-lg font-semibold">
          {media.originalName ||
            media.filename}
        </p>

        <div className="mt-4 space-y-2 text-sm text-white/55">
          <div className="flex justify-between gap-4">
            <span>
              Type
            </span>

            <span className="text-white/80">
              {media.mimeType}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span>
              Size
            </span>

            <span className="text-white/80">
              {formatSize(
                media.size,
              )}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span>
              Folder
            </span>

            <span className="text-white/80">
              {media.folder}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span>
              Provider
            </span>

            <span className="text-white/80">
              {media.provider}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {media.deletedAt ? (
          <button
            type="button"
            onClick={() =>
              onRestore?.(
                media,
              )
            }
            disabled={
              deleting
            }
            className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-40"
          >
            Restore
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              onDelete?.(
                media,
              )
            }
            disabled={
              deleting
            }
            className="flex-1 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 disabled:opacity-40"
          >
            {deleting
              ? "Menghapus..."
              : "Hapus"}
          </button>
        )}

        {media.url && (
          <a
            href={
              media.url
            }
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
          >
            Buka
          </a>
        )}
      </div>
    </aside>
  );
}