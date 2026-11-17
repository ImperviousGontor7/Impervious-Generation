import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { getTrendingNews } from "../data/trending_algorithm.js";
import firstMid from "../data/view_all/first_mid.js";
import secondMid from "../data/view_all/second_mid.js";
import behindTheEvent from "../data/view_all/behind_the_event.js";
import multimedia from "../data/view_all/multimedia.js";
import knowledge from "../data/view_all/knowledge.js";
import categories from "../data/view_all/categories.js";
import allNews from "../data/view_all/all_news.js";
import { categoryHome } from "../data/category_home.js";

const sections = {
  "first-mid-year": firstMid,
  "second-mid-year": secondMid,
  "behind-the-event": behindTheEvent,
  "multimedia": multimedia,
  "knowledge": knowledge,
  "categories": categories,
  "all": allNews,
};

function ViewAllPage() {
  const { section: routeSection, slug: categorySlug } = useParams();
  const location = useLocation();
  const section = routeSection ?? (location.pathname === "/trending" ? "trending" : categorySlug ? `category:${categorySlug}` : "all");
  const category = categorySlug ? categoryHome.find((item) => item.slug === categorySlug) : null;
  const config = sections[section] ?? (category ? { title: category.name, description: category.description, items: allNews.items } : allNews);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(section === "trending");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    if (section !== "trending") return undefined;
    setLoading(true);
    getTrendingNews(30)
      .then((items) => { if (active) setTrending(items); })
      .catch(() => { if (active) setMessage("Data trending belum tersedia. Pastikan berita sudah dipublikasikan dan API aktif."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [section]);

  const items = useMemo(() => {
    if (section === "trending") return trending;
    if (section.startsWith("category:")) {
      const terms = {
        akademik: ["akademik", "ujian", "olimpiade", "diskusi", "ilmu"],
        "kegiatan-pesantren": ["pesantren", "kegiatan", "ramadan", "syawwal", "khutbatu"],
        "seni-kreativitas": ["seni", "panggung", "drama", "art show", "folksong", "creativity"],
        olahraga: ["olahraga", "sport", "porseni", "kompetisi"],
        kepramukaan: ["pramuka", "saka", "ambalan", "kursus mahir"],
        organisasi: ["panitia", "committee", "kepemimpinan", "organisasi"],
        keagamaan: ["ramadan", "syawwal", "qurban", "idul adha"],
        multimedia: ["multimedia", "photography", "videography", "poster", "video"],
      }[categorySlug] ?? [];
      return allNews.items.filter((item) => {
        const haystack = `${item.title ?? ""} ${item.category ?? ""} ${item.description ?? ""}`.toLocaleLowerCase("id-ID");
        return terms.some((term) => haystack.includes(term));
      });
    }
    return config.items ?? [];
  }, [section, trending, config, categorySlug]);

  const title = section === "trending" ? "Trending Stories" : config.title;
  const description = section === "trending"
    ? "Berita dengan performa pembacaan tertinggi, dipadukan dengan faktor kebaruan publikasi."
    : config.description;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 text-white sm:px-8 sm:py-12">
      <header className="mb-8 border-b border-white/10 pb-6 sm:mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-marigold">Impervious Archive</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">{description}</p>
      </header>

      {loading ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">Memuat arsip...</p>
      ) : message ? (
        <p className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6 text-sm text-amber-100">{message}</p>
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">Belum ada konten pada bagian ini.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const itemSlug = item.slug ?? String(item.title ?? item.id ?? "").toLocaleLowerCase("id-ID").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
            const isExistingNewsRoute = typeof item.link === "string" && item.link.startsWith("/news/");
            const link = isExistingNewsRoute ? item.link : itemSlug ? `/news/${itemSlug}` : "#";
            const image = item.image ?? item.thumbnail ?? item.banner;
            const itemCategory = item.category?.name ?? item.category ?? item.subtitle ?? "Archive";
            const excerpt = item.description ?? item.excerpt ?? item.quote ?? "";
            return (
              <Link key={`${item.id ?? item.slug ?? item.title}-${index}`} to={link} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-marigold/40">
                {image && <img src={image} alt={item.title ?? "Archive"} loading="lazy" className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />}
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-marigold">{itemCategory}</p>
                  <h2 className="mt-2 line-clamp-2 text-base font-semibold">{item.title ?? item.name}</h2>
                  {excerpt && <p className="mt-2 line-clamp-3 text-xs leading-6 text-white/55">{excerpt}</p>}
                  {section === "trending" && <p className="mt-3 text-[11px] text-white/45">{Number(item.views ?? 0).toLocaleString("id-ID")} views · Rank #{index + 1}</p>}
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-marigold">Open <FiArrowUpRight /></span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ViewAllPage;
