import Link from "next/link";

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
        <div className="relative h-0 w-0 border-l-15 border-r-15 border-b-26 border-l-transparent border-r-transparent border-b-black" />
        <span className="text-xl font-semibold">Vercel Daily</span>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-muted-foreground hover:text-foreground"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
