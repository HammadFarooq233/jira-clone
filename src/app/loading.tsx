"use client";

import { Loader } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}