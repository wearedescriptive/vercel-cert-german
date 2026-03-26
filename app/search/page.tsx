import type { Metadata } from "next";

import { Suspense } from "react";
import { SearchResults } from "@/components/search-results";
import { SearchResultsSkeleton } from "@/components/skeletons";

export const metadata: Metadata = {
  title: "Search",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  return (
    <Suspense fallback={<SearchResultsSkeleton />}>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}
