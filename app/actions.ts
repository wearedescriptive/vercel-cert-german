"use server";

import { cookies } from "next/headers";
import {
  createSubscription,
  activateSubscription,
  cancelSubscription,
} from "@/lib/api";

const COOKIE_NAME = "subscription-token";

type Result = { success: true } | { success: false; error: string };

export async function subscribe(): Promise<Result> {
  try {
    const { token } = await createSubscription();
    if (!token) throw new Error("No subscription token received");

    await activateSubscription(token);

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, { httpOnly: true, path: "/" });

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function unsubscribe(): Promise<Result> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token)
      return { success: false, error: "No active subscription found." };

    await cancelSubscription(token);
    cookieStore.delete(COOKIE_NAME);

    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
