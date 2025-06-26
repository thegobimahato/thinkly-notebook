import FormattedDate from "@/components/general/FormattedDate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File } from "lucide-react";
import Link from "next/link";
import { deleteNote } from "../actions/notes/delete-note";
import { TrashDelete } from "@/components/general/SubmitButtons";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: {
        select: {
          title: true,
          id: true,
          description: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },

      Subscription: {
        select: {
          status: true,
        },
      },
    },
  });

  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-muted-foreground text-lg">
            Here you can see and create new notes
          </p>
        </div>

        {data?.Subscription?.status === "active" ||
        (data?.Notes?.length ?? 0) < 3 ? (
          <Button asChild>
            <Link href="/dashboard/new">Create a new Note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/billing">Upgrade to create more notes</Link>
          </Button>
        )}
      </div>

      {data?.Notes.length === 0 ? (
        <div className="animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
            <File className="text-primary h-10 w-10" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            You dont have any notes created
          </h2>

          <p className="text-muted-foreground mx-auto mt-2 mb-8 max-w-sm text-center text-sm leading-6">
            You currently dont have any notes. please create some so that you
            can see them right here.
          </p>

          {data?.Subscription?.status === "active" ||
          (data?.Notes?.length ?? 0) < 3 ? (
            <Button asChild>
              <Link href="/dashboard/new">Create a new Note</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/dashboard/billing">
                Upgrade to create more notes
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          {data?.Notes.map((item) => (
            <Card
              key={item.id}
              className="flex flex-row items-center justify-between p-4"
            >
              <div>
                <h2 className="text-primary text-2xl font-semibold">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  <FormattedDate date={item.createdAt} />
                </p>
              </div>

              <div className="flex gap-x-4">
                <Link href={`/dashboard/new/${item.id}`}>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>

                <form action={deleteNote}>
                  <input type="hidden" name="noteId" value={item.id} />
                  <TrashDelete />
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
