import React from "react";
import DashboardNav from "../../components/general/DashboardNav";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

async function getData({
  email,
  id,
  firstName,
  lastName,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
    });

    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  await getData({
    email: user?.email as string,
    firstName: user?.given_name as string,
    id: user?.id as string,
    lastName: user?.family_name as string,
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="mt-10 flex flex-col space-y-6 px-2 md:px-4 lg:px-8">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden h-full w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
