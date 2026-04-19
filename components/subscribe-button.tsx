"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
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
  return isSubscribed ? (
    <UnsubscribeDialog />
  ) : (
    <SubscribeDialog className={className} />
  );
}

function SubscribeDialog({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubscribe() {
    startTransition(async () => {
      await subscribe();
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
      <DialogTrigger asChild>
        <Button
          className={className ?? "ml-auto"}
          size={className ? "default" : "sm"}
          disabled={isPending}
        >
          Subscribe
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => isPending && e.preventDefault()}>
        {isPending ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Unlocking full access…
            </p>
          </div>
        ) : (
          <>
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
              <Button onClick={handleSubscribe}>
                Subscribe — it&apos;s free
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function UnsubscribeDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleUnsubscribe() {
    startTransition(async () => {
      await unsubscribe();
      router.refresh();
    });
  }

  return (
    <div className="ml-auto flex items-center gap-2">
      <Badge variant="secondary" className="hidden sm:inline-flex">
        Subscribed
      </Badge>
      <Dialog open={open} onOpenChange={(v) => !isPending && setOpen(v)}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Unsubscribe
          </Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => isPending && e.preventDefault()}
        >
          {isPending ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Updating your subscription…
              </p>
            </div>
          ) : (
            <>
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
                <Button variant="destructive" onClick={handleUnsubscribe}>
                  Unsubscribe
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
