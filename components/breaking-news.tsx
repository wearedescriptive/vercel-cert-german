import Link from "next/link";

import { TriangleAlert, ArrowRight } from "lucide-react";

import { getBreakingNews } from "@/lib/api";

export async function BreakingNews() {
  const { data } = await getBreakingNews();
  const { urgent, articleId, headline } = data;

  return (
    <div className="border-b border-neutral-800 bg-black text-white">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-3 text-sm">
        {urgent && <TriangleAlert className="size-4 shrink-0" />}
        <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-black">
          Breaking
        </span>
        <Link
          prefetch
          href={`/articles/${articleId}`}
          className="group flex items-center gap-1.5 line-clamp-1 hover:underline"
        >
          <span>{headline}</span>
          <ArrowRight className="size-3 shrink-0 opacity-50 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
