import type { NextRequest } from "next/server";
import { getSubscription } from "../api";

export async function withSubscriptionStatus(
  request: NextRequest,
  headers: Headers,
) {
  if (!request.nextUrl.pathname.startsWith("/articles/")) return;

  const token = request.cookies.get("subscription-token")?.value;

  let status = "none";

  if (token) {
    try {
      const subscription = await getSubscription(token);
      status = subscription?.data?.status === "active" ? "active" : "inactive";
    } catch {
      status = "none";
    }
  }

  headers.set("x-subscription-status", status);
}
