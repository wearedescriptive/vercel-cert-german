import Link from "next/link";

import { Suspense } from "react";
import { SubscribeButtonLoader } from "./subscribe-button-loader";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center gap-3 sm:gap-6 px-4 sm:px-6 py-4 sm:py-5">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative h-0 w-0 border-l-12 border-r-12 border-b-21 sm:border-l-15 sm:border-r-15 sm:border-b-26 border-l-transparent border-r-transparent border-b-black" />
          <span className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
            Vercel Daily
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/search"
            className="transition-colors hover:text-foreground"
          >
            Articles
          </Link>
        </nav>
        <Suspense>
          <SubscribeButtonLoader />
        </Suspense>
      </div>
    </header>
  );
}
