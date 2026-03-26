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
    <select
      defaultValue={searchParams.get("category") ?? ""}
      onChange={(e) => handleSelect(e.target.value)}
      className="rounded-lg border bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat.slug} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
