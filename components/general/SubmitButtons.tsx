"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending) {
      toast("Your changes have been saved successfully.");
      window.location.reload();
    }
    wasPending.current = pending;
  }, [pending]);

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit" variant={"outline"}>
          <Loader2 className="mr-1 size-4 animate-spin" />
          Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-fit">
          Save Now
        </Button>
      )}
    </>
  );
}

export function StripeSubscriptionCreationButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full text-base font-semibold">
          Create Subscription
        </Button>
      )}
    </>
  );
}

export function StripePortalButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          View payment details
        </Button>
      )}
    </>
  );
}

export function TrashDelete() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button variant={"destructive"} size="icon" disabled>
          <Loader2 className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"destructive"} size="icon" type="submit">
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </>
  );
}
