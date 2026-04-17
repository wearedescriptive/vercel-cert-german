import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Pagination } from "./pagination";

import { getLatestArticles } from "@/lib/api";

export async function LatestArticles() {
  const { data: articles, meta } = await getLatestArticles();
  const totalPages = meta.pagination.totalPages || 1;
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                priority={index < 3}
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                {article.category} ·{" "}
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h3 className="mt-2 text-lg font-bold text-neutral-950 transition-colors group-hover:text-neutral-700">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
                {article.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-neutral-900">
                <span>Read article</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
