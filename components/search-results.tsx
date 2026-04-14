import { Suspense } from "react";
import { SearchResultsSkeleton } from "./skeletons";
import { SearchResultsList } from "./search-results-list";

export async function SearchResults(props: {
  searchParams?: Promise<{ query?: string; category?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <Suspense
      key={query + currentPage + category}
      fallback={<SearchResultsSkeleton />}
    >
      <SearchResultsList
        query={query}
        currentPage={currentPage}
        category={category}
      />
    </Suspense>
  );
}
