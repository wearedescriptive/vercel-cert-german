import { BreakingNews } from "@/components/breaking-news";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <Suspense fallback="loading...">
        <BreakingNews />
      </Suspense>
      <main>main content!</main>
    </div>
  );
}
