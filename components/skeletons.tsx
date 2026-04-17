const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function BreakingNewsSkeleton() {
  return (
    <div className="border-b bg-black">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-3">
        <div className="h-5 w-16 shrink-0 rounded bg-neutral-700" />
        <div className="h-4 w-72 rounded bg-neutral-700" />
      </div>
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <article>
      <div className="h-3 w-20 rounded bg-neutral-200" />
      <div className="mt-3 h-8 w-full rounded bg-neutral-200 md:w-3/4" />
      <div className="mt-2 h-8 w-2/3 rounded bg-neutral-200 md:w-1/2" />
      <div className="mt-4 h-5 w-full rounded bg-neutral-100" />
      <div className="mt-1 h-5 w-3/4 rounded bg-neutral-100" />
      <div className="mt-4 flex items-center gap-3 border-b pb-6">
        <div className="h-9 w-9 rounded-full bg-neutral-200" />
        <div>
          <div className="h-4 w-28 rounded bg-neutral-200" />
          <div className="mt-1 h-3 w-36 rounded bg-neutral-100" />
        </div>
      </div>
      <div
        className={`${shimmer} relative mt-6 aspect-video overflow-hidden rounded-lg bg-neutral-100`}
      />
      <div className="mt-8 space-y-4">
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-5/6 rounded bg-neutral-100" />
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-2/3 rounded bg-neutral-100" />
        <div className="mt-8 h-6 w-48 rounded bg-neutral-200" />
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-full rounded bg-neutral-100" />
        <div className="h-4 w-3/4 rounded bg-neutral-100" />
      </div>
    </article>
  );
}

function TrendingArticleItemSkeleton() {
  return (
    <div>
      <div className="h-3 w-16 rounded bg-neutral-200" />
      <div className="mt-2 h-5 w-3/4 rounded bg-neutral-200" />
      <div className="mt-2 h-4 w-full rounded bg-neutral-100" />
      <div className="mt-1 h-4 w-2/3 rounded bg-neutral-100" />
    </div>
  );
}

export function TrendingArticlesSkeleton() {
  return (
    <div>
      <div className="mb-4 h-3 w-20 rounded bg-neutral-200" />
      <div className="flex flex-col gap-6">
        <TrendingArticleItemSkeleton />
        <TrendingArticleItemSkeleton />
        <TrendingArticleItemSkeleton />
      </div>
    </div>
  );
}

export function SearchInputSkeleton() {
  return (
    <div className="relative flex flex-1 shrink-0">
      <div className="h-[46px] w-full rounded-lg border border-neutral-200 bg-neutral-100" />
    </div>
  );
}

export function CategoryFilterSkeleton() {
  return <div className="h-[46px] w-40 rounded-lg border border-neutral-200 bg-neutral-100" />;
}

function HorizontalCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 sm:flex-row">
      <div
        className={`${shimmer} relative aspect-video w-full shrink-0 overflow-hidden bg-neutral-100 sm:aspect-auto sm:w-48 md:w-56`}
      />
      <div className="flex flex-1 flex-col justify-center gap-2.5 p-5">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 rounded-md bg-neutral-200" />
          <div className="h-3 w-12 rounded bg-neutral-100" />
        </div>
        <div className="h-5 w-full rounded bg-neutral-200" />
        <div className="h-4 w-5/6 rounded bg-neutral-100" />
        <div className="h-3 w-20 rounded bg-neutral-100" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <HorizontalCardSkeleton />
      <HorizontalCardSkeleton />
      <HorizontalCardSkeleton />
      <HorizontalCardSkeleton />
      <HorizontalCardSkeleton />
      <HorizontalCardSkeleton />
    </div>
  );
}

export function FeaturedArticlesSkeleton() {
  return (
    <section className="w-full">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="h-7 w-32 rounded bg-neutral-200" />
          <div className="mt-1 h-4 w-52 rounded bg-neutral-100" />
        </div>
        <div className="h-4 w-14 rounded bg-neutral-100" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <HorizontalCardSkeleton />
        <HorizontalCardSkeleton />
        <HorizontalCardSkeleton />
        <HorizontalCardSkeleton />
        <HorizontalCardSkeleton />
        <HorizontalCardSkeleton />
      </div>
    </section>
  );
}
