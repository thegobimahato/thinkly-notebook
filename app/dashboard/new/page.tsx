import SubmitButton from "@/components/general/SubmitButtons";
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
import { unstable_noStore as noStore } from "next/cache";
import { createNote } from "@/app/actions/notes/create-note";

export default async function NewNotePage() {
  noStore();

  return (
    <div className="px-4">
      <Card>
        <form action={createNote}>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Note</CardTitle>
            <CardDescription>
              Write and save your thoughts. All notes are saved securely to your
              account.
            </CardDescription>
          </CardHeader>

          <CardContent className="my-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xl">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Enter a title for your note"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xl">
                Description
              </Label>
              <Textarea
                name="description"
                placeholder="Describe your note as you want"
                className="min-h-[150px]"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between gap-2 px-6 pb-6">
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
