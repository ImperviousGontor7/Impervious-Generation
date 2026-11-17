import { getNews } from "../services/newsApi.js";

function ageInDays(value, now) {
  if (!value) return 365;
  const date = new Date(value).getTime();
  if (!Number.isFinite(date)) return 365;
  return Math.max(0, (now - date) / 86_400_000);
}

export function rankTrendingNews(items = [], now = Date.now()) {
  return [...items]
    .map((item) => {
      const views = Math.max(0, Number(item.views ?? 0));
      const age = ageInDays(item.publishedAt ?? item.createdAt, now);
      // Views provide the primary signal; freshness breaks ties and reduces stale spikes.
      const score = Math.log1p(views) * 10 + Math.max(0, 30 - age) * 0.35;
      return { ...item, trendingScore: score };
    })
    .sort((a, b) => b.trendingScore - a.trendingScore);
}

export async function getTrendingNews(limit = 12) {
  const response = await getNews({
    page: 1,
    limit: 100,
    sortBy: "views",
    sortOrder: "desc",
  });
  return rankTrendingNews(response?.items ?? []).slice(0, limit);
}
