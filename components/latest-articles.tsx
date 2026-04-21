import { Pagination } from "./pagination";
import { ArticleCard } from "./article-card";

import { getLatestArticles } from "@/lib/api";

export async function LatestArticles() {
  const { data: articles, meta } = await getLatestArticles();
  const totalPages = meta.pagination.totalPages || 1;
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {articles.map((article) => {
          return <ArticleCard key={article.id} article={article} />;
        })}
      </div>

      <div className="flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
