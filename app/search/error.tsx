"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";

function generateCorrelationId(): string {
  return `err-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function SearchErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const correlationId = useMemo(() => generateCorrelationId(), []);

  useEffect(() => {
    console.error("Search error boundary caught:", {
      correlationId,
      digest: error.digest,
      message: error.message,
      timestamp: new Date().toISOString(),
      location: "/search",
    });
  }, [error, correlationId]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-center justify-center px-4 py-12">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-10 text-center">
        <h2 className="mb-2 text-xl font-bold text-neutral-900">
          Unable to load search results
        </h2>
        <p className="mb-4 text-sm text-neutral-500">
          Something went wrong while searching. Please try again.
        </p>
        {error.digest && (
          <p className="mb-2 font-mono text-xs text-neutral-500">
            Error ID: {error.digest}
          </p>
        )}
        <p className="mb-6 font-mono text-xs text-neutral-500">
          Correlation ID: {correlationId}
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
