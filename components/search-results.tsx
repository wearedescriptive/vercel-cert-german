import { Suspense } from "react";
import { SearchResultsSkeleton } from "./skeletons";
import { SearchResultsList } from "./search-results-list";
import { LatestArticles } from "./latest-articles";

export async function SearchResults(props: {
  searchParams?: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;
  const isSearching = query || category || currentPage > 1;
  const key = isSearching
    ? `search-${query}-${currentPage}-${category}`
    : "latest";
  return (
    <Suspense key={key} fallback={<SearchResultsSkeleton />}>
      {isSearching ? (
        <SearchResultsList
          query={query}
          currentPage={currentPage}
          category={category}
        />
      ) : (
        <LatestArticles />
      )}
    </Suspense>
  );
}
