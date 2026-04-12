"use client";

import type { ReactNode } from "react";
import { useSearchNavigation } from "./search-navigation";

export function SearchResultsPending({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const { isPending } = useSearchNavigation();

  if (isPending) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
