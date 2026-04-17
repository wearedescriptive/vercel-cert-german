import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="mb-4 font-bold text-4xl">404</h1>
      <p className="mb-6 text-muted-foreground">This page doesn&apos;t exist.</p>
      <Button asChild size="lg" className="h-11 px-6">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
