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
  const key = query + currentPage + category;
  const isSearching = query || category;

  if (!isSearching) {
    return (
      <Suspense key="latest-articles" fallback={<SearchResultsSkeleton />}>
        <LatestArticles currentPage={currentPage} />
      </Suspense>
    );
  }

  return (
    <Suspense key={key} fallback={<SearchResultsSkeleton />}>
      <SearchResultsList
        query={query}
        currentPage={currentPage}
        category={category}
      />
    </Suspense>
  );
}
