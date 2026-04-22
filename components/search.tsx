"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { Search as SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [showHint, setShowHint] = useState(false);

  const query = searchParams.get("query") ?? "";
  const [value, setValue] = useState(query);
  const [prevQuery, setPrevQuery] = useState(query);

  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query) {
      setValue(query);
    }
  }

  const showHintDebounced = useDebouncedCallback((show: boolean) => {
    setShowHint(show);
  }, 3000);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term.length >= 3) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="flex flex-1 shrink-0 flex-col">
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-lg border border-input bg-background py-3 pl-11 pr-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);

            if (value.length > 0 && value.length < 3) {
              showHintDebounced(true);
            } else {
              showHintDebounced.cancel();
              setShowHint(false);
            }

            handleSearch(value);
          }}
        />
        <SearchIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground peer-focus:text-foreground" />
      </div>
      {showHint && (
        <p className="mt-1.5 text-xs text-muted-foreground animate-in fade-in duration-300">
          Type at least 3 characters to search
        </p>
      )}
    </div>
  );
}
