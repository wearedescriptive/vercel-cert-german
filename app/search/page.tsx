import type { Metadata } from "next";

import { Suspense } from "react";

import { getAllCategories } from "@/lib/data";
import { Search } from "@/components/search";
import { CategoryFilter } from "@/components/category-filter";
import {
  SearchInputSkeleton,
  CategoryFilterSkeleton,
  SearchResultsSkeleton,
} from "@/components/skeletons";
import { SearchResults } from "@/components/search-results";
import { SearchNavigationProvider } from "@/components/search-navigation";
import { SearchResultsPending } from "@/components/search-results-pending";

export const metadata: Metadata = {
  title: "Search",
};

async function CategoryFilterSection() {
  const { data: categories } = await getAllCategories();
  return <CategoryFilter categories={categories} />;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  return (
    <SearchNavigationProvider>
      <main className="mx-auto max-w-5xl px-4 py-12 gap-6 flex flex-col">
        <hgroup>
          <h1 className="text-3xl font-bold">Search articles</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Browse all articles or search by keyword and category.
          </p>
        </hgroup>

        <div className="relative flex gap-6">
          <Suspense fallback={<SearchInputSkeleton />}>
            <Search placeholder="Search by title, excerpt, or tags..." />
          </Suspense>

          <Suspense fallback={<CategoryFilterSkeleton />}>
            <CategoryFilterSection />
          </Suspense>
        </div>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResultsPending fallback={<SearchResultsSkeleton />}>
            <SearchResults searchParams={searchParams} />
          </SearchResultsPending>
        </Suspense>
      </main>
    </SearchNavigationProvider>
  );
}
