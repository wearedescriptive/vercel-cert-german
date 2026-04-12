"use client";

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from "react";

const SearchNavigationContext = createContext<{
  isPending: boolean;
  startTransition: TransitionStartFunction;
}>({
  isPending: false,
  startTransition: () => {},
});

export function useSearchNavigation() {
  return useContext(SearchNavigationContext);
}

export function SearchNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <SearchNavigationContext value={{ isPending, startTransition }}>
      {children}
    </SearchNavigationContext>
  );
}
