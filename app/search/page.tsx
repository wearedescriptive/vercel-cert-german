import type { Metadata } from "next";

import { Suspense } from "react";

import { getAllCategories } from "@/lib/api";
import { Search } from "@/components/search";
import { CategoryFilter } from "@/components/category-filter";
import {
  SearchInputSkeleton,
  CategoryFilterSkeleton,
} from "@/components/skeletons";
import { SearchResults } from "@/components/search-results";
import { cacheLife, cacheTag } from "next/cache";

export const metadata: Metadata = {
  title: "Search",
};

async function CategoryFilterSection() {
  "use cache";

  cacheLife("minutes");
  cacheTag("categories");

  const { data: categories } = await getAllCategories();

  return <CategoryFilter categories={categories} />;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 gap-8 flex flex-col">
      <hgroup>
        <h1 className="text-3xl font-bold tracking-tight">Search articles</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Browse all articles or search by keyword and category.
        </p>
      </hgroup>

      <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6">
        <Suspense fallback={<SearchInputSkeleton />}>
          <Search placeholder="Search by title, excerpt, or tags..." />
        </Suspense>

        <Suspense fallback={<CategoryFilterSkeleton />}>
          <CategoryFilterSection />
        </Suspense>
      </div>

      <Suspense>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
