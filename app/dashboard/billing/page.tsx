import { createSubscription } from "@/app/actions/billings/create-subscription";
import { createCustomerPortal } from "@/app/actions/billings/customer-portal";
import {
  StripePortalButton,
  StripeSubscriptionCreationButton,
} from "@/components/general/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckCircle2 } from "lucide-react";

const featureItems = [
  { name: "Unlimited notes creation" },
  { name: "Access on all devices" },
  { name: "Priority support" },
  { name: "Export to PDF & Markdown" },
];

async function getData(userId: string) {
  return prisma.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      status: true,
      user: {
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });
}

export default async function BillingPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const isActive = data?.status === "active" || data?.status === "trialing";

  if (isActive) {
    return (
      <div className="grid items-start gap-8 px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl">Subscription</h1>
            <p className="text-muted-foreground text-lg">
              Settings regarding your active subscription
            </p>
          </div>
        </div>

        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Edit Subscription</CardTitle>
            <CardDescription>
              Click the button below to update your payment details or view
              billing history.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={createCustomerPortal}>
              <StripePortalButton />
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-6 px-4 py-8">
      <section aria-labelledby="billing-plan-heading">
        <Card className="flex flex-col">
          <CardContent className="pt-6">
            <header>
              <h2
                id="billing-plan-heading"
                className="bg-primary/10 text-primary inline-flex rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase"
              >
                Monthly
              </h2>
            </header>

            <div className="mt-4 flex items-baseline text-6xl font-extrabold">
              $30
              <span className="text-muted-foreground ml-2 text-2xl font-medium">
                /mo
              </span>
            </div>

            <p className="text-muted-foreground mt-4 text-base">
              Unlimited notes, one simple price: $30/month.
            </p>
          </CardContent>

          <section className="bg-secondary m-1 flex flex-1 flex-col justify-between space-y-6 rounded-lg px-4 pt-6 sm:p-10 sm:pt-6">
            <ul className="space-y-4" aria-label="Features included">
              {featureItems.map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle2
                    className="mt-1 h-6 w-6 text-green-500"
                    aria-hidden="true"
                  />
                  <span className="text-foreground ml-3">{item.name}</span>
                </li>
              ))}
            </ul>

            <form
              action={createSubscription}
              className="w-full"
              aria-label="Purchase form"
            >
              <StripeSubscriptionCreationButton />
            </form>
          </section>
        </Card>
      </section>
    </main>
  );
}
