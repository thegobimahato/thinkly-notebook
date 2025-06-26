import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";
import SubmitButton from "@/components/general/SubmitButtons";
import { updateNote } from "@/app/actions/notes/update-note";

async function getData({ userId, noteId }: { userId: string; noteId: string }) {
  noStore();

  const data = await prisma.note.findUnique({
    where: { id: noteId, userId },
    select: {
      title: true,
      description: true,
      id: true,
    },
  });

  return data;
}

export default async function EditNotePage(props: { params: { id: string } }) {
  const params = await props.params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ userId: user?.id as string, noteId: params.id });

  return (
    <div className="px-4 py-6">
      <Card>
        <form action={updateNote}>
          <input type="hidden" name="noteId" value={data?.id} />

          <CardHeader>
            <CardTitle className="text-2xl">Edit Note</CardTitle>
            <CardDescription>
              Make changes to your existing note below.
            </CardDescription>
          </CardHeader>

          <CardContent className="my-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Title for your note"
                defaultValue={data?.title}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your note"
                className="min-h-[150px]"
                required
                defaultValue={data?.description}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between px-6 pb-6">
            <Button asChild variant="outline">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
