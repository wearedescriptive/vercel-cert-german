import { searchArticles } from "@/lib/api";
import { Pagination } from "./pagination";
import { ArticleCard } from "./article-card";

export async function SearchResultsList({
  query,
  currentPage,
  category,
}: {
  query: string;
  currentPage: number;
  category: string;
}) {
  const { data: articles, meta } = await searchArticles({
    search: query,
    category,
    page: currentPage,
    limit: 6,
  });

  const totalPages = Number(meta?.pagination.totalPages) || 1;

  if (articles.length === 0) {
    return (
      <div className="mt-16 text-center">
        <p className="text-lg font-medium text-neutral-600">No results found</p>
        <p className="mt-2 text-sm text-neutral-500">
          Try a different search term or category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((article) => {
          return <ArticleCard article={article} key={article.id} />;
        })}
      </div>

      <div className="mt-8 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
