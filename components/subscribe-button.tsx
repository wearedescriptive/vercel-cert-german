"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { subscribe, unsubscribe } from "@/app/actions";

type Props = {
  isSubscribed: boolean;
};

export function SubscribeButton({ isSubscribed }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubscribe() {
    startTransition(async () => {
      await subscribe();
      setOpen(false);
      router.refresh();
    });
  }

  function handleUnsubscribe() {
    startTransition(async () => {
      await unsubscribe();
      router.refresh();
    });
  }

  if (isSubscribed) {
    return (
      <button
        onClick={handleUnsubscribe}
        disabled={isPending}
        className="ml-auto rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-neutral-50 disabled:opacity-50"
      >
        {isPending ? "..." : "Unsubscribe"}
      </button>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="ml-auto rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-neutral-50">
          Subscribe
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <Dialog.Title className="text-xl font-bold tracking-tight text-neutral-900">
            Subscribe to Vercel Daily
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-neutral-500">
            Get full access to all articles. No account required — your
            subscription persists in this browser.
          </Dialog.Description>

          <button
            onClick={handleSubscribe}
            disabled={isPending}
            className="mt-6 w-full rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-700 disabled:opacity-50"
          >
            {isPending ? "Subscribing…" : "Subscribe — it's free"}
          </button>

          <Dialog.Close asChild>
            <button className="mt-3 w-full rounded-full border px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
              Maybe later
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
