import { NextRequest, NextResponse } from "next/server";
import { withSubscriptionStatus } from "./lib/proxy/subscription";

export async function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);

  await withSubscriptionStatus(request, headers);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
