import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <section className="background-gradient flex h-screen items-center justify-center">
      <div className="relative mx-auto w-full max-w-7xl items-center px-5 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <div>
            <span className="dark:bg-secondary w-auto rounded-full bg-black/70 px-6 py-2.5">
              <span className="font-medium text-white">
                Easily organize your notes
              </span>
            </span>

            <h1 className="mt-8 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-6xl">
              Create Notes with ease
            </h1>

            <p className="text-secondary-foreground mx-auto mt-8 max-w-xl text-base italic lg:text-xl">
              Thinkly makes it simple to jot down thoughts, organize notes, and
              boost your creativity. All in one place.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-sm justify-center">
            <RegisterLink>
              <Button size={"lg"} className="text-md w-full">
                Sign up for free
              </Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
