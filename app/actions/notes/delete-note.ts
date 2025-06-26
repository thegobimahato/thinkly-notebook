"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteNote(formData: FormData) {
  const noteId = formData.get("noteId") as string;

  if (!noteId) {
    throw new Error("Note ID is required");
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  revalidatePath("/dashboard");
}
