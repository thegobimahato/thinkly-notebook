import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserNav from "./UserNav";
import Logo from "./Logo";

export default async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="dark:border-accent flex h-[10vh] items-center border-b border-black/20 bg-transparent px-2">
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <span className="logo-theme text-primary flex h-[30px] w-[30px] items-center justify-center md:h-[40px] md:w-[40px]">
              <Logo />
            </span>
            <h1 className="text-2xl font-bold italic md:text-3xl">Thinkly</h1>
          </div>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            {(await isAuthenticated()) ? (
              <UserNav
                email={user?.email as string}
                image={user?.picture as string}
                name={`${user?.given_name || ""} ${user?.family_name || ""}`.trim()}
              />
            ) : (
              <>
                <LoginLink>
                  <Button>Sign In</Button>
                </LoginLink>

                <RegisterLink>
                  <Button variant={"secondary"}>Sign Up</Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
