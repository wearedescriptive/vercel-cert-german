import Link from "next/link";

export async function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-0 w-0 border-l-15 border-r-15 border-b-26 border-l-transparent border-r-transparent border-b-black" />
          <span className="text-xl font-bold tracking-tight">Vercel Daily</span>
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="text-neutral-500 hover:text-neutral-900">
            Home
          </Link>
          <Link
            href="/search"
            className="text-neutral-500 hover:text-neutral-900"
          >
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
