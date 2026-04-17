import Link from "next/link";
import { Search } from "lucide-react";
import { Suspense } from "react";
import { SubscribeButtonLoader } from "./subscribe-button-loader";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-0 w-0 border-l-15 border-r-15 border-b-26 border-l-transparent border-r-transparent border-b-black" />
          <span className="text-xl font-bold tracking-tight">Vercel Daily</span>
        </Link>
        <Link
          href="/search"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Search className="size-3.5" />
          Search
        </Link>
        <Suspense>
          <SubscribeButtonLoader />
        </Suspense>
      </div>
    </header>
  );
}
