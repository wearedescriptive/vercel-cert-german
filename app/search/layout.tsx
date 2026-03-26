import { Suspense, type ReactNode } from "react";

import { getAllCategories } from "@/lib/data";
import { Search } from "@/components/search";
import { CategoryFilter } from "@/components/category-filter";
import {
  SearchInputSkeleton,
  CategoryFilterSkeleton,
} from "@/components/skeletons";

export default async function Layout({ children }: { children: ReactNode }) {
  const { data: categories } = await getAllCategories();

  return (
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
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      {children}
    </main>
  );
}
