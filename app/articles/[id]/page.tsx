import type { Metadata } from "next";
import Image from "next/image";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleHero as Hero } from "@/components/article-hero";
import { ArticleBody as Body } from "@/components/article-body";
import { TrendingArticles } from "@/components/trending-articles";
import { SubscribeButton } from "@/components/subscribe-button";
import { getArticleById, getSubscription } from "@/lib/data";
import {
  ArticleContentSkeleton,
  TrendingArticlesSkeleton,
} from "@/components/skeletons";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: article } = await getArticleById(id);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article post could not be found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags.join(", "),
    authors: [{ name: article.author.name }],
    alternates: { canonical: `/${id}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        { url: article.image, width: 1200, height: 630, alt: article.title },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

async function ArticleContent({ params }: Props) {
  const [{ id }, cookieStore] = await Promise.all([params, cookies()]);
  const token = cookieStore.get("subscription-token")?.value;
  const [{ data: article }, subscription] = await Promise.all([
    getArticleById(id),
    token ? getSubscription(token) : Promise.resolve(null),
  ]);

  if (!article) notFound();

  const isSubscribed = subscription?.data?.status === "active";

  return (
    <article>
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        {article.category}
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-neutral-900 md:text-4xl">
        {article.title}
      </h1>
      <p className="mt-3 text-lg text-neutral-500">{article.excerpt}</p>
      <div className="mt-4 flex items-center gap-3 border-b pb-6">
        {article.author.avatar && (
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={36}
            height={36}
            className="rounded-full"
          />
        )}

        <div className="text-sm">
          <p className="font-semibold text-neutral-800">
            {article.author.name}
          </p>
          <p className="text-neutral-400">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Hero image={{ src: article.image, alt: article.title }} />
      </div>

      {isSubscribed ? (
        <Body content={article.content} />
      ) : (
        <>
          <Body content={article.content.slice(0, 1)} />
          <div className="relative mt-8">
            <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-linear-to-b from-transparent to-white" />
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
              <p className="text-lg font-semibold text-neutral-900">
                Read the full article
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Subscribe for free to unlock every article on Vercel Daily.
              </p>
              <div className="mt-5 flex justify-center">
                <SubscribeButton isSubscribed={false} />
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}

export default async function ArticleDetailsPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Suspense fallback={<ArticleContentSkeleton />}>
          <ArticleContent params={params} />
        </Suspense>

        <div className="mt-12 border-t pt-10">
          <Suspense fallback={<TrendingArticlesSkeleton />}>
            <TrendingArticles params={params} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
