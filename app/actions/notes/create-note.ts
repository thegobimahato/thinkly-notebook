"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createNote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // ✅ Check user note count
  const noteCount = await prisma.note.count({
    where: { userId: user.id },
  });

  // ✅ Check subscription
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });

  const isSubscribed = subscription?.status === "active";

  if (noteCount >= 3 && !isSubscribed) {
    throw new Error(
      "Note limit reached. Please subscribe to create more notes.",
    );
  }

  // ✅ Create the note
  await prisma.note.create({
    data: {
      userId: user.id,
      title,
      description,
    },
  });

  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
