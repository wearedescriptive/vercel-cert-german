import Image from "next/image";
import Link from "next/link";

import { searchArticles } from "@/lib/data";

export async function SearchResults(props: {
  searchParams?: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;
  const hasSearch = !!(query || category);

  const { data: articles } = await searchArticles({
    search: query,
    category,
    page: currentPage,
    limit: 6,
  });

  if (hasSearch && articles.length === 0) {
    return (
      <div className="mt-12 text-center">
        <p className="text-lg font-medium text-neutral-600">No results found</p>
        <p className="mt-1 text-sm text-neutral-400">
          Try a different search term or category.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* {!hasSearch && (
        <p className="mb-4 text-sm text-neutral-500">Recent articles</p>
      )} */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="group"
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {article.category} ·{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h3 className="mt-1 font-bold text-neutral-900 group-hover:underline">
              {article.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
