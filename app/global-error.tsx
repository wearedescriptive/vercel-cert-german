"use client";

import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="m-0 font-sans">
        <div className="flex min-h-screen items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold">Something went wrong</h2>
            <p className="mb-6 text-muted-foreground">
              We hit an unexpected error. Please try again.
            </p>
            {error.digest && (
              <p className="mb-6 font-mono text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
            <button
              type="button"
              onClick={reset}
              className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
