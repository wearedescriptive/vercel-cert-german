"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { subscribe, unsubscribe } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

type Props = {
  isSubscribed: boolean;
  className?: string;
};

export function SubscribeButton({ isSubscribed, className }: Props) {
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
      setOpen(false);
      router.refresh();
    });
  }

  if (isSubscribed) {
    return (
      <div className="ml-auto flex items-center gap-2">
        <Badge variant="secondary">Subscribed</Badge>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Unsubscribe
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Unsubscribe from Vercel Daily</DialogTitle>
              <DialogDescription>
                You will lose access to full articles. You can always
                re-subscribe later.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleUnsubscribe}
                disabled={isPending}
              >
                {isPending ? "Unsubscribing…" : "Unsubscribe"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className ?? "ml-auto"} size={className ? "default" : "sm"}>
          Subscribe
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe to Vercel Daily</DialogTitle>
          <DialogDescription>
            Get full access to all articles. No account required — your
            subscription persists in this browser.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Maybe later</Button>
          </DialogClose>
          <Button onClick={handleSubscribe} disabled={isPending}>
            {isPending ? "Subscribing…" : "Subscribe — it's free"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
