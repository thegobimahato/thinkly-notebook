"use server";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const name = formData.get("name") as string;
  const colorScheme = formData.get("color") as string;

  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      name: name ?? undefined,
      colorScheme: colorScheme ?? undefined,
    },
  });

  revalidatePath("/", "layout");
}
