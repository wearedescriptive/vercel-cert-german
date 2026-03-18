import { cacheLife, cacheTag } from "next/cache";

import type { BreakingNewsResponse, ArticleResponse } from "./definitions";

const BASE_URL = "https://vercel-daily-news-api.vercel.app/api";
const BYPASS_TOKEN = process.env.BYPASS_TOKEN!;

const bypassHeader = { "x-vercel-protection-bypass": BYPASS_TOKEN };

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

export async function getArticleById(id: string) {
  "use cache";

  // TODO: cacheLife
  // cacheLife("");
  cacheTag("articles", `article-${id}`);

  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    headers: { ...bypassHeader },
  });
  if (!res.ok) throw new Error("Failed to get article details");

  return res.json() as Promise<ArticleResponse>;
}
