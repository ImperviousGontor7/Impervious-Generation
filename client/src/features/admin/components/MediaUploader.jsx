import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import uploadApi from "../services/uploadApi.js";

const TYPE_CONFIG = {
  image: {
    label:
      "Image",

    accept:
      "image/jpeg,image/png,image/webp,image/gif",

    upload:
      uploadApi.uploadImage,
  },

  document: {
    label:
      "Document",

    accept:
      ".pdf,.doc,.docx,.xls,.xlsx,.txt",

    upload:
      uploadApi.uploadDocument,
  },

  avatar: {
    label:
      "Avatar",

    accept:
      "image/jpeg,image/png,image/webp",

    upload:
      uploadApi.uploadAvatar,
  },

  gallery: {
    label:
      "Gallery",

    accept:
      "image/jpeg,image/png,image/webp",

    upload:
      uploadApi.uploadGallery,
  },
};

export default function MediaUploader({
  type = "image",

  onUploaded,

  onError,
}) {
  const inputRef =
    useRef(null);

  const config =
    TYPE_CONFIG[
      type
    ] ||
    TYPE_CONFIG.image;

  const [
    file,
    setFile,
  ] = useState(
    null,
  );

  const [
    uploading,
    setUploading,
  ] = useState(
    false,
  );

  const [
    progress,
    setProgress,
  ] = useState(
    0,
  );

  const [
    error,
    setError,
  ] = useState(
    "",
  );

  const [
    success,
    setSuccess,
  ] = useState(
    "",
  );

  const previewUrl =
    useMemo(() => {
      if (
        !file ||
        !file.type.startsWith(
          "image/",
        )
      ) {
        return null;
      }

      return URL.createObjectURL(
        file,
      );
    }, [
      file,
    ]);

  useEffect(() => {
    return () => {
      if (
        previewUrl
      ) {
        URL.revokeObjectURL(
          previewUrl,
        );
      }
    };
  }, [
    previewUrl,
  ]);

  function handleChange(
    event,
  ) {
    const selected =
      event.target.files?.[0] ||
      null;

    setFile(
      selected,
    );

    setError(
      "",
    );

    setSuccess(
      "",
    );

    setProgress(
      0,
    );
  }

  async function handleUpload() {
    if (!file) {
      setError(
        "Pilih file terlebih dahulu.",
      );

      return;
    }

    setUploading(
      true,
    );

    setProgress(
      0,
    );

    setError(
      "",
    );

    setSuccess(
      "",
    );

    try {
      const result =
        await config.upload(
          file,
        );

      setProgress(
        100,
      );

      setSuccess(
        "Upload berhasil.",
      );

      onUploaded?.(
        result,
      );

      setFile(
        null,
      );

      if (
        inputRef.current
      ) {
        inputRef.current.value =
          "";
      }
    } catch (
      uploadError
    ) {
      const message =
        uploadError
          ?.response
          ?.data
          ?.message ||
        uploadError?.message ||
        "Upload gagal.";

      setError(
        message,
      );

      onError?.(
        uploadError,
      );
    } finally {
      setUploading(
        false,
      );
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">
          {config.label}
        </p>

        <h3 className="mt-1 text-lg font-semibold">
          Upload{" "}
          {config.label}
        </h3>
      </div>

      {previewUrl && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <img
            src={
              previewUrl
            }
            alt="Preview"
            className="max-h-72 w-full object-contain"
          />
        </div>
      )}

      <input
        ref={
          inputRef
        }
        type="file"
        accept={
          config.accept
        }
        onChange={
          handleChange
        }
        disabled={
          uploading
        }
        className="block w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black"
      />

      {file && (
        <div className="rounded-2xl bg-black/20 px-4 py-3 text-sm text-white/65">
          <div className="font-medium text-white">
            {
              file.name
            }
          </div>

          <div className="mt-1">
            {(
              file.size /
              1024 /
              1024
            ).toFixed(
              2,
            )}{" "}
            MB
          </div>
        </div>
      )}

      {uploading && (
        <div>
          <div className="mb-2 flex justify-between text-xs text-white/55">
            <span>
              Uploading...
            </span>

            <span>
              {
                progress
              }
              %
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </div>
      )}

      <button
        type="button"
        onClick={
          handleUpload
        }
        disabled={
          uploading ||
          !file
        }
        className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {uploading
          ? "Mengunggah..."
          : "Upload"}
      </button>
    </div>
  );
}