import { cookies } from "next/headers";
import { getSubscription } from "@/lib/data";
import { SubscribeButton } from "./subscribe-button";

export async function SubscribeButtonLoader() {
  const token = (await cookies()).get("subscription-token")?.value;
  const subscription = token ? await getSubscription(token) : null;
  const isSubscribed = subscription?.data.status === "active";

  return <SubscribeButton isSubscribed={isSubscribed} />;
}
