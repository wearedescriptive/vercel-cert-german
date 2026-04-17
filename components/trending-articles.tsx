import Link from "next/link";

import { getTrendingArticles } from "@/lib/api";

export async function TrendingArticles({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: articles } = await getTrendingArticles(id);
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
        Trending
      </h2>
      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="group"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              {article.category}
            </p>
            <h3 className="mt-1 font-bold text-neutral-900 group-hover:underline">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
