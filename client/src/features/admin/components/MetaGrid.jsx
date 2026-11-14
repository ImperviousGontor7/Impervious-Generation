function isImage(
  media
) {
  return String(
    media?.mimeType ||
      ""
  ).startsWith(
    "image/"
  );
}

function formatSize(
  bytes
) {
  if (
    !Number.isFinite(
      Number(bytes)
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
  ).toFixed(1)} MB`;
}

export default function MediaGrid({
  items = [],

  selectedId,

  onSelect,
}) {
  if (
    items.length === 0
  ) {
    return (
      <div className="rounded-3xl border border-dashed border-white/10 bg-white/2 p-12 text-center">
        <p className="text-white/50">
          Belum ada media.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map(
        (media) => {
          const image =
            isImage(
              media
            );

          const selected =
            selectedId ===
            media.id;

          return (
            <button
              key={
                media.id
              }
              type="button"
              onClick={() =>
                onSelect?.(
                  media
                )
              }
              className={[
                "group overflow-hidden rounded-3xl border text-left transition",
                selected
                  ? "border-white bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8",
              ].join(
                " "
              )}
            >
              <div className="aspect-square overflow-hidden bg-black/30">
                {image ? (
                  <img
                    src={
                      media.url
                    }
                    alt={
                      media.originalName ||
                      media.filename ||
                      "Media"
                    }
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-4">
                    <div className="text-center">
                      <div className="text-3xl">
                        📄
                      </div>

                      <p className="mt-2 text-xs uppercase tracking-wider text-white/45">
                        Document
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1 p-3">
                <p className="truncate text-sm font-medium text-white">
                  {media.originalName ||
                    media.filename}
                </p>

                <div className="flex items-center justify-between gap-2 text-[11px] text-white/40">
                  <span>
                    {media.folder}
                  </span>

                  <span>
                    {formatSize(
                      media.size
                    )}
                  </span>
                </div>
              </div>
            </button>
          );
        }
      )}
    </div>
  );
}