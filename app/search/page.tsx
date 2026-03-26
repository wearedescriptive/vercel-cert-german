import { Suspense } from "react";
import type { Metadata } from "next";

import { getAllCategories } from "@/lib/data";
import { SearchResults } from "@/components/search-results";
import { Search } from "@/components/search";
import { CategoryFilter } from "@/components/category-filter";
import {
  SearchInputSkeleton,
  CategoryFilterSkeleton,
  SearchResultsSkeleton,
} from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Search",
};

type Props = {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { data: categories } = await getAllCategories();
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <hgroup>
        <h1 className="text-3xl font-bold">Search articles</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Browse all articles or search by keyword and category.
        </p>
      </hgroup>

      <div className="relative flex gap-6">
        <Suspense fallback={<SearchInputSkeleton />}>
          <Search placeholder="Search by title, excerpt, or tags…" />
        </Suspense>

        <Suspense fallback={<CategoryFilterSkeleton />}>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
