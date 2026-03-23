import Link from "next/link";

import { TriangleAlert } from "lucide-react";

import { getBreakingNews } from "@/lib/data";

export async function BreakingNews() {
  const { data } = await getBreakingNews();
  const { urgent, articleId, headline } = data;

  return (
    <div className="border-b bg-black text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 text-sm">
        {urgent && <TriangleAlert />}
        <span className="shrink-0 rounded bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
          Breaking
        </span>
        <Link
          prefetch
          href={`/articles/${articleId}`}
          className="line-clamp-1 hover:underline"
        >
          {headline}
        </Link>
      </div>
    </div>
  );
}
