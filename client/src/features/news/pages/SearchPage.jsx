import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiSearch, FiArrowUpRight } from "react-icons/fi";
import { getSearchSuggestions, searchContent } from "../data/search_data.js";

function SearchPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const [input, setInput] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setInput(query), [query]);

  useEffect(() => {
    let active = true;
    if (!query.trim()) {
      setResults([]);
      setError("");
      setLoading(false);
      return () => { active = false; };
    }

    setLoading(true);
    setError("");
    searchContent(query)
      .then((items) => { if (active) setResults(items); })
      .catch(() => { if (active) setError("Pencarian belum dapat dimuat. Coba lagi."); })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = input.trim();
    setParams(value ? { q: value } : {});
  };

  return (
    <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 py-8 text-white sm:px-8 sm:py-12">
      <header className="mb-8 sm:mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-marigold">Impervious Archive</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Search</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">Temukan berita, kegiatan, dokumentasi, dan cerita dalam arsip Impervious Generation.</p>
      </header>

      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 focus-within:border-marigold/50">
        <FiSearch className="ml-3 shrink-0 text-xl text-marigold" />
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Cari kegiatan atau cerita..."
          aria-label="Search query"
          className="h-12 min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/35 sm:text-base"
        />
        <button type="submit" className="h-11 rounded-xl bg-marigold px-5 text-sm font-semibold text-black transition hover:brightness-110">Search</button>
      </form>

      {!query.trim() && (
        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-white/70">Popular searches</h2>
          <div className="flex flex-wrap gap-2">
            {getSearchSuggestions().map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => setParams({ q: suggestion })} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 transition hover:border-marigold/40 hover:text-white">
                {suggestion}
              </button>
            ))}
          </div>
        </section>
      )}

      {query.trim() && (
        <section className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold sm:text-xl">Results for “{query}”</h2>
            {!loading && <span className="text-xs text-white/45">{results.length} results</span>}
          </div>

          {loading ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">Searching archive...</p>
          ) : error ? (
            <p className="rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-sm text-red-200">{error}</p>
          ) : results.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">Belum ada hasil yang cocok. Coba kata kunci lain.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <Link key={`${item.source}-${item.id}`} to={item.link} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-marigold/40">
                  {item.image && <img src={item.image} alt={item.title} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />}
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-marigold">{item.category}</p>
                    <h3 className="mt-2 line-clamp-2 text-base font-semibold text-white">{item.title}</h3>
                    {item.description && <p className="mt-2 line-clamp-3 text-xs leading-6 text-white/55">{item.description}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-marigold">Read more <FiArrowUpRight /></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default SearchPage;
