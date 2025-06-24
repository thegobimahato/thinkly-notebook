"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./UserNav";

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            className={cn(
              "group hover:bg-accent hover:text-accent-foreground flex items-center rounded-md px-3 py-2 font-medium",
              pathname === item.href
                ? "bg-primary text-white"
                : "bg-transparent",
            )}
          >
            <item.icon className="mr-2 size-5" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
