import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleById } from "@/lib/data";

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
  const { id } = await params;
  const { data: article } = await getArticleById(id);

  if (!article) notFound();

  return <div>{article.title}</div>;
}

export default async function ArticleDetailsPage({ params }: Props) {
  return (
    <main className="bg-red-500">
      <Suspense fallback={<div>Loading article…</div>}>
        <ArticleContent params={params} />
      </Suspense>
    </main>
  );
}
