"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { Category } from "@/lib/definitions";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full sm:w-auto shrink-0">
      <select
        aria-label="Filter by category"
        value={searchParams.get("category") ?? ""}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full appearance-none rounded-lg border border-input bg-background py-3 pl-4 pr-10 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}
