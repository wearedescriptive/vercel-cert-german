"use cache";

import { cacheLife, cacheTag } from "next/cache";

import type { BreakingNews } from "./definitions";

const BASE_URL = "https://vercel-daily-news-api.vercel.app/api";
const BYPASS_TOKEN = process.env.BYPASS_TOKEN!;

export async function getBreakingNews() {
  const res = await fetch(`${BASE_URL}/breaking-news`, {
    headers: { "x-vercel-protection-bypass": BYPASS_TOKEN },
  });
  if (!res.ok) throw new Error("Failed to fetch breaking news");

  return res.json() as Promise<BreakingNews>;
}
