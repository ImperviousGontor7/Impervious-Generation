const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

const API_ORIGIN =
  API_BASE_URL
    .replace(/\/api\/?$/, "")
    .replace(/\/$/, "");

export function resolveMediaUrl(
  url,
  fallback = "",
) {
  if (!url) {
    return fallback;
  }

  if (
    /^https?:\/\//i.test(url) ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${API_ORIGIN}${url}`;
  }

  return `${API_ORIGIN}/${url}`;
}