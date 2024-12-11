"use client";

import { AlertCircleIcon } from "lucide-react";

interface PageErrorProps {
  message?: string;
}

export default function PageError({
  message = "Something went wrong",
}: PageErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AlertCircleIcon className="mb-2 size-6 text-muted-foreground" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
}
