import {
  useEffect,
  useState,
} from "react";

import MediaPicker from "./MediaPicker.jsx";

function slugify(
  value,
) {
  return String(
    value || "",
  )
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      "",
    )
    .replace(
      /\s+/g,
      "-",
    )
    .replace(
      /-+/g,
      "-",
    );
}

export default function NewsEditor({
  initialValue,
  saving = false,
  onSubmit,
}) {
  const [
    form,
    setForm,
  ] = useState(
    initialValue,
  );

  const [
    picker,
    setPicker,
  ] = useState(
    null,
  );

  const [
    error,
    setError,
  ] = useState(
    "",
  );

  useEffect(() => {
    setForm(
      initialValue,
    );
  }, [
    initialValue,
  ]);

  function update(
    field,
    value,
  ) {
    setForm(
      (current) => ({
        ...current,

        [field]:
          value,
      }),
    );
  }

  function handleTitleChange(
    value,
  ) {
    setForm(
      (current) => ({
        ...current,

        title:
          value,

        slug:
          current.id
            ? current.slug
            : slugify(
                value,
              ),
      }),
    );
  }

  function openPicker(
    field,
  ) {
    setPicker(
      field,
    );
  }

  function handleMediaSelect(
    media,
  ) {
    if (
      !picker
    ) {
      return;
    }

    update(
      picker,
      media?.url ||
        "",
    );

    setPicker(
      null,
    );
  }

  function clearMedia(
    field,
  ) {
    update(
      field,
      "",
    );
  }

  async function handleSubmit(
    event,
  ) {
    event.preventDefault();

    setError(
      "",
    );

    if (
      !form.title.trim()
    ) {
      setError(
        "Judul wajib diisi.",
      );

      return;
    }

    if (
      !form.slug.trim()
    ) {
      setError(
        "Slug wajib diisi.",
      );

      return;
    }

    if (
      !form.content.trim()
    ) {
      setError(
        "Content wajib diisi.",
      );

      return;
    }

    const payload = {
      title:
        form.title.trim(),

      slug:
        form.slug.trim(),

      excerpt:
        form.excerpt.trim() ||
        null,

      content:
        form.content.trim(),

      thumbnail:
        form.thumbnail ||
        null,

      banner:
        form.banner ||
        null,

      metaTitle:
        form.metaTitle.trim() ||
        null,

      metaDescription:
        form.metaDescription.trim() ||
        null,

      categoryId:
        form.categoryId ||
        null,

      status:
        form.status ||
        "DRAFT",
    };

    try {
      await onSubmit(
        payload,
      );
    } catch {
      // Parent already handles
      // the API error.
    }
  }

  return (
    <>
      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-6"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Field
              label="Title"
              value={
                form.title
              }
              onChange={
                handleTitleChange
              }
              placeholder="Judul artikel"
              required
            />

            <Field
              label="Slug"
              value={
                form.slug
              }
              onChange={(value) =>
                update(
                  "slug",
                  value,
                )
              }
              placeholder="judul-artikel"
              required
            />

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Status
              </label>

              <select
                value={
                  form.status
                }
                onChange={(event) =>
                  update(
                    "status",
                    event.target
                      .value,
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
              >
                <option value="DRAFT">
                  Draft
                </option>

                <option value="PUBLISHED">
                  Published
                </option>

                <option value="ARCHIVED">
                  Archived
                </option>
              </select>
            </div>

            <Field
              label="Category ID"
              value={
                form.categoryId
              }
              onChange={(value) =>
                update(
                  "categoryId",
                  value,
                )
              }
              placeholder="Category ID"
            />
          </div>

          <div className="space-y-5">
            <MediaField
              label="Thumbnail"
              value={
                form.thumbnail
              }
              onPick={() =>
                openPicker(
                  "thumbnail",
                )
              }
              onClear={() =>
                clearMedia(
                  "thumbnail",
                )
              }
            />

            <MediaField
              label="Banner"
              value={
                form.banner
              }
              onPick={() =>
                openPicker(
                  "banner",
                )
              }
              onClear={() =>
                clearMedia(
                  "banner",
                )
              }
            />
          </div>
        </div>

        <Field
          label="Excerpt"
          value={
            form.excerpt
          }
          onChange={(value) =>
            update(
              "excerpt",
              value,
            )
          }
          placeholder="Ringkasan artikel"
          textarea
        />

        <Field
          label="Content"
          value={
            form.content
          }
          onChange={(value) =>
            update(
              "content",
              value,
            )
          }
          placeholder="Isi artikel..."
          textarea
          rows={16}
          required
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Meta Title"
            value={
              form.metaTitle
            }
            onChange={(value) =>
              update(
                "metaTitle",
                value,
              )
            }
            placeholder="SEO title"
          />

          <Field
            label="Meta Description"
            value={
              form.metaDescription
            }
            onChange={(value) =>
              update(
                "metaDescription",
                value,
              )
            }
            placeholder="SEO description"
            textarea
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              saving
            }
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Menyimpan..."
              : "Simpan News"}
          </button>
        </div>
      </form>

      {picker && (
        <MediaPicker
          folder="images"
          value={
            form[picker]
          }
          onSelect={
            handleMediaSelect
          }
          onClose={() =>
            setPicker(
              null,
            )
          }
        />
      )}
    </>
  );
}

// ======================================================
// FIELD
// ======================================================

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  rows = 5,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/70">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={
            value || ""
          }
          onChange={(event) =>
            onChange(
              event.target
                .value,
            )
          }
          placeholder={
            placeholder
          }
          rows={
            rows
          }
          required={
            required
          }
          className="w-full resize-y rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 outline-none placeholder:text-white/25 focus:border-white/25"
        />
      ) : (
        <input
          value={
            value || ""
          }
          onChange={(event) =>
            onChange(
              event.target
                .value,
            )
          }
          placeholder={
            placeholder
          }
          required={
            required
          }
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/25 focus:border-white/25"
        />
      )}
    </div>
  );
}

// ======================================================
// MEDIA FIELD
// ======================================================

function MediaField({
  label,
  value,
  onPick,
  onClear,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-white/70">
          {label}
        </label>

        {value && (
          <button
            type="button"
            onClick={
              onClear
            }
            className="text-xs text-red-300"
          >
            Hapus
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {value ? (
          <img
            src={
              value
            }
            alt={
              label
            }
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="flex h-44 items-center justify-center text-sm text-white/30">
            Belum memilih media
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={
          onPick
        }
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10"
      >
        Pilih {label}
      </button>
    </div>
  );
}