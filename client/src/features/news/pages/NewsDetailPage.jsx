import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import heroFallback from "../../../assets/images/Jami Emas.webp";

import newsApi from "../services/newsApi.js";
import { findLocalStory } from "../data/search_data.js";

// ======================================================
// HELPERS
// ======================================================

function formatDate(
  value
) {
  if (!value) {
    return "Tanggal belum tersedia";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(value);
  }

  return date.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

// ======================================================
// COMPONENT
// ======================================================

export default function NewsDetailPage() {
  const {
    id,
    slug,
  } = useParams();

  const identifier =
    slug || id;

  const [
    article,
    setArticle,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ====================================================
  // LOAD
  // ====================================================

  useEffect(() => {
    let mounted =
      true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        let data = null;

        try {
          data = slug
            ? await newsApi.getNewsBySlug(slug)
            : await newsApi.getNewsById(id);
        } catch {
          data = null;
        }

        if (!data) data = findLocalStory(identifier);
        if (!mounted) return;

        if (!data) {
          setError("Berita tidak dapat dimuat atau belum tersedia.");
          setArticle(null);
          return;
        }

        setArticle(data);
      } catch (
        requestError
      ) {
        if (!mounted) {
          return;
        }

        setArticle(
          null
        );

        setError(
          requestError
            ?.response
            ?.data
            ?.message ||
            "Berita tidak dapat dimuat."
        );
      } finally {
        if (mounted) {
          setLoading(
            false
          );
        }
      }
    }

    if (identifier) {
      load();
    }

    return () => {
      mounted =
        false;
    };
  }, [
    id,
    slug,
    identifier,
  ]);

  // ====================================================
  // VIEWS
  // ====================================================

  useEffect(() => {
    if (!article?.id) {
      return;
    }

    newsApi
      .incrementViews(
        article.id
      )
      .catch(() => {
        // View counter tidak boleh
        // merusak halaman detail.
      });
  }, [
    article?.id,
  ]);

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 text-white">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            News
          </p>

          <p className="mt-3 text-white/70">
            Memuat berita...
          </p>
        </div>
      </div>
    );
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (
    error ||
    !article
  ) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 text-white">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.3em] text-white/45">
            News detail
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            Berita tidak ditemukan
          </h1>

          <p className="mt-4 text-white/65">
            {error ||
              "Artikel yang diminta tidak tersedia."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  // ====================================================
  // CONTENT
  // ====================================================

  const content =
    article.content ||
    "";

  const paragraphs = Array.isArray(content)
    ? content.map((item) => String(item).trim()).filter(Boolean)
    : String(content)
        .split(/\n{2,}/)
        .map((item) => item.trim())
        .filter(Boolean);

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 text-white">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
          <header className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
              {article.category && (
                <span className="rounded-full border border-white/10 px-3 py-1 uppercase tracking-[0.2em]">
                  {article.category?.name ?? article.category}
                </span>
              )}

              <span>
                {formatDate(
                  article.publishedAt ||
                    article.createdAt
                )}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
                {article.excerpt}
              </p>
            )}
          </header>

          <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
            <img
              src={
                article.banner ||
                article.thumbnail ||
                article.image ||
                heroFallback
              }
              alt={
                article.title
              }
              className="h-80 w-full object-cover md:h-105"
            />
          </section>

          <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="space-y-5 text-[15px] leading-8 text-white/80">
              {paragraphs.length >
              0 ? (
                paragraphs.map(
                  (
                    paragraph,
                    index
                  ) => (
                    <p
                      key={
                        index
                      }
                      className="text-justify"
                    >
                      {
                        paragraph
                      }
                    </p>
                  )
                )
              ) : (
                <p className="text-white/60">
                  Konten berita
                  belum tersedia.
                </p>
              )}
            </div>
          </article>
        </main>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <h2 className="text-lg font-semibold">
              Informasi
            </h2>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/45">
                  Penulis
                </dt>

                <dd className="text-right text-white/80">
                  {article.author
                    ?.fullName ||
                    article.author
                      ?.username ||
                    "-"}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-white/45">
                  Views
                </dt>

                <dd>
                  {article.views ??
                    0}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-white/45">
                  Status
                </dt>

                <dd>
                  {article.status}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}