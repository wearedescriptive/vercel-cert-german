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
const BYPASS_TOKEN = process.env.BYPASS_TOKEN;
if (!BYPASS_TOKEN) throw new Error("Missing BYPASS_TOKEN env variable");

const bypassHeader = { "x-vercel-protection-bypass": BYPASS_TOKEN };

export async function getFeaturedArticles(): Promise<ArticleListResponse> {
  "use cache";

  cacheLife("days");
  cacheTag("featured-articles", "homepage");

  const res = await fetch(`${BASE_URL}/articles?featured=true`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to get featured articles");

  return res.json();
}

export async function getArticleById(id: string): Promise<ArticleResponse> {
  "use cache";

  cacheLife("days");
  cacheTag("articles", `article-${id}`);

  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: { ...bypassHeader },
  });

  if (res.status === 404) return { data: null, success: true };
  if (!res.ok) throw new Error("Failed to get article details");

  return res.json();
}

export async function getAllCategories(): Promise<CategoryListResponse> {
  "use cache";

  cacheLife("weeks");
  cacheTag("categories");

  const res = await fetch(`${BASE_URL}/categories`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

export async function getTrendingArticles(
  exclude?: string,
): Promise<ArticleListResponse> {
  const res = await fetch(
    `${BASE_URL}/articles/trending${exclude ? `?exclude=${exclude}` : ""}`,
    { headers: { ...bypassHeader } },
  );
  if (!res.ok) throw new Error("Failed to fetch trending articles");

  return res.json();
}

export async function getBreakingNews(): Promise<BreakingNewsResponse> {
  "use cache";

  cacheLife("minutes");
  cacheTag("breaking-news");

  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch breaking news");

  return res.json();
}

export async function getLatestArticles(): Promise<ArticleListResponse> {
  "use cache";

  cacheLife("days");
  cacheTag("latest-articles");

  const qs = new URLSearchParams();
  qs.set("page", "1");
  qs.set("limit", "6");

  const res = await fetch(`${BASE_URL}/articles?${qs.toString()}`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to fetch latest artists");

  return res.json();
}

export async function searchArticles(params: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<ArticleListResponse> {
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.category) qs.set("category", params.category);
  if (params.page) qs.set("page", String(params.page));
  qs.set("limit", String(params.limit ?? 6));

  const res = await fetch(`${BASE_URL}/articles?${qs.toString()}`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to search articles");

  return res.json();
}

export async function getSubscription(
  token: string,
): Promise<SubscriptionResponse | null> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch subscription");

  return res.json();
}

export async function activateSubscription(
  token: string,
): Promise<SubscriptionResponse> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "POST",
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (!res.ok) throw new Error("Failed to activate subscription");

  return res.json();
}

export async function cancelSubscription(
  token: string,
): Promise<SubscriptionResponse> {
  const res = await fetch(`${BASE_URL}/subscription`, {
    method: "DELETE",
    headers: { ...bypassHeader, "x-subscription-token": token },
  });
  if (!res.ok) throw new Error("Failed to cancel subscription");

  return res.json();
}

export async function createSubscription(): Promise<
  SubscriptionResponse & { token: string | null }
> {
  const res = await fetch(`${BASE_URL}/subscription/create`, {
    method: "POST",
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to create subscription");

  const token = res.headers.get("x-subscription-token");
  return { token, ...(await res.json()) };
}

export async function getPublicationConfig(): Promise<PublicationConfigResponse | null> {
  "use cache";

  cacheLife("weeks");
  cacheTag("publication-config");

  try {
    const res = await fetch(`${BASE_URL}/publication/config`, {
      headers: { ...bypassHeader },
    });
    if (!res.ok) throw new Error("Failed to fetch publication config");

    return res.json();
  } catch {
    return null;
  }
}
