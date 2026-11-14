import {
  useState,
} from "react";

import MediaUploader from "../components/MediaUploader.jsx";

export default function AdminUploadPage() {
  const [
    kind,
    setKind,
  ] = useState(
    "image",
  );

  const [
    result,
    setResult,
  ] = useState(
    null,
  );

  return (
    <section className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-white/45">
          Admin Upload
        </p>

        <h1 className="mt-2 text-3xl font-semibold">
          Upload Media
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-white/55">
          Upload file ke storage melalui
          backend. Media yang berhasil
          diunggah otomatis masuk ke Media
          Library.
        </p>
      </header>

      <div className="max-w-2xl">
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            [
              "image",
              "Image",
            ],
            [
              "document",
              "Document",
            ],
            [
              "avatar",
              "Avatar",
            ],
            [
              "gallery",
              "Gallery",
            ],
          ].map(
            ([
              value,
              label,
            ]) => (
              <button
                key={
                  value
                }
                type="button"
                onClick={() =>
                  setKind(
                    value,
                  )
                }
                className={[
                  "rounded-xl px-4 py-2 text-sm font-semibold transition",
                  kind ===
                  value
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/5 text-white/65",
                ].join(
                  " ",
                )}
              >
                {label}
              </button>
            ),
          )}
        </div>

        <MediaUploader
          key={
            kind
          }
          type={
            kind
          }
          onUploaded={
            setResult
          }
        />

        {result && (
          <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Upload Result
            </p>

            <div className="mt-4">
              {result.url && (
                <img
                  src={
                    result.url
                  }
                  alt={
                    result.originalName ||
                    "Uploaded media"
                  }
                  className="max-h-80 w-full rounded-2xl object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}