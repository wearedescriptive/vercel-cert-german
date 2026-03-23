import { Suspense } from "react";
import Link from "next/link";

import { BreakingNews } from "@/components/breaking-news";
import { FeaturedArticles } from "@/components/featured-articles";
import { SubscribeButtonLoader } from "@/components/subscribe-button-loader";

import { getFeaturedArticles } from "@/lib/data";

export default async function Home() {
  const [{ data: featuredArticles }] = await Promise.all([
    getFeaturedArticles(),
  ]);

  return (
    <>
      <Suspense fallback="loading...">
        <BreakingNews />
      </Suspense>

      <main className="mx-auto max-w-5xl px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          The Vercel Daily
        </p>
        <h1 className="mt-3 text-5xl font-bold leading-tight tracking-tight">
          News and insights for
          <br />
          modern web developers.
        </h1>
        <p className="mt-4 max-w-md text-lg text-neutral-500">
          Changelogs, engineering deep dives, customer stories, and community
          updates — all in one place.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/search"
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse articles →
          </Link>

          <Suspense>
            <SubscribeButtonLoader />
          </Suspense>
        </div>
      </main>

      <FeaturedArticles articles={featuredArticles} />
    </>
  );
}
