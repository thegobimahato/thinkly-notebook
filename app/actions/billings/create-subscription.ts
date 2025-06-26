"use server";

import { prisma } from "@/lib/db";
import { getStripeSession } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createSubscription() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
    select: { stripeCustomerId: true },
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error("Unable to get customer ID");
  }

  const subscriptionUrl = await getStripeSession({
    customerId: dbUser.stripeCustomerId,
    domainUrl:
      process.env.NODE_ENV == "production"
        ? (process.env.PRODUCTION_URL as string)
        : "http://localhost:3000",
    priceId: process.env.STRIPE_PRICE_ID as string,
  });

  return redirect(subscriptionUrl);
}
