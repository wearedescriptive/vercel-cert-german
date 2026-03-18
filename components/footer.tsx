import { cacheLife } from "next/cache";

export async function Footer() {
  "use cache";

  cacheLife("days");

  return (
    <footer className="border-t py-6 text-center text-sm text-muted-foreground">
      © {new Date().getFullYear()} Vercel Daily News. All rights reserved.
    </footer>
  );
}
