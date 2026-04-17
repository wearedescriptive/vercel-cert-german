import Link from "next/link";
import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";

  cacheLife("days");

  return (
    <footer className="border-t border-neutral-200/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <div className="relative h-0 w-0 border-l-8 border-r-8 border-b-14 border-l-transparent border-r-transparent border-b-neutral-400" />
          <span>
            &copy; {new Date().getFullYear()} Vercel Daily News
          </span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/search" className="transition-colors hover:text-foreground">
            Articles
          </Link>
        </nav>
      </div>
    </footer>
  );
}
