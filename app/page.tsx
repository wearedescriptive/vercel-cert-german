import { Suspense } from "react";

import { BreakingNews } from "@/components/breaking-news";
import { FeaturedArticles } from "@/components/featured-articles";

import { getFeaturedArticles } from "@/lib/data";

export default async function Home() {
  const [{ data: featuredArticles }] = await Promise.all([
    getFeaturedArticles(),
  ]);

  return (
    <div>
      <Suspense fallback="loading...">
        <BreakingNews />
      </Suspense>

      <main>
        {/* Hero */}

        <FeaturedArticles articles={featuredArticles} />
      </main>
    </div>
  );
}
