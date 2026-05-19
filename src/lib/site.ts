const fallbackSiteUrl = "https://dtnhs.netlify.app";

const rawSiteUrl = import.meta.env.VITE_SITE_URL?.trim();

export const SITE_URL = rawSiteUrl || fallbackSiteUrl;

export const createSiteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`;

  return new URL(normalizedPath, baseUrl).toString();
};