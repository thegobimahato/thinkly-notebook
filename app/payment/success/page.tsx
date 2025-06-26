import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center px-4">
      <section aria-labelledby="payment-success-heading">
        <Card className="w-full max-w-sm shadow-md">
          <div className="p-6">
            <header className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600 stroke-4" aria-hidden="true" />
              </div>
              <h2
                id="payment-success-heading"
                className="text-foreground text-2xl font-semibold"
              >
                Payment Successful
              </h2>
              <p className="text-muted-foreground mt-2">
                Thank you for subscribing! Check your email for confirmation and
                next steps.
              </p>
            </header>

            <div className="mt-6">
              <Button className="text-md w-full p-5" asChild>
                <Link href="/">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
