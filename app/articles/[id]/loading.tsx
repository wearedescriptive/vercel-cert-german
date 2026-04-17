import {
  ArticleContentSkeleton,
  TrendingArticlesSkeleton,
} from "@/components/skeletons";

export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <ArticleContentSkeleton />
        <div className="mt-12 border-t pt-10">
          <TrendingArticlesSkeleton />
        </div>
      </div>
    </main>
  );
}
