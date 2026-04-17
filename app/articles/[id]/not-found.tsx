import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center p-8">
      <h1 className="mb-2 text-4xl font-bold text-neutral-900">
        Article Not Found
      </h1>
      <p className="mb-6 text-neutral-500">
        The article you&apos;re looking for doesn&apos;t exist or may have been
        removed.
      </p>
      <div className="flex gap-3">
        <Link
          href="/search"
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
        >
          Browse articles
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
