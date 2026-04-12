"use server";

import { cookies } from "next/headers";
import {
  createSubscription,
  activateSubscription,
  cancelSubscription,
} from "@/lib/api";

const COOKIE_NAME = "subscription-token";

export async function subscribe() {
  const { token } = await createSubscription();
  if (!token) throw new Error("No subscription token received");

  await activateSubscription(token);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, { httpOnly: true, path: "/" });
}

export async function unsubscribe() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return;

  await cancelSubscription(token);
  cookieStore.delete(COOKIE_NAME);
}
