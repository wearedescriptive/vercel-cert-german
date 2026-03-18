import type { Article } from "@/lib/definitions";

export async function FeaturedArticles({ articles }: { articles: Article[] }) {
  return (
    <section>
      <h2>Featured articles</h2>

      {articles.map((article) => {
        return <div key={article.id}>{article.title}</div>;
      })}
    </section>
  );
}
