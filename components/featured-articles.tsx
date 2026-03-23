import Image from "next/image";
import Link from "next/link";

import type { Article } from "@/lib/definitions";

export function FeaturedArticles({ articles }: { articles: Article[] }) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold">Featured</h2>
          <p className="text-sm text-neutral-500">
            Handpicked stories from the team.
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm text-neutral-500 hover:text-neutral-900"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
