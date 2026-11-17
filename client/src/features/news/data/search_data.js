import { getNews } from "../services/newsApi.js";

import { aprilNews } from "../contents/april.js";
import { julyNews } from "../contents/july.js";
import { augustNews } from "../contents/august.js";
import { januaryNews } from "../contents/january.js";
import { februaryNews } from "../contents/february.js";
import { marchNews } from "../contents/march.js";
import { mayNews } from "../contents/may.js";
import { juneNews } from "../contents/june.js";
import { septemberNews } from "../contents/september.js";
import { octoberNews } from "../contents/october.js";
import { novemberNews } from "../contents/november.js";
import { desemberNews } from "../contents/desember.js";
import { paneldata } from "../../profile/Journalyst/PanelData.js";
import { thisMonth } from "./month_st.js";
import { monthAgo } from "./month_nd.js";
import { firstMid } from "./first_mid.js";
import { secondMid } from "./second_mid.js";
import { behindTheEvent } from "./behind_the_events.js";
import { heroSlides } from "./home_main_slide.js";
import { rootSlides } from "./home_root_slide.js";
import { agendaSlides } from "../../profile/stories/agenda_main_slide.js";

const localSources = [
  ...januaryNews,
  ...februaryNews,
  ...marchNews,
  ...aprilNews,
  ...mayNews,
  ...juneNews,
  ...julyNews,
  ...augustNews,
  ...septemberNews,
  ...octoberNews,
  ...novemberNews,
  ...desemberNews,
  ...paneldata,
  ...thisMonth,
  ...monthAgo,
  ...firstMid,
  ...secondMid,
  ...behindTheEvent,
  ...heroSlides,
  ...rootSlides,
  ...agendaSlides,
];

const normalize = (value) => String(value ?? "").toLocaleLowerCase("id-ID").trim();

export function slugifyTitle(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("id-ID")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toSearchResult(item, source = "local") {
  const slug = item.slug ?? slugifyTitle(item.title ?? item.id);

  return {
    id: String(item.id ?? slug ?? item.title),
    title: item.title ?? "Tanpa judul",
    category: item.category?.name ?? item.category ?? item.subtitle ?? "Kegiatan",
    description: item.excerpt ?? item.description ?? item.quote ?? "",
    image: item.thumbnail ?? item.banner ?? item.image ?? null,
    date: item.publishedAt ?? item.dateLabel ?? item.date ?? null,
    slug,
    link: slug ? `/news/${slug}` : "/",
    source,
    views: Number(item.views ?? 0),
  };
}

export async function searchContent(query) {
  const keyword = normalize(query);
  if (!keyword) return [];

  const localResults = localSources
    .map((item) => toSearchResult(item))
    .filter((item) => {
      const haystack = normalize(`${item.title} ${item.category} ${item.description}`);
      return haystack.includes(keyword);
    });

  let apiResults = [];
  try {
    const response = await getNews({
      search: query,
      page: 1,
      limit: 100,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    apiResults = (response?.items ?? []).map((item) => toSearchResult(item, "api"));
  } catch {
    // Local content remains searchable when the API is unavailable.
  }

  const unique = new Map();
  [...apiResults, ...localResults].forEach((item) => {
    const key = normalize(item.slug || item.title);
    if (!unique.has(key)) unique.set(key, item);
  });

  return [...unique.values()];
}

export function findLocalStory(identifier) {
  const target = normalize(identifier);
  const item = localSources.find((entry) => {
    const entrySlug = entry.slug ?? slugifyTitle(entry.title ?? entry.id);
    return normalize(entrySlug) === target || normalize(entry.id) === target;
  });

  if (!item) return null;

  return {
    ...item,
    id: item.id ?? identifier,
    title: item.title ?? "Tanpa judul",
    category: item.category?.name ?? item.category ?? item.subtitle ?? "Arsip",
    excerpt: item.excerpt ?? item.description ?? "",
    content: Array.isArray(item.content) && item.content.length
      ? item.content
      : item.description ?? item.excerpt ?? item.quote ?? "Konten arsip belum tersedia.",
    banner: item.banner ?? item.thumbnail ?? item.image ?? null,
    createdAt: item.publishedAt ?? item.date ?? null,
    status: item.status ?? "ARCHIVED",
    views: Number(item.views ?? 0),
  };
}

export function getSearchSuggestions() {
  return ["Panggung Gembira", "Khutbatu-l-'Arsy", "Pekan Olahraga dan Seni", "Gontor Olympiade"];
}
