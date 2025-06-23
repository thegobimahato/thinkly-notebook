import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="bg-background dark:border-accent flex h-[10vh] items-center border-b border-black/20">
      <div className="container mx-auto flex max-w-7xl items-center justify-between">
        <Link href={"/"}>
          <h1 className="text-3xl font-bold">Thinkly</h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="flex items-center gap-x-5">
            <Button>Sign In</Button>
            <Button variant={"secondary"}>Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
