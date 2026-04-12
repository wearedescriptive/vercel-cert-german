import { Suspense } from "react";
import Link from "next/link";

import { BreakingNews } from "@/components/breaking-news";
import { FeaturedArticles } from "@/components/featured-articles";
import {
  BreakingNewsSkeleton,
  FeaturedArticlesSkeleton,
} from "@/components/skeletons";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<BreakingNewsSkeleton />}>
        <BreakingNews />
      </Suspense>

      <main className="mx-auto max-w-5xl items-center gap-24 px-4 py-18 flex flex-col">
        <div className="gap-12 flex flex-col">
          <hgroup className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              The Vercel Daily
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
              News and insights for modern web developers.
            </h1>
            <p className="max-w-md text-lg text-neutral-500">
              Changelogs, engineering deep dives, customer stories, and
              community updates — all in one place.
            </p>
          </hgroup>

          <div>
            <Link
              href="/search"
              className="rounded bg-black px-5 py-2.5 text-sm font-semibold text-white"
            >
              Browse articles →
            </Link>
          </div>
        </div>

        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <FeaturedArticles />
        </Suspense>
      </main>
    </>
  );
}
