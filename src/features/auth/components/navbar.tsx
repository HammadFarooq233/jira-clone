"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isSignInPage = pathname === "/sign-in";

  return (
    <nav className="flex items-center justify-between">
      <Image src={"/logo.svg"} alt="logo" width={152} height={56} />

      <Button asChild variant="secondary">
        <Link href={isSignInPage ? "/sign-up" : "/sign-in"}>
          {isSignInPage ? "Sign Up" : "Sign In"}
        </Link>
      </Button>
    </nav>
  );
}
