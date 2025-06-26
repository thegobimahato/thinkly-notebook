"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function updateNote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) throw new Error("Not authorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const noteId = formData.get("noteId") as string;

  if (!noteId || !title || !description) {
    throw new Error("Missing required fields");
  }

  await prisma.note.update({
    where: { id: noteId, userId: user.id },
    data: { title, description },
  });

  revalidatePath("/dashboard");
  return redirect("/dashboard");
}
