import { cacheLife, cacheTag } from "next/cache";

import type {
  ArticleListResponse,
  ArticleResponse,
  BreakingNewsResponse,
  CategoryListResponse,
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

// TODO: can exclude
export async function getTrendingArticles() {}

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

// export async function getPublicationConfig() {
//   "use cache";

//   cacheLife("max");
//   cacheTag("publication-config");

//   const res = await fetch(`${BASE_URL}/publication/config`, {
//     headers: { ...bypassHeader },
//   });
//   if (!res.ok) throw new Error("Failed to get publication config");

//   return res.json() as Promise;
// }
