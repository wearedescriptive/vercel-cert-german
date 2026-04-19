"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { Category } from "@/lib/definitions";

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelect(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative shrink-0 sm:w-auto w-full">
      <select
        aria-label="Filter by category"
        value={searchParams.get("category") ?? ""}
        onChange={(e) => handleSelect(e.target.value)}
        className="w-full appearance-none rounded-lg border border-input bg-background py-3 pl-4 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
