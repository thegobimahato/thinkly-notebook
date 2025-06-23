import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <nav className="dark:border-accent flex h-[10vh] items-center border-b border-black/20 bg-transparent">
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <Link href={"/"}>
          <div className="flex items-center justify-center gap-2">
            <Image src={"./logo.svg"} width={40} height={40} alt="logo" />
            <h1 className="text-3xl font-bold italic">Thinkly</h1>
          </div>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            {(await isAuthenticated()) ? (
              <LogoutLink>
                <Button variant={"destructive"}>Log out</Button>
              </LogoutLink>
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
