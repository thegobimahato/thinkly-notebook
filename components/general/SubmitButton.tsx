"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending) {
      toast("Your changes have been saved successfully.");
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
