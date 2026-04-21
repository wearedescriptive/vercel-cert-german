import Link from "next/link";

import { getFeaturedArticles } from "@/lib/api";
import { ArticleCard } from "./article-card";

export async function FeaturedArticles() {
  const { data: articles } = await getFeaturedArticles();
  return (
    <section className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Handpicked stories from the team.
          </p>
        </div>
        <Link
          href="/search"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </div>
    </section>
  );
}
