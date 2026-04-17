import { Suspense } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

      <main className="mx-auto max-w-5xl items-center gap-28 px-6 py-24 flex flex-col">
        <div className="gap-14 flex flex-col">
          <hgroup className="flex flex-col gap-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              The Vercel Daily
            </p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-[-0.03em] md:text-6xl">
              News and insights for modern web developers.
            </h1>
            <p className="max-w-md text-lg text-neutral-500">
              Changelogs, engineering deep dives, customer stories, and
              community updates — all in one place.
            </p>
          </hgroup>

          <div>
            <Button asChild size="lg" className="h-11 px-6">
              <Link href="/search">Browse articles &rarr;</Link>
            </Button>
          </div>
        </div>

        <Suspense fallback={<FeaturedArticlesSkeleton />}>
          <FeaturedArticles />
        </Suspense>
      </main>
    </>
  );
}
