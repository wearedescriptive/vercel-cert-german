import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { getFeaturedArticles } from "@/lib/api";

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
        {articles.map((article) => (
          <Link
            prefetch
            key={article.id}
            href={`/articles/${article.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-300 ease-out hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row"
          >
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-100 sm:aspect-auto sm:w-48 md:w-56">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, 224px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 p-5">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[0.65rem] uppercase tracking-widest">
                  {article.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h3 className="text-base font-semibold leading-snug tracking-tight text-neutral-950 transition-colors group-hover:text-neutral-600">
                {article.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                {article.excerpt}
              </p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 transition-colors group-hover:text-neutral-600">
                Read article
                <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
