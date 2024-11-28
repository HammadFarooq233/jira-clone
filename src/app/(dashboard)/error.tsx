"use client";

import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-4">
      <AlertCircleIcon className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>

      <Button variant={"secondary"} size={"sm"}>
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </div>
  );
}
