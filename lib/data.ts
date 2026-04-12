import { cacheLife, cacheTag } from "next/cache";

import type {
  ArticleListResponse,
  ArticleResponse,
  BreakingNewsResponse,
  CategoryListResponse,
  PublicationConfigResponse,
  SubscriptionResponse,
} from "./definitions";

const BASE_URL = "https://vercel-daily-news-api.vercel.app/api";
const BYPASS_TOKEN = process.env.BYPASS_TOKEN!;

const bypassHeader = { "x-vercel-protection-bypass": BYPASS_TOKEN };

export async function getFeaturedArticles() {
  "use cache";

  cacheLife("days");
  cacheTag("featured-articles", "homepage");

  const res = await fetch(`${BASE_URL}/articles?featured=true`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to get featured articles");

  return res.json() as Promise<ArticleListResponse>;
}

export async function getArticleById(id: string) {
  "use cache";

  cacheLife("days");
  cacheTag("articles", `article-${id}`);

  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to get article details");

  return res.json() as Promise<ArticleResponse>;
}

export async function getAllCategories() {
  "use cache";

  cacheLife("days");
  cacheTag("categories");

  const res = await fetch(`${BASE_URL}/categories`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json() as Promise<CategoryListResponse>;
}

export async function getTrendingArticles(exclude?: string) {
  "use cache";

  cacheLife("days");
  if (exclude) {
    cacheTag("trending-articles", `trending-articles-exluding-${exclude}`);
  } else {
    cacheTag("trending-articles");
  }

  const res = await fetch(
    `${BASE_URL}/articles/trending${exclude ? `?exclude=${exclude}` : ""}`,
    { headers: { ...bypassHeader } },
  );
  if (!res.ok) throw new Error("Failed to fetch trending articles");

  return res.json() as Promise<ArticleListResponse>;
}

export async function getBreakingNews() {
  "use cache";

  cacheLife("minutes");
  cacheTag("breaking-news");

  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch breaking news");

  return res.json() as Promise<BreakingNewsResponse>;
}

export async function searchArticles(params: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  "use cache";

  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.category) qs.set("category", params.category);
  if (params.page) qs.set("page", String(params.page));
  qs.set("limit", String(params.limit ?? 6));

  cacheLife("days");
  cacheTag("search-articles", `query-${qs.toString()}`);

  const res = await fetch(`${BASE_URL}/articles?${qs.toString()}`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to search articles");

  return res.json() as Promise<ArticleListResponse>;
}

export async function getSubscription(token: string) {
  const res = await fetch(`${BASE_URL}/subscription`, {
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (!res.ok) return null;

  return res.json() as Promise<SubscriptionResponse>;
}

export async function activateSubscription(token: string) {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "POST",
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (!res.ok) throw new Error("Failed to activate subscription");

  return res.json() as Promise<SubscriptionResponse>;
}

export async function cancelSubscription(token: string) {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "DELETE",
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (!res.ok) throw new Error("Failed to cancel subscription");

  return res.json() as Promise<SubscriptionResponse>;
}

export async function createSubscription() {
  const res = await fetch(`${BASE_URL}/subscription/create`, {
    method: "POST",
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to create subscription");

  const token = res.headers.get("x-subscription-token");
  return { token, ...(await (res.json() as Promise<SubscriptionResponse>)) };
}

// TODO: consider only returning what is needed for this function
export async function getPublicationConfig() {
  "use cache";

  cacheLife("days");
  cacheTag("publication-config");

  const res = await fetch(`${BASE_URL}/publication/config`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch publication config");

  return res.json() as Promise<PublicationConfigResponse>;
}
